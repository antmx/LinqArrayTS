
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('elementAt', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5];
    });

    test("Returns the item at the specified index", function () {

        let items = new LinqArray(_items);
        let result = items.elementAt(2);
        let expected = 3;

        expect(result).toEqual(expected);
    });

    test("Returns null when specified index doesn't exist", function () {

        let items = new LinqArray(_items);
        let result = items.elementAt(5);
        let expected = null;

        expect(result).toEqual(expected);
    });

});
