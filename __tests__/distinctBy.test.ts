
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('distinctBy', () => {

    let _items: { name: string, age: number }[];

    beforeEach(() => {

        _items = [
            { "name": "Rod", "age": 20 },
            { "name": "ROD", "age": 30 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }
        ];
    });

    test("Returns unique items using default comparison", () => {

        let items = new LinqArray([1, 2, 3, 1, 3, 4, 4, 5]);
        let result = items.distinctBy(i => i);
        let expected = [1, 2, 3, 4, 5];

        expect(result.length).toEqual(5);
        expect(result).toEqual(expected);
    });

    test("Returns unique items using default key comparison", () => {

        let items = new LinqArray(_items);
        let result = items.distinctBy(
            item => item.name);

        let expected = [
            { "name": "Rod", "age": 20 },
            { "name": "ROD", "age": 30 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }];

        expect(result.length).toEqual(expected.length);
        expect(result).toEqual(expected);
    });

    test("Returns unique items using custom key comparison", () => {

        let items = new LinqArray(_items);
        let result = items.distinctBy(
            item => item.name,
            (first, second) => first.toLowerCase() === second.toLowerCase());

        let expected = [
            { "name": "Rod", "age": 20 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }];

        expect(result.length).toEqual(expected.length);
        expect(result).toEqual(expected);
    });    

});
