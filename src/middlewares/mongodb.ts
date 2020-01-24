import * as MongoDB from 'mongodb';
import * as genericPool from 'generic-pool';
import { Context, Middleware } from 'koa';

const MongoClient = MongoDB.MongoClient;
const defaultOptions = {
    host: 'localhost',
    port: 27017,
    db: 'test',
    authSource: 'admin',
    max: 100,
    min: 1,
    acquireTimeoutMillis: 100,
};

interface IConnOptions {
    url: string;
    db: string;
}

const acquire = async (mongoPool: genericPool.Pool<MongoDB.MongoClient>): Promise<MongoDB.MongoClient> => {
    const resource = await mongoPool.acquire();
    return resource;
};

const release = async (mongoPool: genericPool.Pool<MongoDB.MongoClient>, resource: MongoDB.MongoClient) => {
    if (resource && !resource.isConnected()) {
        await mongoPool.destroy(resource);
    } else {
        await mongoPool.release(resource);
    }
};

const mongoPool = async (connOptions: IConnOptions): Promise<genericPool.Pool<MongoDB.MongoClient>> => {
    connOptions = Object.assign({}, defaultOptions, connOptions);
    const mongoUrl = connOptions.url;

    const options = Object.assign({
        useNewUrlParser: true,
        reconnectTries: 1,
        useUnifiedTopology: true,
    });

    try {
        const client = await MongoClient.connect(mongoUrl, options) as any;

        const conMongoPool = await genericPool.createPool({
            create: () => client,
            destroy: (client: MongoDB.MongoClient) => client.close(),
        }, { max: 100, min: 1 });

        return conMongoPool;
    } catch (err) {
        throw err;
    }
};

export const koaMongo = (connOptions: IConnOptions): Middleware => async (ctx: Context, next: () => Promise<any>) => {
    const dbName = connOptions.db;
    const mongoPoolCon = await mongoPool(connOptions);

    ctx.mongo = await acquire(mongoPoolCon);
    ctx.db = ctx.mongo.db(dbName);

    try {
        await next();
    } finally {
        await release(mongoPoolCon, ctx.mongo);
    }
};
