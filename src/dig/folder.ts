/**
 * @author WMXPY
 * @namespace Dig
 * @description Folder
 */

import * as Path from "path";

export class Folder {

    public static create(basePath: string, ...relative: string[]): Folder {

        return new Folder(basePath, relative, [], []);
    }

    private readonly _basePath: string;
    private readonly _relative: string[];

    private readonly _folders: Folder[];
    private readonly _files: string[];

    public constructor(basePath: string, relative: string[], folders: Folder[], files: string[]) {

        this._basePath = basePath;
        this._relative = relative;

        this._folders = folders;
        this._files = files;
    }

    public get folders(): Folder[] {

        return this._folders;
    }

    public get files(): string[] {

        return this._files;
    }

    public addFolder(folder: Folder): this {

        this._folders.push(folder);
        return this;
    }

    public addFile(file: string): this {

        this._files.push(file);
        return this;
    }

    public join(...paths: string[]): string {

        return Path.join(this._basePath, ...this._relative, ...paths);
    }

    public getAllFilePaths(): string[] {

        const currentLayer: string[] = this._files.map((file: string) => Path.join(this._basePath, ...this._relative, file));
        const otherLayers: string[][] = this._folders.map((folder: Folder) => folder.getAllFilePaths());

        return currentLayer.concat(...otherLayers);
    }

    public async do(
        folderFunction: (folder: Folder) => boolean | Promise<boolean>,
        fileFunction: (file: string) => void | Promise<void>,
    ): Promise<void> {

        for (const file of this._files) {

            await fileFunction(this.join(file));
        }

        for (const folder of this._folders) {

            const shouldRecursive: boolean = await folderFunction(folder);

            if (shouldRecursive) {
                await folder.do(folderFunction, fileFunction);
            }
        }

        return;
    }
}
