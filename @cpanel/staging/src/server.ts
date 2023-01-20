// import CONFIG from  

// import * as Process from 'node:process';
import * as Fs from 'fs';
import * as Path from 'path';
// import * as Http from 'node:http';
// import * as Https from 'node:https';
import express from 'express';
// import cors from 'cors';
import * as Yaml from 'yaml';

// import * as Routes from './routes'
import { Serve, StagingEnv } from './types';
import { logger, authenticationMiddleware, connectionMiddleware } from './middleware';
// import { ENV } from './app';

class Server {
    public process: NodeJS.Process;
    public app;
    public locals!: Serve.LocalConfig;

    constructor() {
        this.process = process;
        this.app = express();
        this.mountLocals();
        this.setMiddleware();
        this.mountRoutes();
        
        this.process.on('exit', (exitCode)=> {
            console.log(`\n----\nNode server shutting down with status code ${exitCode}\n----\n`)
        })
    }

    private mountLocals(): void {
        try {
            const configFile = Path.resolve(__dirname, '../config.yaml');
            if (Fs.existsSync(configFile)) {
                const localConfig: Serve.Configuration = (
                    Yaml.parse(Fs.readFileSync(configFile, 'utf-8'))
                );
                const env = this.process.env.STAGING_ENV as StagingEnv;
                this.locals = { 
                    ...localConfig,
                    staging_env: env,
                    url: localConfig.url[env],
                    host: localConfig.host[env]
                };
                this.app.response.locals = { ...this.locals };
            } else throw new Error('Failed to locate required configurations')
        } catch (err) {
            console.log(err)
            this.process.exit(1)
        }
    }

    private setMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded());

        // basic logger
        this.app.use('*', logger.bind(this));
        
        // Validate connections before proceeding to auth
        // this.app.use('*', connectionMiddleware.bind(this));

        // auth middleware for all connections
        this.app.use('*', authenticationMiddleware.bind(this));
    }

    private mountRoutes(): void {
        this.app.use('*', (req: Serve.Request, res: Serve.Response)=>{
            let url: string = '';
            try {
                if (req.baseUrl === undefined) {
                    throw new Error('url param not present')
                } else {
                    const _self = this;
                    url = (function(){
                        switch (_self.locals.staging_env) {
                            case 'dev_test':
                            case 'prod_test': {
                                if (req.baseUrl.indexOf(_self.locals.url) === -1) {
                                    res.setHeader('X-Updated-Route', 'false');
                                    return req.baseUrl;
                                }
                                res.setHeader('X-Updated-Route', 'true');
                                return req.baseUrl.replace('/' + _self.locals.url, '');
                            }
                            default: {
                                return req.baseUrl;
                            }
                        }
                    })();
                    res.setHeader('X-Original-Route', '"' + req.baseUrl + '"');
                    res.setHeader('X-Final-Route', '"' + url + '"');
                    if (url === '' || url === '/') {
                        res.sendFile(Path.resolve(__dirname, `./static/index.html`));
                    } else {
                        res.sendFile(Path.resolve(__dirname, `./static/${url}`));
                    }
                }
            } catch (err) {
                console.log(err);
                res.setHeader('X-Route-Error', '"' + url + '"');
                res.sendFile(Path.resolve(__dirname, 'static/error.html'));
            }
        });
    }
}

export default new Server().app