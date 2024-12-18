
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

            if (items.length === 1) {
                throw new Error("Cannot construct with single-item array; try parameterless constructor, then call .push(item: TItem)");
            }

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
    addItems(
        items: Array<TItem>
    ): void {

        items.forEach(item => this.push(item));
    }

    /**
     * Determines whether all elements of a sequence satisfy a condition.
     * @param func A function to test each element for a condition.
     * @returns `true` if every element of the sequence passes the test in the specified predicate function, or if the sequence is empty; otherwise, `false`.
     */
    all(
        func: (current: TItem, indexInArray: number) => boolean
    ): boolean {

        if (func === undefined) {
            throw new Error("ArgumentNull 'func'");
        }

        let item: TItem;

        for (let idx = 0; idx < this.length; idx += 1) {
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
     * @returns `true` if the source sequence is not empty and at least one of its elements passes the test in the specified predicate (if specified); otherwise, `false`.
     */
    any(
        func?: (current: TItem, indexInArray: number) => boolean
    ): boolean {

        if (func === undefined) {
            return this.length > 0;
        }

        let item: TItem = null!;

        for (let idx = 0; idx < this.length; idx++) {
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
     * @returns A value of type `TItem`.
     */
    aggregate(
        func: (result: TItem, current: TItem) => TItem,
        seed?: TItem,
        resultSelector?: (result: TItem) => TItem
    ): TItem {

        if (this.length == 0) {
            throw new Error("NoElements");
        }

        if (func === undefined) {
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
     * Appends a value to the end of the sequence.
     * @param element The value to append to the sequence.
     * @returns A new sequence that ends with `element`.
     */
    append(
        element: TItem
    ): LinqArray<TItem> {

        let items = this.clone();

        items.push(element);

        return items;
    }

    /**
     * Computes the average of a sequence of numeric values.
     * @param selectorFunc An optional transform function to apply to each element. 
     * @returns The average of the sequence of values.
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
     * Splits the elements of a sequence into chunks of size at most `size`.
     * @param size The maximum size of each chunk.
     * @returns Because this is a generator function, it returns an iterable collection of `LinqArray<TItem>`s, which can be iterated over in a for..of loop.
     */
    *chunk(
        size: number
    ): IterableIterator<LinqArray<TItem>> {

        let count = 0;
        let chunkItems = new LinqArray<TItem>();
        const iterator = this[Symbol.iterator]();

        while (true) {

            count++;
            let current = iterator.next();

            if (!current.done) {
                chunkItems.push(current.value);

                if (count == size) {
                    count = 0;
                    yield chunkItems;
                    chunkItems = new LinqArray<TItem>();
                }
            }
            else {
                if (chunkItems.length > 0) {
                    yield chunkItems;
                }

                break;
            }
        }
    }

    /**
     * Creates a shallow copy of the `LinqArray`.
     * @returns A generator object new LinqArray containing the source array's items.
     */
    clone(): LinqArray<TItem> {

        let result = new LinqArray<TItem>();

        this.forEach(itm => {
            result.push(itm);
        });

        return result;
    }

    /**
     * Concatenates a second sequence to the current sequence.
     * @param secondItems The sequence to concatenate to the current sequence.
     * @returns A `LinqArray<TItem>` that contains the concatenated elements of the current sequence and the second sequence.
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
        let valueOfElement: TItem;

        for (let indexInArray = 0; indexInArray < this.length; indexInArray++) {
            valueOfElement = this[indexInArray];

            if (comparerFunc(valueOfElement, value)) {
                result = true;
                break;
            }
        }

        return result;
    }

    /**
     * Returns a number that represents how many elements in the specified sequence satisfy an optional condition.
     * @param predicateFunc An optional function to test each element for a condition.
     * @returns A number that represents how many elements in the sequence and that optionally satisfy the condition in the optional predicate function.
     */
    count(
        predicateFunc?: (itm: TItem) => boolean
    ): number {

        if (predicateFunc == undefined) {
            return this.length;
        }

        return this.where(predicateFunc).length;
    }

    /**
     * Returns the elements of a `LinqArray<TItem>`, or a default valued singleton collection if the sequence is empty.
     * @param defaultValue The value to return if the sequence is empty.
     * @returns A `LinqArray<TItem>` that contains `defaultValue` if source is empty; otherwise, the source sequence.
     */
    defaultIfEmpty(
        defaultValue: TItem
    ): LinqArray<TItem> {

        if (this.length > 0) {
            return this;
        }

        let resultItems = new LinqArray<TItem>();
        resultItems.push(defaultValue);

        return resultItems;
    }

    /**
     * Returns distinct elements from a sequence by using the default equality comparer to compare values, or an optional custom comparer.
     * @param comparerFunc An optional equality comparer function to compare values.
     * @returns A new `LinqArray<TItem>` that contains distinct elements from the source sequence.
     */
    distinct(
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): LinqArray<TItem> {

        let self = this;
        let results = new LinqArray<TItem>();

        self.forEach((valueOfElement, indexInArray) => {

            if (!results.contains(valueOfElement, comparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Returns distinct elements from a sequence according to a specified key selector function and using an optional comparer function to compare keys.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param comparerFunc An optional equality comparer function to compare keys.
     * @returns A new `LinqArray<TItem>` that contains distinct elements from the source sequence.
     */
    distinctBy<TKey>(
        keySelectorFunc: (item: TItem) => TKey,
        comparerFunc?: (first: TKey, second: TKey) => boolean
    ): LinqArray<TItem> {

        let self = this;
        let results = new LinqArray<TItem>();

        if (comparerFunc == undefined) {
            comparerFunc = (first: TKey, second: TKey) => first == second;
        }

        let keyComparerFunc = (first: TItem, second: TItem) =>
            comparerFunc(keySelectorFunc(first), keySelectorFunc(second));

        self.forEach((valueOfElement, indexInArray) => {

            if (!results.contains(valueOfElement, keyComparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Returns the element at a specified index in a sequence.
     * @param index The index of the element to retrieve, which is either from the beginning or the end of the sequence.
     * @returns The element at the specified position in the sequence.
     */
    elementAt(
        index: number
    ): TItem {

        if (this.length > index) {
            return this[index];
        }

        return null!;
    }

    /**
     * Returns the element at a specified index in a sequence or a default value if the index is out of range.
     * @param index The index from the beginning of the sequence of the element to retrieve.
     * @param defaultValue The value to return if no item exists at the specified index.
     * @returns The element at the specified position in the sequence, or `defaultValue` if `index` is out of range.
     */
    elementAtOrDefault(
        index: number,
        defaultValue: TItem
    ): TItem {

        if (this.length > index) {
            return this[index];
        }

        return defaultValue;
    }

    /**
     * Returns an empty LinqArray<T> that has the specified type argument.
     * @returns An empty LinqArray<T> whose type argument is `TItem`.
     */
    empty(): LinqArray<TItem> {

        return new LinqArray<TItem>();
    }

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
    }

    /**
     * Produces the set difference of two sequences according to a specified key selector function.
     * @param secondItems A LinqArray<TItem> whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param keyComparerFunc The equality comparer function to compare key values.
     * @returns A sequence that contains the set difference of the elements of two sequences.
     */
    exceptBy<TKey>(
        secondItems: LinqArray<TItem>,
        keySelectorFunc: (itm: TItem) => TKey,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        if (secondItems == undefined) {
            throw new Error("ArgumentNull 'secondItems'");
        }

        let keys = secondItems.select(keySelectorFunc);
        let key: TKey;

        this.forEach((valueOfElement, indexInArray) => {

            key = keySelectorFunc(valueOfElement);

            if (keys.contains(key, keyComparerFunc)) {
                return;
            }

            keys.push(key);
            results.push(valueOfElement);
        })

        return results;
    }

    /**
     * Returns the first element in a sequence that optionally satisfies a specified condition.
     * @param predicateFunc An optional function to test each element for a condition.
     * @returns The first element in the sequence that optionally passes the test in the specified predicate function (if specified).
     */
    first(
        predicateFunc?: (itm: TItem) => boolean
    ): TItem {

        if (predicateFunc == undefined) {

            if (this.length === 0) {
                throw new Error("NoElements");
            }

            return this[0];
        }

        let item: TItem;

        for (let idx = 0; idx < this.length; idx++) {
            item = this[idx];

            if (predicateFunc(item)) {
                return item;
            }
        }

        throw new Error("NoMatchingElements");
    }

    /**
     * Returns the first element of a sequence, or a default value if no element is found.
     * @param defaultValue The default value to return if the sequence is empty or no matching item is found.
     * @param predicateFunc An optional function to test each element for a condition.
     * @returns `defaultValue` if source is empty or if no element passes the test specified by predicate; otherwise, the first element in source that passes the test specified by predicate.
     */
    firstOrDefault(
        defaultValue: TItem,
        predicateFunc?: (itm: TItem) => boolean
    ): TItem {

        if (predicateFunc === undefined) {

            return this.length === 0 ? defaultValue : this[0];
        }

        let item: TItem;

        for (let idx = 0; idx < this.length; idx++) {
            item = this[idx];

            if (predicateFunc(item)) {
                return item;
            }
        }

        return defaultValue;
    }

    /**
     * Groups the elements of a sequence according to a specified key selector function.
     * @param keySelectorFunc A function to extract the key for each element.
     * @template TKey The type of the group keys.
     * @template TResultItem The type of the group items.
     * @returns A LinqArray<{TKey, TResultItem}> of groups, where each group object contains a key and a collection of objects.
     */
    groupBy<TKey, TResultItem>(
        keySelectorFunc: (itm: TItem) => TKey,
        elementSelectorFunc: (itm: TItem) => TResultItem
    ): LinqArray<{ key: TKey, items: LinqArray<TResultItem> }> {

        let groups = new LinqArray<{
            key: TKey,
            items: LinqArray<TResultItem>
        }>;

        if (this.length === 0) {
            return groups;
        }

        let itemGroupKey: TKey;
        let group: { key: TKey, items: LinqArray<TResultItem> };

        this.forEach((valueOfElement, indexInArray) => {

            // Get item's group key
            itemGroupKey = keySelectorFunc(valueOfElement);

            // Find for the current item's group, or create a new one
            group = groups.firstOrDefault(
                { key: itemGroupKey, items: new LinqArray<TResultItem>() },
                (grp: { key: TKey, items: LinqArray<TResultItem> }): boolean => grp.key == itemGroupKey
            );

            // Add this group to the groups collection if new, i.e. no items
            if (group.items.length === 0) {
                groups.push(group);
            }

            // Add current item to the group's items
            let item: TResultItem = elementSelectorFunc(valueOfElement);

            group.items.push(item);
        });

        return groups;
    }

    /**
     * Correlates the elements of two sequences based on key equality and groups the results - this works like an outer join, i.e. an item from the source array will always be included in the results, even if there are no correspodning items in the `inner` array.
     * A optional equality comparer function is used to compare keys.
     * @param inner The sequence to join to the first sequence.
     * @param outerKeySelector A function to extract the join key from each element of the first sequence.
     * @param innerKeySelector A function to extract the join key from each element of the second sequence.
     * @param resultSelector A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
     * @param keyComparerFunc An optional equality comparer function to hash and compare keys.
     * @template TInner The type of the elements of the second sequence.
     * @template TKey The type of the keys returned by the key selector functions.
     * @template TResult The type of the result elements.
     * @returns An `LinqArray<{TResult}>` that contains elements obtained by performing a grouped join on two sequences.
     */
    groupJoin<TInner, TKey, TResult>(
        inner: LinqArray<TInner>,
        outerKeySelector: (itm: TItem) => TKey,
        innerKeySelector: (itm: TInner) => TKey,
        resultSelector: (itm: TItem, inner: LinqArray<TInner>) => TResult,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ): LinqArray<TResult> {

        let result = new LinqArray<TResult>();

        if (keyComparerFunc == undefined) {
            keyComparerFunc = (first: TKey, second: TKey) => first == second;
        }

        let outerKey: TKey;

        this.forEach((valOuter, idxOuter) => {

            outerKey = outerKeySelector(valOuter);

            let matchingInnerItems: LinqArray<TInner> = inner.where(innerItm => keyComparerFunc(outerKey, innerKeySelector(innerItm)));
            let resultItem = resultSelector(valOuter, matchingInnerItems);

            result.push(resultItem);
        });

        return result;
    }

    /**
     * Returns the index of the first occurrence of a value in an array based on a finder function, or -1 if it is not present.
     * @param valueToFind The value whose index is sought.
     * @param finderFunc An comparer function to compare element values against @param valueToFind.
     * @returns A number indicating the zero-based index of the sought element, or -1 if not found.
     */
    indexOf2<TKey>(
        valueToFind: TKey,
        finderFunc: (valueOfElement: TItem, valueToFind: TKey) => boolean
    ): number {

        let index = -1;

        this.forEach((valueOfElement, indexInArray) => {

            if (finderFunc(valueOfElement, valueToFind)) {
                index = indexInArray;
                return false; // Exit forEach
            }
        })

        return index;
    }

    /**
     * Produces the set intersection of two sequences, using an optional equality comparer method to compare values.
     * @param secondItems A LinqArray<TItem> whose distinct elements that also appear in the first sequence will be returned.
     * @param comparerFunc? An optional equality comparer function to compare values.
     * @returns A sequence that contains the elements that form the set intersection of two sequences.
     */
    intersect(
        secondItems: LinqArray<TItem>,
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        this.distinct(comparerFunc).forEach((valueOfElement, indexInArray) => {

            if (secondItems.contains(valueOfElement, comparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Produces the set intersection of two sequences according to a specified key selector function.
     * @param secondItems A `LinqArray<TKey>` whose distinct elements that also appear in the first sequence will be returned.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param keyComparerFunc An optional equality comparer function to compare keys.
     * @returns A sequence that contains the elements that form the set intersection of two sequences.
     */
    intersectBy<TKey>(
        secondItems: LinqArray<TKey>,
        keySelectorFunc: (itm: TItem) => TKey,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        this.distinct().forEach((valueOfElement, indexInArray) => {

            if (secondItems.contains(keySelectorFunc(valueOfElement), keyComparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Correlates the elements of two sequences based on matching keys - this works like an inner join, i.e. an item from the source array will only be included in the results if there are correspodning items in the `inner` array.
     * An optional equality comparer function can be used to compare keys.
     * @template TInner The type of the elements in the second sequence.
     * @template TKey The type of the keys returned by the key selector functions.
     * @template TResultItem The type of the result elements.
     * @param inner The second sequence to join to the first sequence.
     * @param outerKeySelector A function to extract the join key from each element of the first sequence.
     * @param innerKeySelector A function to extract the join key from each element of the second sequence.
     * @param resultSelector A function to create a result element from two matching elements.
     * @param keyComparerFunc An optional equality comparer function to compare keys; if not specified, default key value comparison is performed.
     * @returns A LinqArray<TResultItem> that has elements obtained by performing an inner join on two sequences.
     */
    join2<TInner, TKey, TResult>(
        inner: LinqArray<TInner>,
        outerKeySelector: (item: TItem) => TKey,
        innerKeySelector: (item: TInner) => TKey,
        resultSelector: (first: TItem, second: TInner) => TResult,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ): LinqArray<TResult> {

        let result = new LinqArray<TResult>();

        if (keyComparerFunc == undefined) {
            keyComparerFunc = (first: TKey, second: TKey) => first == second;
        }

        let outerKey: TKey;
        let innerKey: TKey;

        this.forEach((valOuter, idxOuter) => {

            outerKey = outerKeySelector(valOuter);

            inner.forEach((valInner, idxInner) => {

                innerKey = innerKeySelector(valInner);

                if (keyComparerFunc(outerKey, innerKey)) {

                    let resultItem = resultSelector(valOuter, valInner);
                    result.push(resultItem);
                }
            });
        });

        return result;
    }

    /**
     * Returns the last element of a sequence that satisfies an optional specified condition.
     * @param predicateFunc An optional function to test each element for a condition.
     * @returns The last element in the sequence that optionally passes the test in the specified optional predicate function.
     */
    last(
        predicateFunc?: (itm: TItem) => boolean
    ): TItem {

        if (predicateFunc === undefined) {

            if (this.length == 0) {
                throw new Error("NoElements");
            }

            return this[this.length - 1];
        }

        let item: TItem;

        for (let idx: number = this.length - 1; idx >= 0; idx--) {
            item = this[idx];

            if (predicateFunc(item)) {
                return item;
            }
        }

        throw new Error("NoMatchingElements");
    }

    /**
     * Returns the last element of a sequence that satisfies an optional condition, or a specified default value if no such element is found.
     * @param defaultValue
     * @param predicateFunc An optional function to test each element for a condition.
     * @returns `defaultValue` if the sequence is empty or if no elements pass the test in the optional predicate function; otherwise, the last element that passes the test in the predicate function, if specified.
     */
    lastOrDefault(
        defaultValue: TItem,
        predicateFunc?: (itm: TItem) => boolean
    ): TItem {

        if (predicateFunc === undefined) {

            if (this.length == 0) {
                return defaultValue;
            }

            return this[this.length - 1];
        }

        let item: TItem;

        for (let idx: number = this.length - 1; idx >= 0; idx--) {
            item = this[idx];

            if (predicateFunc(item)) {
                return item;
            }
        }

        return defaultValue;
    }

    /**
     * Returns the maximum value in a generic sequence.
     * @param comparerFunc An optional comparer function to compare values.
     * @returns The maximum value in the sequence.
     */
    max(
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): TItem {

        if (comparerFunc == undefined) {
            comparerFunc = (first: TItem, second: TItem) => {
                return first > second;
            };
        }

        let result: TItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            if (!result || comparerFunc(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    }

    /**
     * Returns the maximum value in a sequence according to a specified key selector function and key comparer function.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param keyComparerFunc An optional comparer function to compare keys.
     * @template TKey The type of key to compare elements by.
     * @returns The value with the maximum key in the sequence.
     */
    maxBy<TKey>(
        keySelectorFunc: (itm: TItem) => TKey,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ): TItem {

        if (keyComparerFunc == undefined) {
            keyComparerFunc = (first: TKey, second: TKey) => {
                return first > second
            };
        }

        let result: TItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            if (!result || keyComparerFunc(keySelectorFunc(valueOfElement), keySelectorFunc(result))) {
                result = valueOfElement;
            }
        });

        return result;
    }

    /**
     * Returns the minimum value in a sequence.
     * @param comparerFunc An optional comparer function to compare values.
     * @returns The minimum value in the sequence.
     */
    min(
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): TItem {

        if (comparerFunc == undefined) {
            comparerFunc = (first, second) => {
                return first < second;
            };
        }

        let result: TItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            if (!result || comparerFunc(valueOfElement, result)) {
                result = valueOfElement;
            }
        });

        return result;
    }

    /**
     * Returns the minimum value in a sequence according to a specified key selector function and key comparer function.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param keyComparerFunc An optional comparer function to compare keys.
     * @template TKey The type of key to compare elements by.
     * @returns The value with the minimum key in the sequence.
     */
    minBy<TKey>(
        keySelectorFunc: (itm: TItem) => TKey,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ): TItem {

        if (keyComparerFunc == undefined) {
            keyComparerFunc = (first: TKey, second: TKey) => {
                return first < second
            };
        }

        let result: TItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            if (!result || keyComparerFunc(keySelectorFunc(valueOfElement), keySelectorFunc(result))) {
                result = valueOfElement;
            }
        });

        return result;
    }

    /**
     * Sorts the elements of a sequence in ascending order, using an optional custom comparer function.
     * @param comparerFunc An optional equality comparer to compare values.
     * @returns A `LinqArray<TItem>` whose elements are sorted in ascending order.
     */
    order(
        comparerFunc?: (first: TItem, second: TItem) => number
    ): LinqArray<TItem> {

        let items = this.clone();

        let compareFn: (first: TItem, second: TItem) => number

        if (comparerFunc == undefined) {
            compareFn = (a: TItem, b: TItem) => {

                if (a < b) {
                    return -1;
                }

                if (a > b) {
                    return 1;
                }

                return 0;

            };
        } else {
            compareFn = (a: TItem, b: TItem) => {

                return comparerFunc(a, b);
            };
        }

        items.sort(compareFn);

        return items;
    }

    /**
     * Sorts the elements of a sequence in ascending order, using an optional custom comparer function.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param comparerFunc An optional equality comparer to compare values.
     * @returns A `LinqArray<TItem>` whose elements are sorted according to a key.
     */
    orderBy<TKey>(
        keySelectorFunc: (itm: TItem) => TKey,
        comparerFunc?: (first: TKey, second: TKey) => number
    ): LinqArray<TItem> {

        let items = this.clone();

        let compareFn: (first: TItem, second: TItem) => number

        if (comparerFunc == undefined) {
            compareFn = (a: TItem, b: TItem) => {

                if (keySelectorFunc(a) < keySelectorFunc(b)) {
                    return -1;
                }

                if (keySelectorFunc(a) > keySelectorFunc(b)) {
                    return 1;
                }

                return 0;

            };
        } else {
            compareFn = (a: TItem, b: TItem) => {
                let keyA = keySelectorFunc(a);
                let keyB = keySelectorFunc(b);

                return comparerFunc(keyA, keyB);
            };
        }

        items.sort(compareFn);

        return items;
    }

    /**
     * Sorts the elements of a sequence in descending order, optionally using a custom comparer function.
     * @param keySelectorFunc A function to extract the key for each element.
     * @param comparerFunc An optional equality comparer to compare values.
     * @returns A `LinqArray<TItem>` whose elements are sorted in descending order according to a key.
     */
    orderByDescending<TKey>(
        keySelectorFunc: (itm: TItem) => TKey,
        comparerFunc?: (first: TKey, second: TKey) => number
    ): LinqArray<TItem> {

        let results = this.orderBy(keySelectorFunc, comparerFunc).reverse2();

        return results;
    }

    /**
     * Sorts the elements of a sequence in descending order, optionally using a custom comparer function.
     * @param comparerFunc An optional equality comparer to compare values.
     * @returns A `LinqArray<TItem>` whose elements are sorted in descending order.
     */
    orderDescending(
        comparerFunc?: (first: TItem, second: TItem) => number
    ): LinqArray<TItem> {

        let results = this.order(comparerFunc).reverse2();

        return results;
    }

    /**
     * Prepends a value to the start of the sequence.
     * @param element The value to prepend to the sequence.
     * @returns A new sequence that starts with `element`.
     */
    prepend(
        element: TItem
    ): LinqArray<TItem> {

        let items = this.clone();

        items.unshift(element);

        return items;
    }

    /**
     * Creates a new `LinqArray<TItem>` containing the items of the source array in reverse order.
     */
    reverse2(): LinqArray<TItem> {

        let resultItems = this.clone().reverse();
        let result = new LinqArray(resultItems);

        return result;
    }

    /**
     * Generates a sequence of numbers within a specified range.
     * @param start The value of the first integer in the sequence.
     * @param count The number of sequential integers to generate.
     * @returns This is a generator function, so it returns an iterable collection of `number` values in the given range (inclusive), which can be iterated over in a for..of loop.
     */
    static *range(
        start: number,
        count: number
    ): IterableIterator<number> {

        if (count < 0) {
            throw new Error(`CannotBeLessThanZero '${count}'`);
        }

        if (start + count > Number.MAX_VALUE) {
            throw new Error(`OutOfRange '${start} + ${count}'`);
        }

        for (let num = start; num <= start + count - 1; num++) {
            yield num;
        }
    }

    /**
     * Generates a sequence that contains a value repeated a specified number of times.
     * @param element The value to be repeated.
     * @param count The number of times to repeat the value in the generated sequence.
     * @template TResult The type of the element to be repeated in the result sequence.
     * @returns An `IterableIterator<TResult>` that contains a repeated value.
     */
    static *repeat<TResult>(
        element: TResult,
        count: number
    ): IterableIterator<TResult> {

        for (let idx = 0; idx < count; idx++) {
            let copy = { ...element }; // Use spread to create a copy
            yield copy;
        }
    }

    /**
     * Projects each element of a sequence into a new form, optionally incorporating the element's index.
     * @param transformFunc A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
     * @returns A LinqArray<TResultItem> whose elements are the result of invoking the transform function on each element of the LinqArray instance.
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
     * Projects each element of a sequence to an LinqArray<TCollectionItem>, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.
     * @param subCollectionSelectorFunc A transform function to apply to each element of the input sequence.
     * @param transformFunc A transform function to apply to each element of the intermediate sequence.
     * @returns An `LinqArray<TResultItem>` whose elements are the result of invoking the one-to-many transform function `collectionSelector` 
     * on each element of source and then mapping each of those sequence elements and their corresponding source element to a result element.
     */
    selectMany<TCollectionItem, TResultItem>(
        subCollectionSelectorFunc: (itm: TItem) => LinqArray<TCollectionItem>,
        transformFunc: (valueOfElement: TCollectionItem, indexInArray: number) => TResultItem
    ): LinqArray<TResultItem> {

        if (this.length === 0) {
            return new LinqArray<TResultItem>();
        }

        let results = new LinqArray<TResultItem>();
        let subElements = new LinqArray<TCollectionItem>();
        let resultItem: TResultItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            subElements = subCollectionSelectorFunc(valueOfElement);

            subElements.forEach((subValueOfElement, subIndexInArray) => {

                resultItem = transformFunc(subValueOfElement, indexInArray);
                results.push(resultItem);
            });
        });

        return results;
    }

    /**
     * Determines whether two sequences are equal by comparing their elements, using an optional specified equality comparer function.
     * @param second A `LinqArray<TItem>` to compare to the first sequence.
     * @param comparerFunc An optional equality comparer function to use to compare elements.
     * @returns `true` if the two source sequences are of equal length and their corresponding elements compare equal according to either default or optional custom comparer; otherwise, `false`.
     */
    sequenceEqual(
        second: LinqArray<TItem>,
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): boolean {

        if (second == undefined) {
            throw new Error(`ArgumentNull 'second'`);
        }

        if (this.length != second.length) {
            return false;
        }

        if (comparerFunc === undefined) {
            comparerFunc = (first: TItem, second: TItem) => first == second;
        }

        let result = true;

        this.forEach((valueOfElement, indexInArray) => {

            if (!comparerFunc(valueOfElement, second[indexInArray])) {
                result = false;
                return false; // Exit forEach
            }
        });

        return result
    }

    /**
     * Sets the specified element in the current Array to the specified value.
     * @param value The new value for the specified element.
     * @param indices A one-dimensional array of integers that represent the indexes specifying the co-ordinates of the element to set in an n-demonsional array.
     */
    setValue(
        value: any, indices: number | number[]
    ): void {

        if (typeof indices === "number") {
            indices = [indices];
        }

        if ((indices as number[]).length === 0) {
            throw new Error("NoElements 'indices'");
        }

        let currentDimensionArray: Array<any> = this;
        let currentIndex = -1;

        for (let idx = 0; idx < indices.length; idx++) {

            currentIndex = indices[idx];

            if (idx < indices.length - 1) {
                currentDimensionArray = currentDimensionArray[indices[idx]];
            }
        }

        currentDimensionArray[currentIndex] = value;
    }

    /**
     * Returns the only element of a sequence that satisfies an optional specified condition, and throws an exception if more than one such element exists.
     * @param predicateFunc An optional function to test an element for a condition.
     * @returns The single element of the input sequence that satisfies a condition.
     */
    single(
        predicateFunc?: (itm: TItem) => boolean
    ): TItem {

        if (this.length === 0) {
            throw new Error("NoElements")
        }

        let count = 0;

        if (predicateFunc == undefined) {
            predicateFunc = (valueOfElement: TItem) => {
                return true;
            };
        }

        let result: TItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            if (predicateFunc(valueOfElement)) {
                result = valueOfElement;
                count++;
            }
        });

        switch (count) {
            case 0: throw new Error("NoMatchingElements");
            case 1: return result;
        }

        throw new Error("MoreThanOneMatchingElements");
    }

    /**
     * Returns a single, specific element of a sequence, that optionally satisfies an optional condition, or a default value if that element is not found.
     * @param defaultValue The default value to return if the sequence is empty or no matching item is found.
     * @param predicateFunc An optional function to test an element for a condition.
     * @returns The single element of the input sequence that optionally satisfies the condition, or `defaultValue` if no such element is found.
     */
    singleOrDefault(
        defaultValue: TItem,
        predicateFunc?: (itm: TItem) => boolean
    ): TItem {

        if (this.length === 0) {
            throw new Error("NoElements")
        }

        let count = 0;

        if (predicateFunc == undefined) {
            predicateFunc = function () {
                return true;
            };
        }

        let result: TItem = null!;

        this.forEach((valueOfElement, indexInArray) => {

            if (predicateFunc(valueOfElement)) {
                result = valueOfElement;
                count += 1;
            }
        });

        switch (count) {
            case 0: return defaultValue;
            case 1: return result;
        }

        throw new Error("MoreThanOneMatchingElements");
    }

    /**
     * Bypasses a specified number of elements in a sequence and then returns the remaining elements.
     * @param count The number of elements to skip before returning the remaining elements.
     * @returns An new `LinqArray<TItem>` that contains the elements that occur after the specified index in the input sequence.
     */
    skip(count: number): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        if (count <= 0) {
            return results;
        }

        this.forEach((valueOfElement, indexInArray) => {

            if (indexInArray + 1 > count) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Returns a new `LinqArray<TItem>` that contains the elements from source with the last `count` elements of the source collection omitted.
     * @param count The number of elements to omit from the end of the collection.
     * @returns A new enumerable collection that contains the elements from source minus `count` elements from the end of the collection.
     */
    skipLast(
        count: number
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        if (count <= 0) {
            return results;
        }

        this.forEach((valueOfElement, indexInArray) => {

            if (indexInArray < this.length - count) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index can be used in the logic of the predicate function.
     * @param predicateFunc A function to test each element for a condition.
     * @returns A new LinqArray<TItem> that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.
     */
    skipWhile(
        predicateFunc: (itm: TItem, idx: number) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();
        let yielding = false;

        this.forEach((valueOfElement, indexInArray) => {

            if (!yielding && !predicateFunc(valueOfElement, indexInArray)) {
                yielding = true;
            }

            if (yielding) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /** Computes the sum of the sequence of numeric values that are obtained by invoking a transform function on each element of the input sequence.
    * @param transformFunc Optional function that transforms, or selects a property of, the items before summing them.
    * @returns {number} Returns a number representing the sum total.
    */
    sum(
        transformFunc?: (itm: TItem, idx: number) => number
    ): number {

        if (transformFunc == undefined) {

            transformFunc = (itm: TItem) => {

                let parsed = parseFloat(new Object(itm).toString());

                return isNaN(parsed) ? 0 : parsed;
            };
        }

        let total = 0;

        this.forEach((valueOfElement, indexInArray) => {

            total += transformFunc(valueOfElement, indexInArray);
        });

        return total;
    }

    /**
     * Returns a specified range of contiguous elements from a sequence.
     * @param range Either: 
     * 1) The number of items to return from the start of the sequence (e.g. `2` returns the first two items). 
     * 2) The range of indexes (inclusive) to return (e.g. `[3, 5]` returns the fourth to sixth items). 
     * 3) The number of items to return from the end (e.g. [3, -1] returns the last three items).
     * @returns A new `LinqArray<TItem>` that contains the specified range of elements from the source sequence.
     */
    take(
        range: number | number[]
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();
        let actualStartIdx: number = 0;
        let actualEndIdx: number = 0;

        if (typeof range === "number") {
            // Count from start
            actualStartIdx = 0;
            actualEndIdx = range - 1;
        }
        else if (range[1] == -1) {
            // Count from the end
            actualEndIdx = this.length - 1;
            actualStartIdx = actualEndIdx - range[0] + 1;
        }
        else {
            // Index range
            actualStartIdx = range[0];
            actualEndIdx = range[1];
        }

        this.forEach((valueOfElement, indexInArray) => {

            if (indexInArray >= actualStartIdx && indexInArray <= actualEndIdx) {
                results.push(valueOfElement);
            }
            else if (indexInArray > actualEndIdx) {
                // Exit forEach
                return false;
            }
        });

        return results;
    }

    /**
     * Returns a new `LinqArray<TItem>` that contains the last `count` elements from source.
     * @param count The number of elements to take from the end of the collection.
     * @returns A new enumerable collection that contains the last `count` elements from source.
     */
    takeLast(
        count: number
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        this.forEach((valueOfElement, indexInArray) => {

            if (indexInArray >= this.length - count) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Returns elements from a sequence as long as a specified condition is true. The element's index can be used in the logic of the predicate function.
     * @param predicateFunc A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
     * @returns An new LinqArray<TItem> that contains elements from the input sequence that occur before the element at which the test no longer passes.
     */
    takeWhile(
        predicateFunc: (itm: TItem, idx: number) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();
        let valueOfElement: TItem;

        for (let indexInArray = 0; indexInArray < this.length; indexInArray++) {
            valueOfElement = this[indexInArray];

            if (predicateFunc(valueOfElement, indexInArray)) {
                results.push(valueOfElement);
            } else {
                break;
            }
        }

        return results;
    }

    /**
     * Creates a `Dictionary<TKey, TValue>` according to a specified key selector function, a comparer, and an element selector function.
     * @param keySelectorFunc A function to extract a key from each element.
     * @param elementSelectorFunc A transform function to produce a result element value from each element.
     * @param keyComparerFunc An equality comparer function to compare keys.
     * @returns A `Dictionary<TKey, TValue>` that contains values of type `TElement` selected from the source sequence.
     */
    toDictionary<TKey, TElement>(
        keySelectorFunc: (item: TItem) => TKey,
        elementSelectorFunc: (item: TItem) => TElement,
        keyComparerFunc?: (first: TKey, second: TKey) => boolean
    ) {

        let results = new LinqArray<{
            key: TKey,
            values: TElement[]
        }>();

        if (keyComparerFunc == undefined) {
            keyComparerFunc = (a: TKey, b: TKey) => a == b;
        }

        this.forEach((valueOfElement, indexInArray) => {

            let currKey = keySelectorFunc(valueOfElement);

            let existingIdx = results.indexOf2(
                currKey,
                r => keyComparerFunc(r.key, currKey));

            if (existingIdx > -1) {
                results[existingIdx].values.push(elementSelectorFunc(valueOfElement));
            }
            else {
                results.push({
                    key: currKey,
                    values: [elementSelectorFunc(valueOfElement)]
                });
            }
        });

        return results;
    }

    /**
     * Produces the set union of two sequences, i.e. only items that exist in both sequences, using an optional equality comparer function.
     * @param secondItems A LinqArray<TItem> whose distinct elements form the second set for the union.
     * @param comparerFunc An optional equality comparer function to compare values.
     * @returns A new LinqArray<TItem> that contains the elements from both input sequences, excluding duplicates.
     */
    union(
        secondItems: LinqArray<TItem>,
        comparerFunc?: (first: TItem, second: TItem) => boolean
    ): LinqArray<TItem> {

        let results = new LinqArray<TItem>();

        let firstItems = this.distinct(comparerFunc);
        secondItems = secondItems.distinct(comparerFunc);

        results.push.apply(results, firstItems);

        secondItems.forEach((valueOfElement, indexInArray) => {

            if (!results.contains(valueOfElement, comparerFunc)) {
                results.push(valueOfElement);
            }
        });

        return results;
    }

    /**
     * Filters a sequence of values based on a predicate.
     * @param func A function to test each element for a condition.
     * @returns A new `LinqArray<TItem>` that contains elements from the input sequence that satisfy the condition.
     */
    where(
        func: (valueOfElement: TItem, indexInArray: number) => boolean
    ): LinqArray<TItem> {

        let result = new LinqArray<TItem>();

        this.forEach((valueOfElement, indexInArray) => {
            if (func(valueOfElement, indexInArray)) {
                result.push(valueOfElement);
            }
        });

        return result;
    }

    /**
     * Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
     * @param secondItems The second sequence to merge.
     * @param resultSelectorFunc A function that specifies how to merge the elements from the two sequences.
     * @template TSecondItem The type of the elements of the second input sequence.
     * @template TResultItem The type of the elements of the result sequence.
     * @returns A `LinqArray<TResultItem>` that contains merged elements of the two input sequences.
     */
    zip<TSecondItem, TResultItem>(
        secondItems: LinqArray<TSecondItem>,
        resultSelectorFunc: (first: TItem, second: TSecondItem) => TResultItem
    ): LinqArray<TResultItem> {

        if (this.length == 0) {
            throw new Error("NoElements");
        }

        if (secondItems?.length == 0) {
            throw new Error("NoElements 'secondItems'");
        }

        let result = new LinqArray<TResultItem>;
        let resultItem: TResultItem;
        let valueOfElement: TItem;

        for (let indexInArray = 0; indexInArray < this.length; indexInArray++) {
            valueOfElement = this[indexInArray];

            if (secondItems.length >= indexInArray + 1) {
                resultItem = resultSelectorFunc(valueOfElement, secondItems[indexInArray]);
                result.push(resultItem);
            }
            else {
                break;
            }
        }

        return result;
    }
}
