
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

describe('range', () => {

    beforeEach(() => {
    });

    const cases = [
        { start: 10, count: 10, expectedLast: 19 },
        { start: 40, count: 10, expectedLast: 49 },
        { start: 35, count: 10, expectedLast: 44 },
        { start: 0, count: 10, expectedLast: 9 },
        { start: 0, count: 0, expectedLast: 0 },
        { start: 2, count: 13, expectedLast: 14 },
        { start: 11, count: 11, expectedLast: 21 },
        { start: 11, count: 1, expectedLast: 11 }
    ];

    test.each(cases)(
        "Given %p as arguments, returns the expected number of items, each with the correct value",
        (currentCase: { start: number; count: number; expectedLast: number }) => {

            let loopCount: number = 0;

            for (const num of LinqArray.range(currentCase.start, currentCase.count)) {

                loopCount++;

                if (loopCount === 1) {
                    expect(num).toEqual(currentCase.start);
                }

                if (loopCount == currentCase.count) {
                    expect(num).toEqual(currentCase.expectedLast);
                }

                if (loopCount < 1 || loopCount > currentCase.count) {
                    throw new Error("Outside expected range")
                }
            }

            expect(loopCount).toEqual(currentCase.count);
        }
    );
});
