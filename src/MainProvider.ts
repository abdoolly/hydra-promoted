import { sync as globSync } from 'glob';
import { injectable, interfaces } from "inversify";
import { DIManager } from "inversify-manager";
import { Provider, Controller, ProviderInstanceObject } from './interfaces/App.interface';

@injectable()
export class MainProvider implements Provider {
    provide(instances: (ProviderInstanceObject | interfaces.Newable<any>)[]) {
        let mapper = {};

        for (let provInstance of instances) {

            if (typeof provInstance === 'function') {
                let keyName = provInstance.name;
                mapper[keyName] = DIManager.resolveService(provInstance);
            }

            if (typeof provInstance === 'object') {
                let keyName = provInstance.name;
                mapper[keyName] = DIManager.resolveService(provInstance.instance);
            }
        }

        return mapper;
    }
}