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
var MainProvider = /** @class */ (function () {
    function MainProvider() {
    }
    MainProvider.prototype.provide = function (directory, extension) {
        this.Directory = directory;
        this.Extension = extension;
        var modulePaths = this.getFilesInDirectory('.ts');
        this.Extension = '.ts';
        if (modulePaths.length === 0) {
            modulePaths = this.getFilesInDirectory('.js');
            this.Extension = '.js';
        }
        return this.doPathOperations(modulePaths);
    };
    MainProvider.prototype.getFilesInDirectory = function (extension) {
        // getting all modules and their directory
        return glob_1.sync(this.Directory + "/**/**" + extension);
    };
    MainProvider.prototype.doPathOperations = function (paths) {
        var fullPathWithoutExtension = [];
        var keyToInstanceMapper = {};
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            // remove path from path
            path = this.removeExtensionsInFilePath(path);
            // // push to the full array path
            fullPathWithoutExtension.push(path);
            // make the modules mapper property name
            var mapperProperty = this.removeDirectoryPathFromModulePath(path);
            var instance = this.makeMapperPropertyValue(path);
            // if the instance was undefined
            if (!instance)
                throw Error("instance with name " + mapperProperty + " is corrupt check the filename and class name have the same name");
            // getting the module
            // if the module does not exist we need to say
            keyToInstanceMapper[instance.name || mapperProperty] = instance;
        }
        return keyToInstanceMapper;
    };
    /**
 * @description get a file path and remove the extension .ts extension
 * @param filePath
 */
    MainProvider.prototype.removeExtensionsInFilePath = function (filePath) {
        return filePath
            .replace(this.Extension, '');
    };
    /**
 * @description remove the ./ and the main directory path from modules paths
 * @param filePath
 */
    MainProvider.prototype.removeDirectoryPathFromModulePath = function (filePath) {
        // removing the dot from the directory name
        var removeDotSlash = new RegExp(/\.\//);
        var directory = this.Directory.replace(removeDotSlash, '');
        var removeDirectoryPath = new RegExp("" + directory);
        // removing the main directory name from the modules paths
        // and removing the ./ from the path if they exist
        var newFilePath = filePath.replace(removeDirectoryPath, '');
        // just removing the leading slash for the name of the key to be appropriate
        if (newFilePath.charAt(0) === '/')
            newFilePath = newFilePath.substr(1);
        return newFilePath;
    };
    /**
 * @description make a new object from the module and return it
 * to be put in the modules mapper object
 * @param filePath
 */
    MainProvider.prototype.makeMapperPropertyValue = function (filePath) {
        // split the path
        var splitted = filePath.split('/');
        // get the module name from the path
        var instanceName = splitted[splitted.length - 1];
        try {
            var module_1 = require(filePath)["" + instanceName];
            // returning a new object of the module for the modules mapper
            // return new module();
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