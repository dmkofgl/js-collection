# Event Propagation in JavaScript

Event propagation is a crucial concept in JavaScript that describes the way events travel through the DOM (Document Object Model). Understanding how events propagate is essential for effective event handling in web applications.

## Types of Event Propagation

There are two main phases of event propagation:

1. **Capturing Phase**: The event starts from the root of the DOM and travels down to the target element. This phase is also known as the "capture" phase.

2. **Bubbling Phase**: After reaching the target element, the event bubbles back up to the root of the DOM. This is the default phase for most events.

## Event Listeners

You can specify whether an event listener should be invoked during the capturing or bubbling phase by using the `addEventListener` method:

```javascript
element.addEventListener('click', function(event) {
    // Handle the click event
}, true); // true for capturing phase

element.addEventListener('click', function(event) {
    // Handle the click event
}, false); // false for bubbling phase (default)
```

## Stopping Propagation

You can stop the propagation of an event using the `stopPropagation` method. This prevents the event from reaching other event listeners in the capturing or bubbling phase.

```javascript
element.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents the event from bubbling up
});
```

## Example

Here’s a simple example demonstrating event propagation:

```html
<div id="parent">
    Parent
    <button id="child">Child</button>
</div>

<script>
    document.getElementById('parent').addEventListener('click', function() {
        alert('Parent clicked!');
    });

    document.getElementById('child').addEventListener('click', function(event) {
        alert('Child clicked!');
        event.stopPropagation(); // Prevents the parent click event
    });
</script>
```

In this example, clicking the "Child" button will trigger the alert for the child but will not trigger the alert for the parent due to the `stopPropagation` method.

## Conclusion

Understanding event propagation is vital for managing events effectively in JavaScript. By mastering capturing and bubbling phases, as well as how to control propagation, you can create more interactive and responsive web applications.