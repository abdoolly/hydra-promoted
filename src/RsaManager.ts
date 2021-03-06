import { privateDecrypt, publicEncrypt, RsaPrivateKey, privateEncrypt, publicDecrypt } from 'crypto';
import { readFile } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { RsaKeyObject } from './interfaces/RequestMsg';
const readFileAsync = promisify(readFile);

/**
 * @description RsaEncryptWithPublic will accept the toEncrypt which is a string form of the data you want to 
 * encrypt and return a base65 encoded encrypted data using the public key provided in the seoncd param.
 * @param toEncrypt 
 * @param relativeOrAbsolutePathToPublicKey 
 */
export const RsaEncryptWithPublic = async (toEncrypt: string, publicKeyPath: string) => {
    let absolutePath = resolve(publicKeyPath);
    let publicKey = await readFileAsync(absolutePath, "utf8");
    let buffer = Buffer.from(toEncrypt);
    let encrypted = publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
};

/**
 * @description RsaDecryptWithPrivate will accept the encrypted string which will be decrypted using the 
 * private key provided in the second param.
 * @param toDecrypt 
 * @param relativeOrAbsolutePathtoPrivateKey 
 */
export const RsaDecryptWithPrivate = async (toDecrypt: string, privateKeyPath: string | RsaKeyObject) => {
    let path = typeof privateKeyPath === 'string' ? privateKeyPath : privateKeyPath.path;

    let absolutePath = resolve(path);
    let privateKey = await readFileAsync(absolutePath, "utf8");

    let buffer = Buffer.from(toDecrypt, "base64");
    let keyObject: RsaPrivateKey = { key: privateKey };

    // if there is a passphrase then put it in the key object
    if (typeof privateKeyPath === 'object' && privateKeyPath.passphrase)
        keyObject.passphrase = privateKeyPath.passphrase;

    let decrypted = privateDecrypt(keyObject, buffer);
    return decrypted.toString("utf8");
};

/**
 * @description RsaEncryptWithPrivate will accept the toEncrypt which is a string form of the data you want to 
 * encrypt and return a base65 encoded encrypted data using the private key provided in the seoncd param.
 * @param toEncrypt 
 * @param relativeOrAbsolutePathToPrivateKey 
 */
export const RsaEncryptWithPrivate = async (toEncrypt: string, privateKeyPath: string | RsaKeyObject) => {
    let path = typeof privateKeyPath === 'string' ? privateKeyPath : privateKeyPath.path;
    let absolutePath = resolve(path);
    let privateKey = await readFileAsync(absolutePath, "utf8");

    let keyObject: RsaPrivateKey = { key: privateKey };
    // if there is a passphrase then put it in the key object
    if (typeof privateKeyPath === 'object' && privateKeyPath.passphrase)
        keyObject.passphrase = privateKeyPath.passphrase;

    let buffer = Buffer.from(toEncrypt);
    let encrypted = privateEncrypt(keyObject, buffer);
    return encrypted.toString("base64");
};

/**
 * @description RsaDecryptWithPublic will accept the encrypted string which will be decrypted using the 
 * public key provided in the second param.
 * @param toDecrypt 
 * @param relativeOrAbsolutePathtoPublicKey 
 */
export const RsaDecryptWithPublic = async (toDecrypt: string, publicKeyPath: string) => {
    let absolutePath = resolve(publicKeyPath);
    let publicKey = await readFileAsync(absolutePath, "utf8");
    let buffer = Buffer.from(toDecrypt, "base64");
    let decrypted = publicDecrypt(publicKey, buffer);
    return decrypted.toString("utf8");
};