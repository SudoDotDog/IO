/**
 * @author WMXPY
 * @namespace External
 * @description External
 */

import * as Fs from "fs";
import * as Http from "http";
import * as Https from "https";
import { removeFile } from "../file/file";

export const getHttpClient = (url: string): typeof Https | typeof Http => {

    if (url.substring(0, 5) === 'https') {
        return Https;
    }
    return Http;
};

export const getExternalData = (url: string): Promise<string> =>
    new Promise<string>((resolve: (data: string) => void, reject: (reason: Error) => void) => {

        const client: typeof Http | typeof Https = getHttpClient(url);
        const stringBuffer: string[] = [];

        client.get(url, (response: Http.IncomingMessage) => {
            response.on('data', (chunk: string) => {
                stringBuffer.push(chunk);
            });
            response.on('end', () => {
                resolve(stringBuffer.join(''));
            });
        }).on("error", (error: Error) => {
            reject(error);
        });
    });

export const downloadFile = (url: string, targetPath: string): Promise<void> =>
    new Promise<void>((resolve: () => void, reject: (reason: Error) => void) => {

        const client: typeof Http | typeof Https = getHttpClient(url);

        const writeStream: Fs.WriteStream = Fs.createWriteStream(targetPath);
        writeStream.on('finish', () => {
            resolve();
            writeStream.close();
            return;
        });
        writeStream.on('error', (error: Error) => {
            reject(error);
            writeStream.close();
            return;
        });

        const request: Http.ClientRequest = client.get(url, (response: Http.IncomingMessage) => {
            response.pipe(writeStream);
            return;
        });
        request.on('error', (error: Error) => {
            removeFile(targetPath).then(() => {
                reject(error);
            }).catch(() => {
                reject(error);
            });
        });
    });
