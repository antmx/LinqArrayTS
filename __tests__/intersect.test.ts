
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('intersect', () => {

    let _firstItems: number[];
    let _secondItems: number[];

    beforeEach(() => {

        _firstItems = [1, 1, 2, 3, 4, 5];
        _secondItems = [1, 3, 5, 7];
    });

    test("Produces the set intersection of two lists", function () {

        let firstItems = new LinqArray(_firstItems);
        let secondItems = new LinqArray(_secondItems);

        let result = firstItems.intersect(secondItems);
        let expected = [1, 3, 5];

        expect(result).toEqual(expected);
    });

});
