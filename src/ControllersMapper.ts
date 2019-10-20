import { injectable, interfaces } from 'inversify';
import { MainProvider } from './MainProvider';
import { Mapper, ProviderInstanceObject } from './interfaces/App.interface';

@injectable()
export class ControllersMapper implements Mapper {
    private mapper: { [key: string]: any };

    constructor(private mainProvider: MainProvider) { }

    /**
     * @description receives the directory which should look like that ex: ./src/controllers/
     * @param directory path from the root directory of the project
     */
    provide(controllers: (ProviderInstanceObject | interfaces.Newable<any>)[]) {
        this.mapper = this.mainProvider.provide(controllers);
        return this.mapper;
    }

    getMapper() {
        return this.mapper;
    }
}