import { MainProvider } from './MainProvider';
import { Mapper } from "./interfaces/App.interface";
import { AppResponse, AppRequest } from "./interfaces/ExpressApp.interface";
export interface Middleware {
    name?: string;
    handle: (req: AppRequest, res: AppResponse, next: Function) => any;
}
export declare class MiddlewareMapper implements Mapper {
    private mainProvider;
    private mapper;
    constructor(mainProvider: MainProvider);
    provide(directory: string): {
        [key: string]: Middleware;
    };
    getMapper(): {
        [key: string]: Middleware;
    };
}
