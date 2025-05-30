# Basic DOM Operations

## Selecting Elements
In JavaScript, you can select DOM elements using various methods:

- **getElementById**: Selects an element by its ID.
  ```javascript
  const element = document.getElementById('myId');
  ```

- **getElementsByClassName**: Selects elements by their class name.
  ```javascript
  const elements = document.getElementsByClassName('myClass');
  ```

- **getElementsByTagName**: Selects elements by their tag name.
  ```javascript
  const elements = document.getElementsByTagName('div');
  ```

- **querySelector**: Selects the first element that matches a CSS selector.
  ```javascript
  const element = document.querySelector('.myClass');
  ```

- **querySelectorAll**: Selects all elements that match a CSS selector.
  ```javascript
  const elements = document.querySelectorAll('div.myClass');
  ```

## Modifying Content
You can modify the content of selected elements using the `innerHTML` or `textContent` properties:

- **innerHTML**: Sets or gets the HTML content inside an element.
  ```javascript
  element.innerHTML = '<span>New Content</span>';
  ```

- **textContent**: Sets or gets the text content inside an element.
  ```javascript
  element.textContent = 'New Text Content';
  ```

## Adding and Removing Elements
You can create new elements and add them to the DOM:

- **Creating an Element**:
  ```javascript
  const newElement = document.createElement('div');
  newElement.textContent = 'Hello World';
  ```

- **Appending an Element**:
  ```javascript
  document.body.appendChild(newElement);
  ```

- **Removing an Element**:
  ```javascript
  const elementToRemove = document.getElementById('myId');
  elementToRemove.parentNode.removeChild(elementToRemove);
  ```

## Handling Events
You can add event listeners to elements to handle user interactions:

- **Adding an Event Listener**:
  ```javascript
  element.addEventListener('click', function() {
      alert('Element clicked!');
  });
  ```

- **Removing an Event Listener**:
  ```javascript
  function handleClick() {
      alert('Element clicked!');
  }
  element.addEventListener('click', handleClick);
  element.removeEventListener('click', handleClick);
  ```

## Conclusion
Understanding basic DOM operations is essential for manipulating web pages dynamically. By selecting elements, modifying content, adding/removing elements, and handling events, you can create interactive web applications.