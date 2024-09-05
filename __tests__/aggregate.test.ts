import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

/**
 * Array of numbers
 */
let _items: number[];

beforeEach(function () {
	_items = [1, 2, 3, 4, 5, 6, 7, 8];
});

describe("aggregate", () => {

	test("Combines the result of applying a number accumulator function to each item", () => {

		let items = new LinqArray(_items); // items is of type LinqArray<number>

		let aggregateResult = items.aggregate((result, current) => {
			if (current % 2 === 0) {
				return result + current;
			}
			else {
				return result;
			}
		}); // aggregateResult is of type number

		let expected = 2 + 4 + 6 + 8;

		expect(aggregateResult).toEqual(expected);
	});

	test("Combines the result of applying a string accumulator function to each item", () => {

		let chars = new LinqArray(["a", "b", "c", "d"]);

		let aggregateResult = chars.aggregate(
			(result, current) => {
				return result !== null ? result + ',' + current : current;
			});

		let expected = "a,b,c,d";

		expect(expected).toEqual(aggregateResult);
	});

	test("Combines the result of applying an accumulator function to each item with an an initial seed value", () => {

		let items = new LinqArray(_items); // items is of type LinqArray<number>

		let aggregateResult = items.aggregate((result, current) => {
			if (current % 2 === 0) {
				return result + current;
			}
			else {
				return result;
			}
		}, 10); // aggregateResult is of type number

		let expected = 2 + 4 + 6 + 8 + 10;

		expect(aggregateResult).toEqual(expected);
	});

	test("Combines the result of applying an accumulator function to each item with an an initial seed value then applying a result selector", () => {

		let items = new LinqArray(_items); // items is of type LinqArray<number>

		let aggregateResult = items.aggregate(
			(result, current) => {
				if (current % 2 === 0) {
					return result + current;
				}
				else {
					return result;
				}
			},
			10,
			(result) => {
				return result * 20
			}); // aggregateResult is of type number

		let expected = (2 + 4 + 6 + 8 + 10) * 20;

		expect(aggregateResult).toEqual(expected);
	});
});
