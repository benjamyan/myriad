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
import { Serve } from './types';
import { logger, authenticationMiddleware, connectionMiddleware } from './middleware';

class Server {
    public process: NodeJS.Process;
    public app;
    public locals!: Serve.Configuration;

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
                this.locals = { ...localConfig }
                this.app.response.locals = { ...localConfig };
            } else throw new Error('Failed to locate required configurations')
        } catch (err) {
            console.log(err)
            this.process.exit(1)
        }
    }

    private setMiddleware(): void {
        // const _self = this;
        // this.app.use(cors(function(req, callback) {
        //     const corsOptions: cors.CorsOptions = {
        //         methods: [ 'OPTIONS', 'GET', 'PUT', 'HEAD' ],
        //         optionsSuccessStatus: 200
        //     };
        // console.log()
        //     if (_self.locals.allowedOrigins.includes(req.header('Origin'))) {
        //         corsOptions.origin = true
        //     } else {
        //         corsOptions.origin = false
        //     }
        //     callback(null, corsOptions)
        // }))
        // this.app.use(express.static(Path.join(__dirname, '../static')));
        // this.app.response.locals = this.locals;

        this.app.use(express.json());
        this.app.use(express.urlencoded());

        // basic logger
        this.app.use('*', logger.bind(this));
        
        // Validate connections before proceeding to auth
        // this.app.use('*', connectionMiddleware.bind(this))

        // auth middleware for all connections
        this.app.use('*', authenticationMiddleware.bind(this));
    }

    private mountRoutes(): void {
        this.app.use('/', (req: Serve.Request, res: Serve.Response)=>{
            try {
                if (!req.url) {
                    throw new Error('url param not present')
                } else {
                    const url = (
                        this.process.env.STAGING_ENV === 'prod'
                            ? req.url.replace('/' + this.locals.dir_name, '')
                            : req.url
                    );
                    if (url === '' || url === '/') {
                        res.sendFile(Path.resolve(__dirname, `./static/index.html`));
                    } else {
                        res.sendFile(Path.resolve(__dirname, `./static/${url}`));
                    }
                }
            } catch (err) {
                console.log(err);
                res.sendFile(Path.resolve(__dirname, 'views/error.html'));
            }
        });
    }
}

export default new Server().app