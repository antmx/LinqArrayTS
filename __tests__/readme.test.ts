
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('readme example', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 1, 3, 4, 4, 5];
    });

    test("Returns correct final value from chained method calls", () => {

        let jsItems = [2, 4, 6, 8, 1, 3, 5, 7]; // Standard JS array of numbers
        let items1 = new LinqArray<number>(jsItems); // items is of type LinqArray<number>, constructed from the standard JS array of numbers
        let items2 = new LinqArray(jsItems); // Simplified constructor where generic type (number) is inferred from the source array

        let firstOver4Times10 = items2
            .where(i => i > 4)      // items > 4
            .select(i => i * 10)    // multiply by 10
            .orderBy(i => i)        // order ascending
            .first();               // first item

        let expected = 50;

        expect(firstOver4Times10).toEqual(expected);
    });

});
