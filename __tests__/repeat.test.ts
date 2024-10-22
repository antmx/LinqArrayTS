
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('repeat', () => {

    beforeEach(() => {
    });

    let elem = { Name: "Joe", Age: 21 };

    const cases = [
        { element: { ...elem }, count: -1, expectedCount: 0 },
        { element: { ...elem }, count: 0, expectedCount: 0 },
        { element: { ...elem }, count: 1, expectedCount: 1 },
        { element: { ...elem }, count: 10, expectedCount: 10 }
    ];

    test.each(cases)(
        "Given %p as arguments, returns the expected number of items, each with the correct value",
        (currentCase: { element: { Name: string, Age: number }; count: number; expectedCount: number }) => {

            let loopCount: number = 0;
            let currentItem: { Name: string, Age: number } = null!;

            for (const item of LinqArray.repeat(currentCase.element, currentCase.count)) {

                loopCount++;
                currentItem = item;

                if (loopCount === 1) {
                    expect(item).toEqual(currentCase.element);
                }

                if (loopCount == currentCase.count) {
                    expect(item).toEqual(currentCase.element);
                }

                if (loopCount < 1 || loopCount > currentCase.count) {
                    throw new Error("Outside expected range")
                }
            }

            expect(loopCount).toEqual(currentCase.expectedCount);

            if (currentCase.expectedCount > 0) {

                currentCase.element.Age = 1;
                currentCase.element.Name = "Jim";

                expect(currentCase.element.Age).not.toEqual(currentItem.Age);
                expect(currentCase.element.Name).not.toEqual(currentItem.Name);
            }
        }
    );
});
