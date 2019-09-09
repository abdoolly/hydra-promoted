import { injectable } from 'inversify';
import { MainProvider } from './MainProvider';
import { Mapper } from './interfaces/App.interface';

@injectable()
export class ControllersMapper implements Mapper {
    private mapper: { [key: string]: any };

    constructor(private mainProvider: MainProvider) { }

    /**
     * @description receives the directory which should look like that ex: ./src/controllers/
     * @param directory path from the root directory of the project
     */
    provide(directory: string) {
        this.mapper = this.mainProvider.provide(directory, '.ts');
        return this.mapper;
    }

    getMapper() {
        return this.mapper;
    }
}