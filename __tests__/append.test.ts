
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('append', () => {

    beforeEach(() => {
    });

    test("Appends an item to a LinqArray", () => {

        let items = new LinqArray([2, 4, 6, 8]);
        let result = items.append(10);
        let expectedLength = items.length + 1;

        expect(result.length).toEqual(expectedLength);
    });
});
