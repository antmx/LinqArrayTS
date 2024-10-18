
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('minBy', () => {

    let _items: { name: string, age: number }[];

    beforeEach(() => {

        _items = [
            { name: "Anthony", age: 50 },
            { name: "Angie", age: 46 },
            { name: "Isla", age: 14 },
            { name: "Lauren", age: 17 }
        ];
    });

    test("Returns the youngest person", () => {

        let items = new LinqArray(_items);
        let result = items.minBy(p => p.age);
        let expected = { name: "Isla", age: 14 };

        expect(result).toEqual(expected);
    });

    test("Returns the youngest adult using a custom comparer function", () => {

        let items = new LinqArray(_items);

        let result = items.minBy(
            p => p.age,
            (first, second) => first >= 18 && first < second // ignore children
        );

        let expected = { name: "Angie", age: 46 };

        expect(result).toEqual(expected);
    });

});
