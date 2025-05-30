# Hoisting in JavaScript

## What is Hoisting?

Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their containing scope during the compile phase. This means that you can use variables and functions before they are declared in the code.

## Variable Hoisting

In JavaScript, variable declarations (using `var`, `let`, or `const`) are hoisted to the top of their scope. However, only the declaration is hoisted, not the initialization.

### Example:

```javascript
console.log(myVar); // Output: undefined
var myVar = 5;
console.log(myVar); // Output: 5
```

In the example above, the declaration of `myVar` is hoisted to the top, but its assignment happens at the line where it is defined.

### Let and Const

With `let` and `const`, hoisting still occurs, but they are not initialized. Accessing them before their declaration results in a `ReferenceError`.

```javascript
console.log(myLet); // ReferenceError: Cannot access 'myLet' before initialization
let myLet = 10;
```

## Function Hoisting

Function declarations are also hoisted. You can call a function before it is defined in the code.

### Example:

```javascript
console.log(myFunction()); // Output: "Hello, World!"

function myFunction() {
    return "Hello, World!";
}
```

However, function expressions (including arrow functions) are not hoisted in the same way.

### Example:

```javascript
console.log(myFunc()); // TypeError: myFunc is not a function
var myFunc = function() {
    return "Hello!";
};
```

## Conclusion

Understanding hoisting is crucial for avoiding unexpected behaviors in JavaScript. Always declare your variables and functions at the top of their scope to ensure clarity and maintainability in your code.