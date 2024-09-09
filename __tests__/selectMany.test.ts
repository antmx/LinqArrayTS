
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('selectMany', () => {

    let _items: { Name: string, Pets: string[] }[];

    beforeEach(() => {

        _items = [
            { Name: "Higa, Sidney", Pets: ["Scruffy", "Sam"] },
            { Name: "Ashkenazi, Ronen", Pets: ["Walker", "Sugar"] },
            { Name: "Price, Vernette", Pets: ["Scratches", "Diesel"] }];
    });


    test("Projects each item to a new list and combines the resulting list into one list.", () => {

        let items = new LinqArray(_items);

        let result = items.selectMany(
            o => new LinqArray(o.Pets),
            p => p
        );

        let expected = ["Scruffy", "Sam", "Walker", "Sugar", "Scratches", "Diesel"];

        expect(result).toEqual(expected);
    });

    test("Projects item to a new list and combines the resulting list into one list, applying a transformation function to each item in the new list.", () => {

        let items = new LinqArray(_items);

        let result = items.selectMany(
            o => new LinqArray(o.Pets),
            p => p.toUpperCase());

        let expected = ["SCRUFFY", "SAM", "WALKER", "SUGAR", "SCRATCHES", "DIESEL"];

        expect(result).toEqual(expected);
    });

    test("Projects each to a new list and combines the resulting list into one sequence, applying a function that accepts an index to each item in the new list.", () => {

        let items = new LinqArray(_items);

        let result = items.selectMany(
            o => new LinqArray(o.Pets),
            (p, index) => index + " " + p);

        let expected = ["0 Scruffy", "0 Sam", "1 Walker", "1 Sugar", "2 Scratches", "2 Diesel"];

        expect(result).toEqual(expected);
    });

});
