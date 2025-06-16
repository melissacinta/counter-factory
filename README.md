# counter-factory

## Task 1.1: Write down in the README.md file in the root of your project what you think the main challenges will be in implementing this

- The main challenge in implementing this is understanding the concept of factory functions and how to go about creating prototypes

- Managing private variables

## Task 2.2: Explain why we're creating a prototype first instead of putting methods directly in each counter instance

- Using a shared prototype avoids redefining the same functions for every counter instance.
- It also makes the codebase easier to manage and extend.

## Task 3.2: After creating two counters, should they share the same count variable or have separate ones

No the should not share the same count variable, each counter should maintain its own private state maybe through closure as this will help prevent interference between differnt counter instances.

## 6. Difference between increment() and add(1)

`increment()` mutates the current counter, whereas `add(1)` returns a new counter, preserving immutability.

## 7.1 My creatCounter befor aditional refactoring

```
import { CounterPrototype } from './CounterPrototype.js';

export function createCounter(initialValue = 0) {
  let count = initialValue;
  let originalValue = initialValue;
  let changeCallback = null;

  const counter = Object.create(CounterPrototype);

  const notifyChange = (newValue, operation) => {
    if (changeCallback) {
      changeCallback(newValue, operation);
    }
  };

  counter.increment = function () {
    count++;
    notifyChange(count, 'increment');
    return count;
  };

  counter.decrement = function () {
    count--;
    notifyChange(count, 'decrement');
    return count;
  };

  counter.getValue = function () {
    return count;
  };

  counter.reset = function () {
    count = originalValue;
    return count;
  };
  counter.transform = (fn) => (count = fn(count));

  counter.createPredicate = () => (threshold) => count >= threshold;

  counter.onChange = function (callback) {
    changeCallback = callback;
    return counter;
  };

  counter.add = function (value) {
    return createCounter(count + value);
  };

  counter.subtract = function (value) {
    return createCounter(count - value);
  };

  counter.multiply = function (value) {
    return createCounter(count * value);
  };

  counter.snapshot = function () {
    return createCounter(count);
  };
  return counter;
}
```

## Reflection

1. **Closures** preserve internal state without exposing it.
2. **Prototypes** let us reuse methods more efficiently across instances.
3. **Mutable** methods are simpler but risk side effects. **Immutable** methods are safer and predictable.
4. **Higher-order functions** like `transform` make counters more customizable.
5. ES6 features improved readability, reduced boilerplate, and made logic more expressive.
