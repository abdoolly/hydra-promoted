import { RsaKeyObject } from './interfaces/RequestMsg';
/**
 * @description RsaEncryptWithPublic will accept the toEncrypt which is a string form of the data you want to
 * encrypt and return a base65 encoded encrypted data using the public key provided in the seoncd param.
 * @param toEncrypt
 * @param relativeOrAbsolutePathToPublicKey
 */
export declare const RsaEncryptWithPublic: (toEncrypt: string, publicKeyPath: string) => Promise<string>;
/**
 * @description RsaDecryptWithPrivate will accept the encrypted string which will be decrypted using the
 * private key provided in the second param.
 * @param toDecrypt
 * @param relativeOrAbsolutePathtoPrivateKey
 */
export declare const RsaDecryptWithPrivate: (toDecrypt: string, privateKeyPath: string | RsaKeyObject) => Promise<string>;
/**
 * @description RsaEncryptWithPrivate will accept the toEncrypt which is a string form of the data you want to
 * encrypt and return a base65 encoded encrypted data using the private key provided in the seoncd param.
 * @param toEncrypt
 * @param relativeOrAbsolutePathToPrivateKey
 */
export declare const RsaEncryptWithPrivate: (toEncrypt: string, privateKeyPath: string | RsaKeyObject) => Promise<string>;
/**
 * @description RsaDecryptWithPublic will accept the encrypted string which will be decrypted using the
 * public key provided in the second param.
 * @param toDecrypt
 * @param relativeOrAbsolutePathtoPublicKey
 */
export declare const RsaDecryptWithPublic: (toDecrypt: string, publicKeyPath: string) => Promise<string>;
