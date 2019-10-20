import { DIManager } from "inversify-manager"
import { ControllersMapper } from '../src/ControllersMapper';
import { MiddlewareMapper } from '../src/MiddlewareMapper';
import { TestController } from "./testData/TestControllers";
import { TestMiddlewareOne } from "./testData/TestMiddlewares";
import { MainProvider } from "../src/MainProvider";

// here we are just registering the main provider for the mappers to be able to injected down there
beforeAll(() => {
    DIManager.registerServices([
        MainProvider
    ]);
})

describe('Controller Mappers', () => {
    let controllerMapper: ControllersMapper;

    it('should be initialized successfully', () => {
        controllerMapper = DIManager.resolveService(ControllersMapper);
        expect(controllerMapper).toBeInstanceOf(ControllersMapper);
    });

    it('provide should work successfully without any errors', () => {
        let mapper = controllerMapper.provide([
            TestController
        ]);
    });

    it('mapper should be ready after calling the provide', () => {
        let mapper = controllerMapper.getMapper();
        mapper['TestController'].testMe();
    });
});

describe('Middleware Mappers', () => {
    let middlewareMapper: MiddlewareMapper;

    it('should be initialized successfully', () => {
        middlewareMapper = DIManager.resolveService(MiddlewareMapper);
        expect(middlewareMapper).toBeInstanceOf(MiddlewareMapper);
    });

    it('provide should work successfully without any errors', () => {
        let mapper = middlewareMapper.provide([
            TestMiddlewareOne
        ]);
    });

    it('mapper should be ready after calling the provide', () => {
        let mapper = middlewareMapper.getMapper();
        let middlewareName = mapper['TestMiddlewareOne'].name
        expect(middlewareName).toEqual('TestMiddleOne');
    });
});
