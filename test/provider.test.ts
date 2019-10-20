import { DIManager } from "inversify-manager"
import { MainProvider } from '../src/MainProvider';
import { TestController, Test2Controller } from "./testData/TestControllers";
import { TestMiddlewareOne } from "./testData/TestMiddlewares";


test('Should initialize main provider', () => {
    let provider = DIManager.resolveService(MainProvider);
    expect(provider).toBeInstanceOf(MainProvider);
});

test('Should make instance mapper without naming successfully', () => {
    let provider = DIManager.resolveService(MainProvider);

    let obj1 = DIManager.resolveService(TestController);
    let obj2 = DIManager.resolveService(Test2Controller);
    let obj3 = DIManager.resolveService(TestMiddlewareOne);

    let mapper = provider.provide([
        TestController,
        Test2Controller,
        TestMiddlewareOne
    ]);

    // tests are working because inversify are making them as singleton objects 
    expect(mapper['TestController']).toEqual(obj1);
    expect(mapper['Test2Controller']).toEqual(obj2);
    expect(mapper['TestMiddlewareOne']).toEqual(obj3);
})

test('Should make instance mapper using naming successfully', () => {
    let provider = DIManager.resolveService(MainProvider);

    let obj1 = DIManager.resolveService(TestController);
    let obj2 = DIManager.resolveService(Test2Controller);
    let obj3 = DIManager.resolveService(TestMiddlewareOne);

    let mapper = provider.provide([
        { instance: TestController, name: 'controller1' },
        { instance: Test2Controller, name: 'controller2' },
        { instance: TestMiddlewareOne, name: 'middleware1' }
    ]);

    expect(mapper['controller1']).toEqual(obj1);
    expect(mapper['controller2']).toEqual(obj2);
    expect(mapper['middleware1']).toEqual(obj3);
})

test('Methods inside providers should work properly', () => {
    let provider = DIManager.resolveService(MainProvider);

    let mapper = provider.provide([
        TestController,
    ]);

    mapper['TestController'].testMe();
})

test('Properties inside providers are read successfully', () => {
    let provider = DIManager.resolveService(MainProvider);

    let mapper = provider.provide([
        TestController,
    ]);

    let propertyValue = mapper['TestController'].readProperty();
    expect(propertyValue).toEqual(1);
})
