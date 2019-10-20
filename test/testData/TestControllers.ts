import 'reflect-metadata';
import { injectable } from "inversify";

@injectable()
export class TestController {
    testProperty = 1;

    testMe() {
        console.log('I am TestController');
    }

    readProperty() {
        return this.testProperty;
    }
}

@injectable()
export class Test2Controller {
    test2Property = 2;
    testMe() {
        console.log('I am Test2Controll2222');
    }
}