import { Request, Response, Router } from 'express';
import { injectable } from 'inversify';
import { ExpressInstance, AppRequest, AppResponse } from './index';
import { ControllersMapper } from './ControllersMapper';
import { MiddlewareMapper, Middleware } from './MiddlewareMapper';
import { HandlerFunc } from './interfaces/ExpressApp.interface';

/**
 * koko
 * @description this class acts as a repository for the main methods which are used in the express router
 */
@injectable()
export class ExpressRouter {
    public expressRouter: Router;
    controllersMapper: any;
    middlewareMapper: { [key: string]: Middleware };

    constructor(
        private controllersProvider: ControllersMapper,
        private middlewareProvider: MiddlewareMapper
    ) {
        this.expressRouter = ExpressInstance.Router();
    }

    get(routePath: string, handlerPath: HandlerFunc);
    get(routePath: string, handlerPath: string);
    get(routePath: string, middlewares: string[] | string, handlerPath: string);
    get(routePath: string, middlewares: string[] | string, handlerPath: HandlerFunc);
    get(routePath: string, middlewares: string[] | string | HandlerFunc, handlerPath?: string | Function) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'get');
    }

    post(routePath: string, handlerPath: HandlerFunc);
    post(routePath: string, handlerPath: string);
    post(routePath: string, middlewares: string[] | string, handlerPath: string);
    post(routePath: string, middlewares: string[] | string, handlerPath: HandlerFunc);
    post(routePath: string, middlewares: string[] | string | HandlerFunc, handlerPath?: string | Function) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'post');
    }

    put(routePath: string, handlerPath: HandlerFunc);
    put(routePath: string, handlerPath: string);
    put(routePath: string, middlewares: string[] | string, handlerPath: string);
    put(routePath: string, middlewares: string[] | string, handlerPath: HandlerFunc);
    put(routePath: string, middlewares: string[] | string | HandlerFunc, handlerPath?: string | Function): Router {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'put');
    }

    delete(routePath: string, handlerPath: HandlerFunc);
    delete(routePath: string, handlerPath: string);
    delete(routePath: string, middlewares: string[] | string, handlerPath: string);
    delete(routePath: string, middlewares: string[] | string, handlerPath: HandlerFunc);
    delete(routePath: string, middlewares: string[] | string | HandlerFunc, handlerPath?: string | Function) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'delete');
    }

    private registerMethodFunction(
        routePath: string,
        middlewares: string[] | string | HandlerFunc,
        handlerPath: string | Function,
        method: string) {
        this.controllersMapper = this.controllersProvider.getMapper();
        this.middlewareMapper = this.middlewareProvider.getMapper();

        // case no middleware and sending the second paramter as a function
        if (typeof middlewares === 'function')
            return this.expressRouter[method](routePath, middlewares);

        // case single middleware and the handler is a function
        if (typeof middlewares === 'string' && typeof handlerPath === 'function')
            return this.expressRouter[method](routePath, this.middlewareMapper[middlewares].handle.bind(this.middlewareMapper[middlewares]), handlerPath);

        // if there were no middlewares so that the middleware was the handler and it is a string
        if (typeof middlewares === 'string' && handlerPath === undefined)
            return this.expressRouter[method](routePath, this.shapeTheControllerFunc(middlewares));

        // if there is a single middleware and handler path is a string
        if (typeof middlewares === 'string' && typeof handlerPath === 'string' && this.isValidMiddleware(middlewares))
            return this.expressRouter[method](routePath, this.middlewareMapper[middlewares].handle.bind(this.middlewareMapper[middlewares]), this.shapeTheControllerFunc(handlerPath));

        // if there are multi middlewares 
        if (Array.isArray(middlewares)) {

            let funcMiddlewares = middlewares.map((name: string) => {
                if (this.isValidMiddleware(name))
                    return this.middlewareMapper[name].handle.bind(this.middlewareMapper[name]);
            });

            // case the handler was a string 
            if (typeof handlerPath === 'string')
                return this.expressRouter[method](routePath, funcMiddlewares, this.shapeTheControllerFunc(handlerPath));

            // case the handler was a function 
            if (typeof handlerPath === 'function')
                return this.expressRouter[method](routePath, funcMiddlewares, handlerPath);
        }

        throw Error('error in registering: method signature is not recognized it');
    }

    use(...handlers: any): any {
        return this.expressRouter.use(...handlers);
    };

    getRouter() {
        return this.expressRouter;
    }

    private isValidMiddleware(middlewareName: string) {
        if (this.middlewareMapper[middlewareName])
            return true;

        throw Error(`Middleware name ${middlewareName} is not valid or does not exist please make sure it's registered in the middleware provider array`);
    }

    private shapeTheControllerFunc(callbackString: string) {
        // validate its a valid callback string
        let splittedCB = callbackString.split('@');

        // validating the string
        if (splittedCB.length !== 2) {
            throw Error(
                `Invalid callback string ${callbackString} it should be "controller@functionName"`
            );
        }

        let [controllerPath, functionName] = splittedCB;

        // if the controller does not exist
        if (!this.controllersMapper[controllerPath])
            throw Error(`Controller: ${controllerPath} does not exist please make sure the controller is registered in the controller provider array`);

        if (!this.controllersMapper[controllerPath][functionName])
            throw Error(`Function: ${functionName} does not exist in Controller: ${controllerPath}`);

        return this.getTheControllerFunc(this.controllersMapper[controllerPath][functionName], this.controllersMapper[controllerPath]);
    }

    private getTheControllerFunc(controllerClosure: (req?: Request, res?: Response) => any, controllerContext: any) {
        let controllerFunction = async (...args: any[]) => {

            let [req, res] = args;

            // overriding the res object
            this.overrideRes(res);

            // apply try and catch directly above the controller function
            try {
                // TODO: apply validators here

                // this function could be async or not
                let result = controllerClosure.bind(controllerContext)(...args);

                // detect if this is a promise
                if (result && result.then)
                    return await result;

                return result;
            } catch (err) {
                console.log('err', err);
                // TODO: global error handler here
            }

        };

        return controllerFunction;
    }

    /**
     * @description this function overrides the res.send and res.render to be able to put layer after the controller
     * makes its response
     * @param res
     */
    private overrideRes(res: Response) {
        let oldSend = res.send;
        let oldRender: any = res.render;

        // overriding the send function
        res.send = function (...params: [any]) {
            // TODO: call the auditing utility here
            return oldSend.apply(res, params);
        };

        // overriding the render function
        res.render = function (...params: any[]) {
            // TODO: call the auditing utility here
            return oldRender.apply(res, params);
        };

        return res;
    }
}