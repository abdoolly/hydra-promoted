import { interfaces } from "inversify";
import { MainProvider } from './MainProvider';
import { Mapper, ProviderInstanceObject } from "./interfaces/App.interface";
import { Response as AppResponse, Request as AppRequest } from "express";
export interface Middleware {
    handle: (req: AppRequest, res: AppResponse, next: Function) => any;
}
export declare class MiddlewareMapper implements Mapper {
    private mainProvider;
    private mapper;
    constructor(mainProvider: MainProvider);
    /**
     * @description receives the directory which should look like that ex: ./src/middlewares/
     * @param directory path from the root directory of the project
     */
    provide(middlewares: (ProviderInstanceObject | interfaces.Newable<any>)[]): {
        [key: string]: Middleware;
    };
    getMapper(): {
        [key: string]: Middleware;
    };
}
