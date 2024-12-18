# TypeScript LinqArray&lt;T&gt;

## A TypeScript generic array that supports .NET Language Integrated Query (LINQ) operations

TypeScript code example

```typescript
import LinqArray from "../src/LinqArray";

let jsItems = [2, 4, 6, 8, 1, 3, 5, 7]; // Standard JS array of numbers
let items1 = new LinqArray<number>(jsItems); // items1 is of type LinqArray<number>, constructed from the standard JS array of numbers
let items2 = new LinqArray(jsItems); // Simplified constructor where generic type (number) is inferred from the source array

let firstOver4Times10 = items2
  .where((i) => i > 4) // items > 4
  .select((i) => i * 10) // multiply by 10
  .orderBy((i) => i) // order ascending
  .first(); // first item

let expected = 50;

expect(firstOver4Times10).toEqual(expected);
```

LinqArray includes equivalents of these common .NET LINQ, Generic and Array methods:

- [aggregate](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.aggregate)
- [all](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.all)
- [any](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.any)
- [append](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.append)
- [average](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.average)
- [chunk](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.chunk)
- [concat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.concat)
- [contains](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.contains)
- [count](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count)
- [defaultIfEmpty](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.defaultifempty)
- [distinct](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct)
- [distinctBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinctBy)
- [elementAt](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAt)
- [elementAtOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAtOrDefault)
- [empty](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.empty)
- [except](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.except)
- [exceptBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.exceptBy)
- [first](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first)
- [firstOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.firstOrDefault)
- [groupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupBy)
- [groupJoin](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupJoin)
- indexOf2 (new)
- [intersect](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersect)
- [intersectBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersectBy)
- [join](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.join) (implemented as join2)
- [last](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.last)
- [lastOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.lastOrDefault)
- [max](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.max)
- [maxBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.maxBy)
- [min](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.min)
- [minBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.minBy)
- [order](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.order)
- [orderBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderBy)
- [orderByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderByDescending)
- [orderDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderDescending)
- [prepend](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.prepend)
- [range](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.range)
- [repeat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.repeat)
- [reverse](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.reverse) (implemented as reverse2)
- [select](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select)
- [selectMany](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectMany)
- [sequenceEqual](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sequenceEqual)
- [setValue](https://learn.microsoft.com/en-us/dotnet/api/system.array.setvalue)
- [single](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.single)
- [singleOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.singleOrDefault)
- [skip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skip)
- [skipLast](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skipLast)
- [skipWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skipWhile)
- [sum](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sum)
- [take](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.take)
- [takeLast](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.takeLast)
- [takeWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.takeWhile)
- [thenBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.thenBy) (to be implemented as part of Enumerable.ts)
- [thenByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.thenByDescending) (to be implemented as part of Enumerable.ts)
- [toArray](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.toArray) (to be implemented as part of Enumerable.ts)
- [toDictionary](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.toDictionary)
- [union](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.union)
- [where](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.where)
- [zip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip)
