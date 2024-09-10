
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('setValue', () => {

    beforeEach(() => {
    });

    test("Sets the specified element in the current Array to the specified value - 1D", function () {

        let items = new LinqArray<string>();
        items.setValue("three", 3);
        let result = items[3];
        let expected = "three";

        expect(result).toEqual(expected);
    });

    test("Sets the specified element in the current Array to the specified value - 2D", function () {

        let items = new LinqArray([["a", "b"], ["c", "d"], ["e", "f"], ["g", "h"]]);// 2D array

        items.setValue("three,one", [3, 1]);
        let result = items[3][1];
        let expected = "three,one";

        expect(result).toEqual(expected);
    });

});
