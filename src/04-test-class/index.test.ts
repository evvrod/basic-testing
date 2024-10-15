// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
  type BankAccount,
} from './index';

describe('BankAccount', () => {
  let account1: BankAccount;
  let account2: BankAccount;

  beforeEach(() => {
    account1 = getBankAccount(100);
    account2 = getBankAccount(50);
  });

  test('should create account with initial balance', () => {
    expect(account1.getBalance()).toBe(100);
    expect(account2.getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account1.withdraw(200)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account1.transfer(200, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account1.transfer(200, account1)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account1.deposit(50);
    expect(account1.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account1.withdraw(50);
    expect(account1.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    account1.transfer(50, account2);
    expect(account1.getBalance()).toBe(50);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockBalance = 50;
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(mockBalance);
    const balance = await account1.fetchBalance();
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockBalance = 50;
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(mockBalance);
    await account1.synchronizeBalance();
    expect(account1.getBalance()).toBe(mockBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockBalance = null;
    jest.spyOn(account1, 'fetchBalance').mockResolvedValueOnce(mockBalance);
    await expect(account1.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
