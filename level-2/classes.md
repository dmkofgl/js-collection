# classes.md

## Classes in JavaScript

JavaScript classes are a syntactical sugar over the existing prototype-based inheritance and provide a clearer and more concise way to create objects and handle inheritance.

### Class Syntax

A class is defined using the `class` keyword followed by the class name. The class body is enclosed in curly braces.

```javascript
class ClassName {
    constructor(parameters) {
        // Initialization code
    }

    methodName() {
        // Method code
    }
}
```

### Constructor

The `constructor` method is a special method for creating and initializing an object created with a class. It is called automatically when a new instance of the class is created.

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
```

### Static Methods

Static methods are defined on the class itself rather than on instances of the class. They are called on the class and not on instances.

```javascript
class MathUtil {
    static add(a, b) {
        return a + b;
    }
}

// Usage
MathUtil.add(5, 3); // 8
```

### Inheritance

Classes can inherit from other classes using the `extends` keyword. The child class can access the properties and methods of the parent class using the `super` keyword.

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

### Getters and Setters

Getters and setters allow you to define methods that get or set the value of an object's property. They provide a way to control access to properties.

```javascript
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        return this.width * this.height;
    }

    set area(value) {
        this.width = Math.sqrt(value);
        this.height = Math.sqrt(value);
    }
}

const rect = new Rectangle(10, 5);
console.log(rect.area); // 50
rect.area = 100;
console.log(rect.width); // 10
```

### Conclusion

Classes in JavaScript provide a powerful way to create objects and manage inheritance. They enhance code readability and maintainability, making it easier to work with complex data structures and behaviors.