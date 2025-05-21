# var, let, const difference

**var**
- Function-scoped.
- Can be redeclared and reassigned.
- Hoisted to the top of its scope (declaration is hoisted, initialization is not).
- Does not support block scope.

**let**
- Block-scoped.
- Can be reassigned, but cannot be redeclared in the same scope.
- Hoisted, but not initialized (cannot be used before declaration).
- Preferred for variables that will change.

**const**
- Block-scoped.
- Cannot be redeclared or reassigned.
- Must be initialized at declaration.
- Used for constants and immutable references.

[More info at javascript.info](https://javascript.info/var)