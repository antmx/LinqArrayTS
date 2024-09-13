
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('takeWhile', () => {

    let _items: string[];

    beforeEach(() => {

        _items = ["apple", "banana", "mango", "orange", "passionfruit", "grape"];
    });

    test("Returns elements from a list as long as a specified condition is true.", () => {

        let items = new LinqArray(_items);
        debugger;
        let result = items.takeWhile(s => s != "orange");
        let expected = ["apple", "banana", "mango"];

        expect(result).toEqual(expected);
    });

    test("Returns elements from a list as long as a specified condition is true, passing the each item's index to the predicate function.", () => {

        let items = new LinqArray(_items);
        let result = items.takeWhile((s, i) => i < 3);
        let expected = ["apple", "banana", "mango"];

        expect(result).toEqual(expected);
    });
});
