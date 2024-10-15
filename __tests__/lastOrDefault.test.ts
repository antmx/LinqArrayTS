
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('lastOrDefault', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("Returns last item", () => {

        let items = new LinqArray(_items);
        let result = items.lastOrDefault(-1);

        let expected = 8;

        expect(result).toEqual(expected);
    });

    test("Returns last matching item", () => {

        let items = new LinqArray(_items);
        let result = items.lastOrDefault(
            -1,
            i => i < 7);

        let expected = 6;

        expect(result).toEqual(expected);
    });

    test("Returns default when no items", () => {

        let items = new LinqArray();
        let defaultValue = -1;

        let result = items.lastOrDefault(defaultValue);

        expect(result).toEqual(defaultValue);
    });

    test("Returns default when no matching items", () => {

        let items = new LinqArray(_items);

        let defaultValue = 10;

        let result = items.lastOrDefault(defaultValue, i => i > 8);

        expect(result).toEqual(defaultValue);
    });

});
