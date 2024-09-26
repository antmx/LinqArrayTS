
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('defaultIfEmpty', () => {

    beforeEach(function () {
    });

    test("Returns the original array if not empty", () => {

        let data = [1, 2, 3];
        let items = new LinqArray(data);

        let result = items.defaultIfEmpty(4);

        expect(result).toEqual(data);
    });

    test("Returns defaultValue if array is empty", () => {

        let items = new LinqArray<number>();

        let result = items.defaultIfEmpty(4);

        expect(result).toEqual([4]);
    });

});
