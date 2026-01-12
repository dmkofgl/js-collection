# Arrays, forEach, map, filter, reduce, push, pop, etc.

Arrays are ordered collections.

In JS, arrays are objects with:

- numeric indices (`arr[0]`)
- a mutable `length`
- lots of built-in methods

    - `push(...items)` — mutates: append items to end, returns new length.
    - `pop()` — mutates: remove last item, returns removed item or `undefined`.
    - `unshift(...items)` — mutates: add items to start, returns new length.
    - `shift()` — mutates: remove first item, returns removed item or `undefined`.
    - `splice(start, deleteCount?, ...items)` — mutates: remove/insert items, returns removed elements.
    - `slice(start?, end?)` — non-mutating: shallow copy portion, returns new array.
    - `concat(...arraysOrValues)` — non-mutating: combine values/arrays, returns new array.
    - `fill(value, start?, end?)` — mutates: fill range with value, returns same array.
    - `copyWithin(target, start?, end?)` — mutates: copyWithin is an Array method that allows you to copy a portion of an array to another
      location in the same array, modifying the original array in-place.
    - `reverse()` — mutates: reverse in-place, returns same array.
    - `sort(compareFn?)` — mutates: sort in-place (string order by default), returns same array.
    - `join(separator?)` — non-mutating: join elements into a string.
    - `forEach(callback, thisArg?)` — non-mutating: iterate, returns `undefined` (cannot break).
    - `map(callback, thisArg?)` — non-mutating: transform each element, returns new array of same length.
    - `flat(depth?)` — non-mutating: flatten nested arrays by `depth`, returns new array.
    - `flatMap(callback, thisArg?)` — non-mutating: `map` then `flat(1)`.
    - `filter(predicate, thisArg?)` — non-mutating: keep elements where predicate is truthy, returns new array.
    - `reduce(reducer, initialValue?)` — non-mutating: fold to a single value (accumulator).
    - `reduceRight(reducer, initialValue?)` — non-mutating: like `reduce` but from right to left.
    - `find(predicate, thisArg?)` — non-mutating: returns first matching element or `undefined`.
    - `findIndex(predicate, thisArg?)` — non-mutating: returns index of first match or `-1`.
    - `includes(value)` — non-mutating: boolean if value exists (uses SameValueZero, finds `NaN`).
    - `indexOf(value)` — non-mutating: returns index or `-1` (uses `===`, `NaN` not found).
    - `some(predicate, thisArg?)` — non-mutating: `true` if any element matches (stops early).
    - `every(predicate, thisArg?)` — non-mutating: `true` if all elements match (stops early).
    - `toSorted(compareFn?)` — non-mutating (ES2023): returns a sorted copy.
    - `toReversed()` — non-mutating (ES2023): returns a reversed copy.
    - `toSpliced(start, deleteCount?, ...items)` — non-mutating (ES2023): returns array with splice applied.
    - `with(index, value)` — non-mutating (ES2023): returns a copy with element at `index` replaced.
    - `Array.of(...items)` — static: create array from arguments.
    - `Array.from(arrayLike, mapFn?)` — static: create array from iterable/array-like, optional mapping.

This covers the methods referenced in `level-1/arrays.md`.

```
const arr = ["a", "b", "c"];
arr[0];        // "a"
arr.length;    // 3
```

## Create arrays

```
const a = [1, 2, 3];
const b = new Array(1, 2, 3);
```

⚠️ `new Array(n)` creates an array with **length n**, not `[n]`:

```
new Array(3);  // [ <3 empty items> ]
new Array(3).length; // 3
new Array(3).map(x => 1); // still empty items (callback not called!)

Array.of(3);   // [3]
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

## Basic properties / behavior

### `length` is writable

```
const a = [1, 2, 3, 4];
a.length = 2;
a; // [1, 2]
```

### “holes” (empty items)

Arrays can be sparse:

```
const a = [];
a[2] = "x";
a; // [ <2 empty items>, "x" ]
a.length; // 3
```

Many methods (`forEach`, `map`, `filter`, `reduce`) **skip holes**.

## Mutating vs non-mutating (interview favorite)

Mutating methods change the original array.
Non-mutating methods return a new value/array.

### Common mutating methods

- add/remove end: `push`, `pop`
- add/remove start: `unshift`, `shift`
- reorder: `reverse`, `sort`
- insert/remove anywhere: `splice`
- fill/copy: `fill`, `copyWithin`

### Common non-mutating methods

- iterate/transform: `forEach`, `map`, `flatMap`
- select: `filter`, `slice`
- search: `find`, `findIndex`, `includes`, `indexOf`, `some`, `every`
- reduce/aggregate: `reduce`, `reduceRight`
- combine: `concat`, `flat`
- get string: `join`

Modern non-mutating copies (ES2023):

- `toSorted`, `toReversed`, `toSpliced`, `with`

## Adding/removing elements

### `push(...items)` / `pop()`

- `push` mutates, returns **new length**
- `pop` mutates, returns **removed element** (or `undefined`)

```
const a = [1, 2];
a.push(3);   // 3 (new length)
a;          // [1, 2, 3]

