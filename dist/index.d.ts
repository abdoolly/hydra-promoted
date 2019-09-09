import { DIManager } from 'inversify-manager';
import { FWSPServerResponse, Hydra as IHydra, HydraExpress as IHydraExpress } from './interfaces/Hydra.interface';
import { ControllersMapper } from './ControllersMapper';
import { MiddlewareMapper } from './MiddlewareMapper';
import { ExpressRouter } from './ExpressRouterProvider';
declare type logFunc = (str: string) => any;
export declare const HydraExpress: IHydraExpress;
export declare const ExpressInstance: any;
export declare const Hydra: IHydra;
export declare class Logger {
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
