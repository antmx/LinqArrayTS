
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('skipWhile', () => {

    let _items: string[];

    beforeEach(() => {

        _items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
    });

    test("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements.", () => {

        let items = new LinqArray(_items);
        let result = items.skipWhile(o => o != "orange");
        let expected = ["orange", "passionfruit", "grape"];

        expect(result).toEqual(expected);
    });

    test("Bypasses elements in a list as long as a specified condition is true and then returns the remaining elements, passing each element's index to the predicate function.", () => {

        let items = new LinqArray(_items);
        let result = items.skipWhile((o, i) => i < 4);
        let expected = ["passionfruit", "grape"];

        expect(result).toEqual(expected);
    });
});
