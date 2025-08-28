import axios from 'axios';
import { api, authAPI } from '../api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('API Instance Configuration', () => {
    it('creates axios instance with correct configuration', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: expect.any(String),
        timeout: 10000,
      });
    });
  });

  describe('Generic API Methods', () => {
    let mockInstance: any;

    beforeEach(() => {
      mockInstance = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
      };
      mockedAxios.create.mockReturnValue(mockInstance);
    });

    it('get method calls axios get', async () => {
      const response = { data: { message: 'success' } };
      mockInstance.get.mockResolvedValue(response);

      const result = await api.get('/test');
      
      expect(mockInstance.get).toHaveBeenCalledWith('/test');
      expect(result).toEqual(response);
    });

    it('post method calls axios post', async () => {
      const data = { name: 'test' };
      const response = { data: { id: 1, ...data } };
      mockInstance.post.mockResolvedValue(response);

      const result = await api.post('/test', data);
      
      expect(mockInstance.post).toHaveBeenCalledWith('/test', data);
      expect(result).toEqual(response);
    });
  });

  describe('Auth API', () => {
    it('login method calls correct endpoint', async () => {
      const credentials = { email: 'test@example.com', password: 'password' };
      const response = { data: { user: {}, token: 'token' } };
      
      const mockInstance = {
        post: jest.fn().mockResolvedValue(response),
      };
      mockedAxios.create.mockReturnValue(mockInstance as any);

      await authAPI.login(credentials);
      
      expect(mockInstance.post).toHaveBeenCalledWith('/auth/login', credentials);
    });
  });
});
