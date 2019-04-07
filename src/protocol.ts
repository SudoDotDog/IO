/**
 * @author WMXPY
 * @namespace IO
 * @description Protocol
 */

import { _Url } from "@sudoo/bark/url";
import { getExternalData } from "./external";
import { readTextFile } from "./file";

export const parseGithubProtocol = (url: string): string => {

    return url.replace('github://', 'https://raw.githubusercontent.com/');
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
