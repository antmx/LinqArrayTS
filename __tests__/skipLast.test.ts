
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('skipLast', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [59, 82, 70, 56, 92, 98, 85];
    });

    test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == -1", () => {

        let items = new LinqArray(_items);
        let result = items.skipLast(-1);
        let expected: number[] = [];

        expect(result).toEqual(expected);
    });

    test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 0.", () => {

        let items = new LinqArray(_items);
        let result = items.skipLast(0);
        let expected: number[] = [];

        expect(result).toEqual(expected);
    });

    test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 1.", () => {

        let items = new LinqArray(_items);
        let result = items.skipLast(1);
        let expected = [59, 82, 70, 56, 92, 98];

        expect(result).toEqual(expected);
    });

    test("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count > list length.", () => {

        let items = new LinqArray(_items);
        let result = items.skipLast(100);
        let expected: number[] = [];

        expect(result).toEqual(expected);
    });

});
