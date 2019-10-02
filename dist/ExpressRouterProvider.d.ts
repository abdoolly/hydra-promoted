import { Router } from 'express';
import { ControllersMapper } from './ControllersMapper';
import { MiddlewareMapper, Middleware } from './MiddlewareMapper';
/**
 * @description this class acts as a repository for the main methods which are used in the express router
 */
export declare class ExpressRouter {
    private controllersProvider;
    private middlewareProvider;
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
    /**
     * @description this function overrides the res.send and res.render to be able to put layer after the controller
     * makes its response
     * @param res
     */
    private overrideRes;
}
