import { sync as globSync } from 'glob';
import { injectable } from "inversify";
import { DIManager } from "inversify-manager";
import { Provider } from './interfaces/App.interface';

@injectable()
export class MainProvider implements Provider {
    private Directory: string;
    private Extension: string;

    provide(directory: string, extension: string) {
        this.Directory = directory;
        this.Extension = extension;

        // getting all modules and their directory
        let modulePaths = globSync(
            `${this.Directory}/**/**${
            this.Extension
            }`
        );

        return this.doPathOperations(modulePaths);
    }

    private doPathOperations(paths: string[]) {
        const fullPathWithoutExtension: string[] = [];
        const keyToInstanceMapper = {};

        for (let path of paths) {
            // remove path from path
            path = this.removeExtensionsInFilePath(path);

            // // push to the full array path
            fullPathWithoutExtension.push(path);

            // make the modules mapper property name
            const mapperProperty = this.removeDirectoryPathFromModulePath(
                path
            );

            let instance = this.makeMapperPropertyValue(path);

            // if the instance was undefined
            if (!instance)
                throw Error(`instance with name ${mapperProperty} is corrupt check the filename and class name have the same name`);

            // getting the module
            // if the module does not exist we need to say
            keyToInstanceMapper[
                instance.name || mapperProperty
            ] = instance;
        }

        return keyToInstanceMapper;
    }

    /**
 * @description get a file path and remove the extension .ts extension
 * @param filePath
 */
    private removeExtensionsInFilePath(filePath: string): string {
        const removeDotSlash = new RegExp(/\.\//);
        const removeExtension = new RegExp(`${this.Extension}`);
        return filePath
            .replace(removeExtension, '')
            .replace(removeDotSlash, '');
    }

    /**
 * @description remove the ./ and the main directory path from modules paths
 * @param filePath
 */
    private removeDirectoryPathFromModulePath(filePath: string) {
        // removing the dot from the directory name
        const removeDotSlash = new RegExp(/\.\//);
        const directory = this.Directory.replace(
            removeDotSlash,
            ''
        );

        const removeDirectoryPath = new RegExp(`${directory}`);
        // removing the main directory name from the modules paths
        // and removing the ./ from the path if they exist
        return filePath.replace(removeDirectoryPath, '');
    }

    /**
 * @description make a new object from the module and return it
 * to be put in the modules mapper object
 * @param filePath
 */
    private makeMapperPropertyValue(filePath: string): any {
        // split the path
        let splitted = filePath.split('/');

        // get the module name from the path
        let instanceName = splitted[splitted.length - 1];

        try {
            // require the module dynamically
            let module = require(`../../../${filePath}`)[
                `${instanceName}`
            ];
            // returning a new object of the module for the modules mapper
            // return new module();
            return DIManager.resolveService(module);
        } catch (err) {
            console.log('err', err);
        }
    }
}