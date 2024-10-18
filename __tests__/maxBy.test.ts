
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('maxBy', () => {

    let _items: { name: string, age: number }[];

    beforeEach(() => {

        _items = [
            { name: "Angie", age: 46 },
            { name: "Anthony", age: 50 },
            { name: "Isla", age: 14 },
            { name: "Lauren", age: 17 }
        ];
    });

    test("Returns the eldest person", () => {

        let items = new LinqArray(_items);
        let result = items.maxBy(p => p.age);
        let expected = { name: "Anthony", age: 50 };

        expect(result).toEqual(expected);
    });

    test("Returns the eldest child using a custom comparer function", () => {

        let items = new LinqArray(_items);

        let result = items.maxBy(
            p => p.age,
            (first, second) => first > second || first < 18 && second >= 18 // ignore adults
        );

        let expected = { name: "Lauren", age: 17 };

        expect(result).toEqual(expected);
    });

});
