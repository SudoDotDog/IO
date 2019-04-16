/**
 * @author WMXPY
 * @namespace Example
 * @description Dig
 */

import { digFolder } from "../src/dig/dig";
import { Folder } from "../src/dig/folder";

(async () => {

    const folder: Folder = await digFolder('./test');
    console.log(folder.getAllFilePaths());
})();
