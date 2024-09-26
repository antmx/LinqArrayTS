
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('contains', () => {

    let _items: number[];

    beforeEach(function () {

        _items = [1, 2, 3];
    });

    test("Returns true when list does contain value", () => {

        let items = new LinqArray(_items); // items is of type LinqArray<number>

        let result = items.contains(2);

        expect(result).toEqual(true);
    });

    test("Returns true when list does contain value that matches the specified comparer", () => {

        let users: { name: string, age: number }[] = [
            { "name": "Rod", "age": 20 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }
        ];

        let items = new LinqArray(users); // items is of type LinqArray<{ name: string, age: number }>

        let result = items.contains(
            { "name": "rod", "age": 10 },
            (first, second) => first.name.toLowerCase() === second.name.toLowerCase());

        expect(result).toEqual(true);
    });

    test("Returns false when list does not contain value", () => {

        let items = new LinqArray(_items); // items is of type LinqArray<number>

        let result = items.contains(4);

        expect(result).toEqual(false);
    });

});