a.pop();     // 3
a;           // [1, 2]
```

### `unshift(...items)` / `shift()`

Same as push/pop but from the beginning.

⚠️ Often slower than push/pop for big arrays (needs reindexing).

## Iteration: `for`, `for...of`, `forEach`

### `forEach(callback, thisArg?)`

- calls callback for each element
- returns `undefined`
- can’t `break`/`continue` (use `for` / `for...of` if you need to stop)

Callback signature:
`(value, index, array) => {}`

```
[10, 20].forEach((value, index) => {
  console.log(index, value);
});
```

⚠️ `forEach` + `async` is a common pitfall:

```
// This does NOT await each iteration:
items.forEach(async (item) => {
  await doSomething(item);
});

// Use for...of instead:
for (const item of items) {
  await doSomething(item);
}
```

## Transform: `map`

### `map(callback, thisArg?)`

- returns a **new array** of the same length
- does not mutate original

```
const nums = [1, 2, 3];
const squares = nums.map(n => n * n);
// squares: [1, 4, 9]
// nums unchanged
```

### `flatMap`

Like `map` + `flat(1)`.

```
[1, 2, 3].flatMap(x => [x, x]); // [1,1,2,2,3,3]
```

## Select: `filter`

### `filter(predicate, thisArg?)`

- returns a **new array** of elements where predicate is truthy

```
const nums = [1, 2, 3, 4];
nums.filter(n => n % 2 === 0); // [2, 4]
```

## Aggregate: `reduce`

### `reduce(reducer, initialValue?)`

- “folds” array into one value (number/object/map/etc.)

Reducer signature:
`(accumulator, value, index, array) => nextAccumulator`

```
[1, 2, 3].reduce((sum, x) => sum + x, 0); // 6
```

⚠️ `initialValue` matters

- Without `initialValue`, first element becomes the initial accumulator.
- On an empty array without `initialValue` → throws `TypeError`.

```
[].reduce((a, b) => a + b, 0); // 0
[].reduce((a, b) => a + b);    // TypeError
```

### Common reduce patterns

#### Group by

```
const people = [
  { name: "Ann", city: "Minsk" },
  { name: "Bob", city: "Minsk" },
  { name: "Kate", city: "Grodno" }
];

const byCity = people.reduce((acc, p) => {
  (acc[p.city] ||= []).push(p);
  return acc;
}, {});
```

#### Count occurrences

```
["a", "b", "a"].reduce((acc, x) => {
  acc[x] = (acc[x] ?? 0) + 1;
  return acc;
}, {});
```

## Slice vs splice

### `slice(start?, end?)` (non-mutating)

Returns a shallow copy portion.

```
const a = [1, 2, 3, 4];
a.slice(1, 3); // [2, 3]
a;            // [1, 2, 3, 4]
```

### `splice(start, deleteCount, ...items)` (mutating)

Removes/inserts elements, returns removed elements.

```
const a = [1, 2, 3, 4];
a.splice(1, 2, 99); // removed: [2, 3]
a;                 // [1, 99, 4]
```

## Search / checks

### `includes(value)`

- returns boolean
- uses SameValueZero (so `NaN` is found)

```
[NaN].includes(NaN); // true
```

### `indexOf(value)`

- returns index or `-1`
- uses `===` comparison (so `NaN` not found)

```
[NaN].indexOf(NaN); // -1
```

### `find(predicate)` vs `filter(predicate)`

- `find` returns first matching **element** (or `undefined`)
- `filter` returns **array of matches**

```
const a = [5, 12, 8];
a.find(x => x > 10);   // 12
a.filter(x => x > 10); // [12]
```

### `some` / `every`

- `some`: at least one matches
- `every`: all match

Both stop early (good for performance).

## Sorting (big gotcha)

### `sort()` mutates and sorts as strings by default

```
[1, 2, 10].sort(); // [1, 10, 2]
```

Use a compare function for numeric sort:

```
[1, 2, 10].sort((a, b) => a - b); // [1, 2, 10]
```

### Stable sort

Modern engines implement `sort` as stable (relative order preserved for equals), but older engines weren’t guaranteed.

## Copying arrays (shallow copy)

```
const a = [1, 2, 3];
const b = a.slice();
const c = [...a];
```

⚠️ Shallow means nested objects/arrays are still shared:

```
const a = [{ x: 1 }];
const b = [...a];
b[0].x = 2;
a[0].x; // 2
```

## Common interview tasks (patterns)

### Remove duplicates

```
const unique = (arr) => [...new Set(arr)];
```

### Build a lookup map by id

```
const byId = (items) => new Map(items.map(x => [x.id, x]));
```

### Sum / average

```
const sum = (arr) => arr.reduce((a, b) => a + b, 0);
const avg = (arr) => (arr.length ? sum(arr) / arr.length : 0);
```

### Partition into two arrays

```
const partition = (arr, pred) =>
  arr.reduce(
    (acc, x) => {
      acc[pred(x) ? 0 : 1].push(x);
      return acc;
    },
    [[], []]
  );
```

## Complexity intuition (quick)

- `push/pop`: ~O(1)
- `shift/unshift`: O(n)
- `map/filter/reduce/forEach`: O(n)
- `includes/indexOf/find`: O(n)
- `sort`: O(n log n)

## Quick self-check questions (interview)

- What’s the difference between `map` and `forEach`?
- When should you pass `initialValue` to `reduce`?
- Why does `[1, 2, 10].sort()` produce `[1, 10, 2]`?
- Difference between `slice` and `splice`?
- `includes(NaN)` vs `indexOf(NaN)`?
- Why doesn’t `forEach` work well with `await`?
