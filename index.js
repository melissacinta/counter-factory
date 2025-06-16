import { createAdvancedCounter, createCounter } from './createCounter.js';

const counter1 = createCounter(0);
const counter2 = createCounter(10);

counter1.increment();
counter2.increment();

console.log(counter1.getValue()); // 1
console.log(counter2.getValue()); // 11

counter1.onChange((value, type) => {
  console.log(`[${type}] New value:`, value);
});
counter1.increment();
counter1.decrement();

const immutable = counter1.add(5);
console.log('Immutable:', immutable.getValue());
console.log('Original:', counter1.getValue());

console.log('\n=== HIGHER-ORDER FUNCTIONS DEMO ===');
const hofCounter = createCounter(5);

hofCounter.transform((x) => x * 2);
console.log(hofCounter.getValue());

const isAboveThreshold = hofCounter.createPredicate();
console.log(isAboveThreshold(8)); // true (10 >= 8)
console.log(isAboveThreshold(15)); // false (10 < 15)
// Using onChange (accepts callback)
hofCounter.onChange((value, operation) => {
  console.log(`Counter changed to ${value} via ${operation}`);
});

hofCounter.increment();
hofCounter.batch({ increments: 3, decrements: 1 });

console.log(hofCounter.toString());

const advancedCounter = createAdvancedCounter({
  initialValue: 5,
  step: 2,
  min: 0,
  max: 10,
});

console.log(advancedCounter.increment()); // 7
console.log(advancedCounter.increment()); // 9
console.log(advancedCounter.increment()); // 10 (capped at max)
console.log(advancedCounter.increment()); // 10 (still capped)

console.log(advancedCounter.getConfig()); // Shows configuration
