
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";
import { log, error } from "console";

describe('chunk', () => {

    beforeEach(() => {
    });

    const cases = [
        { arraySize: 10, chunkSize: 10, chunkQty: 1 },
        { arraySize: 40, chunkSize: 10, chunkQty: 4 },
        { arraySize: 35, chunkSize: 10, chunkQty: 4 },
        { arraySize: 0, chunkSize: 10, chunkQty: 0 },
        { arraySize: 0, chunkSize: 0, chunkQty: 0 }
    ];

    test.each(cases)(
        "given %p as arguments, returns expected values",
        (currentCase: { arraySize: number; chunkSize: number; chunkQty: number; }) => {

            let data = [...Array(currentCase.arraySize).keys()];
            let items = new LinqArray(data);
            let size = currentCase.chunkSize;
            let chunkCount = 0;

            for (const chunk of items.chunk(size)) {

                chunkCount++;

                if (chunk.length > 0 && (chunk.length % size) == 0) {
                    expect(chunk.length).toEqual(size);
                }
                else {
                    let expectedFinalChunkSize = items.length % size;
                    expect(chunk.count()).toEqual(expectedFinalChunkSize);
                }
            }

            expect(chunkCount).toEqual(currentCase.chunkQty);
        }
    );
});
