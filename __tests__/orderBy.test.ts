
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('orderBy', () => {

    let _items: { name: string, age: number, number: string }[];

    beforeEach(() => {

        _items = [
            { name: "foo", age: 2, number: "two" },
            { name: "bar", age: 4, number: "four" },
            { name: "baz", age: 1, number: "one" },
            { name: "qux", age: 3, number: "three" }];
    });

    test("Sorts the elements of an array in ascending order.", () => {

        let items = new LinqArray([1, 3, 2, 4, 5, 0]);

        let result = items.orderBy(i => i);

        let expected = [0, 1, 2, 3, 4, 5];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a sequence in ascending order according to a key.", () => {

        let items = new LinqArray(_items);

        let result = items.orderBy(
            o => o.age);

        let expected = [
            { name: "baz", age: 1, number: "one" },
            { name: "foo", age: 2, number: "two" },
            { name: "qux", age: 3, number: "three" },
            { name: "bar", age: 4, number: "four" }];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a sequence in ascending order according to a key and string comparer function.", () => {

        let items = new LinqArray(_items);

        let result = items.orderBy(
            o => o.number,
            (a, b) => a.localeCompare(b));

        let expected = [
            { name: "bar", age: 4, number: "four" },
            { name: "baz", age: 1, number: "one" },
            { name: "qux", age: 3, number: "three" },
            { name: "foo", age: 2, number: "two" }];

        expect(result).toEqual(expected);
    });

    test("Sorts the elements of a sequence in ascending order according to a key and int comparer function.", () => {

        let items = new LinqArray(_items);

        let result = items.orderBy(
            o => o.number,
            (a, b) => a.length - b.length);

        let expected = [
            { name: "foo", age: 2, number: "two" },
            { name: "baz", age: 1, number: "one" },
            { name: "bar", age: 4, number: "four" },
            { name: "qux", age: 3, number: "three" }];

        expect(result).toEqual(expected);
    });

});
