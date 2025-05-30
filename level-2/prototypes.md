# Prototypes in JavaScript

## Overview
In JavaScript, prototypes are a fundamental part of the language's object-oriented programming model. Every object in JavaScript has a prototype, which is another object from which it can inherit properties and methods. This allows for the creation of objects that share behavior and state, promoting code reuse and organization.

## Prototypal Inheritance
Prototypal inheritance is a feature in JavaScript that allows one object to inherit properties and methods from another object. This is achieved through the prototype chain, where an object can access properties and methods of its prototype.

### Example
```javascript
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(`${this.name} makes a noise.`);
};

function Dog(name) {
    Animal.call(this, name); // Call the parent constructor
}

// Set Dog's prototype to an instance of Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(`${this.name} barks.`);
};

const dog = new Dog('Rex');
dog.speak(); // Rex barks.
```

## Prototype Properties
- **Prototype Object**: Each function in JavaScript has a `prototype` property that is used to attach properties and methods that should be shared among all instances of that function.
- **Prototype Chain**: When trying to access a property or method on an object, JavaScript first checks the object itself. If it doesn't find it, it looks up the prototype chain until it finds the property or reaches the end of the chain.

## Modifying Prototypes
You can add properties and methods to an object's prototype at any time, allowing for dynamic behavior changes.

### Example
```javascript
Array.prototype.last = function() {
    return this[this.length - 1];
};

const arr = [1, 2, 3];
console.log(arr.last()); // 3
```

## Conclusion
Understanding prototypes is crucial for mastering JavaScript's object-oriented capabilities. They provide a powerful mechanism for inheritance and code reuse, allowing developers to create more efficient and organized code.