import * as jwt from 'jsonwebtoken';
import { Context } from 'koa';
import { IDBUser } from '../types/user';

export interface IDecodedJwt {
    exp: number;
    iat: string;
    user: IDBUser;
}

export const jwtDecode = (): any => async (ctx: Context, next: () => Promise<void>) => {
    let { authorization: token } = ctx.headers;

    if (!token) {
        token = ctx.query.authorization;
    }

    const urlParsed = ctx.request.path.split('/');
    const isInternal = urlParsed.includes('internal');
    const isPublic = urlParsed.includes('public');
    const isPulicOrInternal = isInternal || isPublic;

    if (isPulicOrInternal) {
        await next();
        return;
    } else if (!token && !isPulicOrInternal) {
        ctx.status = 401;
        const responseCode = 'JWT_NOT_EXISTS';
        const responseMsg = 'Try to get public / external route response but dont have JWT.';

        ctx.body = {
            status: 'error',
            code: responseCode,
            message: responseMsg,
            statusCode: 401,
            data: {},
        };

        return;
    }

    const hasBearer = token.includes('Bearer ');

    if (hasBearer) {
        const removeBearer = token.split('Bearer ');
        token = removeBearer[1];
    }

    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
        throw new Error(`JWT_SECRET not defined`);
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if (typeof decodedToken !== 'object') {
            throw new Error('Invalid token format');
        }

        ctx.jwt = decodedToken as IDecodedJwt;
        } catch (err) {
        ctx.status = 401;
        const responseCode = 'WRONG_JWT';
        const responseMsg = 'Try to refresh token or check if token has already set.';

        ctx.body = {
            status: 'error',
            code: responseCode,
            message: responseMsg,
            statusCode: 401,
            data: err,
        };

        return;
    }

    await next();
};
