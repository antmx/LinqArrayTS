
/**
 * Mimics the behaviour of .NET's System.Linq.Enumerable class, 
 * i.e. provides a set of static (Shared in Visual Basic) methods for querying objects that implement `IEnumerable<TItem>`.
 * @template TItem The type of the items in the sequence.
 */
export default class Enumerable<TItem> /*extends Array<TItem>*/ implements IEnumerable<TItem> {

    count(): number {
        throw new Error("Method count() not implemented.");
    }

    toArray(): TItem[] {
        throw new Error("Method not implemented.");
    }

    [Symbol.iterator](): IterableIterator<TItem> {
        throw new Error("Method not implemented.");
    }

    next(...[value]: [] | [any]): IteratorResult<TItem, any> {
        throw new Error("Method not implemented.");
    }

    return?(value?: any): IteratorResult<TItem, any> {
        throw new Error("Method not implemented.");
    }

    throw?(e?: any): IteratorResult<TItem, any> {
        throw new Error("Method not implemented.");
    }

}

/**
 * Mimics .NET's System.Collections.Generic.IEnumerable<T>, 
 * i.e. exposes the enumerator, which supports a simple iteration over a collection of a specified type.
 */
interface IEnumerable<TItem> extends IterableIterator<TItem> {

    count(): number;

    toArray(): TItem[];
}


export class OrderedEnumerable<TItem, TKey> extends Enumerable<TItem> {

    /**
     * ctor.
     * @param selector The function to select the value to order each item by
     * @param parent Optional parent ordered enumerable (if this is a ThenBy/ThenByDescending)
     * @param descending Optional flag to whether to order the results descending (ascending is the default)
     */
    constructor(
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

        // TODO: walk backwards from parent to grandparent etc, until no more ancenstors found, then run each ancestor's selector (accounting for descending) from oldest to newest

        //let current: OrderedEnumerable<TItem, TKey> | undefined = this;

        do {
            let current = this.parent;
        }
        while (current != null);

    }

    //private getOrderings(): (a:TItem,b:TItem):
}
