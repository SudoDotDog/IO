/**
 * @author WMXPY
 * @namespace File
 * @description Folder
 */

import * as Path from "path";
import { pathExists } from "./file";

export class Folder {

    public static async dig(basePath: string, ...relative: string[]): Promise<Folder> {

        const exists: boolean = await pathExists(Path.join(basePath, ...relative));

        return new Folder(basePath, relative);
    }

    private readonly _basePath: string;
    private readonly _relative: string[];

    private readonly _folders: Folder[];
    private readonly _file: string[];

    private constructor(basePath: string, relative: string[]) {

        this._basePath = basePath;
        this._relative = relative;
    }
}
