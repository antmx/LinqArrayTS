import {describe, expect, test} from '@jest/globals';
import LinqArray from '../src/LinqArray';

/**
 * @type {number[]}
 */
let _items: number[];

beforeEach(function () {

	_items = ([1, 2, 3, 4, 5, 6, 7, 8]);
});

describe("aggregate", () => { 

	test("returns correct result", () => {

		let items = new LinqArray(_items); // items is LinqArray<number>

		let aggregateResult = items.aggregate(
			(result, current:number):number => {
				if (current % 2 === 0)
					return result + current;
				else
					return result;
			});

		let expected: number = 2 + 4 + 6 + 8;

		console.info("aggregateResult = " + aggregateResult);
		console.info("expected = " + expected);
		
		expect(aggregateResult).toEqual(expected);
	});

});

// test("Combines the result of applying the predicate function to each item", function () {

// 	let items = new LinqArray<number>(_items);
	
// 	let aggregateResult = items.aggregate(
// 		function (result, current) {
// 			if (current % 2 === 0)
// 				return result + current;
// 			else
// 				return result;
// 		});

// 	let expected = 2 + 4 + 6 + 8;

// 	//expect(expected).toEqual(aggregateResult);
// 	console.info("aggregateResult = " + aggregateResult);
// 	console.info("expected = " + expected);
// 	expect(aggregateResult).toEqual(expected);
// });

/*
test("Combines the result of applying the predicate function to each item", function () {

	let chars = new LinqArray<string>(["a", "b", "c", "d"]);

	let aggregateResult = chars.aggregate(
		function (result, current) {
			return result !== null ? result + ',' + current : current;
		});

	let expected = "a,b,c,d";

	expect(expected).toEqual(aggregateResult);
});

test("Combines the result of applying the predicate function to each item", function () {

	const seed: number = 10;

	let items = new LinqArray<number>(_items);

	let aggregateResult = items.aggregate(
		function (result, current) {
			if (current % 2 == 0)
				return result + current;
			else
				return result;
		},
		seed);

	let expected = 2 + 4 + 6 + 8 + seed;

	expect(expected).toEqual(aggregateResult);
});

test("Combines the result of applying the predicate function to each item then applying result selector", function () {

	const seed = 10;

	let aggregateResult = _items.aggregate(
		function (result, current) {
			if (current % 2 == 0)
				return result + current;
			else
				return result;
		},
		seed,
		function (result) {
			return result / 2;
		});

	let expected = (2 + 4 + 6 + 8 + seed) / 2;

	expect(expected).toEqual(aggregateResult);
});
*/
