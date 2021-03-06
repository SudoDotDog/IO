/**
 * @author WMXPY
 * @namespace Panic
 * @description Panic
 */

import { Panic } from "connor";

export const MODULE_NAME = 'BARKSH_CORE';

export enum ERROR_CODE {

    PATH_NOT_EXIST = 2005,
    PATH_NOT_DIRECTORY = 2006,

    JSON_PARSE_FAILED = 3201,
    OBJECT_REFERENCE_NOT_OBJECT = 3202,
}

export const ERROR_LIST: Record<ERROR_CODE, string> = {

    [ERROR_CODE.PATH_NOT_EXIST]: 'Target path: "{}" not exist',
    [ERROR_CODE.PATH_NOT_DIRECTORY]: 'Target path: "{}" is not a folder',

    [ERROR_CODE.JSON_PARSE_FAILED]: 'Parsing json failed: "{}"',
    [ERROR_CODE.OBJECT_REFERENCE_NOT_OBJECT]: 'Object reference must be a object, but: "{}"',
};

export const panic: Panic<ERROR_CODE> = Panic.withDictionary(MODULE_NAME, ERROR_LIST);
