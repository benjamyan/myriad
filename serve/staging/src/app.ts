import * as Https from 'https';
import * as Fs from 'fs';
import * as Path from 'path';

import { StagingEnv } from './types';
import App from './server';

export const ENV = process.env.STAGING_ENV as StagingEnv; 
const httpParams = (function(){
    switch (ENV) {
        case 'dev': {
            return {
                host: 'localhost',
                port: 8080
            }
        }
        case 'dev_test': {
            return {
                host: '127.0.0.1',
                port: 3000
            }
        }
        case 'dev_https': {
            return {
                host: '192.168.0.11',
                port: 89
            }
        }
        case 'prod_test': {
            return {
                host: '127.0.0.1',
                port: 3000
            }
        }
        case 'prod': {
            return {
                host: '127.0.0.1',
                port: 3000
            }
        }
        default: {
            throw new Error('Failed to parse host.')
        }
    }
})()

try {
    if (ENV.indexOf('https') > -1) {
        Https
            .createServer({
                key: Fs.readFileSync(Path.resolve(__dirname, '../cert/192.168.0.11-key.pem'), 'utf8'),
                cert: Fs.readFileSync(Path.resolve(__dirname, '../cert/192.168.0.11.pem'), 'utf8')
            }, App)
            .listen(httpParams.port, httpParams.host, (): void => {
                console.log(`\nRunning as: ${ENV}`);
                console.log(`Server is listening on https://${httpParams.host}:${httpParams.port}\n`);
            });
    } else if (ENV !== undefined) {
        App.listen(httpParams.port, httpParams.host, (): void => {
            console.log(`\nRunning as: ${ENV}`);
            console.log(`Server is listening on http://${httpParams.host}:${httpParams.port}\n`);
        })
    } else {
        throw new Error(`Invalid or missing entry for env variable "STAGING_ENV": ${ENV}`);
    }
} catch (err) {
    console.log(err)
}
