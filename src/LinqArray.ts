
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
     * Determines whether all elements of a sequence satisfy a condition.
     * @param func A function to test each element for a condition.
     */
    all(func: (current: TItem, indexInArray: number) => boolean) {

        if (func == null) {
            throw new Error("ArgumentNull 'func'");
        }

        var item: TItem;

        for (var idx = 0; idx < this.length; idx += 1) {
            item = this[idx];

            if (!func(item, idx)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Determines whether a sequence contains any elements, or whether any element satisfies a condition.
     * @param func An optional function to test each element for a condition.
     * @returns true if the source sequence is not empty and at least one of its elements passes the test in the specified predicate (if specified); otherwise, false
     */
    any(func?: (current: TItem, indexInArray: number) => boolean) {

        if (func === undefined) {
            return this.length > 0;
        }

        let item: TItem = null!;

        for (var idx = 0; idx < this.length; idx++) {
            item = this[idx];

            if (func(item, idx)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Applies an accumulator function over a sequence.
     * @param func An accumulator function to be invoked on each element.
     * @param seed Optional seed value used as the initial accumulator value.
     * @param resultSelector Optional function used to select the final result value.
     * @returns A value of type TItem
     */
    aggregate(
        func: (result: TItem, current: TItem) => TItem,
        seed?: TItem,
        resultSelector?: (result: TItem) => TItem
    ): TItem {

        if (this.length == 0) {
            throw new Error("NoElements");
        }

        if (func == null) {
            throw new Error("ArgumentNull 'func'");
        }

        let result: TItem = null!;

        if (seed !== undefined) {
            result = seed;
        }

        this.forEach((valueOfElement, indexInArray) => {
            result = func(result, valueOfElement);
        });

        if (resultSelector !== undefined) {
            result = resultSelector(result);
        }

        return result!; // Non-null Assertion        
    }

    /**
     * Computes the average of a sequence of numeric values.
     * @param selectorFunc An optional transform function to apply to each element. 
     * @returns 
     */
    average(
        selectorFunc?: (result: TItem) => number
    ): number {

        let total: number = null!;

        this.forEach((valueOfElement: any) => {

            if (selectorFunc !== undefined) {
                valueOfElement = selectorFunc(valueOfElement);
            }

            total += Number(valueOfElement);
        });

        let avg = total / this.length;

        return avg;
    }

    /**
     * Concatenates a second sequence to the current sequence.
     * @param secondItems The sequence to concatenate to the current sequence.
     * @returns An LinqArray<TItem> that contains the concatenated elements of the current sequence and the second sequence.
     */
    concat(
        secondItems: LinqArray<TItem>
    ): LinqArray<TItem> {

        if (secondItems == null) {
            throw new Error("ArgumentNull 'secondItems'");
        }

        let results = new LinqArray<TItem>(this);

        results.push.apply(results, secondItems);

        return results;
    }

    /**
     * Determines whether a sequence contains a specified element by using either the default equality comparer, or an optional specified comparer.
     * @param value The value to locate in the sequence.
     * @param comparerFunc An optional equality comparer to compare values.
     * @returns `true` if the source sequence contains an element that has the specified value; otherwise, `false`.
     */
    contains(
        value: TItem,
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): boolean {

        if (comparerFunc === undefined) {
            comparerFunc = (first: TItem, second: TItem) => first == second;
        }

        let result = false;

        this.forEach(function (valueOfElement, indexInArray) {

            if (comparerFunc(valueOfElement, value)) {
                result = true;
                return false; // break out of forEach
            }
        });

        return result;
    };

    /**
     * Returns the number of elements in a sequence.
     * @returns The number of elements in the sequence.
     */
    count(): number {

        return this.length;
    };

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values, or an optional custom comparer.
     * @param comparerFunc An optional equality comparer function to compare values.
     * @returns A new LinqArray<TItem> that contains distinct elements from the source sequence.
     */
    distinct(
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): LinqArray<TItem> {

        var self = this;
        var results = new LinqArray<TItem>();

        self.forEach((valueOfElement, indexInArray) => {

            if (!results.contains(valueOfElement, comparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };

    /**
     * Returns the element at a specified index in a sequence.
     * @param index The index of the element to retrieve, which is either from the beginning or the end of the sequence.
     * @returns The element at the specified position in the source sequence.
     */
    elementAt(index: number): TItem {

        if (this.length > index) {
            return this[index];
        }

        return null!;
    };

    /**
     * Produces the set difference of two sequences by using either the default equality comparer, or an optional custom equality comparer, to compare values.
     * @param secondItems A LinqArray<TItem> whose elements that also occur in the current sequence will cause those elements to be removed from the returned sequence.
     * @param comparerFunc An optional custom equality comparer to compare values.
     * @returns A sequence that contains the set difference of the elements of two sequences.
     */
    except(
        secondItems: LinqArray<TItem>,
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        let firstItems = this.distinct(comparerFunc);
        secondItems = secondItems.distinct(comparerFunc);

        firstItems.forEach((valueOfElement, indexInArray) => {

            if (!secondItems.contains(valueOfElement, comparerFunc)) {
                results.push(valueOfElement);
            }
        });

        secondItems.forEach((valueOfElement, indexInArray) => {

            if (!this.contains(valueOfElement, comparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    };
    
    /**
     * Projects each element of a sequence into a new form, optionally incorporating the element's index.
     * @param transformFunc A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
     * @returns 
     */
    select<TResultItem>(
        transformFunc: (valueOfElement: TItem, indexInArray: number) => TResultItem
    ): LinqArray<TResultItem> {

        let results = new LinqArray<TResultItem>();
        let resultItem: TResultItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            resultItem = transformFunc(valueOfElement, indexInArray);
            results.push(resultItem);
        });

        return results;
    }

    /**
     * Filters a sequence of values based on a predicate.
     * @param func A function to test each element for a condition.
     * @returns A new LinqArray that contains elements from the input sequence that satisfy the condition.
     */
    where(
        func: (valueOfElement: TItem, indexInArray: number) => boolean): LinqArray<TItem> {

        let result = new LinqArray<TItem>();

        this.forEach((valueOfElement, indexInArray) => {
            if (func(valueOfElement, indexInArray)) {
                result.push(valueOfElement);
            }
        });

        return result;
    }

}
