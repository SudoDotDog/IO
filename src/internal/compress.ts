/**
 * @author WMXPY
 * @namespace Internal
 * @description Compress
 */

import { ChildProcess, exec, spawn } from "child_process";
import * as Os from "os";
import * as Path from "path";

export const dependableDecompressZipFile = (filePath: string, targetPath: string): Promise<string> =>
    new Promise<string>((resolve: (target: string) => void, reject: (reason: Error) => void): void => {

        const parsedFilePath: string = Path.resolve(filePath);
        const parsedTargetPath: string = Path.resolve(targetPath);

        const unzip: ChildProcess = spawn('unzip', ['-o', parsedFilePath, '-d', parsedTargetPath]);
        unzip.on('exit', (code: number, signal: string) => {

            switch (code) {
                case 0: {
                    resolve(parsedTargetPath);
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

export const dependableCompressZipFileWindows = (folderPath: string, zipPath: string): Promise<string> =>
    new Promise<string>((resolve: (target: string) => void, reject: (reason: Error) => void): void => {
        const parsedFolderPath: string = Path.resolve(folderPath);
        const parsedZipPath: string = Path.resolve(zipPath);

        const compressArchive: ChildProcess = spawn('powershell', [
            '-nologo',
            '-noprofile',
            '-command',
            '$progressPreference = "silentlyContinue"',
            `Compress-Archive -Path "${parsedFolderPath}" -DestinationPath "${parsedZipPath}"`,
        ]);

        compressArchive.on('exit', (code: number, signal: string) => {
            switch (code) {
                case 0: {
                    resolve(parsedZipPath);
                    return;
                }
                default: {
                    reject(new Error(signal));
                }
            }
        });
        compressArchive.on('error', (error: Error) => {
            reject(error);
        });
    });

export const dependableCompressZipFileUnix = (folderPath: string, zipPath: string): Promise<string> =>
    new Promise<string>((resolve: (target: string) => void, reject: (reason: Error) => void): void => {

        const parsedFolderPath: string = Path.resolve(folderPath);
        const parsedZipPath: string = Path.resolve(zipPath);

        const zip: ChildProcess = exec(`cd "${parsedFolderPath}" && zip "${parsedZipPath}" *`);
        zip.on('exit', (code: number, signal: string) => {

            switch (code) {
                case 0: {
                    resolve(parsedZipPath);
                    return;
                }
                default: {
                    reject(new Error(signal));
                    return;
                }
            }
        });
        zip.on('error', (error: Error) => {
            reject(error);
        });
    });

export const dependableCompressZipFile = async (folderPath: string, zipPath: string): Promise<string> => {

    switch (Os.platform()) {
        case 'win32': return await dependableCompressZipFileWindows(folderPath, zipPath);
        default: return await dependableCompressZipFileUnix(folderPath, zipPath);
    }
};
