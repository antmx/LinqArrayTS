# TypeScript LinqArray&lt;T&gt;
## A TypeScript generic array that supports .NET Language Integrated Query (LINQ) operations

TypeScript code example
```typescript
import LinqArray from '../src/LinqArray';

let jsItems = ([1, 2, 3, 4, 5, 6, 7, 8]); // Standard JS array of numbers
let items = new LinqArray<number>(jsItems); // items is of type LinqArray<number>, constructed from the standard JS array of numbers
let items2 = new LinqArray(jsItems); // Alternative simplified constructor syntax still resulting in type LinqArray<number>, as the generic type is inferred from the type of the standard JS array items (number)

let firstOver4times10 = items
    .where((i) => i > 4)
    .select((i) => i * 10)
    .orderBy((i) => i)
    .first();

// firstOver4times10 === 50 and is of type number
```

LinqArray includes equivalents of these common .NET LINQ, Generic and Array methods:
- [aggregate](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.aggregate)
- [all](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.all)
- [any](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.any)
- [average](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.average) TODO
- [concat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.concat) TODO
- [contains](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.contains) TODO
- [count](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count) TODO
- [distinct](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct) TODO
- [elementAt](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAt) TODO
- [except](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.except) TODO
- [first](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first) TODO
- [firstOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.firstOrDefault) TODO
- [forEach](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1.foreach)
- [groupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupBy) TODO
- [intersect](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersect) TODO
- [last](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.last) TODO
- [max](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.max) TODO
- [min](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.min) TODO
- [orderBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderBy) TODO
- [orderByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderByDescending) TODO
- [reverse](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.reverse) TODO
- [select](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select) TODO
- [selectMany](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectMany) TODO
- [setValue](https://learn.microsoft.com/en-us/dotnet/api/system.array.setvalue) TODO
- [single](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.single) TODO
- [singleOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.singleOrDefault) TODO
- [skip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skip) TODO
- [skipWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.skipWhile) TODO
- [sum](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.sum) TODO
- [take](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.take) TODO
- [takeWhile](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.takeWhile) TODO
- [union](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.union) TODO
- [where](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.where)
- [zip](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.zip) TODO

