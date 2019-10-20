"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = require("inversify");
var inversify_manager_1 = require("inversify-manager");
var MainProvider = /** @class */ (function () {
    function MainProvider() {
    }
    MainProvider.prototype.provide = function (instances) {
        var mapper = {};
        for (var _i = 0, instances_1 = instances; _i < instances_1.length; _i++) {
            var provInstance = instances_1[_i];
            if (typeof provInstance === 'function') {
                var keyName = provInstance.name;
                mapper[keyName] = inversify_manager_1.DIManager.resolveService(provInstance);
            }
            if (typeof provInstance === 'object') {
                var keyName = provInstance.name;
                mapper[keyName] = inversify_manager_1.DIManager.resolveService(provInstance.instance);
            }
        }
        return mapper;
    };
    MainProvider = __decorate([
        inversify_1.injectable()
    ], MainProvider);
    return MainProvider;
}());
exports.MainProvider = MainProvider;
//# sourceMappingURL=MainProvider.js.map