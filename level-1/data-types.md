# Data types

There are eight basic data types in JavaScript.
We can put any type in a variable. For example, a variable can at one moment be a string and then store a number.
`// no error
let message = "hello";
message = 123456;
`

- number
  The number type represents both integer and floating point numbers.
  There are many operations for numbers, e.g. multiplication \*, division /, addition +, subtraction -, and so on.
  Besides regular numbers, there are so-called “special numeric values” which also belong to this data type: Infinity, -Infinity and NaN. - alert( 1 / 0 ); // Infinity - alert( "not a number" / 2 ); // NaN, such division is erroneous
- BigInt
  In JavaScript, the “number” type cannot safely represent integer values larger than (253-1) (that’s 9007199254740991), or less than -(253-1) for negatives.
  A BigInt value is created by appending n to the end of an integer:

// the "n" at the end means it's a BigInt
const bigInt = 1234567890123456789012345678901234567890n;

- String

A string in JavaScript must be surrounded by quotes.

let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
In JavaScript, there are 3 types of quotes.

    - Double quotes: "Hello".
    - Single quotes: 'Hello'.
    - Backticks: `Hello`.

Double and single quotes are “simple” quotes. There’s practically no difference between them in JavaScript.

Backticks are “extended functionality” quotes. They allow us to embed variables and expressions into a string by wrapping them in ${…}, for example:

``let name = "John";

// embed a variable
alert( `Hello, ${name}!` ); // Hello, John!

// embed an expression
alert( `the result is ${1 + 2}` ); // the result is 3``

- boolean

The boolean type has only two values: true and false.

- null

The special null value does not belong to any of the types described above.

It forms a separate type of its own which contains only the null value. In JavaScript, null is not a “reference to a non-existing object” or a “null pointer” like in some other languages.

It’s just a special value which represents “nothing”, “empty” or “value unknown”.

- undefined

The special value undefined also stands apart. It makes a type of its own, just like null.

The meaning of undefined is “value is not assigned”.

``
let age;

alert(age); // shows "undefined"
``

- object

All other types are called “primitive” because their values can contain only a single thing (be it a string or a number or whatever). In contrast, objects are used to store collections of data and more complex entities.

- symbol
The symbol type is used to create unique identifiers for objects. We have to mention it here for the sake of completeness, but also postpone the details till we know objects.

## typeof

A call to typeof x returns a string with the type name:

```
typeof undefined // "undefined"

typeof 0 // "number"

typeof 10n // "bigint"

typeof true // "boolean"

typeof "foo" // "string"

typeof Symbol("id") // "symbol"

typeof Math // "object"  (1)

typeof null // "object"  (2)

typeof alert // "function"  (3)
```

1. The result of typeof null is "object". That’s an officially recognized error in typeof, coming from very early days of JavaScript and kept for compatibility. Definitely, null is not an object. It is a special value with a separate type of its own. The behavior of typeof is wrong here.
1. The result of typeof alert is "function", because alert is a function. We’ll study functions in the next chapters where we’ll also see that there’s no special “function” type in JavaScript. Functions belong to the object type. But typeof treats them differently, returning "function". That also comes from the early days of JavaScript. Technically, such behavior isn’t correct, but can be convenient in practice.

[Learn more about JavaScript data types](https://learn.javascript.ru/types)
