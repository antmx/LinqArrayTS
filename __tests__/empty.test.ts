
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('empty', () => {

    beforeEach(() => {
    });

    test("Returns an empty sequence", function () {

        let items = new LinqArray([1, 2, 3]);
        let result = items.empty();
        let expected = 0;

        expect(result.length).toEqual(0);
    });
});