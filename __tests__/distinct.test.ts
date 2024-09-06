
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('distinct', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 1, 3, 4, 4, 5];
    });

    test("Returns unique items using default comparison", () => {

        let items = new LinqArray(_items);
        let result = items.distinct();
        let expected = [1, 2, 3, 4, 5];

        expect(result.length).toEqual(5);
        expect(result).toEqual(expected);
    });

    test("Returns unique items using custom comparer function", () => {

        let users: { name: string, age: number }[] = [
            { "name": "Rod", "age": 20 },
            { "name": "Rod", "age": 30 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }
        ];
        let items = new LinqArray(users);
        let result = items.distinct((first, second) => first.name.toLowerCase() === second.name.toLowerCase());
        let expected = [
            { "name": "Rod", "age": 20 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }];

        expect(result.length).toEqual(expected.length);
        expect(result).toEqual(expected);
    });

});
