I appreciate how Go handles concurrency with goroutines. For example, you can run a function concurrently with:

```go
package main

import (
    "fmt"
    "time"
)

func sayHello() {
    for i := 0; i < 5; i++ {
        fmt.Println("Hello, World!")
        time.Sleep(1 * time.Second)
    }
}

func main() {
    go sayHello()
    time.Sleep(5 * time.Second)
}
```

This code will output "Hello, World!" five times with a one-second delay between each message. Goroutines are
lightweight
threads managed by the Go runtime, making it easy to write concurrent programs in Go.
