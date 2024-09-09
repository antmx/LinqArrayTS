
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('first', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("Returns first item", () => {

        let items = new LinqArray(_items);
        let result = items.first();

        let expected = 1;

        expect(result).toEqual(expected);
    });

    test("Returns first matching item", () => {

        let items = new LinqArray(_items);
        let result = items.first((i) => i > 3);

        let expected = 4;

        expect(result).toEqual(expected);
    });

    test("Throws error when no items", () => {

        let items = new LinqArray();

        expect(() => {
            items.first();
        }).toThrow('NoElements');
    });

    test("Throws error when no matching items", () => {

        let items = new LinqArray(_items);

        expect(() => {
            items.first(i => i > 8);
        }).toThrow('NoElements');
    });

});
