import { Context, Middleware } from 'koa';

export const routeNotFound = (): Middleware => async (ctx: Context) => {
    ctx.fail('ROUTE_NOT_FOUND', `Route ${ctx.request.url} not found`, 404);
};
