/**
 * @author WMXPY
 * @namespace File
 * @description File
 */

import * as Fs from "fs";

export const copyFile = (origin: string, target: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.copyFile(origin, target, (error: NodeJS.ErrnoException | null) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

export const removeDirectory = (folder: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.rmdir(folder, (error: NodeJS.ErrnoException | null) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

export const removeFile = (path: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.unlink(path, (error: NodeJS.ErrnoException | null) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

export const pathStatus = (path: string): Promise<Fs.Stats> =>
    new Promise<Fs.Stats>((resolve: (status: Fs.Stats) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.stat(path, (error: NodeJS.ErrnoException | null, status: Fs.Stats) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(status);
            return;
        });
    });

export const directoryFiles = (path: string): Promise<string[]> =>
    new Promise<string[]>((resolve: (files: string[]) => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.readdir(path, (error: NodeJS.ErrnoException | null, files: string[]) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(files);
            return;
        });
    });

export const pathExists = (path: string): Promise<boolean> =>
    new Promise<boolean>((resolve: (exist: boolean) => void) => {
        Fs.exists(path, (exists: boolean) => {

            resolve(exists);
            return;
        });
        return;
    });

export const attemptMarkDir = (path: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) => {
        Fs.exists(path, (exists: boolean) => {

            if (!exists) {
                Fs.mkdir(path, (error: NodeJS.ErrnoException | null) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                    return;
                });
            } else {
                resolve();
            }
        });
        return;
    });

export const renameFile = (origin: string, target: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (error: NodeJS.ErrnoException) => void) => {
        Fs.rename(origin, target, (error: NodeJS.ErrnoException | null) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

export const moveFile = (origin: string, target: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (error: NodeJS.ErrnoException) => void) => {
        Fs.rename(origin, target, (error: NodeJS.ErrnoException | null) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        });
    });

export const isFolder = async (path: string): Promise<boolean> => {

    const stat: Fs.Stats = await pathStatus(path);
    return stat.isDirectory();
};

export const isFile = async (path: string): Promise<boolean> => {

    const stat: Fs.Stats = await pathStatus(path);
    return stat.isFile();
};
