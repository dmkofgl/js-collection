# Cycles: while, for

- while

```
let i = 0;
while (i < 3) { // shows 0, then 1, then 2
  alert( i );
  i++;
}
```

- do..while

```
let i = 0;
do {
  alert( i );
  i++;
} while (i < 3);
```

- for(..;..;..).

```
for (let i = 0; i < 3; i++) { // shows 0, then 1, then 2
  alert(i);
}
```

- The "for..in" loop

for (key in object) {
// executes the body for each key among object properties
}
Any part of for can be skipped.

let i = 0; // we have i already declared and assigned

```
for (;;) {
  // repeats without limits
}
```

- "for..of"

```
let fruits = ["Apple", "Orange", "Plum"];

// iterates over array elements
for (let fruit of fruits) {
  alert( fruit );
}
```

The for..of doesn’t give access to the number of the current element, just its value, but in most cases that’s enough. And it’s shorter.

### break

Normally, a loop exits when its condition becomes falsy.

But we can force the exit at any time using the special break directive.

```
let sum = 0;

while (true) {

  let value = +prompt("Enter a number", '');

  if (!value) break; // (*)

  sum += value;

}
alert( 'Sum: ' + sum );

```

Sometimes we need to break out from multiple nested loops at once.

```
outer: for (let i = 0; i < 3; i++) {

  for (let j = 0; j < 3; j++) {

    let input = prompt(`Value at coords (${i},${j})`, '');

    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)

    // do something with the value...
  }
}

alert('Done!');
```

A break directive must be inside a code block. Technically, any labelled code block will do, e.g.:

```
label: {
  // ...
  break label; // works
  // ...
}
```

### continue

The continue directive is a “lighter version” of break. It doesn’t stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

```
for (let i = 0; i < 10; i++) {

  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;

  alert(i); // 1, then 3, 5, 7, 9
}
```

### ternal operation

```
(i > 5) ? alert(i) : continue; // continue/break isn't allowed here
```

…it stops working: there’s a syntax error.
