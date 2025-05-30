# Map and Set

## Overview

In JavaScript, `Map` and `Set` are built-in data structures that provide efficient ways to store and manage collections of data. They offer unique features compared to traditional objects and arrays, making them suitable for various use cases.

## Map

A `Map` is a collection of key-value pairs where keys can be of any data type, and each key is unique. It maintains the insertion order of the elements.

### Creating a Map

```javascript
const map = new Map();
```

### Adding Elements

You can add elements to a `Map` using the `set` method:

```javascript
map.set('key1', 'value1');
map.set('key2', 'value2');
```

### Accessing Elements

To access a value by its key, use the `get` method:

```javascript
console.log(map.get('key1')); // Output: value1
```

### Checking Existence

You can check if a key exists in the `Map` using the `has` method:

```javascript
console.log(map.has('key2')); // Output: true
```

### Deleting Elements

To remove an element, use the `delete` method:

```javascript
map.delete('key1');
```

### Iterating Over a Map

You can iterate over a `Map` using the `forEach` method or a `for...of` loop:

```javascript
map.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

// or

for (const [key, value] of map) {
    console.log(`${key}: ${value}`);
}
```

## Set

A `Set` is a collection of unique values, meaning that it cannot contain duplicate elements. Like `Map`, it also maintains the insertion order.

### Creating a Set

```javascript
const set = new Set();
```

### Adding Elements

You can add elements to a `Set` using the `add` method:

```javascript
set.add('value1');
set.add('value2');
set.add('value1'); // This will not be added again
```

### Checking Existence

To check if a value exists in the `Set`, use the `has` method:

```javascript
console.log(set.has('value1')); // Output: true
```

### Deleting Elements

To remove an element, use the `delete` method:

```javascript
set.delete('value2');
```

### Iterating Over a Set

You can iterate over a `Set` using the `forEach` method or a `for...of` loop:

```javascript
set.forEach(value => {
    console.log(value);
});

// or

for (const value of set) {
    console.log(value);
}
```

## Use Cases

- **Map**: Ideal for situations where you need to associate unique keys with values, such as storing configuration settings or caching data.
- **Set**: Useful for maintaining a collection of unique items, such as tracking user IDs or ensuring that a list of items does not contain duplicates.

## Conclusion

`Map` and `Set` are powerful data structures in JavaScript that enhance the way we handle collections of data. Understanding their methods and use cases can significantly improve the efficiency and readability of your code.