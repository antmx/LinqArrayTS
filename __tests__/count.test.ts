
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('count', () => {

    let _items: number[];

    beforeEach(function () {

        _items = [1, 2, 3];
    });

    test("Returns the number of items in the list", () => {

        let items = new LinqArray(_items); // items is of type LinqArray<number>

        let result = items.count();

        expect(result).toEqual(_items.length);
    });

    test("Returns zero when the list is empty", () => {

        let items = new LinqArray<number>(); // items is of type LinqArray<{ name: string, age: number }>

        let result = items.count();

        expect(result).toEqual(0);
    });

});
