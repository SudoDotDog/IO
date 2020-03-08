/**
 * @author WMXPY
 * @namespace Path
 * @description Path
 */

import * as Path from "path";

export const joinPath = (...urls: string[]): string => {

    return Path.resolve(Path.join(...urls));
};
