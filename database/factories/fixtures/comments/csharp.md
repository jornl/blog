C#'s `LINQ` is incredibly useful for working with collections. You can filter and project data so easily:

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.Where(n => n % 2 == 0);
foreach (var num in evenNumbers) {
    Console.WriteLine(num);
}
```

This code snippet filters the `numbers` list to only include even numbers and then prints them to the console. `LINQ` is
a powerful tool that can simplify your code and make it more readable.

