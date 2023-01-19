/** Global definitions to be used throughout the api, regardless of location/routes/whatever */
import * as Express from 'express';

export {}

export namespace Serve {
    export interface Configuration {
        // dns: string;
        // server: string;
        // domain: string;
        // dev_http_port: number;
        // dev_https_port: number;
        // use_https: boolean;
        // allowedOrigins: string[];
        // userMediaPaths: Record<string | number, string>;
        users: string[];
        dir_name: string;
        accept_connection: string[];
        // admins: string[];
    }

    /** Redeclaring express namespaces */
    export interface Request extends Express.Request {
        query: {
            file?: string;
        }
    }
    export interface Response extends Express.Response {
        locals: Configuration 
    }
    export interface NextFunction extends Express.NextFunction {
        
    }
    // export interface Application extends Express.Application {
    //     request: Request;
    //     response: Response;
    // }
}
