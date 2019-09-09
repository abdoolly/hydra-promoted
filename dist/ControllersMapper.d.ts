import { MainProvider } from './MainProvider';
import { Mapper } from './interfaces/App.interface';
export declare class ControllersMapper implements Mapper {
    private mainProvider;
    private mapper;
    constructor(mainProvider: MainProvider);
    provide(directory: string): {
        [key: string]: any;
    };
    getMapper(): {
        [key: string]: any;
    };
}
