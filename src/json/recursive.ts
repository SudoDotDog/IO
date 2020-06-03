/**
 * @author WMXPY
 * @namespace Json
 * @description Recursive
 */

import { _Json } from "@sudoo/bark/json";
import { _Map } from "@sudoo/bark/map";
import { _Mutate } from "@sudoo/bark/mutate";
import * as Path from "path";
import { readTextFile } from "../file/text";
import { ERROR_CODE, panic } from "../panic/panic";

// tslint:disable-next-line: ban-types
const isObject = (element: any): element is Object => (element !== null && typeof element === 'object');
const isRefString = (element: any): element is string => (typeof element === 'string' && /^\$ref:.+/.test(element));

export const recursiveRead = async (path: string, depth: number = 0, maxDepth: number = 15): Promise<any> => {

    const content: string = await readTextFile(path);
    const parsed: any = _Json.safeParse(content, panic.code(ERROR_CODE.JSON_PARSE_FAILED, content));

    const rootPath: string = Path.parse(path).dir;

    return await recursiveParse(parsed, rootPath, depth + 1, maxDepth);
};

export const recursiveParse = async (parsed: any, rootPath: string, depth: number = 0, maxDepth: number = 15): Promise<any> => {

    if (Array.isArray(parsed)) {

        return _Mutate.asyncFlatRebuild(parsed, async (element: any) => {

            if (isRefString(element)) {

                const targetPath: string = element.replace('$ref:', '').trim();
                const relativePath: string = Path.join(rootPath, targetPath);
                const replacement: any[] = await recursiveRead(relativePath, depth + 1, maxDepth);

                if (Array.isArray(replacement)) {
                    return replacement;
                }
            }
            return await recursiveParse(element, rootPath, depth, maxDepth);
        });
    } else if (isObject(parsed)) {

        const keys: string[] = _Map.keys(parsed);

        return _Mutate.asyncReduce(keys, async (previous: Record<any, any>, current: string) => {

            if (current === '$ref') {

                const targetPath: string = parsed[current];
                const relativePath: string = Path.join(rootPath, targetPath);
                const replacement: Record<any, any> = await recursiveRead(relativePath, depth + 1, maxDepth);
                if (isObject(replacement)) {
                    return { ...previous, ...replacement };
                }

                throw panic.code(ERROR_CODE.OBJECT_REFERENCE_NOT_OBJECT, replacement);
            }
            return {
                ...previous,
                [current]: await recursiveParse(parsed[current], rootPath, depth, maxDepth),
            };
        }, {} as Record<any, any>);
    }

    return parsed;
};
