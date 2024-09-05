
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('all', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("Returns true when all match", function () {

        let items = new LinqArray(_items);

        let result = items.all(i => i <= 8);

        const expected = true;

        expect(result).toEqual(expected);
    });

    test("Returns true when array is empty", function () {

        let arr: number[] = [];
        let items = new LinqArray(arr);

        let result = items.all(i => i <= 8);

        const expected = true;

        expect(result).toEqual(expected);
    });

    test("Returns false when not all match", function () {

        let items = new LinqArray(_items);

        let result = items.all(i => i <= 7);

        const expected = false;

        expect(result).toEqual(expected);
    });

});
