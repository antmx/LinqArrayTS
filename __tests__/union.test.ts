
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('union', () => {

    beforeEach(() => {
    });

    test("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates.", ()=> {

        let items = new LinqArray([1, 1, 2, 3, 4, 5, 5, 5]);
        let secondItems = new LinqArray([1, 3, 5, 7, 9, 5, 5, 5, 11, 11, 11, 11, 11]);
        let result = items.union(secondItems);
        let expected = [1, 2, 3, 4, 5, 7, 9, 11];

        expect(result).toEqual(expected);
    });

    test("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates, using the specified equality comparer function.", ()=> {

        let items = new LinqArray(["One", "one", "Two", "Three", "Four", "Five", "five", "five"]);
        let secondItems = new LinqArray(["one", "three", "five", "Seven", "Nine", "five", "Five", "five", "Eleven", "eleven", "eleven", "eleven"]);
        let comparerFunc = (first, second) => first.toLowerCase() == second.toLowerCase();
        let result = items.union(secondItems, comparerFunc);
        let expected = ["One", "Two", "Three", "Four", "Five", "Seven", "Nine", "Eleven"];

        expect(result).toEqual(expected);
    });
});
