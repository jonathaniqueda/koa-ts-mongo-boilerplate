import { BaseContext, Middleware, BaseRequest } from 'koa';
import { IDecodedJwt } from './middlewares';
import * as MongoDB from 'mongodb';
import { Files } from 'formidable';

declare module 'koa' {
    interface BaseContext {
        success(data?: any): void;
        fail(code: string, message: string, data: any, statusCode?: number): void;
        error(code: string, message: string, data?: any, statusCode?: number): void;
    }

    interface Context {
        jwt: IDecodedJwt;
        mongo: MongoDB.MongoClient;
        db: MongoDB.Db;
    }
    
    interface Request extends Koa.BaseRequest {
        body?: any;
        files?: Files;
    }
}

declare namespace jwtDecode {
    function jwtDecode(): Middleware;
    export type DecodedJwt = IDecodedJwt;
}

declare function jsend(): Middleware;
declare namespace jsend { }
