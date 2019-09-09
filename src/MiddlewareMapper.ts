import { injectable } from "inversify";
import { MainProvider } from './MainProvider';
import { Mapper } from "./interfaces/App.interface";
import { AppResponse, AppRequest } from "./interfaces/ExpressApp.interface";

export interface Middleware {
    name?: string;
    handle: (req: AppRequest, res: AppResponse, next: Function) => any;
}

@injectable()
export class MiddlewareMapper implements Mapper {
    private mapper: { [key: string]: Middleware };

    constructor(mainProvider: MainProvider) {
        this.mapper = mainProvider.provide('./src/middlewares/', '.ts');
    }

    getMapper() {
        return this.mapper;
    }
}