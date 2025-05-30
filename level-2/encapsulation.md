# Encapsulation in JavaScript

## Overview
Encapsulation is a fundamental concept in object-oriented programming that restricts direct access to some of an object's components. This is a means of preventing unintended interference and misuse of the methods and properties of an object.

## Key Concepts

### Public and Private Properties
In JavaScript, encapsulation can be achieved using closures or by using the `#` syntax for private fields in classes (introduced in ES2022). 

- **Public Properties**: Accessible from outside the class.
- **Private Properties**: Only accessible within the class.

### Example of Encapsulation Using Classes
```javascript
class Person {
    // Private field
    #age;

    constructor(name, age) {
        this.name = name;
        this.#age = age; // Private property
    }

    // Public method
    getAge() {
        return this.#age; // Accessing private property
    }

    // Public method to set age
    setAge(newAge) {
        if (newAge > 0) {
            this.#age = newAge; // Modifying private property
        }
    }
}

const person = new Person('Alice', 30);
console.log(person.getAge()); // 30
person.setAge(31);
console.log(person.getAge()); // 31
```

### Benefits of Encapsulation
1. **Control**: It allows control over the data by restricting access to certain properties and methods.
2. **Maintainability**: Changes to encapsulated code can be made with minimal impact on other parts of the codebase.
3. **Abstraction**: It helps in hiding the complex implementation details and exposing only the necessary parts of the object.

### Conclusion
Encapsulation is a powerful feature that enhances the robustness and maintainability of JavaScript applications. By using encapsulation, developers can create more secure and manageable code.