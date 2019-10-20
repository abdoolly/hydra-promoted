import { interfaces } from "inversify";

export interface Mapper {
    getMapper: () => any;
}

export interface Provider {
    provide(...args): any;
}

export interface Controller {
    [key: string]: any;
}

export interface ProviderInstanceObject {
    instance: interfaces.Newable<any>;
    name: string;
}