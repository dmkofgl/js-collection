# Linked List Data Structure

A linked list is a linear data structure where each element is a separate object, known as a node. Each node contains two parts: data and a reference (or link) to the next node in the sequence. This structure allows for efficient insertion and deletion of elements.

## Node Structure

Each node in a linked list typically contains:

- **Data**: The value stored in the node.
- **Next**: A pointer/reference to the next node in the list.

## Implementation

Here is a basic implementation of a singly linked list in JavaScript:

```javascript
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // Add a node at the end of the list
    add(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    // Remove a node by value
    remove(data) {
        if (!this.head) return;

        if (this.head.data === data) {
            this.head = this.head.next;
            this.size--;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.data === data) {
                current.next = current.next.next;
                this.size--;
                return;
            }
            current = current.next;
        }
    }

    // Display the list
    display() {
        let current = this.head;
        const elements = [];
        while (current) {
            elements.push(current.data);
            current = current.next;
        }
        console.log(elements.join(' -> '));
    }

    // Get the size of the list
    getSize() {
        return this.size;
    }
}
```

## Usage

To use the linked list, you can create an instance of the `LinkedList` class and call its methods:

```javascript
const list = new LinkedList();
list.add(10);
list.add(20);
list.add(30);
list.display(); // Output: 10 -> 20 -> 30
list.remove(20);
list.display(); // Output: 10 -> 30
console.log(list.getSize()); // Output: 2
```

## Applications

Linked lists are used in various applications, including:

- Implementing stacks and queues.
- Managing dynamic memory allocation.
- Representing graphs and adjacency lists.
- Undo functionality in applications (like text editors).

This implementation provides a basic understanding of linked lists and their operations. Further enhancements can include methods for searching, reversing the list, and more advanced features.