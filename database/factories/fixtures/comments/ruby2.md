If you're new to Ruby, you should check out the map method. It's great for transforming arrays:

```ruby
numbers = [1, 2, 3, 4]
doubled = numbers.map { |n| n * 2 }
puts doubled.inspect
```

This will output `[2, 4, 6, 8]`.
