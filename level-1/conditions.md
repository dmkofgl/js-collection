# Conditions: If statement, Abstract Equality Comparison vs Strict Equality Comparison

The “if” statement
The if(...) statement evaluates a condition in parentheses and, if the result is true, executes a block of code.

For example:

```
let year = prompt('In which year was ECMAScript-2015 specification published?', '');

if (year < 2015) {
  alert( 'Too early...' );
} else if (year > 2015) {
  alert( 'Too late' );
} else {
  alert( 'Exactly!' );
}
```

The if (…) statement evaluates the expression in its parentheses and converts the result to a boolean.

A number `0`, an empty string `""`, `null`, `undefined`, and `NaN` all become `false`. Because of that they are called “falsy” values.
Other values become true, so they are called “truthy”.

### Conditional operator ‘?’

Sometimes, we need to assign a variable depending on a condition.

The condition is evaluated: if it’s truthy then value1 is returned, otherwise – value2.

`let result = condition ? value1 : value2;`

```
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );
```



## Abstract Equality Comparison

All comparison operators return a boolean value:

true – means “yes”, “correct” or “the truth”.
false – means “no”, “wrong” or “not the truth”.

When comparing values of different types, JavaScript converts the values to numbers.

For example:

```
alert( '2' > 1 ); // true, string '2' becomes a number 2
alert( '01' == 1 ); // true, string '01' becomes a number 1
For boolean values, true becomes 1 and false becomes 0.
```

For example:

```
alert( true == 1 ); // true
alert( false == 0 ); // true
alert( null == undefined ); // true
```

## Strict Equality Comparison

A strict equality operator === checks the equality without type conversion.

In other words, if a and b are of different types, then a === b immediately returns false without an attempt to convert them.

Let’s try it:

```
alert( 0 === false ); // false, because the types are different
alert( null === undefined ); // false
```

There is also a “strict non-equality” operator `!==` analogous to !=.
