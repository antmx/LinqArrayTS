
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('reverse2', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    test("Returns the source array in reverse order", () => {

        let items = new LinqArray(_items);
        let result = items.reverse2();
        let expected = [8, 7, 6, 5, 4, 3, 2, 1,];

        expect(result).toEqual(expected);
    });

});
