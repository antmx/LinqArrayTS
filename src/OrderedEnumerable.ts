//import { "*" } from "./Enumerable";
import Enumerable from "./Enumerable";
import { IEnumerable } from "./Enumerable";
import LinqArray from "./LinqArray";

export class OrderedEnumerable<TItem, TKey> extends Enumerable<TItem> {

    /**
     * ctor.
     * @param selector The function to select the value to order each item by
     * @param parent Optional parent ordered enumerable (if this is a ThenBy/ThenByDescending)
     * @param descending Optional flag to whether to order the results descending (ascending is the default)
     */
    constructor(
        source: IEnumerable<TItem>,
        selector: (itm: TItem) => TKey,
        parent?: OrderedEnumerable<TItem, TKey>,
        descending?: boolean
    ) {
        super();

        this._selector = selector;
        this._parent = parent;
        this._descending = descending || false;
    }

    private _selector: (itm: TItem) => TKey;
    private _parent?: OrderedEnumerable<TItem, TKey> = null!;
    private _descending: boolean;

    public get parent(): OrderedEnumerable<TItem, TKey> | undefined {

        return this._parent;
    }

    public get descending(): boolean {

        return this._descending;
    }

    // public set descending(v: boolean) {

    //     this._descending = v;
    // }

    public get selector(): (itm: TItem) => TKey {

        return this._selector;
    }

    public toArray(): TItem[] {


        // then run each ancestor's selector (accounting for descending) from oldest ancestor to newest

        let allOrderings = new LinqArray(this.getOrderings());

        let items: TItem[] = [];
        let ii = this[Symbol.iterator]();

        for (const item of ii) {
            items.push(item);
        }

        items.sort((a: TItem, b: TItem) => {

            //return 0;
            let result = 0;

            allOrderings.forEach((ordering, indexInArray) => {

                let currOrder = this.comparer(
                    ordering.selector(a),
                    ordering.selector(b));

                if (currOrder === 1) {
                    result
                }
            });

        });
    }

    public comparer(a: TKey, b: TKey): number {

        if (a === b) {
            return 0;
        }

        if (a < b) {
            return -1;
        }

        return 1;
    }

    /**
     * Gathers all orderings in the correct order by walking backwards from current to parent to grandparent etc, until no more ancenstors found
     * @returns All thhe OrderedEnumerables in the call chain, sorted in the order they were called.
     */
    private getOrderings(): OrderedEnumerable<TItem, TKey>[] {

        let all: OrderedEnumerable<TItem, TKey>[] = [];
        let current: OrderedEnumerable<TItem, TKey> | undefined = this;

        do {
            all.unshift(current); // insert at start of array
            current = current.parent;
        }
        while (current != null);

        return all;
    }
}

interface IOrderedEnumerable<TItem, TKey> extends IEnumerable<TItem> {

}
