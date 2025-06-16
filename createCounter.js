import { CounterPrototype } from './CounterPrototype.js';

export function createCounter(initialValue = 0) {
  let count = initialValue;
  const originalValue = initialValue;
  let changeCallback = null;

  const counter = Object.create(CounterPrototype);

  const notifyChange = (newValue, operation) => {
    changeCallback?.(newValue, operation);
  };

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

    reset() {
      count = originalValue;
      notifyChange(count, 'reset');
      return count;
    },

    transform: (transformFn) => {
      count = transformFn(count);
      notifyChange(count, 'transform');
      return count;
    },

    createPredicate: () => (threshold) => count >= threshold,

    onChange(callback) {
      changeCallback = callback;
      return counter;
    },

    // Destructuring in parameters
    batch({ increments = 0, decrements = 0 }) {
      for (let i = 0; i < increments; i++) this.increment();
      for (let i = 0; i < decrements; i++) this.decrement();
      return count;
    },

    // Template literals
    toString: () => `Counter(value: ${count}, initial: ${originalValue})`,

    // Immutable methods
    add: (value) => createCounter(count + value),
    subtract: (value) => createCounter(count - value),
    multiply: (value) => createCounter(count * value),
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
  let count = initialValue;
  const enforceRange = (val) => Math.min(max, Math.max(min, val));

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
