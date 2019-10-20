import { interfaces } from 'inversify';
import { MainProvider } from './MainProvider';
import { Mapper, ProviderInstanceObject } from './interfaces/App.interface';
export declare class ControllersMapper implements Mapper {
    private mainProvider;
    private mapper;
    constructor(mainProvider: MainProvider);
    /**
     * @description receives the directory which should look like that ex: ./src/controllers/
     * @param directory path from the root directory of the project
     */
    provide(controllers: (ProviderInstanceObject | interfaces.Newable<any>)[]): {
        [key: string]: any;
    };
    getMapper(): {
        [key: string]: any;
    };
}
