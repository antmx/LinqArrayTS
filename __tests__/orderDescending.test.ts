
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('orderDescending', () => {

    let _items: string[];

    beforeEach(() => {
    });

    test("Sorts the elements of a number array in descending order.", () => {

        let items = new LinqArray([1, 3, 2, 4, 5, 0]);

        let result = items.orderDescending();

        let expected = [5, 4, 3, 2, 1, 0];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a string array in descending order.", () => {

        let arr = ["c", "D", "a", "B"];
        let items = new LinqArray(arr);

        let result = items.orderDescending();

        let expected = ["c", "a", "D", "B"];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a string array in descending order according to a comparer function.", () => {

        let arr = ["c", "D", "a", "B"];
        let items = new LinqArray(arr);

        let result = items.orderDescending(
            (a, b) => a.toUpperCase().localeCompare(b.toUpperCase())
        );

        let expected = ["D", "c", "B", "a"];

        expect(result).toEqual(expected);
    });

});
