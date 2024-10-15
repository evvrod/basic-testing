// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1, 'x', 3, 4];
    const expected = {
      value: 1,
      next: {
        value: 'x',
        next: {
          value: 3,
          next: { value: 4, next: { value: null, next: null } },
        },
      },
    };

    const result = generateLinkedList(elements);
    expect(result).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [1, 'x', 3, 4];
    const result = generateLinkedList(elements);
    expect(result).toMatchSnapshot();
  });
});
