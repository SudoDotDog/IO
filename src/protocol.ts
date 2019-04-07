/**
 * @author WMXPY
 * @namespace IO
 * @description Protocol
 */

import { _Url } from "@sudoo/bark/url";
import { downloadFile, getExternalData } from "./external";
import { copyFile, readTextFile, writeTextFile } from "./file";

export const parseGithubProtocol = (url: string): string => {

    return url.replace('github://', 'https://raw.githubusercontent.com/');
};

export const getExternalFileByProtocol = async (url: string, targetPath: string): Promise<boolean | null> => {

    const protocol: string | null = _Url.getProtocol(url);

    if (!protocol) {
        return null;
    }

    switch (protocol) {
        case 'http':
        case 'https': await downloadFile(url, targetPath);
        case 'github': await downloadFile(parseGithubProtocol(url), targetPath);
        case 'file': await copyFile(url.replace('file://', ''), targetPath);
        case 'text': await writeTextFile(targetPath, url.replace('text://', ''));
        default: return null;
    }

    return true;
};

export const getExternalTextByProtocol = async (url: string): Promise<string | null> => {

    const protocol: string | null = _Url.getProtocol(url);

    if (!protocol) {
        return null;
    }

    switch (protocol) {
        case 'http':
        case 'https': return await getExternalData(url);
        case 'github': return await getExternalData(parseGithubProtocol(url));
        case 'file': return await readTextFile(url.replace('file://', ''));
        case 'text': return url.replace('text://', '');
        default: return null;
    }
};
