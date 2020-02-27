/**
 * @author WMXPY
 * @namespace File
 * @description Sync
 */

import * as Fs from "fs";
import { UTF8 } from "./common";

export const copyFileSync = (origin: string, target: string): void => {

    try {
        Fs.copyFileSync(origin, target);
        return;
    } catch (err) {
        throw err;
    }
};

export const removeDirectorySync = (folder: string): void => {

    try {
        Fs.rmdirSync(folder);
        return;
    } catch (err) {
        throw err;
    }
};

export const removeFileSync = (path: string): void => {

    try {
        Fs.unlinkSync(path);
        return;
    } catch (err) {
        throw err;
    }
};

export const readTextFileSync = (path: string): string => {

    try {
        const result: string = Fs.readFileSync(path, UTF8);
        return result;
    } catch (err) {
        throw err;
    }
};

export const writeTextFileSync = (path: string, content: string): void => {

    try {
        Fs.writeFileSync(path, content, UTF8);
        return;
    } catch (err) {
        throw err;
    }
};

export const pathStatusSync = (path: string): Fs.Stats => {

    try {
        const status: Fs.Stats = Fs.statSync(path);
        return status;
    } catch (err) {
        throw err;
    }
};

export const directoryFilesSync = (path: string): string[] => {

    try {
        const fileList: string[] = Fs.readdirSync(path);
        return fileList;
    } catch (err) {
        throw err;
    }
};

export const pathExistsSync = (path: string): boolean => {

    try {
        const exists: boolean = Fs.existsSync(path);
        return exists;
    } catch (err) {
        throw err;
    }
};

export const attemptMarkDirSync = (path: string): void => {

    try {
        const exists: boolean = Fs.existsSync(path);
        if (!exists) {
            Fs.mkdirSync(path);
        }
        return;
    } catch (err) {
        throw err;
    }
};

export const renameFileSync = (origin: string, target: string): void => {

    try {
        Fs.renameSync(origin, target);
        return;
    } catch (err) {
        throw err;
    }
};

export const moveFileSync = (origin: string, target: string): void => {

    try {
        Fs.renameSync(origin, target);
        return;
    } catch (err) {
        throw err;
    }
};

export const isFolderSync = (path: string): boolean => {

    try {
        const status: Fs.Stats = pathStatusSync(path);
        return status.isDirectory();
    } catch (err) {
        throw err;
    }
};

export const isFileSync = (path: string): boolean => {

    try {
        const status: Fs.Stats = pathStatusSync(path);
        return status.isFile();
    } catch (err) {
        throw err;
    }
};
