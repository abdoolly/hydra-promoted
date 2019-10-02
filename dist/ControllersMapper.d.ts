import { MainProvider } from './MainProvider';
import { Mapper } from './interfaces/App.interface';
export declare class ControllersMapper implements Mapper {
    private mainProvider;
    private mapper;
    constructor(mainProvider: MainProvider);
    /**
     * @description receives the directory which should look like that ex: ./src/controllers/
     * @param directory path from the root directory of the project
     */
    provide(directory: string): {
        [key: string]: any;
    };
    getMapper(): {
        [key: string]: any;
    };
}
