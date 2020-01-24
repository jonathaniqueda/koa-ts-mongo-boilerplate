import { Context } from 'koa';

export const jsend = (): any => async (ctx: Context, next: () => Promise<void>) => {
    ctx.success = (data?: any) => {
        ctx.body = {
            status: 'success',
            statusCode: 200,
            data: data !== undefined ? data : null,
        };
    };

    ctx.fail = (failCode: string, data: any, receivedStatusCode?: number) => {
        const statusCode = receivedStatusCode || 400;
        ctx.status = statusCode;
        ctx.body = {
            status: 'fail',
            code: failCode,
            data: data || null,
            statusCode,
        };
    };

    ctx.error = (code: string, message: string, data?: any, receivedStatusCode?: number) => {
        const statusCode = receivedStatusCode || 500;
        ctx.status = statusCode;
        ctx.body = {
            status: 'error',
            code,
            message,
            statusCode,
            data,
        };
    };

    await next();
};
