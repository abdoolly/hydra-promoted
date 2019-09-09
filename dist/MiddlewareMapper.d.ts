import { MainProvider } from './MainProvider';
import { Mapper } from "./interfaces/App.interface";
import { AppResponse, AppRequest } from "./interfaces/ExpressApp.interface";
export interface Middleware {
    name?: string;
    handle: (req: AppRequest, res: AppResponse, next: Function) => any;
}
export declare class MiddlewareMapper implements Mapper {
    private mapper;
    constructor(mainProvider: MainProvider);
    getMapper(): {
        [key: string]: Middleware;
    };
}
