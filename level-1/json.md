# JSON serialize/deserialize

## 1) What JSON is (interview answer)
**JSON (JavaScript Object Notation)** is a text format for data exchange.
- It looks like JS objects/arrays, but it’s **not** JS (it’s a stricter grammar).
- Used in HTTP APIs, config files, localStorage, logs, etc.

JSON supports:
- objects `{}` with string keys
- arrays `[]`
- numbers (finite)
- strings
- booleans
- `null`

JSON does **not** support: `undefined`, functions, symbols, `BigInt`, `Date` (as a type), `Map`, `Set`, `Infinity`, `NaN`, comments.

---

## 2) Serialize: `JSON.stringify(value, replacer?, space?)`
Converts a JS value into a JSON string.

```js
const obj = { a: 1, b: "x" };
const json = JSON.stringify(obj);
// '{"a":1,"b":"x"}'
```

### Pretty printing (`space`)
```js
JSON.stringify({ a: 1, b: 2 }, null, 2);
/*
{
  "a": 1,
  "b": 2
}
*/
```

### What gets dropped/changed
```js
JSON.stringify({
  a: undefined,
  b: function () {},
  c: Symbol("s"),
  d: 1,
});
// '{"d":1}'

JSON.stringify([undefined, function(){}, 1]);
// '[null,null,1]'
```

### Special numbers
```js
JSON.stringify({ n: NaN, i: Infinity, m: -Infinity });
// '{"n":null,"i":null,"m":null}'
```

### BigInt throws
```js
// JSON.stringify({ x: 1n });
// TypeError: Do not know how to serialize a BigInt
```

---

## 3) Parse: `JSON.parse(text, reviver?)`
Converts JSON string into a JS value.

```js
const value = JSON.parse('{"a":1,"b":"x"}');
// { a: 1, b: 'x' }
```

### Parse errors
Invalid JSON throws `SyntaxError`.

```js
try {
  JSON.parse("{a:1}"); // invalid: keys must be in quotes
} catch (e) {
  console.log(e.name); // SyntaxError
}
```

---

## 4) `replacer` and `reviver` (interview favorites)
### 4.1 `replacer` in `stringify`
A function to transform/filter values during serialization.

```js
const user = { id: 1, password: "secret", email: "a@b.com" };

const safe = JSON.stringify(user, (key, value) =>
  key === "password" ? undefined : value
);
// '{"id":1,"email":"a@b.com"}'
```

You can also pass an **array of allowed keys**:
```js
JSON.stringify(user, ["id", "email"]);
```

### 4.2 `reviver` in `parse`
A function to transform values during parsing.

```js
const obj = JSON.parse('{"n":"42"}', (key, value) =>
  key === "n" ? Number(value) : value
);
// { n: 42 }
```

---

## 5) Dates: JSON stores strings, not Date objects
```js
const s = JSON.stringify({ at: new Date("2026-01-01T00:00:00Z") });
// {"at":"2026-01-01T00:00:00.000Z"}

const parsed = JSON.parse(s);
// parsed.at is a string
```

Common interview solution: revive ISO date strings.

```js
const revived = JSON.parse(s, (key, value) => {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return value;
});
```

Note: be careful—blindly converting strings to dates can break legitimate strings.

---

## 6) Circular references
`JSON.stringify` cannot handle cycles.

```js
const a = {};
a.self = a;

// JSON.stringify(a); // TypeError: Converting circular structure to JSON
```

Typical approaches:
- remove cycles / normalize data
- custom replacer that tracks seen objects
- use a specialized library if needed

---

## 7) Custom serialization: `toJSON`
If an object has `toJSON()`, it affects `JSON.stringify`.

```js
const user = {
  id: 1,
  password: "secret",
  toJSON() {
    return { id: this.id }; // hide fields
  },
};

JSON.stringify(user); // '{"id":1}'
```

Interview note: `Date` uses `toJSON()` internally → becomes an ISO string.

---

## 8) Common pitfalls / tricky comparisons
### JSON vs JS object literal
- JSON keys **must** be in double quotes.
- JSON doesn’t allow trailing commas.

Valid JSON:
```json
{"a": 1, "b": [true, null]}
```

Invalid JSON:
```js
// {a: 1,} // not JSON
```

### Ordering
- JSON is text; object key order isn’t something you should rely on for meaning.
- `JSON.stringify` key order follows engine rules (usually insertion order), but don’t build protocols on it.

---

## 9) Security note (important in interviews)
- **Never** use `eval()` to parse JSON.
- `JSON.parse` is safe *as a parser*, but the resulting data is still **untrusted input**.
  - validate shapes (e.g., with runtime checks)
  - beware prototype pollution when merging objects into existing ones

---

## 10) Practical uses
- Deep clone *simple* data:

```js
const clone = JSON.parse(JSON.stringify(obj));
```

But this breaks/loses:
- functions, `undefined`, symbols
- `Date` becomes string
- `Map/Set` become empty objects
- class instances lose prototypes
- BigInt fails
- circular refs fail

For modern runtimes, consider `structuredClone(obj)` for richer cloning.

---

## 11) Quick interview Q&A
- **Q:** What’s the difference between JSON and a JS object?
  - **A:** JSON is a string format with a strict grammar; JS objects can contain functions, undefined, symbols, etc.
- **Q:** What happens to `undefined` in `JSON.stringify`?
  - **A:** Dropped in objects; becomes `null` in arrays.
- **Q:** How do you handle Dates?
  - **A:** Serialize as ISO strings and revive back to `Date` using a `reviver` (carefully).
- **Q:** What error do you get for invalid JSON?
  - **A:** `SyntaxError` from `JSON.parse`.
- **Q:** How do you omit sensitive fields?
  - **A:** `replacer` or `toJSON`.
