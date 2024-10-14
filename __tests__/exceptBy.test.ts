
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('exceptBy', () => {

    let _firstMakes: { name: string }[];
    let _secondMakes: { name: string }[];

    beforeEach(() => {

        _firstMakes = [
            { name: "Honda" },
            { name: "Kawasaki" },
            { name: "Suzuki" },
            { name: "Yamaha" },
            { name: "KTM" }
        ];

        _secondMakes = [
            { name: "HONDA" },
            { name: "KAWASAKI" },
            { name: "SUZUKI" },
            { name: "YAMAHA" },
            { name: "KTM" }
        ];
    });

    test("Produces the set difference of two lists using default key comparison", function () {

        let firstItems = new LinqArray(_firstMakes);
        let secondItems = new LinqArray(_secondMakes);

        let result = firstItems.exceptBy(secondItems, (m) => m.name);

        let expected = [
            { name: "Honda" },
            { name: "Kawasaki" },
            { name: "Suzuki" },
            { name: "Yamaha" }
        ];

        expect(result).toEqual(expected);
    });

    test("Produces the set difference of two lists using a custom key comparer", function () {

        let firstItems = new LinqArray(_firstMakes);
        let secondItems = new LinqArray(_secondMakes);

        let result = firstItems.exceptBy(
            secondItems,
            m => m.name,
            (first, second) => first.toLowerCase() === second.toLowerCase());

        let expected = [];

        expect(result).toEqual(expected);
    });

});
