import { injectable, interfaces } from "inversify";
import { MainProvider } from './MainProvider';
import { Mapper, ProviderInstanceObject } from "./interfaces/App.interface";
import { Response as AppResponse, Request as AppRequest } from "express";

export interface Middleware {
    handle: (req: AppRequest, res: AppResponse, next: Function) => any;
}

@injectable()
export class MiddlewareMapper implements Mapper {
    private mapper: { [key: string]: Middleware };

    constructor(private mainProvider: MainProvider) { }

    /**
     * @description receives the directory which should look like that ex: ./src/middlewares/
     * @param directory path from the root directory of the project
     */
    provide(middlewares: (ProviderInstanceObject | interfaces.Newable<any>)[]) {
        this.mapper = this.mainProvider.provide(middlewares);
        return this.mapper;
    }

    getMapper() {
        return this.mapper;
    }
}