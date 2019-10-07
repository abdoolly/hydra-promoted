import { RsaKeyObject } from './interfaces/RequestMsg';
/**
 * @description RsaEncrypt will accept the toEncrypt which is a string form of the data you want to
 * encrypt and return a base65 encoded encrypted data using the public key provided in the seoncd param.
 * @param toEncrypt
 * @param relativeOrAbsolutePathToPublicKey
 */
export declare const RsaEncrypt: (toEncrypt: string, publicKeyPath: string) => Promise<string>;
/**
 * @description RsaDecrypt will accept the encrypted string which will be decrypted using the
 * private key provided in the second param.
 * @param toDecrypt
 * @param relativeOrAbsolutePathtoPrivateKey
 */
export declare const RsaDecrypt: (toDecrypt: string, privateKeyPath: string | RsaKeyObject) => Promise<string>;
