/**
 * @author WMXPY
 * @namespace File
 * @description Remove
 */

import * as Fs from "fs";
import * as Path from "path";
import { directoryFiles, removeDirectory, removeFile } from "./file";

export const RMRFFolder = async (folder: string): Promise<string[]> => {

    const result: string[] = [];

    const recursiveRemove = async (path: string): Promise<void> => {

        if (Fs.statSync(path).isDirectory()) {
            const fileOrDirectory: string[] = await directoryFiles(path);
            for (const fod of fileOrDirectory) {
                await recursiveRemove(Path.join(path, fod));
            }
            await removeDirectory(path);
        } else {

            result.push(path);
            await removeFile(path);
        }
    };

    await recursiveRemove(folder);
    return result;
};
