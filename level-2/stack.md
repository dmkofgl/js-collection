# Stack Data Structure

## Overview
A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. This means that the last element added to the stack will be the first one to be removed. Stacks are commonly used in various applications such as function call management, expression evaluation, and backtracking algorithms.

## Implementation
Below is a simple implementation of a Stack in JavaScript:

```javascript
class Stack {
    constructor() {
        this.items = [];
    }

    // Add an element to the top of the stack
    push(element) {
        this.items.push(element);
    }

    // Remove and return the top element of the stack
    pop() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items.pop();
    }

    // Return the top element without removing it
    peek() {
        if (this.isEmpty()) {
            return "Stack is empty";
        }
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Return the size of the stack
    size() {
        return this.items.length;
    }

    // Clear the stack
    clear() {
        this.items = [];
    }

    // Print the stack
    print() {
        console.log(this.items.toString());
    }
}

// Example usage
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // 30
console.log(stack.pop());   // 30
console.log(stack.size());  // 2
stack.print();              // 10,20
```

## Methods
- **push(element)**: Adds an element to the top of the stack.
- **pop()**: Removes and returns the top element of the stack.
- **peek()**: Returns the top element without removing it.
- **isEmpty()**: Checks if the stack is empty.
- **size()**: Returns the number of elements in the stack.
- **clear()**: Removes all elements from the stack.
- **print()**: Displays the elements in the stack.

## Use Cases
- Function call management in programming languages.
- Undo mechanisms in applications.
- Syntax parsing in compilers.

This implementation provides a basic understanding of how stacks work and can be expanded with additional features as needed.