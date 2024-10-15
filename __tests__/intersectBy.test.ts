
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('intersectBy', () => {

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

    test("Produces the set intersection of two lists using default key comparison", function () {

        let riders = new LinqArray(_riders);
        let makes = new LinqArray(["Honda", "Yamaha"]);

        let result = riders.intersectBy(makes, r => r.make);
        let expected = [
            { name: "Kehoe", make: "Honda" },
            { name: "Reed", make: "Yamaha" },
            { name: "Carmichael", make: "Honda" }];

        expect(result).toEqual(expected);
    });

    test("Produces the set intersection of two lists using custom key comparison", function () {

        let riders = new LinqArray(_riders);
        let makes = new LinqArray(["Honda", "Yamaha"]);

        let result = riders.intersectBy(
            makes,
            r => r.make,
            (first: string, second: string) => first.toLowerCase() === second.toLowerCase()
        );

        let expected = [
            { name: "Kehoe", make: "Honda" },
            { name: "Reed", make: "Yamaha" },
            { name: "Johnson", make: "honda" },
            { name: "Carmichael", make: "Honda" }];

        expect(result).toEqual(expected);
    });
});
