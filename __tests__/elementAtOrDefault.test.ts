
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('elementAtOrDefault', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5];
    });

    test("Returns the item at the specified index", function () {

        let items = new LinqArray(_items);
        let result = items.elementAtOrDefault(2, 99);
        let expected = 3;

        expect(result).toEqual(expected);
    });

    test("Returns default value when specified index doesn't exist", function () {

        let items = new LinqArray(_items);
        let result = items.elementAtOrDefault(5, 99);
        let expected = 99;

        expect(result).toEqual(expected);
    });

});
