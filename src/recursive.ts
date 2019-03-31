/**
 * @author WMXPY
 * @namespace IO
 * @description Recursive
 */

import * as Fs from "fs";
import * as Path from "path";
import { directoryFiles, pathStatus } from "./file";

export type RecursiveCondition = (path: string, relative?: string[]) => boolean | Promise<boolean>;
export type RecursiveFunction = (path: string, relative?: string[]) => void | Promise<void>;

export class Recursive {

    public static create(path: string): Recursive {

        return new Recursive(path);
    }

    private readonly _path: string;

    private readonly _fileConditions: RecursiveCondition[];
    private readonly _folderConditions: RecursiveCondition[];

    private constructor(path: string) {

        this._path = path;

        this._fileConditions = [];
        this._folderConditions = [];
    }

    public whenFile(condition: RecursiveCondition): this {

        this._fileConditions.push(condition);
        return this;
    }

    public whenFolder(condition: RecursiveCondition): this {

        this._folderConditions.push(condition);
        return this;
    }

    public async do(func: RecursiveFunction): Promise<void> {

        const composedFolderCondition: RecursiveCondition = async (path: string, relative: string[]): Promise<boolean> => {
            for (const folderCondition of this._folderConditions) {
                if (!await folderCondition(path, relative)) {
                    return false;
                }
            }
            return true;
        };

        const composedFileCondition: RecursiveCondition = async (path: string, relative: string[]): Promise<boolean> => {
            for (const fileCondition of this._fileConditions) {
                if (!await fileCondition(path, relative)) {
                    return false;
                }
            }
            return true;
        };

        await recursiveDo(this._path, func, composedFolderCondition, composedFileCondition, []);
        return;
    }
}

export const recursiveDo = async (
    path: string,
    func: RecursiveFunction,
    folderCondition: RecursiveCondition,
    fileCondition: RecursiveCondition,
    relative: string[],
) => {

    const status: Fs.Stats = await pathStatus(path);
    if (status.isDirectory()) {

        if (await folderCondition(path, relative)) {

            const subpaths: string[] = await directoryFiles(path);
            for (const subpath of subpaths) {
                const appended: string = Path.join(path, subpath);
                await recursiveDo(
                    appended,
                    func,
                    folderCondition,
                    fileCondition,
                    [...relative, subpath],
                );
            }
        }
    } else if (status.isFile()) {

        if (await fileCondition(path, relative)) {

            await func(path, relative);
        }
    }
    return;
};
