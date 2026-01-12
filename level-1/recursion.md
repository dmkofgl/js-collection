# Recursion

## 1) Short definition (interview answer)
**Recursion** is a technique where a function solves a problem by calling itself with a **smaller/simpler input** until it reaches a **base case**.

Core idea:
- **Base case**: when to stop.
- **Recursive step**: move toward the base case.

---

## 2) Mental model: call stack frames
Each recursive call creates a new **stack frame**.
That’s why:
- recursion can be elegant
- but too deep recursion can cause **stack overflow** (`RangeError: Maximum call stack size exceeded`)

```js
function f() {
  return f();
}
// f(); // RangeError
```

---

## 3) Classic examples
### 3.1 Factorial
```js
function factorial(n) {
  if (n < 0) throw new Error("n must be >= 0");
  if (n === 0) return 1;       // base case
  return n * factorial(n - 1); // recursive step
}
```

Edge cases interviewers may check:
- `n = 0` (should be `1`)
- negative input (validation)

### 3.2 Fibonacci (naive vs memo)
Naive recursion is exponential:
```js
function fib(n) {
  if (n < 0) throw new Error("n must be >= 0");
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
```

Memoization makes it linear:
```js
function fibMemo(n, memo = new Map([[0, 0], [1, 1]])) {
  if (memo.has(n)) return memo.get(n);
  const value = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, value);
  return value;
}
```

---

## 4) Common recursion patterns (interview-grade)
### 4.1 “Divide and conquer”
Split the input into parts, solve each part recursively, combine results.
Examples: quicksort/mergesort (conceptually), binary search.

### 4.2 Tree/graph traversal (DFS)
Recursion naturally fits hierarchical structures.

```js
function dfs(node, visit) {
  if (!node) return;
  visit(node);
  for (const child of node.children ?? []) {
    dfs(child, visit);
  }
}
```

For graphs, you need a `visited` set to avoid infinite loops:
```js
function dfsGraph(node, visit, visited = new Set()) {
  if (!node || visited.has(node)) return;
  visited.add(node);
  visit(node);
  for (const next of node.neighbors ?? []) {
    dfsGraph(next, visit, visited);
  }
}
```

### 4.3 Work on nested structures (arrays/objects)
Example: flatten an array.

```js
function flatten(arr) {
  const res = [];

  for (const item of arr) {
    if (Array.isArray(item)) res.push(...flatten(item));
    else res.push(item);
  }

  return res;
}

// flatten([1, [2, [3, 4]]]) -> [1, 2, 3, 4]
```

---

## 5) Recursion vs iteration (trade-offs)
### Recursion pros
- clean, readable for hierarchical problems
- mirrors problem definition (trees, nested structures)

### Recursion cons
- risk of stack overflow for large depth
- may be slower due to function call overhead
- in JS, **tail-call optimization is not reliably available** across engines

### When to prefer iteration
- large input depth (linked lists, deep nesting)
- performance-critical code

Example iterative factorial:
```js
function factorialIter(n) {
  if (n < 0) throw new Error("n must be >= 0");
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
```

---

## 6) Common mistakes (what interviewers look for)
- Missing base case → infinite recursion → stack overflow
- Base case is wrong (off-by-one)
- Not making progress toward base case
- For trees/graphs: forgetting `visited` in graphs
- Excessive recomputation (e.g., naive Fibonacci) → fix with memoization / DP

---

## 7) Tips for solving recursion problems in interviews
A quick “recipe”:
1. Define the function signature clearly.
2. Identify the **base case(s)**.
3. Define the **recursive step** (how input gets smaller).
4. Ensure it always moves toward the base case.
5. Consider complexity and stack depth.

When stuck, trace a small input by hand and write down the call order.

---

## 8) Complexity notes (quick)
- Recursion does not automatically mean bad complexity.
- Complexity depends on:
  - branching factor (how many recursive calls per level)
  - depth of recursion

Examples:
- factorial: **O(n)** calls
- naive fibonacci: ~**O(2^n)**
- fibonacci with memo: **O(n)**

---

## 9) Quick interview Q&A
- **Q:** What are the two essential parts of recursion?
  - **A:** Base case and recursive step.
- **Q:** Why does recursion cause “Maximum call stack size exceeded”?
  - **A:** Each call adds a stack frame; deep recursion exhausts stack memory.
- **Q:** How do you optimize recursive solutions?
  - **A:** Memoization, divide-and-conquer, pruning, converting to iteration.
- **Q:** When is recursion most natural?
  - **A:** Trees, nested structures, DFS/backtracking problems.
