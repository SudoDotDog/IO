/**
 * @author WMXPY
 * @namespace File
 * @description Buffer
 */

import * as Fs from "fs";
import * as Path from "path";

export const readBufferFile = (path: string): Promise<Buffer> => {

    const resolved: string = Path.resolve(path);
    return new Promise<Buffer>((resolve: (result: Buffer) => void, reject: (reason: any) => void) => {

        Fs.readFile(resolved, (err: any, data: Buffer) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
            return;
        });
    });
};

export const writeBufferFile = (path: string, data: Buffer): Promise<void> => {

    const resolved: string = Path.resolve(path);
    return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

        Fs.writeFile(resolved, data, (err: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
            return;
        });
    });
};
