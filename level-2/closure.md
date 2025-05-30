# Closure in JavaScript

## What is a Closure?

A closure is a function that retains access to its lexical scope, even when the function is executed outside that scope. This means that a closure can remember the environment in which it was created, allowing it to access variables from that environment even after the outer function has finished executing.

## How Closures Work

When a function is defined inside another function, it forms a closure. The inner function has access to the outer function's variables, parameters, and even the inner function's own variables. This is particularly useful for data encapsulation and creating private variables.

### Example of a Closure

```javascript
function outerFunction() {
    let outerVariable = 'I am from outer function';

    function innerFunction() {
        console.log(outerVariable);
    }

    return innerFunction;
}

const closureFunction = outerFunction();
closureFunction(); // Output: I am from outer function
```

In this example, `innerFunction` is a closure that has access to `outerVariable`, even after `outerFunction` has executed.

## Use Cases for Closures

1. **Data Privacy**: Closures can be used to create private variables that cannot be accessed from outside the function.
   
   ```javascript
   function createCounter() {
       let count = 0;

       return {
           increment: function() {
               count++;
               return count;
           },
           decrement: function() {
               count--;
               return count;
           },
           getCount: function() {
               return count;
           }
       };
   }

   const counter = createCounter();
   console.log(counter.increment()); // Output: 1
   console.log(counter.increment()); // Output: 2
   console.log(counter.getCount());  // Output: 2
   ```

2. **Function Factories**: Closures can be used to create functions with preset parameters.

   ```javascript
   function multiplyBy(factor) {
       return function(number) {
           return number * factor;
       };
   }

   const double = multiplyBy(2);
   console.log(double(5)); // Output: 10
   ```

3. **Event Handlers**: Closures are often used in event handlers to maintain access to variables from the outer scope.

## Conclusion

Closures are a powerful feature in JavaScript that allow for data encapsulation and function factories. Understanding how closures work is essential for mastering JavaScript and writing clean, maintainable code.