import { Provider } from './interfaces/App.interface';
export declare class MainProvider implements Provider {
    private Directory;
    private Extension;
    provide(directory: string, extension: string): {};
    private doPathOperations;
    private removeExtensionsInFilePath;
    private removeDirectoryPathFromModulePath;
    private makeMapperPropertyValue;
}
