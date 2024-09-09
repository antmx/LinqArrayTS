
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('last', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("Returns last item", () => {

        let items = new LinqArray(_items);
        let result = items.last();

        let expected = 8;

        expect(result).toEqual(expected);
    });

    test("Returns last matching item", () => {

        let items = new LinqArray(_items);
        let result = items.last(i => i < 7);

        let expected = 6;

        expect(result).toEqual(expected);
    });

    test("Throws error when no items", () => {

        let items = new LinqArray();

        expect(() => {
            items.last();
        }).toThrow('NoElements');
    });

    test("Throws error when no matching items", () => {

        let items = new LinqArray(_items);

        expect(() => {
            items.last(i => i > 8);
        }).toThrow('NoMatchingElements');
    });

});
