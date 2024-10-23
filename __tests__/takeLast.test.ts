
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('takeLast', () => {

    let _items: string[];

    beforeEach(() => {

        _items = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];
    });

    test("Returns empty array when count < 0", () => {

        let items = new LinqArray(_items);
        let result = items.takeLast(-1);
        let expected = [];

        expect(result).toEqual(expected);
    });

    test("Returns empty array when count == 0", () => {

        let items = new LinqArray(_items);
        let result = items.takeLast(0);
        let expected = [];

        expect(result).toEqual(expected);
    });

    test("Returns last item when count == 1", () => {

        let items = new LinqArray(_items);
        debugger;
        let result = items.takeLast(1);
        let expected = ["Pop"];

        expect(result).toEqual(expected);
    });

    test("Returns correct last items when count < length>", () => {

        let items = new LinqArray(_items);
        debugger;
        let result = items.takeLast(5);
        let expected = ["Bar", "Baz", "Qux", "Fiz", "Pop"];

        expect(result).toEqual(expected);
    });

    test("Returns all items when count equals length", () => {

        let items = new LinqArray(_items);
        debugger;
        let result = items.takeLast(6);
        let expected = ["Foo", "Bar", "Baz", "Qux", "Fiz", "Pop"];

        expect(result).toEqual(expected);
    });

    test("Returns all items when count > list length", () => {

        let items = new LinqArray(_items);
        let result = items.takeLast(100);
        let expected = _items;

        expect(result).toEqual(expected);
    });

});
