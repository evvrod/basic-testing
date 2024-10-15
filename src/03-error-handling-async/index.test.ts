// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue('test value');
    expect(result).toBe('test value');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const result = () => throwError('Custom error message');
    expect(result).toThrow('Custom error message');
  });

  test('should throw error with default message if message is not provided', async () => {
    const result = () => throwError();
    expect(result).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const result = () => throwCustomError();
    expect(result).toThrow(MyAwesomeError);
    expect(result).toThrow('This is my awesome custom error!');
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const result = rejectCustomError();
    await expect(result).rejects.toThrow(MyAwesomeError);
    await expect(result).rejects.toThrow('This is my awesome custom error!');
  });
});
