
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
        { arraySize: 0, chunkSize: 0, chunkQty: 0 },
        { arraySize: 2, chunkSize: 13, chunkQty: 1 },
        { arraySize: 11, chunkSize: 11, chunkQty: 1 },
        { arraySize: 11, chunkSize: 1, chunkQty: 11 }
    ];

    test.each(cases)(
        "Given %p as arguments, returns the expected number of chunks, each with the correct values",
        (currentCase: { arraySize: number; chunkSize: number; chunkQty: number; }) => {

            let data = [...Array(currentCase.arraySize).keys()];
            let items = new LinqArray(data);
            let size = currentCase.chunkSize;
            let chunkCount = 0;

            for (const chunk of items.chunk(size)) {

                chunkCount++;

                if (chunkCount == 1) {
                    expect(chunk[0]).toEqual(data[0]);
                }

                if (chunkCount == currentCase.chunkQty) {
                    expect(chunk.last()).toEqual(items.last());
                }

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
