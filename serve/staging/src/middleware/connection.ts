import { NextFunction } from 'express';
import { Serve } from '../types';

export const connectionMiddleware = (req: Serve.Request, res: Serve.Response, next: NextFunction): void => {
    try {
        if (req.baseUrl.indexOf(res.locals.url) === -1) {
            res.setHeader('X-Reject-Reason', `Failed baseUrl check for: ${res.locals.url}`)
            res.sendStatus(401);
        } else if (req.hostname.indexOf(res.locals.host) === -1) {
            res.setHeader('X-Reject-Reason', `Failed hostname check for: ${res.locals.url}`)
            res.sendStatus(401);
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.setHeader('X-Reject-Reason', `Unhandled exception`);
        res.sendStatus(500)
    }
}