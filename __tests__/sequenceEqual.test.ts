
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('sequenceEqual', () => {

    beforeEach(() => {
    });

    test("Return false when second sequence length differs from source length", function () {

        let items = new LinqArray([1, 2, 3]);
        let second = new LinqArray([1, 2]);

        let result = items.sequenceEqual(second);
        let expected = false;

        expect(result).toEqual(expected);
    });

    test("Throws exception when second sequence is null", function () {

        let items = new LinqArray([1, 2, 3]);
        let second: LinqArray<number> = null!;

        expect(() => {
            items.sequenceEqual(second);
        }).toThrow(`ArgumentNull 'second'`);
    });

    test("Return false when sequences differ using default comparison", function () {

        let items = new LinqArray([1, 2, 3]);
        let second = new LinqArray([3, 2, 1]);

        let result = items.sequenceEqual(second);
        let expected = false;

        expect(result).toEqual(expected);
    });

    test("Return false when sequences match using default comparison", function () {

        let items = new LinqArray(['a', 'b', 'c']);
        let second = new LinqArray(['A', 'B', 'C']);

        let result = items.sequenceEqual(second);
        let expected = false;

        expect(result).toEqual(expected);
    });

    test("Return true when sequences match using default comparison", function () {

        let items = new LinqArray([1, 2, 3]);
        let second = new LinqArray([1, 2, 3]);

        let result = items.sequenceEqual(second);
        let expected = true;

        expect(result).toEqual(expected);
    });

    test("Return true when sequences match using custom comparison", function () {

        let items = new LinqArray(['a', 'b', 'c']);
        let second = new LinqArray(['A', 'B', 'C']);

        let result = items.sequenceEqual(
            second,
            (first, second) => first.toUpperCase() === second.toUpperCase());

        let expected = true;

        expect(result).toEqual(expected);
    });

});
