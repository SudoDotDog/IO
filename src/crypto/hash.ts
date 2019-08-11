/**
 * @author WMXPY
 * @namespace Crypto
 * @description Hash
 */

import * as Crypto from 'crypto';

export const hashString = (str: string): string => {

    const md5: Crypto.Hash = Crypto.createHash('md5');
    return md5.update(str).digest('hex');
};

export const hashBuffer = (buffer: Buffer): string => {

    const fsHash: Crypto.Hash = Crypto.createHash('md5');
    return fsHash.update(buffer).digest('hex');
};
