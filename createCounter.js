import { CounterPrototype } from './CounterPrototype.js';

export function createCounter(initialValue = 0) {
  // Declare private variables
  let count = initialValue;
  const originalValue = initialValue;
  let changeCallback = null;

  // Create a new counter instance using the CounterPrototype
  const counter = Object.create(CounterPrototype);

  // Notify the change callback if it exists
  const notifyChange = (newValue, operation) => {
    changeCallback?.(newValue, operation);
  };

  // Assign the methods to the counter instance
  Object.assign(counter, {
    increment() {
      count++;
      notifyChange(count, 'increment');
      return count;
    },

    decrement() {
      count--;
      notifyChange(count, 'decrement');
      return count;
    },

    getValue: () => count,

    // Reset the counter to the original value
    reset() {
      count = originalValue;
      notifyChange(count, 'reset');
      return count;
    },

    // Transform the counter value using a higher-order function
    transform: (transformFn) => {
      count = transformFn(count);
      notifyChange(count, 'transform');
      return count;
    },

    // Create a predicate function that checks if the counter value is greater than or equal to a threshold
    createPredicate: () => (threshold) => count >= threshold,

    // Add a change callback
    onChange(callback) {
      changeCallback = callback;
      return counter;
    },

    // Batch increment and decrement the counter
    batch({ increments = 0, decrements = 0 }) {
      for (let i = 0; i < increments; i++) this.increment();
      for (let i = 0; i < decrements; i++) this.decrement();
      return count;
    },

    // Return a string representation of the counter
    toString: () => `Counter(value: ${count}, initial: ${originalValue})`,

    // Immutable methods (create new counter instances)
    add: (value) => createCounter(count + value),
    subtract: (value) => createCounter(count - value),
    multiply: (value) => createCounter(count * value),
    // Return a snapshot of the counter value
    snapshot: () => createCounter(count),
  });
  return counter;
}

export function createAdvancedCounter({
  initialValue = 0,
  step = 1,
  min = -Infinity,
  max = Infinity,
} = {}) {
  // Declare private variables
  let count = initialValue;
  const enforceRange = (val) => Math.min(max, Math.max(min, val));

  // Create a new counter instance using the CounterPrototype
  const counter = {
    increment: () => (count = enforceRange(count + step)),
    decrement: () => (count = enforceRange(count - step)),
    getValue: () => count,
    getConfig: () => ({ initialValue, step, min, max }),
  };

  return counter;
}

// const counter1 = createCounter(0);
// const counter2 = createCounter(10);

// counter1.increment();
// console.log(counter1.getValue()); // 1
// console.log(counter2.getValue()); // 10
