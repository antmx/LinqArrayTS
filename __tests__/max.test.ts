
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('max', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 1, 2, 5, 4, 5];
    });

    test("Returns the maximum value in a list", () => {

        let items = new LinqArray(_items);
        let result = items.max();
        let expected = 5;

        expect(result).toEqual(expected);
    });

    test("Returns the maximum value in a list using a custom comparer function", () => {

        let users: { name: string, age: number }[] = [
            { "name": "Rod", "age": 20 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }
        ];

        let items = new LinqArray(users); // items is of type LinqArray<{ name: string, age: number }>

        let result = items.max(
            (first, second) => first.age > second.age);

        let expected = { "name": "Freddie", "age": 60 };

        expect(result).toEqual(expected);
    });

});
