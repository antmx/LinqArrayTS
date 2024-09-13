
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('zip', () => {

    let _numbers: number[];
    let _words: string[];

    beforeEach(() => {

        _numbers = [1, 2, 3, 4];
        _words = ["one", "two", "three"];
    });

    it("Merges two lists by using the specified result selector function.", function () {

        let numbers = new LinqArray(_numbers);
        let words = new LinqArray(_words);

        let result = numbers.zip(
            words,
            (first, second) => first + " " + second);

        let expected = ["1 one", "2 two", "3 three"];

        expect(result).toEqual(expected);
    });
});
