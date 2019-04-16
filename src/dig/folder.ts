/**
 * @author WMXPY
 * @namespace Dig
 * @description Folder
 */

export class Folder {

    public static create(basePath: string, ...relative: string[]): Folder {

        return new Folder(basePath, relative, [], []);
    }

    private readonly _basePath: string;
    private readonly _relative: string[];

    private readonly _folders: Folder[];
    private readonly _file: string[];

    public constructor(basePath: string, relative: string[], folders: Folder[], files: string[]) {

        this._basePath = basePath;
        this._relative = relative;

        this._folders = folders;
        this._file = files;
    }

    public addFolder(folder: Folder) {

        this._folders.push(folder);
    }

    public addFile(file: string) {

        this._file.push(file);
    }
}
