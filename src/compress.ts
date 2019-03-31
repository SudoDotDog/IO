/**
 * @author WMXPY
 * @namespace IO
 * @description Compress
 */

import { ChildProcess, spawn } from "child_process";

export const decompressZipFile = (filePath: string, targetPath: string) =>
    new Promise<void>((resolve: () => void, reject: (reason: Error) => void) => {

        const unzip: ChildProcess = spawn('unzip', ['-o', filePath, '-d', targetPath]);
        unzip.on('exit', (code: number, signal: string) => {
            if (code === 0) {
                resolve();
                return;
            } else {
                reject(new Error(signal));
                return;
            }
        });
        unzip.on('error', (error: Error) => {
            reject(error);
        });
    });
