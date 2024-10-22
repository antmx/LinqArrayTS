
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('order', () => {

    let _items: string[];

    beforeEach(() => {
    });

    test("Sorts the elements of a number array in ascending order.", () => {

        let items = new LinqArray([1, 3, 2, 4, 5, 0]);

        let result = items.order();

        let expected = [0, 1, 2, 3, 4, 5];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a string array in ascending order.", () => {

        let arr = ["c", "D", "a", "B"];
        let items = new LinqArray(arr);

        let result = items.order();

        let expected = ["B", "D", "a", "c"];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a string array in ascending order according to a comparer function.", () => {

        let arr = ["c", "D", "a", "B"];
        let items = new LinqArray(arr);

        let result = items.order(
            (a, b) => a.toUpperCase().localeCompare(b.toUpperCase())
        );

        let expected = ["a", "B", "c", "D"];

        expect(result).toEqual(expected);
    });

});
