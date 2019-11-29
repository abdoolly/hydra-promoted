import { DIManager } from 'inversify-manager';
import { FWSPServerResponse, Hydra as IHydra, HydraExpress as IHydraExpress } from './interfaces/Hydra.interface';
import { ControllersMapper } from './ControllersMapper';
import { MiddlewareMapper, Middleware } from './MiddlewareMapper';
import { ExpressRouter } from './ExpressRouterProvider';
import { Request, Response } from 'express';
declare type logFunc = (str: string) => any;
/**
 * making this to ease out importing the hydra express and turning it like a typescript import
 */
export declare const HydraExpress: IHydraExpress;
export declare const ExpressInstance: any;
export declare const Hydra: IHydra;
/**
 * @description logger class to ease out the logging capability inside hydra express
 */
export declare class Logger {
    /**
     * @description using the lambda to curry the log function
     */
    static info: logFunc;
    static debug: logFunc;
    static fatal: logFunc;
    static error: logFunc;
}
export declare const ServerResponse: FWSPServerResponse;
declare const Controllers: ControllersMapper;
declare const Middlewares: MiddlewareMapper;
declare const Router: ExpressRouter;
export { DIManager, Controllers, Middlewares, Router };
/**
 * exporting the interfaces that could be needed in the app
 */
import { UMFMessage } from './interfaces/Hydra.interface';
import { HydraApiRequest, HydraSecureApiRequest, HandleRsaRequest, SendSecure } from './ApiRequest';
import { RequestMsg, SecureRequestMsg, ApiResult } from './interfaces/RequestMsg';
import { Req, Res } from './interfaces/ExpressApp.interface';
declare type AppRequest = Req & Request;
declare type AppResponse = Res & Response;
export { AppRequest, AppResponse, UMFMessage, IHydra, IHydraExpress, HydraApiRequest, HydraSecureApiRequest, Middleware, RequestMsg, SecureRequestMsg, ApiResult, HandleRsaRequest, SendSecure };
