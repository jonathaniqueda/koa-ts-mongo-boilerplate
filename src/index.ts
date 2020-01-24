import * as dotenv from 'dotenv';
dotenv.config();

import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import * as Cors from 'koa2-cors';

import { config } from './config';
import {
    jsend,
    jwtDecode,
    logger,
    routeNotFound,
    koaMongo,
} from './middlewares';
import { routes } from './routes';

const app = new Koa();

const { MONGO_DB_URL, MONGO_DB_NAME } = process.env;

if (!MONGO_DB_URL || !MONGO_DB_NAME) {
    throw new Error('MONGO_DB_URL or MONGO_DB_NAME not defined');
}

app.use(koaMongo({
    url: MONGO_DB_URL,
    db: MONGO_DB_NAME,
}));
app.use(KoaBodyParser());
app.use(Cors());
app.use(jsend());
app.use(logger);
app.use(jwtDecode());
app.use(routes);
app.use(routeNotFound());

app.listen(config.port, () => {
    console.log(`Service listening on port ${config.port}`);
});
