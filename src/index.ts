import { DIManager } from 'inversify-manager';
import { FWSPServerResponse, Hydra as IHydra, HydraExpress as IHydraExpress } from './interfaces/Hydra.interface';
import { ControllersMapper } from './ControllersMapper';
import { MiddlewareMapper } from './MiddlewareMapper';
import { ExpressRouter } from './ExpressRouterProvider';
import { MainProvider } from './MainProvider';
type logFunc = (str: string) => any;

// registering the main services which is going to be needed in the next steps
DIManager.registerServices([
    { service: MainProvider, scopeType: 'singleton' },
    { service: ControllersMapper, scopeType: 'singleton' },
    { service: MiddlewareMapper, scopeType: 'singleton' },
    { service: ExpressRouter, scopeType: 'transient' },
]);

/**
 * making this to ease out importing the hydra express and turning it like a typescript import
 */
export const HydraExpress: IHydraExpress = require('hydra-express');
export const ExpressInstance = HydraExpress.getExpress();
export const Hydra: IHydra = HydraExpress.getHydra();

/**
 * @description logger class to ease out the logging capability inside hydra express
 */
export class Logger {
    /**
     * @description using the lambda to curry the log function
     */
    public static info: logFunc = (str: string) => HydraExpress.log('info', str);
    public static debug: logFunc = (str: string) => HydraExpress.log('debug', str);
    public static fatal: logFunc = (str: string) => HydraExpress.log('fatal', str);
    public static error: logFunc = (str: string) => HydraExpress.log('error', str);
}

const sr = require('fwsp-server-response');
export const ServerResponse: FWSPServerResponse = new sr();

const Controllers = DIManager.getService(ControllersMapper);
const Middlewares = DIManager.getService(MiddlewareMapper);
const Router = DIManager.getService(ExpressRouter);

export { DIManager, Controllers, Middlewares, Router };

/**
 * exporting the interfaces that could be needed in the app
 */
import { AppRequest, AppResponse } from './interfaces/ExpressApp.interface';
import { UMFMessage } from './interfaces/Hydra.interface';
export { AppRequest, AppResponse, UMFMessage, IHydra, IHydraExpress };