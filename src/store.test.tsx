import { counter, increment, decrement } from './store';

test('counter function returns the incremented value according to the passed step', () => {
  const returnValue = counter(0, increment(2));
  expect(returnValue).toEqual(2);
});

test('counter function returns the decremented value according to the passed step', () => {
  const returnValue = counter(5, decrement(1));
  expect(returnValue).toEqual(4);
});
