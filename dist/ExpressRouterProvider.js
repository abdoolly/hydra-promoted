"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var index_1 = require("./index");
var ControllersMapper_1 = require("./ControllersMapper");
var MiddlewareMapper_1 = require("./MiddlewareMapper");
/**
 * @description this class acts as a repository for the main methods which are used in the express router
 */
var ExpressRouter = /** @class */ (function () {
    function ExpressRouter(controllersProvider, middlewareProvider) {
        this.controllersProvider = controllersProvider;
        this.middlewareProvider = middlewareProvider;
        this.expressRouter = index_1.ExpressInstance.Router();
    }
    ExpressRouter.prototype.get = function (routePath, middlewares, handlerPath) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'get');
    };
    ExpressRouter.prototype.post = function (routePath, middlewares, handlerPath) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'post');
    };
    ExpressRouter.prototype.put = function (routePath, middlewares, handlerPath) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'put');
    };
    ExpressRouter.prototype.delete = function (routePath, middlewares, handlerPath) {
        return this.registerMethodFunction(routePath, middlewares, handlerPath, 'delete');
    };
    ExpressRouter.prototype.registerMethodFunction = function (routePath, middlewares, handlerPath, method) {
        var _this = this;
        this.controllersMapper = this.controllersProvider.getMapper();
        this.middlewareMapper = this.middlewareProvider.getMapper();
        // case no middleware and sending the second paramter as a function
        if (typeof middlewares === 'function')
            return this.expressRouter[method](routePath, middlewares);
        // case single middleware and the handler is a function
        if (typeof middlewares === 'string' && typeof handlerPath === 'function')
            return this.expressRouter[method](routePath, this.middlewareMapper[middlewares].handle, handlerPath);
        // if there were no middlewares so that the middleware was the handler and it is a string
        if (typeof middlewares === 'string' && handlerPath === undefined)
            return this.expressRouter[method](routePath, this.shapeTheControllerFunc(middlewares));
        // if there is a single middleware and handler path is a string
        if (typeof middlewares === 'string' && typeof handlerPath === 'string' && this.isValidMiddleware(middlewares))
            return this.expressRouter[method](routePath, this.middlewareMapper[middlewares].handle, this.shapeTheControllerFunc(handlerPath));
        // if there are multi middlewares 
        if (Array.isArray(middlewares)) {
            var funcMiddlewares = middlewares.map(function (name) {
                if (_this.isValidMiddleware(name))
                    return _this.middlewareMapper[name].handle;
            });
            // case the handler was a string 
            if (typeof handlerPath === 'string')
                return this.expressRouter[method](routePath, funcMiddlewares, this.shapeTheControllerFunc(handlerPath));
            // case the handler was a function 
            if (typeof handlerPath === 'function')
                return this.expressRouter[method](routePath, funcMiddlewares, handlerPath);
        }
        throw Error('error in registering: method signature is not recognized it');
    };
    ExpressRouter.prototype.use = function () {
        var _a;
        var handlers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            handlers[_i] = arguments[_i];
        }
        return (_a = this.expressRouter).use.apply(_a, handlers);
    };
    ;
    ExpressRouter.prototype.getRouter = function () {
        return this.expressRouter;
    };
    ExpressRouter.prototype.isValidMiddleware = function (middlewareName) {
        if (this.middlewareMapper[middlewareName])
            return true;
        throw Error("Middleware name " + middlewareName + " is not valid or does not exist please make sure it's registered in the middleware provider array");
    };
    ExpressRouter.prototype.shapeTheControllerFunc = function (callbackString) {
        // validate its a valid callback string
        var splittedCB = callbackString.split('@');
        // validating the string
        if (splittedCB.length !== 2) {
            throw Error("Invalid callback string " + callbackString + " it should be \"controller@functionName\"");
        }
        var controllerPath = splittedCB[0], functionName = splittedCB[1];
        // if the controller does not exist
        if (!this.controllersMapper[controllerPath])
            throw Error("Controller: " + controllerPath + " does not exist please make sure the controller is registered in the controller provider array");
        if (!this.controllersMapper[controllerPath][functionName])
            throw Error("Function: " + functionName + " does not exist in Controller: " + controllerPath);
        return this.getTheControllerFunc(this.controllersMapper[controllerPath][functionName], this.controllersMapper[controllerPath]);
    };
    ExpressRouter.prototype.getTheControllerFunc = function (controllerClosure, controllerContext) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var req = args[0], res = args[1];
            // overriding the res object
            _this.overrideRes(res);
            // apply try and catch directly above the controller function
            try {
                // TODO: apply validators here
                // this function could be async or not
                return controllerClosure.bind(controllerContext).apply(void 0, args);
            }
            catch (err) {
                console.log('err', err);
                // TODO: global error handler here
            }
        };
    };
    /**
     * @description this function overrides the res.send and res.render to be able to put layer after the controller
     * makes its response
     * @param res
     */
    ExpressRouter.prototype.overrideRes = function (res) {
        var oldSend = res.send;
        var oldRender = res.render;
        // overriding the send function
        res.send = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            // TODO: call the auditing utility here
            return oldSend.apply(res, params);
        };
        // overriding the render function
        res.render = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            // TODO: call the auditing utility here
            return oldRender.apply(res, params);
        };
        return res;
    };
    ExpressRouter = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [ControllersMapper_1.ControllersMapper,
            MiddlewareMapper_1.MiddlewareMapper])
    ], ExpressRouter);
    return ExpressRouter;
}());
exports.ExpressRouter = ExpressRouter;
//# sourceMappingURL=ExpressRouterProvider.js.map