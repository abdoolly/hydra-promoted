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
var MainProvider_1 = require("./MainProvider");
var MiddlewareMapper = /** @class */ (function () {
    function MiddlewareMapper(mainProvider) {
        this.mainProvider = mainProvider;
    }
    /**
     * @description receives the directory which should look like that ex: ./src/middlewares/
     * @param directory path from the root directory of the project
     */
    MiddlewareMapper.prototype.provide = function (directory) {
        this.mapper = this.mainProvider.provide(directory, '.ts');
        return this.mapper;
    };
    MiddlewareMapper.prototype.getMapper = function () {
        return this.mapper;
    };
    MiddlewareMapper = __decorate([
        inversify_1.injectable(),
        __metadata("design:paramtypes", [MainProvider_1.MainProvider])
    ], MiddlewareMapper);
    return MiddlewareMapper;
}());
exports.MiddlewareMapper = MiddlewareMapper;
//# sourceMappingURL=MiddlewareMapper.js.map