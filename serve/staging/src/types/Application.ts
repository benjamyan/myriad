/** Global definitions to be used throughout the api, regardless of location/routes/whatever */
import * as Express from 'express';

export {}

export type StagingEnv = 'dev' | 'dev_test' | 'dev_https' | 'prod' | 'prod_test' | 'prod_https';

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
        // dir_name: string;
        host: Record<StagingEnv, string>;
        url: Record<StagingEnv, string>;
        accept_connection: string[];
        // admins: string[];
    }
    export interface LocalConfig {
        staging_env: StagingEnv;
        users: string[];
        host: string;
        url: string;
        accept_connection: string[];
    }

    /** Redeclaring express namespaces */
    export interface Request extends Express.Request {
        query: {
            file?: string;
        }
    }
    export interface Response extends Express.Response {
        locals: LocalConfig 
    }
    export interface NextFunction extends Express.NextFunction {
        
    }
    // export interface Application extends Express.Application {
    //     request: Request;
    //     response: Response;
    // }
}
