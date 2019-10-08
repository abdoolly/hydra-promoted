import { AppRequest, AppResponse } from ".";
import { ApiResult, RequestMsg, SecureRequestMsg, RsaKeyObject } from "./interfaces/RequestMsg";
/**
 * @description hydraApiRequest is a function that wraps the hydra makeApiRequest to ease it's use
 * and also acting as a repository.
 * @param object RequestMsg
 */
export declare const HydraApiRequest: (object: RequestMsg) => Promise<ApiResult>;
/**
 * @description this will just be a wrapper for the hydraApiRequest
 * but will send the body encrypted and receive then decrypt it
 * so , the user may not have any burdon of handling any encryption or decryptions logic
 * @param object SecureRequestMsg
 */
export declare const HydraSecureApiRequest: (object: SecureRequestMsg) => Promise<ApiResult>;
/**
 * @description HandleRsaRequest returns a middleware which handles incoming Rsa encrypted requests and decrypt it
 * so that receiving routers may get the request directly
 * @param privateKeyPath This should be the private key path or object that represent the private key place
 * @returns middleware function
 */
export declare const HandleRsaRequest: (privateKeyPath: string | RsaKeyObject) => (req: AppRequest, res: AppResponse, next: Function) => Promise<any>;
