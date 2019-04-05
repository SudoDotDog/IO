/**
 * @author WMXPY
 * @namespace IO
 * @description Hash
 */

import * as Crypto from "crypto";
import * as Fs from "fs";

export const md5File = (path: Fs.PathLike): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: Error) => void) => {

        const readStream: Fs.ReadStream = Fs.createReadStream(path);
        const hash: Crypto.Hash = Crypto.createHash('md5');

        readStream.on('data', hash.update.bind(hash));
        readStream.on('end', () => {
            resolve(hash.digest('hex'));
        });
        readStream.on('error', (error: Error) => {
            reject(error);
        });
    });

export const md5String = (target: string): string => {

    const hash: Crypto.Hash = Crypto.createHash('md5');

    hash.update(target);
    return hash.digest('hex');
};
