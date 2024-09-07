
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('except', () => {

    let _firstItems: number[];
    let _secondItems: number[];

    beforeEach(() => {

        _firstItems = [1, 2, 2, 3, 4, 5];
        _secondItems = [1, 3, 5, 7];
    });

    test("Produces the set difference of two lists", function () {

        let firstItems = new LinqArray(_firstItems);
        let secondItems = new LinqArray(_secondItems);

        let result = firstItems.except(secondItems);
        let expected = [2, 4, 7];

        expect(result).toEqual(expected);
    });

    test("Produces the set difference of two lists using a custom comparer", function () {

        let firstItems = new LinqArray([1.1, 2.1, 2.1, 3.1, 4.1, 5.1]);
        let secondItems = new LinqArray([1.2, 3.2, 5.2, 7.2]);

        let result = firstItems.except(
            secondItems,
            (first: number, second: number) => Math.floor(first) === Math.floor(second));

        let expected = [2.1, 4.1, 7.2];

        expect(result).toEqual(expected);
    });

});
