import 'reflect-metadata';
import { injectable } from "inversify";
import { Middleware } from "../../src/MiddlewareMapper";

@injectable()
export class TestMiddlewareOne implements Middleware {
    name = 'TestMiddleOne';

    handle(req: any, res: any, next: Function) {
        return next();
    }
}
