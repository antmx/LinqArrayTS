
/**
 * An array with LINQ-like functions.
 * @template TItem The type of the items in the array
 */
export default class LinqArray<TItem> extends Array<TItem> {

    /**
     * @param items An optional array of items to add to the new {@link LinqArray} instance
     */
    constructor(items?: Array<TItem>) {
        if (items != null) {
            super(...items)
        }
        else {
            super();
        }
    }

    // /**
    //  * @param {ArrayLike} [items] An optional array of items to add to the new LinqArray instance
    //  */
    // constructor(items) {
    //     if (Object.prototype.toString.call(items) === '[object Array]') {
    //         super(...items);
    //     }
    //     else if (Object.prototype.toString.call(items) === '[object String]') {
    //         let stringArray = items.split("");
    //         super(...stringArray);
    //     }
    //     else {
    //         super();
    //     }
    // }    

    /**
     * Adds the given sequence to the instance.
     * @param items The items to add.
     * @param {ArrayLike} items List of items to add.
     */
    addItems(items: Array<TItem>): void {
        items.forEach(item => this.push(item));
    }

    /**
     * Filters a sequence of values based on a predicate.
     * @param predicateFn A function to test each element for a condition.
     * @returns A new LinqArray that contains elements from the input sequence that satisfy the condition.
     */
    where(predicateFn: (val: TItem) => boolean): LinqArray<TItem> {

        let result = new LinqArray<TItem>();

        this.forEach((val, idx) => {
            if (predicateFn(val)) {
                result.push(val);
            }
        });

        return result;
    }

    /**
     * Applies an accumulator function over a sequence.
     * @param fn An accumulator function to be invoked on each element.
     * @param seed Optional seed value used as the initial accumulator value.
     * @param resultSelector Optional function used to select the result value.
     * @returns 
     */
    // aggregate(fn: (result: any, current: TItem) => TItem): TItem;
    // aggregate(fn: (result: any, current: TItem) => TItem, seed: TItem): TItem;
    // aggregate(
    //     fn: (result: any, current: TItem) => TItem,
    //     seed?: TItem,
    //     resultSelector?: (result: TItem) => any): TItem {

    //     //let result = null;
    //     //let result = seed;
    //     let result = seed;

    //     this.forEach((valueOfElement, indexInArray) => {
    //         result = fn(result, valueOfElement);
    //     });

    //     return result;
    // }

    /**
     * Applies an accumulator function over a sequence.
     * Based on https://github.com/microsoft/referencesource/blob/master/System.Core/System/Linq/Enumerable.cs#L1379
     * @param func An accumulator function to be invoked on each element.
     * @returns 
     */
    //aggregate(func: (result?: TItem, current?: TItem) => TItem): TItem {
    aggregate(func: (result: TItem, current: TItem) => TItem): TItem {

        if (this.length == 0) {
            throw new Error("NoElements");
        }

        if (func == null) {
            throw new Error("ArgumentNull 'func'");
        }

        let result: TItem = null!; // = undefined;
        
        this.forEach((valueOfElement, indexInArray) => {
            if (indexInArray > 0) {
                result = func(result, valueOfElement);
            }
        });

        return result!; // Non-null Assertion
    }


    // aggregate<TAccumulate, TResult>(
    //     fn: (result: any, current: TItem) => TItem,
    //     seed?: TAccumulate,


    // )

}

//module.exports = LinqArray;