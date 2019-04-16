/**
 * @author WMXPY
 * @namespace IO
 * @description Protocol
 */

import { _Url } from "@sudoo/bark/url";
import { copyFile, readTextFile, writeTextFile } from "../file/file";
import { downloadFile, getExternalData } from "./external";

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
        case 'https':
            await downloadFile(url, targetPath);
            break;
        case 'github':
            await downloadFile(parseGithubProtocol(url), targetPath);
            break;
        case 'file':
            await copyFile(url.replace('file://', ''), targetPath);
            break;
        case 'text':
            await writeTextFile(targetPath, url.replace('text://', ''));
            break;
        default:
            return null;
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
