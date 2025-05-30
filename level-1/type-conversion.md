# Type conversion

Most of the time, operators and functions automatically convert the values given to them to the right type.

For example, alert automatically converts any value to a string to show it. Mathematical operations convert values to numbers.

## String Conversion

String conversion happens when we need the string form of a value.

For example, alert(value) does it to show the value.

We can also call the String(value) function to convert a value to a string:

```
let value = true;
alert(typeof value); // boolean

value = String(value); // now value is a string "true"
alert(typeof value); // string
```

String conversion is mostly obvious. A false becomes "false", null becomes "null", etc.

## Numeric Conversion

Numeric conversion in mathematical functions and expressions happens automatically.

For example, when division / is applied to non-numbers:

`alert( "6" / "2" ); // 3, strings are converted to numbers`
We can use the Number(value) function to explicitly convert a value to a number:

```
let str = "123";
alert(typeof str); // string

let num = Number(str); // becomes a number 123

alert(typeof num); // number
```

If the string is not a valid number, the result of such a conversion is NaN. For instance:

```
let age = Number("an arbitrary string instead of a number");

alert(age); // NaN, conversion failed
```

### Numeric Conversion Table

### Numeric Conversion Table

| Value            | Becomes…                                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `undefined`      | `NaN`                                                                                                                                                                                                                    |
| `null`           | `0`                                                                                                                                                                                                                      |
| `true` / `false` | `1` and `0`                                                                                                                                                                                                              |
| `string`         | Leading/trailing whitespaces (spaces, tabs `\t`, newlines `\n`, etc.) are removed. If the string is empty, the result is `0`. Otherwise, the number is read from the string. If not a valid number, the result is `NaN`. |

```
alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN (error reading a number at "z")
alert( Number(true) );        // 1
alert( Number(false) );       // 0
```

## Boolean Conversion

The conversion rule:

Values that are intuitively “empty”, like 0, an empty string, null, undefined, and NaN, become false.
Other values become true.
For instance:

```
alert( Boolean(1) ); // true
alert( Boolean(0) ); // false

alert( Boolean("hello") ); // true
alert( Boolean("") ); // false
alert( Boolean("0") ); // true (!)
alert( Boolean(" ") ); // spaces, also true (any non-empty string is true)

```

[Learn more about JavaScript type conversions](https://javascript.info/type-conversions)
