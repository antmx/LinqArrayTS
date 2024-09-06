
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('average', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [2, 4, 6, 8];
    });

    test("Calculates the average of the items", function () {

        let items = new LinqArray(_items);
        let result = items.average();

        let expected = 5;

        expect(expected).toEqual(result);
    });

    test("Calculates the average of the items when there none", function () {

        let items = new LinqArray();
        let result = items.average();

        expect(result).toBeNaN();
    });

    test("Calculates the average of the items using a transform function", function () {

        let users: { name: string, age: number }[] = [
            { "name": "Rod", "age": 20 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }
        ];

        let items = new LinqArray(users);
        let result = items.average(item => item.age);

        let expected = 40;
        expect(result).toEqual(expected);
    });

});
