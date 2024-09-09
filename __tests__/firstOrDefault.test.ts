
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('firstOrDefault', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("Returns first item", () => {

        let items = new LinqArray(_items);
        let result = items.firstOrDefault(-1);

        let expected = 1;

        expect(result).toEqual(expected);
    });

    test("Returns first matching item", () => {

        let items = new LinqArray(_items);
        let result = items.firstOrDefault(
            -1,
            i => i > 3);

        let expected = 4;

        expect(result).toEqual(expected);
    });

    test("Returns default item", () => {

        let items = new LinqArray(_items);
        let result = items.firstOrDefault(
            -1,
            i => i > 10);

        let expected = -1;

        expect(result).toEqual(expected);
    });

});
