
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('sum', () => {

    let _items: {
        name: string,
        age: number,
        number: string
    }[];

    beforeEach(() => {

        _items = [
            { name: "foo", age: 2, number: "two" },
            { name: "bar", age: 4, number: "four" },
            { name: "baz", age: 1, number: "one" },
            { name: "qux", age: 3, number: "three" }];
    });

    test("Computes the sum of a list of values.", () => {

        let numbers = [1, 3, 2, 4, 5, 0];
        let items = new LinqArray(numbers);

        let result = items.sum();

        let expected = 15;

        expect(result).toEqual(expected);
    });

    test("Computes the sum of a list of values that are obtained by invoking a transform function on each element of a list.", () => {

        let items = new LinqArray(_items);

        let result = items.sum(
            o => o.age);

        let expected = 10;

        expect(result).toEqual(expected);
    });
});
