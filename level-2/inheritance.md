# Inheritance in JavaScript

Inheritance is a fundamental concept in object-oriented programming that allows one class to inherit properties and methods from another class. In JavaScript, inheritance can be achieved through prototypes and the class syntax introduced in ES6.

## Prototypal Inheritance

In JavaScript, every object has a prototype. When you try to access a property or method of an object, JavaScript first checks if the property exists on the object itself. If it does not, it looks up the prototype chain until it finds the property or reaches the end of the chain (null).

### Example of Prototypal Inheritance

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

// Set the prototype of Dog to be an instance of Animal
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
    console.log(`${this.name} barks.`);
};

const dog = new Dog('Rex');
dog.speak(); // Rex barks.
```

## Class Inheritance

With the introduction of ES6, JavaScript provides a more straightforward syntax for creating classes and handling inheritance.

### Example of Class Inheritance

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} barks.`);
    }
}

const dog = new Dog('Rex');
dog.speak(); // Rex barks.
```

## Key Points

- Inheritance allows for code reuse and the creation of hierarchical relationships between classes.
- JavaScript supports both prototypal inheritance and class-based inheritance.
- The `extends` keyword is used in class syntax to create a subclass that inherits from a parent class.
- The `super` keyword can be used to call the constructor of the parent class and access its methods.

Understanding inheritance is crucial for mastering object-oriented programming in JavaScript, as it enables developers to create more organized and maintainable code.