# Objects: Constructor, New, this, binding this, computed fields, Object.keys, Object.values, copying, Object.assign(), comparing

Objects are used to store keyed collections of various data and more complex entities.


An empty object (“empty cabinet”) can be created using one of two syntaxes:
```
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```
```
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")
```

The dot notation cannot be used in a similar way:
```
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined

```
## Constructor

## New

## this

## Binding this

## Computed fields

## Object.keys

## Object.values

## Copying objects

## Object.assign()

## Comparing objects