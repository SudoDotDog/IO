/**
 * @author WMXPY
 * @namespace Dig
 * @description Dig
 */

import * as Path from "path";
import { directoryFiles, isFolder, pathExists } from "../file/file";
import { ERROR_CODE, panic } from "../panic/panic";
import { Folder } from "./folder";

export const digFolder = async (basePath: string, ...relative: string[]): Promise<Folder> => {

    const path: string = Path.join(basePath, ...relative);
    const exists: boolean = await pathExists(path);

    if (!exists) {
        throw panic.code(ERROR_CODE.PATH_NOT_EXIST, path);
    }

    const folder: boolean = await isFolder(path);

    if (!folder) {
        throw panic.code(ERROR_CODE.PATH_NOT_DIRECTORY, path);
    }

    const current: Folder = Folder.create(basePath, ...relative);
    const subPaths: string[] = await directoryFiles(path);

    for (const subPath of subPaths) {

        const joinedSubPath: string = Path.join(path, subPath);

        if (await isFolder(joinedSubPath)) {
            current.addFolder(await digFolder(basePath, ...[...relative, subPath]));
        } else {
            current.addFile(subPath);
        }
    }

    return current;
};
