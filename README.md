# TypeScript LinqArray&lt;T&gt;
## A TypeScript generic array that supports .NET Language Integrated Query (LINQ) operations

TypeScript code example
```typescript
import LinqArray from '../src/LinqArray';

let jsItems = [1, 2, 3, 4, 5, 6, 7, 8]; // Standard JS array of numbers
let items1 = new LinqArray<number>(jsItems); // items1 is of type LinqArray<number>, constructed from the standard JS array of numbers
let items2 = new LinqArray(jsItems); // Simplified constructor call - generic type (number) is inferred from source array

let firstOver4Times10 = items2
    .where(i => i > 4)      // items > 4
    .select(i => i * 10)    // mutiply by 10
    .orderBy(i => i)        // order ascending
    .first();               // first item

let expected = 50;

expect(firstOver4Times10).toEqual(expected);
```

LinqArray includes equivalents of these common .NET LINQ, Generic and Array methods:
- [aggregate](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.aggregate)
- [all](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.all)
- [any](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.any)
- [append](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.append)
- [average](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.average)
- [chunk](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.chunk) TODO
- [concat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.concat)
- [contains](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.contains)
- [count](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count)
- [defaultIfEmpty](https://learn.microsoft.com/en-us/dotnet/api/system.linq.defaultIfEmpty.[defaultIfEmpty) TODO
- [distinct](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct)
- [distinctBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinctBy) TODO
- [elementAt](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAt)
- [elementAtOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAtOrDefault) TODO
- [empty](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.empty) TODO
- [except](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.except)
- [exceptBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.exceptBy) TODO
- [first](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first)
- [firstOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.firstOrDefault)
- [groupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupBy)
- [groupJoin](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupJoin) TODO
- [intersect](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersect)
- [intersectBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersectBy) TODO
- [join](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.join) (implemented as join2)
- [last](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.last)
- [lastOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.lastOrDefault) TODO
- [longCount](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.longCount) TODO
- [max](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.max)
- [maxBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.maxBy) TODO
- [min](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.min)
- [minBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.minBy) TODO
- [order](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.order) TODO
- [orderBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderBy)
- [orderByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderByDescending)
- [orderDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderDescending) TODO
- [prepend](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.prepend) TODO
- [range](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.range) TODO
- [repeat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.repeat) TODO
- [reverse](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.reverse) (implemented as reverse2)
- [select](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select)
- [selectMany](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectMany)
- [sequenceEqual](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sequenceEqual) TODO
- [setValue](https://learn.microsoft.com/en-us/dotnet/api/system.array.setvalue)
- [single](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.single)
- [singleOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.singleOrDefault)
- [skip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skip)
- [skipLast](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skipLast) TODO
- [skipWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skipWhile)
- [sum](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sum)
- [take](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.take)
- [takeLast](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.takeLast) TODO
- [takeWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.takeWhile)
- [thenBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.thenBy) TODO
- [thenByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.thenByDescending) TODO
- [toArray](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.toArray) TODO
- [toDictionary](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.toDictionary) TODO
- [union](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.union)
- [where](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.where)
- [zip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip)
