# use-strict.md

## 'use strict' Directive in JavaScript

The `'use strict'` directive is a way to opt into a restricted variant of JavaScript, which helps in catching common coding errors and "unsafe" actions such as defining global variables unintentionally. It can be applied to entire scripts or individual functions.

### Purpose of 'use strict'

1. **Eliminates some JavaScript silent errors**: In strict mode, errors that would otherwise fail silently will throw exceptions, making it easier to debug code.
2. **Prevents the use of some features**: Certain features that are considered problematic or error-prone are not allowed in strict mode, such as using undeclared variables.
3. **Makes it easier to write secure JavaScript**: It helps in writing more secure code by preventing actions that are considered unsafe.

### How to Use 'use strict'

To enable strict mode, simply add the directive at the beginning of your script or function:

```javascript
// Enabling strict mode for the entire script
'use strict';

function myFunction() {
    // Enabling strict mode for this function only
    'use strict';
    // Function code here
}
```

### Effects of 'use strict'

- **Variables must be declared**: Assigning a value to an undeclared variable will throw a ReferenceError.
- **Eliminates `this` coercion**: In strict mode, `this` remains `undefined` in functions that are called without an explicit context.
- **Disallows duplicate parameter names**: Functions cannot have parameters with the same name.
- **Prevents the use of `with` statement**: The `with` statement is not allowed in strict mode.

### Conclusion

Using `'use strict'` is a good practice in JavaScript development as it helps in writing cleaner, more reliable code. It is recommended to use strict mode in all your JavaScript files to take advantage of its benefits.