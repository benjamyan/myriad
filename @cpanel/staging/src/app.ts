import * as Https from 'https';
import * as Fs from 'fs';
import * as Path from 'path';

import App from './server';

// 'dev' | 'dev-s' | 'prod' | 'prod-s' 
const ENV: string | undefined = process.env.STAGING_ENV;
const httpParams = (function(){
    switch (ENV) {
        case 'dev': {
            return {
                host: '192.168.0.11',
                port: 88
            }
        }
        case 'dev-s': {
            return {
                host: '192.168.0.11',
                port: 89
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
    if (ENV === 'dev-s') {
        Https
            .createServer({
                key: Fs.readFileSync(Path.resolve(__dirname, '../cert/192.168.0.11-key.pem'), 'utf8'),
                cert: Fs.readFileSync(Path.resolve(__dirname, '../cert/192.168.0.11.pem'), 'utf8')
            }, App)
            .listen(httpParams.port, httpParams.host, (): void => {
                console.log(`Server is listening on https://${httpParams.host}:${httpParams.port}`);
            });
    } else if (ENV === 'dev' || ENV === 'prod') {
        App.listen(httpParams.port, httpParams.host, (): void => {
            console.log(`Server is listening on http://${httpParams.host}:${httpParams.port}`);
        })
    } else {
        throw new Error(`Invalid or missing entry for env variable "STAGING_ENV": ${ENV}`);
    }
} catch (err) {
    console.log(err)
}
