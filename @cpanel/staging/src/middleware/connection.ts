import { Request, Response, NextFunction } from 'express';

export const connectionMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const acceptedConnection = res.locals.accept_connection;
    
        if (acceptedConnection.includes(req.ip)) {
            next();
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500)
    }
}