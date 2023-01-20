import { Request, Response, NextFunction } from 'express';
import { default as TSSCMP } from 'tsscmp'
import { default as Auth } from 'basic-auth'
// import * as Path from 'node:path'

const validateRequest = (req: Request): Auth.BasicAuthResult | undefined | Error => {
    try {
        // const filterDangerousChar = ()=> {}
        // if (!!req.body.name && !!req.body.pass) {
            const authReq = Auth(req);
            
            if (authReq === undefined) {
                return undefined
            } else if (authReq.name.length === 0 || authReq.pass.length === 0) {
                return undefined
            }
            return authReq
        // } else throw new Error('Missing fields')
        
    } catch (err) {
        console.log(err)
        return new Error('Unhandled exception')
    }
}

const validateAuth = (name: string, pass: string, users: string[]): boolean | Error => {
    try {
        let valid: boolean = false,
            currUser: string[] = [];
        for (const user of users) {
            currUser = user.split('__');
            if (currUser.length > 2) {
                break;
            } else if (TSSCMP(currUser[0], name) && TSSCMP(currUser[1], pass)) {
                valid = true;
                break
            }
        }
        return valid
    } catch (err) {
        console.log(err)
        return new Error('Unhandled exception')
    }
}

export function authenticationMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
        const promptLogin = ()=> {
            res.statusCode = 401;
            res.set({
                'WWW-Authenticate': 'Basic realm="localhost"'
            })
            res.send()
        };
        const authFields = validateRequest(req);
        if (authFields instanceof Error) {
            throw authFields as Error
        } else if (authFields === undefined) {
            promptLogin()
        } else {
            const validateCreds: Error | boolean = validateAuth(authFields.name, authFields.pass, res.locals.users);
            if (validateCreds instanceof Error) {
                promptLogin()
            } else {
                next()
            }
        }
        return
    } catch (err) {
        console.log(err)
        res.send(500)
        return
    }
}
