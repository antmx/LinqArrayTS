
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('concat', () => {

    let _firstItems: LinqArray<number>;
    let _secondItems: LinqArray<number>;

    beforeEach(function () {

        _firstItems = new LinqArray([1, 2, 3]);
        _secondItems = new LinqArray([4, 5, 6]);
    });

    test("Combines 2 lists into 1", function () {

        let items = new LinqArray(_firstItems); // items is of type LinqArray<number>

        let result = items.concat(_secondItems);

        let expected = [1, 2, 3, 4, 5, 6];

        expect(result.length).toEqual(6);

        result.forEach((valueOfElement, indexInArray) => {

            expect(valueOfElement).toEqual(expected[indexInArray]);
        });
    });

});
