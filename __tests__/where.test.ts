import { describe, expect, test } from "@jest/globals";
import LinqArray from "../src/LinqArray";

/**
 * Array of numbers
 */
let _items: number[];

beforeEach(function () {
	_items = [0, 30, 20, 15, 90, 85, 40, 75];
});

describe("where", () => {

	test("Correctly filters a sequence of values based on a predicate", () => {

		let items = new LinqArray(_items); // items is of type LinqArray<number>
		let whereResult = items.where(current => current % 2 === 0); // whereResult is of type LinqArray<number>
		let expected = [0, 30, 20, 90, 40];

		expect(whereResult).toEqual(expected);
	});

	test("Correctly filters a sequence of values based on a predicate, using each index in the logic of the predicate function", () => {

		let items = new LinqArray(_items); // items is of type LinqArray<number>

		let whereResult = items.where((current, indexInArray) => {
			if (current <= indexInArray * 10) {
				return true;
			}

			return false;
		}); // whereResult is of type LinqArray<number>

		let expected = [0, 20, 15, 40];

		expect(whereResult).toEqual(expected);
	});

});
