"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_manager_1 = require("inversify-manager");
exports.DIManager = inversify_manager_1.DIManager;
var ControllersMapper_1 = require("./ControllersMapper");
var MiddlewareMapper_1 = require("./MiddlewareMapper");
var ExpressRouterProvider_1 = require("./ExpressRouterProvider");
var MainProvider_1 = require("./MainProvider");
inversify_manager_1.DIManager.registerServices([
    { service: MainProvider_1.MainProvider, scopeType: 'singleton' },
    { service: ControllersMapper_1.ControllersMapper, scopeType: 'singleton' },
    { service: MiddlewareMapper_1.MiddlewareMapper, scopeType: 'singleton' },
    { service: ExpressRouterProvider_1.ExpressRouter, scopeType: 'transient' },
]);
exports.HydraExpress = require('hydra-express');
exports.ExpressInstance = exports.HydraExpress.getExpress();
exports.Hydra = exports.HydraExpress.getHydra();
var Logger = (function () {
    function Logger() {
    }
    Logger.info = function (str) { return exports.HydraExpress.log('info', str); };
    Logger.debug = function (str) { return exports.HydraExpress.log('debug', str); };
    Logger.fatal = function (str) { return exports.HydraExpress.log('fatal', str); };
    Logger.error = function (str) { return exports.HydraExpress.log('error', str); };
    return Logger;
}());
exports.Logger = Logger;
var sr = require('fwsp-server-response');
exports.ServerResponse = new sr();
var Controllers = inversify_manager_1.DIManager.getService(ControllersMapper_1.ControllersMapper);
exports.Controllers = Controllers;
var Middlewares = inversify_manager_1.DIManager.getService(MiddlewareMapper_1.MiddlewareMapper);
exports.Middlewares = Middlewares;
var Router = inversify_manager_1.DIManager.getService(ExpressRouterProvider_1.ExpressRouter);
exports.Router = Router;
//# sourceMappingURL=index.js.map