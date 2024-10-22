
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('prepend', () => {

    beforeEach(() => {
    });

    test("Prepends an item to a LinqArray", () => {

        let items = new LinqArray([4, 6, 8, 10]);
        let valueToPrepend = 2;
        let result = items.prepend(valueToPrepend);
        let expectedLength = items.length + 1;

        expect(result.length).toEqual(expectedLength);
        expect(result[0]).toEqual(valueToPrepend);
    });
});
