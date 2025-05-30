# Getters and Setters in JavaScript

Getters and setters are special methods that allow you to define how properties of an object are accessed and modified. They provide a way to control access to an object's properties and can be used to add additional logic when getting or setting a value.

## Getters

A getter is a method that gets the value of a specific property. It is defined using the `get` keyword followed by the method name. When you access the property, the getter method is called.

### Syntax

```javascript
class MyClass {
    constructor() {
        this._property = 'default value';
    }

    get property() {
        return this._property;
    }
}
```

### Example

```javascript
const obj = new MyClass();
console.log(obj.property); // Output: 'default value'
```

## Setters

A setter is a method that sets the value of a specific property. It is defined using the `set` keyword followed by the method name. When you assign a value to the property, the setter method is called.

### Syntax

```javascript
class MyClass {
    constructor() {
        this._property = 'default value';
    }

    set property(value) {
        this._property = value;
    }
}
```

### Example

```javascript
const obj = new MyClass();
obj.property = 'new value';
console.log(obj.property); // Output: 'new value'
```

## Use Cases

- **Validation**: You can use setters to validate values before assigning them to properties.
- **Computed Properties**: Getters can be used to compute values dynamically based on other properties.
- **Encapsulation**: Getters and setters help encapsulate the internal representation of an object.

## Conclusion

Getters and setters are powerful features in JavaScript that enhance the way you interact with object properties. They allow for better control and encapsulation, making your code cleaner and more maintainable.