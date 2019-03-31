/**
 * @author WMXPY
 * @namespace IO
 * @description External
 * @override
 */

import { Mock, Sandbox } from "@sudoo/mock";
import { expect } from "chai";
import * as Chance from "chance";
import * as func_IO_EXTERNAL from "../../src/external";
import { mockWriteStream } from "../mock/fs";

describe('Given [io-external] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('io-external');

    it('should be able to download file', async (): Promise<void> => {

        const getHttpClientSandbox = Sandbox.create();

        const restoreWriteStream: {
            restore: () => {
                eventList: string[];
                contentList: any[];
            };
            tray: Record<string, any>;
        } = mockWriteStream();
        const getHttpClientMock = Mock.create(func_IO_EXTERNAL, 'getHttpClient');
        getHttpClientMock.mock(() => ({
            get: getHttpClientSandbox.func({
                on: Sandbox.stub(),
            }),
        }));

        const path: string = chance.string();
        const targetPath: string = chance.string();

        setImmediate(() => restoreWriteStream.tray.end());
        await func_IO_EXTERNAL.downloadFile(path, targetPath);

        getHttpClientMock.restore();
        const result: {
            eventList: string[];
            contentList: any[];
        } = restoreWriteStream.restore();

        expect(getHttpClientSandbox).to.have.lengthOf(1);
        expect(result.eventList).to.have.lengthOf(2);
    });
});
