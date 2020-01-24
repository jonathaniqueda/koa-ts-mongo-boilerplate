import { Context } from 'koa';
import * as Router from 'koa-router';

const router = new Router({
    prefix: '/v1',
});

router.get('/public/status', async (ctx: Context) => {
    ctx.success({ api: 'online' });
});

export const routes = router.routes();
