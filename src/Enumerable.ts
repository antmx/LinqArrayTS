
/**
 * Mimics the behaviour of .NET's `System.Linq.Enumerable` class, 
 * i.e. provides a set of static (Shared in Visual Basic) methods for querying objects that implement `IEnumerable<TItem>`.
 * @template TItem The type of the items in the sequence.
 */
export default class Enumerable<TItem> /*extends Array<TItem>*/ implements IEnumerable<TItem> {

    /**
     * 
     * @param source 
     */
    constructor(source: IEnumerable<TItem>) {

        this._source = source;
    }

    private _source: IEnumerable<TItem>;

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
export interface IEnumerable<TItem> extends IterableIterator<TItem> {

    count(): number;

    toArray(): TItem[];
}

