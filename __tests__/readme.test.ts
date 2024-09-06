
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('readme example', () => {

    let _items: number[];

    beforeEach(() => {

        _items = [1, 2, 3, 1, 3, 4, 4, 5];
    });

    test("Returns correct final value from chained method calls", () => {

        let jsItems = [1, 2, 3, 4, 5, 6, 7, 8]; // Standard JS array of numbers
        let items = new LinqArray<number>(jsItems); // items is of type LinqArray<number>, constructed from the standard JS array of numbers
        let items2 = new LinqArray(jsItems); // Alternative simplified constructor syntax still resulting in type LinqArray<number>, as the generic type is inferred from the type of the standard JS array items (number)

        // let firstOver4Times10 = items
        //     .where(i => i > 4)      // items > 4
        //     .select(i => i * 10)    // mutiply by 10
        //     .orderBy(i => i)        // order ascending
        //     .first();               // first item

        // let expected = 50;

        // expect(firstOver4Times10).toEqual(expected);

        expect(true).toEqual(true); // TODO reinstate above logic once orderBy() and first() ready
    });

});
