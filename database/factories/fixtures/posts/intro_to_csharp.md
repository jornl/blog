# Getting Started with C#

## What is C#?

C# (pronounced "C-sharp") is a modern, object-oriented programming language developed by Microsoft. It is widely used
for building Windows applications, web services, and games, particularly with the Unity game engine. C# is known for its
simplicity, power, and versatility, making it an excellent choice for beginners.

## Setting Up Your C# Environment

To start coding in C#, you'll need to set up your development environment. The most popular tool for C# development
is [Visual Studio](https://visualstudio.microsoft.com/), which you can download and install from Microsoft's official
website. If you prefer something lighter, [Visual Studio Code](https://code.visualstudio.com/) is a great alternative,
along with the C# extension.

After installing your IDE, make sure you have the .NET SDK installed. You can check by opening a terminal or command
prompt and typing:

```bash
dotnet --version
```

If the command returns a version number, you're all set.

## Your First C# Program

Let's write a simple C# program that prints "Hello, World!" to the console. Create a new file named Program.cs and add
the following code:

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}
```

To compile and run the program, open a terminal or command prompt, navigate to the directory containing Program.cs, and
type:

```bash
dotnet run
```

You should see the output `"Hello, World!"` displayed on the screen.

Congrats! You've just written and executed your first C# program.

## Understanding the Code

Let's break down the code:

- `using System;` tells the compiler that you're using the System namespace, which contains fundamental classes like
  Console.
- `class Program` defines a class named Program. In C#, every program must contain at least one class.
- `static void Main(string[] args)` is the entry point of the program. It's a method where the program starts execution.
- `Console.WriteLine("Hello, World!");` is a statement that prints the string "Hello, World!" to the console.

## What's Next?

Now that you've successfully run your first C# program, you're ready to explore more features of the language. In the
next blog post, we'll dive into variables, data types, and control structures in C#.

Stay tuned for more tutorials and happy coding!
