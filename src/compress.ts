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

            switch (code) {
                case 0: {
                    resolve();
                    return;
                }
                case 9: {
                    reject(new Error('the specified zipfiles were not found.'));
                    return;
                }
                default: {
                    reject(new Error(signal));
                    return;
                }
            }
        });
        unzip.on('error', (error: Error) => {
            reject(error);
        });
    });
