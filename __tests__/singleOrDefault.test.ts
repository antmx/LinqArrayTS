
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('singleOrDefault', () => {

    beforeEach(() => {
    });

    test("Throws error when list is empty", () => {

        let items = new LinqArray();

        expect(() => { items.singleOrDefault(null) }).toThrow(new Error("NoElements"));
    });

    test("Returns the default value when no match", () => {

        let items = new LinqArray([1, 2, 3]);

        expect(items.singleOrDefault(
            0,
            o => o > 4)
        ).toEqual(0);
    });

    test("Throws error when more than 1 match", () => {

        let items = new LinqArray([1, 2, 3, 4, 5, 6]);

        expect(() => {
            items.singleOrDefault(
                -1,
                o => o > 4)
        }).toThrow(new Error("MoreThanOneMatchingElements"));
    });

    test("Returns first item", () => {

        let items = new LinqArray();
        items.push(1);

        expect(items.singleOrDefault(-1)
        ).toEqual(1);
    });

    test("Returns first matching item", () => {

        let items = new LinqArray([1, 2, 3]);

        expect(items.singleOrDefault(
            -1,
            o => o > 2)
        ).toEqual(3);
    });
});
