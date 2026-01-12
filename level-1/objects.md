# Objects: Constructor, New, this, binding this, computed fields, Object.keys, Object.values, copying, Object.assign(), comparing

Objects are used to store keyed collections of various data and more complex entities.


An empty object (“empty cabinet”) can be created using one of two syntaxes:
```
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```
```
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")
```

The dot notation cannot be used in a similar way:
```
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined

```

## Constructor

### What it is
- A **constructor function** (pre-ES6) or **class** (ES6+) is a blueprint for creating many similar objects.
- By convention, constructor function names start with a capital letter: `User`, `Car`.

### Key rules (interview)
- When a function is called with `new`, it becomes a constructor call and returns a new object (unless it explicitly returns another object).
- Instance methods on `prototype` are **shared** across instances (memory-efficient).
- Fields assigned as `this.x = ...` are **per-instance**.
- In classes, `constructor(...) { ... }` is the initializer.

### Common pitfalls
- Calling a constructor function **without `new`** (in strict mode) makes `this` `undefined` and throws when you set `this.x`.
- Defining methods inside the constructor creates a new function per instance (often unnecessary).

### Example (function constructor + prototype)
```
function User(name) {
  this.name = name;
}

User.prototype.sayHi = function () {
  return `Hi, ${this.name}`;
};

const u1 = new User('Ann');
const u2 = new User('Bob');

u1.sayHi();               // "Hi, Ann"
(u1.sayHi === u2.sayHi);  // true (shared method)
```

### Example (class)
```
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `Hi, ${this.name}`;
  }
}

new User('Ann').sayHi();
```

## New

### What `new` does (4 steps)
When you call `new Ctor(...args)`:
1. Creates a fresh object `{}`.
2. Links it to `Ctor.prototype` (so instance inherits prototype methods).
3. Binds `this` inside `Ctor` to that new object.
4. Returns the new object **unless** the constructor returns an object explicitly.

### Pitfalls
- `return 123` (primitive) is ignored, but `return { ... }` replaces the instance.
- `Ctor.prototype = { ... }` replaces the prototype object; don’t forget to restore `.constructor` if you rely on it.

### Example (explicit return overrides instance)
```
function A() {
  this.x = 1;
  return { x: 2 };
}

const a = new A();
a.x; // 2
```

### Example (prototype chain)
```
function A() {}
A.prototype.kind = 'A';

const a = new A();
a.kind; // 'A'
```

## this

### Core idea
- `this` is **not lexical** in normal functions. Its value depends on **how the function is called** (call-site).
- Arrow functions **capture** `this` from the surrounding scope.

### Call-site rules (memorize)
1. **Method call**: `obj.fn()` → `this === obj`.
2. **Plain call**: `fn()` → `this === undefined` in strict mode; otherwise global object (`window` in browser).
3. **Constructor call**: `new Fn()` → `this` is the new instance.
4. **Explicit**: `fn.call(x)`, `fn.apply(x)` → `this === x`.

### Pitfalls
- Extracting a method loses its receiver:
  - `const f = obj.fn; f();` → `this` becomes `undefined` (strict mode).
- Arrow functions as object methods usually **don’t work** the way people expect because they don’t get their own `this`.

### Examples
```
'use strict';

const user = {
  name: 'Ann',
  hi() { return this.name; }
};

user.hi();        // 'Ann'
const hi = user.hi;
hi();             // TypeError (this is undefined) OR undefined if you guard
```

Arrow keeps outer `this`:
```
'use strict';

const user = {
  name: 'Ann',
  hi() {
    const inner = () => this.name;
    return inner();
  }
};

user.hi(); // 'Ann'
```

## Binding this

### Ways to set/bind `this`
- **Hard bind**: `fn.bind(ctx)` returns a new function with permanently bound `this`.
- **Explicit call**: `fn.call(ctx, a, b)` / `fn.apply(ctx, [a, b])`.
- **Wrapper**: `() => obj.fn()` (often used in callbacks).

### `bind` nuances (interview)
- `bind` doesn’t call the function; it returns a new one.
- Bound functions ignore later `call/apply` attempts to change `this`.
- With `new`, the constructor call usually “wins” over binding: `new (fn.bind(x))()` creates a new instance.

### Pitfalls
- Using `bind` inside render/loop creates new functions frequently (can hurt perf / equality checks).

