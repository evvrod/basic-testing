// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 0, b: 2, action: Action.Add, expected: 2 },
  { a: 10, b: 2, action: Action.Add, expected: 12 },

  { a: 10, b: 5, action: Action.Subtract, expected: 5 },
  { a: 10, b: 0, action: Action.Subtract, expected: 10 },
  { a: 14, b: 2, action: Action.Subtract, expected: 12 },

  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 0, b: 0, action: Action.Multiply, expected: 0 },
  { a: 6, b: 0, action: Action.Multiply, expected: 0 },

  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 9, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 3, action: Action.Divide, expected: 0 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 0, b: 3, action: Action.Exponentiate, expected: 0 },
  { a: 6, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 4, b: '5', action: Action.Add, expected: null },
  { a: 5, b: 3, action: '%', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'correctly performs the $action operation for $a and $b',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
