import { Hydra, AppRequest, AppResponse } from ".";
import { ApiResult, RequestMsg, SecureRequestMsg, RsaKeyObject, SecureResponse } from "./interfaces/RequestMsg";
import { RsaDecryptWithPrivate, RsaEncryptWithPublic, RsaEncryptWithPrivate, RsaDecryptWithPublic } from "./RsaManager";

/**
 * @description hydraApiRequest is a function that wraps the hydra makeApiRequest to ease it's use 
 * and also acting as a repository.
 * @param object RequestMsg 
 */
export const HydraApiRequest = async (object: RequestMsg): Promise<ApiResult> => {

    // if body was string an error happens thats why we will handle that 
    if (typeof object.body === 'string')
        object.body = { message: object.body };

    return await Hydra.makeAPIRequest({
        from: Hydra.getServiceName(),
        ...object,
    })
}

/**
 * @description this will just be a wrapper for the hydraApiRequest
 * but will send the body encrypted and receive then decrypt it
 * so , the user may not have any burdon of handling any encryption or decryptions logic
 * @param object SecureRequestMsg
 */
export const HydraSecureApiRequest = async (object: SecureRequestMsg): Promise<ApiResult> => {
    // if the body exist then encrypt it 
    if (object.body && Object.keys(object.body).length)
        object.body = await RsaEncryptWithPublic(JSON.stringify(object.body), object.publicKey);

    // saving the public key cause we are going to delete it from the request object
    let publicKey = object.publicKey;

    // deleting the private and public key objects before sending 
    delete object.publicKey;

    let response: ApiResult = await HydraApiRequest(object);

    // only decrypt if the status was 200 successful otherwise return the result as it is 
    // this logic can be changed later on
    if (response.statusCode === 200) {
        response.result = await RsaDecryptWithPublic(response.result, publicKey);

        // handling if the response result was a string the parse will throw an error
        // so we just need to catch it and do nothing then return as it is
        // otherwise if it's an object then just parse it to a normal javascript object
        try {
            response.result = JSON.parse(response.result);
        } catch (err) { }
    }

    return response;
}

/**
 * @description HandleRsaRequest returns a middleware which handles incoming Rsa encrypted requests and decrypt it 
 * so that receiving routers may get the request directly
 * @param privateKeyPath This should be the private key path or object that represent the private key place
 * @returns middleware function 
 */
export const HandleRsaRequest = (privateKeyPath: string | RsaKeyObject) => {

    return async (req: AppRequest, res: AppResponse, next: Function) => {
        // get the result body
        let body = req.body.message;

        // decrypt the body using the current private key of the service
        let decryptedBody = await RsaDecryptWithPrivate(body, privateKeyPath);

        // replacing the new decrypted body instead of the body
        req.body = JSON.parse(decryptedBody);

        return next();
    };
};

/**
 * 
 * @param object
 * @param object.body the body you want to respond with
 * @param object.res the express response
 * @param object.privateKey this should be the private key path or the private key object 
 */
export const SendSecure = async ({ body, res, privateKey }: SecureResponse) => {
    if (!(body && Object.keys(body).length))
        return body;

    // handle of the body was a string we dont need to pass it on JSON.stringify
    if (typeof body === 'object')
        body = JSON.stringify(body);

    let encryptedBody = await RsaEncryptWithPrivate(body, privateKey);

    return res.sendOk(encryptedBody);
}