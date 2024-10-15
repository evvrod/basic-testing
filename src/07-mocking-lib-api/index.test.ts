// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relativePath = '/some-endpoint';
  const mockResponse = { data: { key: 'value' } };

  beforeEach(() => {
    (axios.create as jest.Mock).mockClear();
    (axios.get as jest.Mock).mockClear();
  });

  test('should create instance with provided base url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValueOnce(mockResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  }, 30000);

  test('should perform request to correct provided url', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValueOnce(mockResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    await throttledGetDataFromApi(relativePath);
    await new Promise((resolve) => setTimeout(resolve, THROTTLE_TIME));

    expect(axiosInstance.get).toHaveBeenCalledWith(relativePath);
  }, 30000);

  test('should return response data', async () => {
    const axiosInstance = {
      get: jest.fn().mockResolvedValueOnce(mockResponse),
    };
    (axios.create as jest.Mock).mockReturnValue(axiosInstance);

    const responseData = await throttledGetDataFromApi(relativePath);
    await new Promise((resolve) => setTimeout(resolve, THROTTLE_TIME));

    expect(responseData).toEqual(mockResponse.data);
  }, 30000);
});
