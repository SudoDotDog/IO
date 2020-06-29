/**
 * @author WMXPY
 * @namespace IO
 * @description File
 * @override
 */

import { expect } from "chai";
import * as Chance from "chance";
import { md5String } from "../../../src/internal/hash";

describe('Given [io-hash] helper methods', (): void => {

    const chance: Chance.Chance = new Chance('io-hash');

    it('should be able to md5 string', (): void => {

        const thing: string = chance.string();

        const result1: string = md5String(thing);
        const result2: string = md5String(thing);

        expect(result1).to.be.equal(result2);
    });

    it('should be able to return different md5 string', (): void => {

        const result1: string = md5String(chance.string());
        const result2: string = md5String(chance.string());

        expect(result1).to.not.be.equal(result2);
    });
});
