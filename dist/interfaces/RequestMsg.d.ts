export interface RequestMsg {
    /**
     * @description to which service you want to make the request to
     * the to string should be like that <serviceNameToCall>:[method]<route path>
     * @example hydra-service:[get]/hydra-1/auth
     */
    to: string;
    /**
     * @description by default we use the current service name as the from value
     * but you can specify it if you want
     */
    from?: string;
    /**
     * @description this is the request body
     */
    body?: any;
    /**
     * @description this is the request headers
     */
    headers?: any;
    [key: string]: any;
}
export interface SecureRequestMsg extends RequestMsg {
    /**
     * @description this is the public key that will be used to encrypt the data it should be
     * the public key of the service that we are sending the request to.
     */
    publicKey: string;
    /**
     * @description this will be the private key that will be used in the decryption the incoming response
     * usually it will be the private key of the current service
     */
    privateKey: RsaKeyObject | string;
}
export interface ApiResult {
    statusCode: number;
    statusMessage: string;
    statusDescription: string;
    result: any;
    headers: any;
    error?: any;
}
export declare type RsaKeyObject = {
    path: string;
    passphrase?: string;
};
