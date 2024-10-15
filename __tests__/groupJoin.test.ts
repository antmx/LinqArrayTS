
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

type Owner = { name: string };
type Pet = { name: string, owner: string };
type OwnedPets = { ownerName: string, petNames: string[] };

describe('groupJoin', () => {

    let _owners: Owner[];
    let _pets: Pet[];

    beforeEach(() => {

        _owners = [
            { name: "Magnus" },
            { name: "Terry" },
            { name: "Charlotte" },
            { name: "Jim" }
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

        let result = owners.groupJoin<Pet, string, OwnedPets>(
            pets,
            person => person.name,
            pet => pet.owner,
            (owner: Owner, pets: LinqArray<Pet>) => {
                return {
                    ownerName: owner.name,
                    petNames: pets.select(p => p.name)
                };
            }
        );

        let expected: OwnedPets[] = [
            { ownerName: "Magnus", petNames: [] },
            { ownerName: "Terry", petNames: ["Boots"] },
            { ownerName: "Charlotte", petNames: ["Whiskers"] },
            { ownerName: "Jim", petNames: [] }
        ];

        expect(result).toEqual(expected);
    });

    test("Joins two collections using custom key comparison", () => {

        let owners = new LinqArray(_owners);
        let pets = new LinqArray(_pets);

        let result = owners.groupJoin<Pet, string, OwnedPets>(
            pets,
            person => person.name,
            pet => pet.owner,
            (owner: Owner, pets: LinqArray<Pet>) => {
                return {
                    ownerName: owner.name,
                    petNames: pets.select(p => p.name)
                };
            },
            (ownerName: string, petOwner: string) => ownerName.toLowerCase() === petOwner.toLowerCase()
        );

        let expected: OwnedPets[] = [
            { ownerName: "Magnus", petNames: ["Daisy"] },
            { ownerName: "Terry", petNames: ["Barley", "Boots"] },
            { ownerName: "Charlotte", petNames: ["Whiskers"] },
            { ownerName: "Jim", petNames: [] }
        ];

        expect(result).toEqual(expected);
    });
});
