# Functions: function declaration, function expression, callbacks

Functions are the main “building blocks” of the program. They allow the code to be called many times without repetition.

Functions are actions. So their name is usually a verb.

## Function Declaration

To create a function we can use a function declaration.

It looks like this:

```
function name(parameter1, parameter2, ... parameterN) {
 // body
}
```

### Default values

```
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

### Returning a value

```
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

It is possible to use return without a value. That causes the function to exit immediately.

## Function expressions

There is another syntax for creating a function that is called a Function Expression.

It allows us to create a new function in the middle of any expression.

For example:

```
let sayHi = function() {
  alert( "Hello" );
};


```

As the function creation happens in the context of the assignment expression (to the right side of =), this is a Function Expression.

```
function sayHi() {
  alert( "Hello" );
}

alert( sayHi ); // shows the function code
```
## Callback functions

```
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}
// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);
```

The arguments showOk and showCancel of ask are called callback functions or just callbacks.