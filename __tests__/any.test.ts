
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('any', () => {

    let _items: number[];

    // beforeAll
    beforeEach(() => {

        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });
    // afterEach
    // afterAll

    test('Returns true when there are any items', () => {

        let items = new LinqArray(_items);
        let result = items.any();

        expect(result).toEqual(true);
    });

    test("Returns true when there are matching items", () => {

        let items = new LinqArray(_items);
        let result = items.any((i) => { return i % 3 == 0; });

        expect(result).toEqual(true);
        expect(result).toBeTruthy();
    });

    test("Returns false when there are no matching items", () => {

        let items = new LinqArray(_items);
        let result = items.any((i) => { return i > 100; });

        expect(result).toEqual(false);
        expect(result).toBeFalsy();
    });

    test("Returns false when there are no items", () => {

        let items = new LinqArray();
        let result = items.any();

        expect(result).toBeFalsy();
    });

});
