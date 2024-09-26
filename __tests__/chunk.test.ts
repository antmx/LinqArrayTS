
import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";
import { log, error } from "console";

// TODO: look into using generator functions for this.
describe('chunk', () => {

    beforeEach(() => {
    });

    // test("Returns an iterator", () => {

    //     let items = new LinqArray([2, 4, 6, 8]);
    //     let result = items.append(10);
    //     let expectedLength = items.length + 1;

    //     expect(result.length).toEqual(expectedLength);
    // });

    test("simple iterator", () => {

        function* simpleGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }

        const iterator = simpleGenerator();

        log(iterator.next()); // { value: 1, done: false }
        log(iterator.next()); // { value: 2, done: false }
        log(iterator.next()); // { value: 3, done: false }
        log(iterator.next()); // { value: undefined, done: true }

        //test.todo("Try out");
        expect(true).toBeTruthy();
    });

    test("Fibonacci iterator", () => {

        function* createFibonacciGenerator() {
            let a = 0;
            let b = 1;
            while (true) {
                yield a;
                [a, b] = [b, a + b];
            }
        }

        debugger;
        const iterator = createFibonacciGenerator();
        log(typeof iterator);

        for (let count = 1; count <= 10; count++) {
            let current = iterator.next();

            log(current.value);
        }

    });
});
