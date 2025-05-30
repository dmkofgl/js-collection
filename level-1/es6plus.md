# ES6+ (arrow functions, spread operator)

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

alert( sum(1, 2) ); // 3

let sayHi = () => { return alert("Hello!")};

sayHi();
```

## Spread Operator

 The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.
```
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
```

```
const numbers = [1, 2, 3, 4, 5, 6];

const [one, two, ...rest] = numbers;

document.write("<p>" + one + "</p>");
document.write("<p>" + two + "</p>");
document.write("<p>" + rest + "</p>");
```
result:
```
1

2

3,4,5,6
```