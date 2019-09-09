import { Router } from 'express';
import { ControllersMapper } from './ControllersMapper';
import { MiddlewareMapper, Middleware } from './MiddlewareMapper';
export declare class ExpressRouter {
    expressRouter: Router;
    controllersMapper: any;
    middlewareMapper: {
        [key: string]: Middleware;
    };
    constructor(controllersProvider: ControllersMapper, middlewareProvider: MiddlewareMapper);
    get(routePath: string, handlerPath: string): any;
    get(routePath: string, middlewares: string[] | string, handlerPath: string): any;
    post(routePath: string, handlerPath: string): any;
    post(routePath: string, middlewares: string[] | string, handlerPath: string): any;
    put(routePath: string, handlerPath: string): any;
    put(routePath: string, middlewares: string[] | string, handlerPath: string): any;
    delete(routePath: string, handlerPath: string): any;
    delete(routePath: string, middlewares: string[] | string, handlerPath: string): any;
    private registerMethodFunction;
    use(...handlers: any): any;
    getRouter(): any;
    private isValidMiddleware;
    private shapeTheControllerFunc;
    private getTheControllerFunc;
    private overrideRes;
}
