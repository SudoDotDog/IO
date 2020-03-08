/**
 * @author WMXPY
 * @namespace Stream
 * @description Write
 */

import * as Fs from "fs";

export class FileWritingStream {

    public static create(target: string): FileWritingStream {

        return new FileWritingStream(target);
    }

    private readonly _stream: Fs.WriteStream;

    private constructor(target: string) {

        this._stream = Fs.createWriteStream(target, {
            flags: 'w',
            encoding: 'utf8',
        });
    }

    public dispose(): this {

        this._stream.close();
        return this;
    }

    public write(text: string): Promise<void> {

        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {
            this._stream.write(text, (error?: Error) => {

                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
}
