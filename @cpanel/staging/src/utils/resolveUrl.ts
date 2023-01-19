import { Serve } from "../types";

export const resolveUrl = (req: Serve.Request, res: Serve.Response)=> {
    switch (res.locals.staging_env) {
        case 'dev_test':
        case 'prod_test': {
            if (req.baseUrl.indexOf(res.locals.url) === -1) {
                res.setHeader('X-Resolved-Url', 'false');
                return req.baseUrl;
            }
            res.setHeader('X-Resolved-Url', 'true');
            return req.baseUrl.replace('/' + res.locals.url, '');
        }
        default: {
            return req.baseUrl;
        }
    }
}