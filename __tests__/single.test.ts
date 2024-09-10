
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('single', () => {

    beforeEach(() => {
    });

    test("Throws error when list is empty", () => {

        let items = new LinqArray<any>();

        expect(() => { items.single() }).toThrow(new Error("NoElements"));
    });

    test("Throws error when no match", () => {

        let items = new LinqArray([1, 2, 3]);

        expect(() => {
            items.single(
                o => o > 4);
        }).toThrow(new Error("NoMatchingElements"));
    });

    test("Throws error when more than 1 match", () => {

        let items = new LinqArray([1, 2, 3, 4, 5, 6]);

        expect(() => {
            items.single(
                o => o > 4);
        }).toThrow(new Error("MoreThanOneMatchingElements"));
    });

    test("Returns first item", () => {

        let items = new LinqArray<number>();
        items.push(1);
        let result = items.single();

        expect(result).toEqual(1);
    });

    test("Returns first matching item", () => {

        let items = new LinqArray([1, 2, 3]);

        expect(items.single(o => o > 2)).toEqual(3);
    });

});
