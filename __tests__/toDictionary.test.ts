
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('toDictionary', () => {

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

    test("Returns expected dictionary.", () => {

        let items = new LinqArray(_riders);

        let result = items.toDictionary(
            r => r.make,
            r => r.name,
            (a, b) => a.toLowerCase() === b.toLowerCase());

        let expected = [
            {
                key: "Honda",
                values: ["Kehoe", "Johnson", "Carmichael"]
            },
            {
                key: "Yamaha",
                values: ["Reed"]
            },
            {
                key: "Kawasaki",
                values: ["Ward"]
            }
        ];

        expect(result).toEqual(expected);
    });


});
