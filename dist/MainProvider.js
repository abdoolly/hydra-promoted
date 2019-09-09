"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = require("glob");
var inversify_1 = require("inversify");
var inversify_manager_1 = require("inversify-manager");
var MainProvider = (function () {
    function MainProvider() {
    }
    MainProvider.prototype.provide = function (directory, extension) {
        this.Directory = directory;
        this.Extension = extension;
        var modulePaths = glob_1.sync(this.Directory + "/**/**" + this.Extension);
        return this.doPathOperations(modulePaths);
    };
    MainProvider.prototype.doPathOperations = function (paths) {
        var fullPathWithoutExtension = [];
        var keyToInstanceMapper = {};
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            path = this.removeExtensionsInFilePath(path);
            fullPathWithoutExtension.push(path);
            var mapperProperty = this.removeDirectoryPathFromModulePath(path);
            var instance = this.makeMapperPropertyValue(path);
            if (!instance)
                throw Error("instance with name " + mapperProperty + " is corrupt check the filename and class name have the same name");
            keyToInstanceMapper[instance.name || mapperProperty] = instance;
        }
        return keyToInstanceMapper;
    };
    MainProvider.prototype.removeExtensionsInFilePath = function (filePath) {
        var removeDotSlash = new RegExp(/\.\//);
        var removeExtension = new RegExp("" + this.Extension);
        return filePath
            .replace(removeExtension, '')
            .replace(removeDotSlash, '');
    };
    MainProvider.prototype.removeDirectoryPathFromModulePath = function (filePath) {
        var removeDotSlash = new RegExp(/\.\//);
        var directory = this.Directory.replace(removeDotSlash, '');
        var removeDirectoryPath = new RegExp("" + directory);
        return filePath.replace(removeDirectoryPath, '');
    };
    MainProvider.prototype.makeMapperPropertyValue = function (filePath) {
        var splitted = filePath.split('/');
        var instanceName = splitted[splitted.length - 1];
        try {
            var module_1 = require("../../../" + filePath)["" + instanceName];
            return inversify_manager_1.DIManager.resolveService(module_1);
        }
        catch (err) {
            console.log('err', err);
        }
    };
    MainProvider = __decorate([
        inversify_1.injectable()
    ], MainProvider);
    return MainProvider;
}());
exports.MainProvider = MainProvider;
//# sourceMappingURL=MainProvider.js.map