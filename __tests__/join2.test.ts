
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

type Owner = { name: string };
type Pet = { name: string, owner: string };
type OwnedPet = { ownerName: string, petName: string };

describe('join2', () => {

    let _owners: Owner[];
    let _pets: Pet[];

    beforeEach(() => {

        _owners = [
            { name: "Magnus" },
            { name: "Terry" },
            { name: "Charlotte" }
        ];

        _pets = [
            { name: "Barley", owner: "terry" },
            { name: "Boots", owner: "Terry" },
            { name: "Whiskers", owner: "Charlotte" },
            { name: "Daisy", owner: "magnus" }
        ];
    });

    test("Joins two collections using default key comparison", () => {

        let owners = new LinqArray(_owners);
        let pets = new LinqArray(_pets);

        let result = owners.join2<Pet, string, OwnedPet>(
            pets,
            person => person.name,
            pet => pet.owner,
            (owner: Owner, pet: Pet) => {
                return { ownerName: owner.name, petName: pet.name }
            });

        let expected = [
            { ownerName: "Terry", petName: "Boots" },
            { ownerName: "Charlotte", petName: "Whiskers" }
        ];

        expect(result).toEqual(expected);
    });

    test("Joins two collections using custom key comparison", () => {

        let owners = new LinqArray(_owners);
        let pets = new LinqArray(_pets);

        let result = owners.join2<Pet, string, OwnedPet>(
            pets,
            person => person.name,
            pet => pet.owner,
            (owner: Owner, pet: Pet) => {
                return { ownerName: owner.name, petName: pet.name }
            },
            (first: string, second: string) => first.toLocaleLowerCase() === second.toLocaleLowerCase()
        );

        let expected = [
            { ownerName: "Magnus", petName: "Daisy" },
            { ownerName: "Terry", petName: "Barley" },
            { ownerName: "Terry", petName: "Boots" },
            { ownerName: "Charlotte", petName: "Whiskers" }
        ];

        expect(result).toEqual(expected);
    });
});