### Examples
```
'use strict';

function greet() { return `Hi, ${this.name}`; }
const user = { name: 'Ann' };

greet.call(user);           // "Hi, Ann"
const bound = greet.bind(user);
bound();                    // "Hi, Ann"
bound.call({ name: 'Bob' }); // still "Hi, Ann" (can't be re-bound)
```

Common callback case:
```
const user = {
  name: 'Ann',
  hi() { return this.name; }
};

setTimeout(user.hi.bind(user), 0);
```

## Computed fields

### What it is
- **Computed property names** let you use an expression as a key: `{ [expr]: value }`.
- Works in object literals and in destructuring patterns.

### Pitfalls
- `obj.key` uses the literal name `"key"`; variable keys require bracket notation: `obj[key]`.

### Examples
```
const field = 'score';
const user = {
  name: 'Ann',
  [field]: 100,
  ['meta:' + field]: true,
};

user.score;         // 100
user['meta:score']; // true
```

Computed methods:
```
const action = 'save';
const api = {
  [action]() { return 'saved'; }
};

api.save();
```

## Object.keys

### What it returns
- `Object.keys(obj)` → array of **own, enumerable, string keys**.
- Does **not** include:
  - symbol keys (use `Object.getOwnPropertySymbols` / `Reflect.ownKeys`)
  - non-enumerable properties
  - inherited properties

### Key ordering (practical)
- Integer-like keys (`"0"`, `"1"`, ...) first in ascending order, then other string keys by insertion order.

### Example
```
const obj = { a: 1, b: 2 };
Object.keys(obj); // ['a', 'b']

const withNums = { '2': 'b', '1': 'a', z: 0 };
Object.keys(withNums); // ['1', '2', 'z']
```

## Object.values

### What it returns
- `Object.values(obj)` → array of **own, enumerable property values** (matching `Object.keys` order).

### Example
```
const obj = { a: 1, b: 2 };
Object.values(obj); // [1, 2]

// often used with Object.entries for transforms
Object.entries(obj).map(([k, v]) => `${k}=${v}`);
```

## Copying objects

### Reference vs value (must know)
- Objects are **reference types**. Assignment copies the reference, not the data.

```
const a = { x: 1 };
const b = a;
b.x = 2;
a.x; // 2 (same object)
```

### Shallow copy options
- Spread: `{ ...obj }`
- `Object.assign({}, obj)`
- `Array.isArray(x)`? Use `[...arr]` for arrays.

### Deep copy options (situational)
- `structuredClone(obj)` (modern runtimes) makes a deep copy of many built-ins.
- JSON trick: `JSON.parse(JSON.stringify(obj))` loses `Date`, `Map`, `Set`, `undefined`, functions, symbols, and breaks on cycles.

### Pitfalls
- Spread/assign are **shallow**: nested objects remain shared.

```
const a = { nested: { x: 1 } };
const b = { ...a };
b.nested.x = 2;
a.nested.x; // 2 (nested is shared)
```

## Object.assign()

### What it does
- `Object.assign(target, ...sources)` copies **own, enumerable** properties from sources to target.
- Returns `target`.
- Later sources overwrite earlier keys.

### Pitfalls
- It **mutates** the target object.
- Shallow copy only.
- Copies getters/setters by assigning their current value (getter executes) onto target as a data property.

### Examples
```
const target = { a: 1 };
const res = Object.assign(target, { b: 2 }, { a: 3 });
res === target; // true
res;            // { a: 3, b: 2 }
```

Safe merge pattern:
```
const merged = Object.assign({}, defaults, userOptions);
```

## Comparing objects

### The rule
- `===` and `==` compare **references** for objects, not structure.

```
({ a: 1 } === { a: 1 }); // false

const a = { a: 1 };
const b = a;
a === b; // true
```

### How to compare by value
- For simple data, compare specific fields.
- For deep structural equality, use a helper (custom) or a library.
- For JSON-safe plain objects only, a crude check is `JSON.stringify(a) === JSON.stringify(b)` (ordering/cycles caveats).

### `Object.is` note
- `Object.is` is like `===` but:
  - `Object.is(NaN, NaN) === true`
  - `Object.is(+0, -0) === false`

### Pitfalls
- “Deep equal” is non-trivial due to cycles, prototypes, Dates, Maps/Sets, and ordering.
- Don’t use stringify for objects with non-deterministic key order or non-JSON types.
