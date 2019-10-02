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
    /**
     * @description receives the directory which should look like that ex: ./src/middlewares/
     * @param directory path from the root directory of the project
     */
    provide(directory: string): {
        [key: string]: Middleware;
    };
    getMapper(): {
        [key: string]: Middleware;
    };
}
