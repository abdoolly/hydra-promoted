import { Hydra } from ".";
import { ApiResult, RequestMsg, SecureRequestMsg } from "./interfaces/RequestMsg";
import { RsaDecrypt, RsaEncrypt } from "./RsaManager";
const makeApiRequest = Hydra.makeAPIRequest;

/**
 * @description hydraApiRequest is a function that wraps the hydra makeApiRequest to ease it's use 
 * and also acting as a repository.
 * @param object RequestMsg 
 */
export const HydraApiRequest = async (object: RequestMsg): Promise<ApiResult> => {
    return await makeApiRequest({
        from: Hydra.getServiceName(),
        ...object
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
    if (object.body && Object.keys(object.body))
        object.body = await RsaEncrypt(JSON.stringify(object.body), object.publicKey);

    let response: ApiResult = await HydraApiRequest(object);

    // only decrypt if the status was 200 successful otherwise return the result as it is 
    // this logic can be changed later on
    if (response.statusCode === 200)
        response.result = await RsaDecrypt(response.result, object.privateKey);

    return response;
}

