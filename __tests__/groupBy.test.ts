
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('groupBy', () => {

    let _items: { Name: string, Age: number }[];

    beforeEach(() => {

        _items = [
            { Name: "Foo", Age: 6 },
            { Name: "Bar", Age: 5 },
            { Name: "Baz", Age: 6 },
            { Name: "Qux", Age: 5 },
            { Name: "Fiz", Age: 5 },
            { Name: "Pop", Age: 8 }
        ];
    });

    test("Groups the elements of a list according to a specified key selector function.", () => {

        let items = new LinqArray(_items);
        let result = items.groupBy(
            o => o.Age,
            o => o
        );

        let expected = new LinqArray([
            { key: 6, items: [{ Name: "Foo", Age: 6 }, { Name: "Baz", Age: 6 }] },
            { key: 5, items: [{ Name: "Bar", Age: 5 }, { Name: "Qux", Age: 5 }, { Name: "Fiz", Age: 5 }] },
            { key: 8, items: [{ Name: "Pop", Age: 8 }] }
        ]);

        expect(result).toEqual(expected);
    });

    test("Groups the elements of a list according to a specified key selector function and elementSelector function.", () => {

        let items = new LinqArray(_items);
        let result = items.groupBy(
            o => o.Age,
            o => o.Name
        );

        let expected = new LinqArray([
            { key: 6, items: ["Foo", "Baz"] },
            { key: 5, items: ["Bar", "Qux", "Fiz"] },
            { key: 8, items: ["Pop"] }
        ]);

        expect(result).toEqual(expected);
    });

    test("Empty list returns empty group list.", () => {

        let items = new LinqArray<number>();
        let result = items.groupBy(
            o => o,
            o => o
        );

        let expected = new LinqArray<number>();

        expect(result).toEqual(expected);
    });

});
