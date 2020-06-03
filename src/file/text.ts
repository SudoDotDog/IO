/**
 * @author WMXPY
 * @namespace File
 * @description Text
 */

import * as Fs from "fs";
import { UTF8 } from "./common";

export const readTextFile = (path: string): Promise<string> =>
    new Promise<string>((resolve: (result: string) => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.readFile(path, UTF8, (error: NodeJS.ErrnoException | null, data: string) => {

            if (error) {
                reject(error);
                return;
            }
            resolve(data);
            return;
        }));

export const writeTextFile = (path: string, content: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: NodeJS.ErrnoException) => void) =>
        Fs.writeFile(path, content, UTF8, (error: NodeJS.ErrnoException | null) => {

            if (error) {
                reject(error);
                return;
            }
            resolve();
            return;
        }));
