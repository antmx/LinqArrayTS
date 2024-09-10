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
- [average](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.average)
- [concat](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.concat)
- [contains](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.contains)
- [count](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.count)
- [distinct](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.distinct)
- [elementAt](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.elementAt)
- [except](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.except)
- [first](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.first)
- [firstOrDefault](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.firstOrDefault)
- [groupBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.groupBy)
- [intersect](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.intersect)
- [last](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.last)
- [max](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.max)
- [min](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.min)
- [orderBy](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderBy)
- [orderByDescending](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.orderByDescending)
- [reverse2](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.reverse)
- [select](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.select)
- [selectMany](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectMany)
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

