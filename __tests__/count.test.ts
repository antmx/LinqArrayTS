
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('count', () => {

    let _items: number[];

    beforeEach(function () {

        _items = [1, 2, 3];
    });

    test("Returns the number of items in the list", () => {

        let items = new LinqArray(_items);

        let result = items.count();

        expect(result).toEqual(_items.length);
    });

    test("Returns zero when the list is empty", () => {

        let items = new LinqArray<number>();

        let result = items.count();

        expect(result).toEqual(0);
    });

    test("Returns the number of items in the list that satisfy a condition", () => {

        let items = new LinqArray(_items);

        let result = items.count(i => i > 1);

        expect(result).toEqual(2);
    });

});
