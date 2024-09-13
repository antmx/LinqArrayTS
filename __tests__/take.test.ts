
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('take', () => {

    let _items: string[];

    beforeEach(() => {

        _items = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];
    });

    test("Returns empty array when count < 0", () => {

        let items = new LinqArray(_items);
        let result = items.take(-1);
        let expected = [];

        expect(result).toEqual(expected);
    });

    test("Returns empty array when count == 0", () => {

        let items = new LinqArray(_items);
        let result = items.take(0);
        let expected = [];

        expect(result).toEqual(expected);
    });

    test("Returns first item when count == 1", () => {

        let items = new LinqArray(_items);
        let result = items.take(1);
        let expected = ["Foo"];

        expect(result).toEqual(expected);
    });

    test("Returns all items when count > list length", () => {

        let items = new LinqArray(_items);
        let result = items.take(100);
        let expected = _items;

        expect(result).toEqual(expected);
    });

    test("Returns last 3 items when count == 3 and endIdx == -1", () => {

        let items = new LinqArray(_items);
        let result = items.take([3, -1]);
        let expected = ["Qux", "Fiz", "Pop"];

        expect(result).toEqual(expected);
    });

    test("Returns 2nd to 4th items when count == 3 and endIdx == 1", () => {

        let items = new LinqArray(_items);
        let result = items.take([1, 3]);
        let expected = ["Bar", "Baz", "Qux"];

        expect(result).toEqual(expected);
    });
});
