export interface Mapper {
    getMapper: () => any;
}

export interface Provider {
    provide(...args): any;
}