import { Provider } from './interfaces/App.interface';
export declare class MainProvider implements Provider {
    private Directory;
    private Extension;
    provide(directory: string, extension: string): {};
    private doPathOperations;
    /**
 * @description get a file path and remove the extension .ts extension
 * @param filePath
 */
    private removeExtensionsInFilePath;
    /**
 * @description remove the ./ and the main directory path from modules paths
 * @param filePath
 */
    private removeDirectoryPathFromModulePath;
    /**
 * @description make a new object from the module and return it
 * to be put in the modules mapper object
 * @param filePath
 */
    private makeMapperPropertyValue;
}
