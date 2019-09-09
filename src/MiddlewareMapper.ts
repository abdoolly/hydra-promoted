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

    constructor(private mainProvider: MainProvider) { }

    provide(directory: string) {
        this.mapper = this.mainProvider.provide(directory, '.ts');
        return this.mapper;
    }

    getMapper() {
        return this.mapper;
    }
}