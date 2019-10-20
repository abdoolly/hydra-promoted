import { interfaces } from "inversify";
import { Provider, ProviderInstanceObject } from './interfaces/App.interface';
export declare class MainProvider implements Provider {
    provide(instances: (ProviderInstanceObject | interfaces.Newable<any>)[]): {};
}
