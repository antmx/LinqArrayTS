
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('indexOf2', () => {

    let _riders: { name: string, make: string }[];

    beforeEach(() => {

        _riders = [
            { name: "Kehoe", make: "Honda" },
            { name: "Reed", make: "Yamaha" },
            { name: "Johnson", make: "honda" },
            { name: "Carmichael", make: "Honda" },
            { name: "Ward", make: "Kawasaki" }
        ];
    });

    test("Returns expected index when found", function () {

        let riders = new LinqArray(_riders);

        let result = riders.indexOf2("kehoe", (valueOfElement, name) => valueOfElement.name.toLowerCase() === name.toLowerCase());
        let expected = 0;

        expect(result).toEqual(expected);
    });

    test("Returns not found index when not found", function () {

        let riders = new LinqArray(_riders);

        let result = riders.indexOf2("Everts", (valueOfElement, name) => valueOfElement.name.toLowerCase() === name.toLowerCase());
        let expected = -1;

        expect(result).toEqual(expected);
    });
});
