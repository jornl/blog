# Getting Started with Java

## What is Java?

Java is a widely-used, object-oriented programming language designed for portability and performance. It is
platform-independent, meaning you can write Java code once and run it anywhere. Java is often used for building
enterprise-level applications, Android apps, and more.

## Setting Up Your Java Environment

To start coding in Java, you'll need to install the Java Development Kit (JDK) from
the [official Oracle website](https://www.oracle.com/java/technologies/javase-downloads.html). After installation,
verify it by typing the following command in your terminal or command prompt:

```bash
java -version
```

You should see the installed Java version displayed in the output.

## Writing Your First Java Program

Let's write a simple Java program that prints "Hello, World!" to the console. Create a new file named `HelloWorld.java`
and add the following code:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

To compile and run the program, open your terminal or command prompt, navigate to the directory where your
HelloWorld.java file is located, and type:

```bash
javac HelloWorld.java
java HelloWorld
```

You should see the output `Hello, World!` displayed on the screen.

## Understanding the Code

- `public class HelloWorld` defines a class named `HelloWorld`. In Java, every application must have at least one class.
- `public static void main(String[] args)` is the entry point of the program where execution begins.
- `System.out.println("Hello, World!");` is a statement that prints "Hello, World!" to the console.

## What's Next?

Next, we'll explore Java's syntax, data types, and control structures to get you familiar with the language's
fundamentals.
