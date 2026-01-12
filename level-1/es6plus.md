# ES6+ (daily syntax: arrow functions, spread/rest, destructuring, template strings)

## Arrow functions

There’s another very simple and concise syntax for creating functions, that’s often better than Function Expressions.

It’s called “arrow functions”, because it looks like this:

```
let func = (arg1, arg2, ..., argN) => expression;
```

```
let sum = (a, b) => a + b;

/* This arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/

alert(sum(1, 2)); // 3

let sayHi = () => {
  return alert("Hello!");
};

sayHi();
```

### Implicit return vs block body

If you use `{ ... }`, you MUST write `return` (otherwise the function returns `undefined`).

```
const inc1 = x => x + 1; // implicit return
const inc2 = x => {
  return x + 1; // explicit return
};

// Common mistake:
const wrong = x => {
  x + 1;
};

console.log(inc1(1)); // 2
console.log(inc2(1)); // 2
console.log(wrong(1)); // undefined
```

### Returning object literals

To return an object from an arrow function with implicit return, wrap it in parentheses:

```
const makeUser = (name, age) => ({ name, age });
console.log(makeUser("Ann", 20));
```

### `this` in arrow functions (important)

Arrow functions don’t have their own `this`. They capture `this` from the outer scope.

That’s especially useful for callbacks inside methods:

```
const timer = {
  seconds: 0,
  start() {
    setInterval(() => {
      this.seconds += 1; // works because `this` is taken from start()
    }, 1000);
  },
};
```

But it can be a problem if you use an arrow function as an object method:

```
const user = {
  name: "Tom",
  // Don't do this if you need `this.name` to point to `user`
  sayHi: () => {
    console.log(this.name);
  },
};

user.sayHi(); // usually undefined (depends on environment)
```

Use method shorthand or `function()` for object methods:

```
const user2 = {
  name: "Tom",
  sayHi() {
    console.log(this.name);
  },
};

user2.sayHi(); // Tom
```

---

## Spread and Rest (`...`)

The same `...` syntax can mean 2 different things:

- **spread**: expands an array/object into another array/object (or into function args)
- **rest**: collects remaining items into an array/object (destructuring) or into function args

### Spread with arrays

```
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];

const numbersCombined = [...numbersOne, ...numbersTwo];
console.log(numbersCombined); // [1,2,3,4,5,6]

// Copy array
const copy = [...numbersOne];
```

### Spread with objects

```
const defaults = { theme: "light", debug: false };
const userSettings = { debug: true };

// Order matters: later props overwrite earlier ones
const settings = { ...defaults, ...userSettings };
console.log(settings); // { theme: 'light', debug: true }
```

### Rest in destructuring

```
const numbers = [1, 2, 3, 4, 5, 6];
const [one, two, ...rest] = numbers;

console.log(one);  // 1
console.log(two);  // 2
console.log(rest); // [3,4,5,6]
```

For objects:

```
const person = { id: 10, name: "Ann", role: "admin" };
const { id, ...otherFields } = person;

console.log(id);          // 10
console.log(otherFields); // { name: 'Ann', role: 'admin' }
```

### Rest parameters (functions)

```
function sum(...nums) {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sum(1, 2, 3)); // 6
```

### Important note: spread copies are shallow

Spread creates a **shallow copy**. Nested objects/arrays are still shared.

```
const a = [{ n: 1 }];
const b = [...a];

b[0].n = 999;
console.log(a[0].n); // 999 (same inner object)
```

---

## Destructuring (arrays and objects)

Destructuring lets you unpack values from arrays/objects into variables.

### Array destructuring

```
const [first, second] = ["a", "b"];
console.log(first, second); // a b

// Swap variables
let x = 1;
let y = 2;
[x, y] = [y, x];
console.log(x, y); // 2 1
```

### Object destructuring (rename + defaults)

```
const user = { firstName: "Ann", age: 20 };

const { firstName: name, age, role = "user" } = user;
console.log(name); // Ann
console.log(role); // user
```

### Safe destructuring (avoid crashes)

Destructuring `null`/`undefined` throws, so a common pattern is:

```
function printCity(user) {
  const { city = "Unknown" } = user?.address || {};
  console.log(city);
}
```

---

## Default parameters

```
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

greet();       // Hello, Guest
greet("Tom");  // Hello, Tom
```

---

## Template literals

Template literals use backticks and support interpolation with `${...}`.

```
const product = "Book";
const price = 10;

console.log(`${product} costs $${price}`);
```

They can also be multiline:

```
const msg = `Line 1
Line 2`;
console.log(msg);
```

---

## Enhanced object literals

ES6 made object literal syntax shorter:

```
const name = "Ann";
const age = 20;

const user = {
  name, // same as name: name
  age,
  sayHi() {
    console.log(`Hi, I'm ${this.name}`);
  },
};

user.sayHi();
```

Computed property names:

```
const key = "likes";
const obj = { [key]: 100 };
console.log(obj.likes); // 100
```

---

## Optional chaining (`?.`) and nullish coalescing (`??`)

These help avoid errors like: “Cannot read properties of undefined”.

```
const city = user?.address?.city ?? "Unknown";
```

Difference between `||` and `??`:

- `||` uses the fallback when the value is *falsy* (`0`, `""`, `false`, `null`, `undefined`)
- `??` uses the fallback only when the value is `null` or `undefined`

```
const amount = 0;
console.log(amount || 10); // 10 (maybe a bug)
console.log(amount ?? 10); // 0
```

---

## Mini exercises

1. Rewrite this callback using an arrow function:
   - `arr.map(function (x) { return x * 2; })`
2. Merge `defaults` and `options` so `options` overwrites `defaults`.
3. Write `max(...nums)` using rest params and `Math.max`.
4. Extract `id` from an object, and put the remaining fields into `rest`.
5. Safely read `user.profile.avatarUrl` with `?.` and set fallback to `"/img/default.png"` using `??`.
