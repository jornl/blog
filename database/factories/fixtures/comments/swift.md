Swift's optionals are such a powerful feature. Instead of dealing with null values directly, you can use optionals like
this:

```swift
var myString: String? = "Hello"
if let unwrappedString = myString {
    print(unwrappedString)
} else {
    print("No value")
}
```

This safely unwraps the optional, printing "Hello". If `myString` were `nil`, it would print "No value" instead.

