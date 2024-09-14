
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('select', () => {

    let _items: { name: string, age: number }[];

    beforeEach(function () {

        _items = [
            { "name": "Rod", "age": 20 },
            { "name": "Jane", "age": 40 },
            { "name": "Freddie", "age": 60 }
        ];
    });

    test("Projects each item into a new form", function () {

        let items = new LinqArray(_items); // items is of type LinqArray<number>
        let result = items.select(u => u.name);

        let expected = ["Rod", "Jane", "Freddie"];

        expect(result.length).toEqual(3);

        result.forEach(function (valueOfElement, indexInArray) {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
    });

    test("Projects each item into a new form, by incorporating the element's index", function () {

        let items = new LinqArray(_items); // items is of type LinqArray<number>
        let result = items.select((u, i) => u.name + i);

        let expected = ["Rod0", "Jane1", "Freddie2"];

        expect(result.length).toEqual(3);

        result.forEach((valueOfElement, indexInArray) => {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
    });

});
