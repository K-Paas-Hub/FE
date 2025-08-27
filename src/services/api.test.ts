import { apiClient, visaService } from './api';
import { API_ENDPOINTS } from '../constants';

// Mock fetch
global.fetch = jest.fn();

describe('API Services', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('apiClient', () => {
    test('makes GET request correctly', async () => {
      const mockResponse = { success: true, data: { test: 'data' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
    });

    test('makes POST request correctly', async () => {
      const mockResponse = { success: true, data: { id: 1 } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const postData = { name: 'test' };
      const result = await apiClient.post('/test', postData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(postData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
    });

    test('handles API errors correctly', async () => {
      const mockError = { message: 'API Error' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => mockError,
      });

      const result = await apiClient.get('/test');

      expect(result.success).toBe(false);
      expect(result.error).toBe('API Error');
    });

    test('handles network errors correctly', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await apiClient.get('/test');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Network error');
    });

    test('includes authorization header when token exists', async () => {
      const mockResponse = { success: true, data: {} };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      // Mock localStorage
      const mockToken = 'test-token';
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => mockToken),
        },
        writable: true,
      });

      await apiClient.get('/test');

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      );
    });
  });

  describe('visaService', () => {
    test('getVisaTypes calls correct endpoint', async () => {
      const mockResponse = { success: true, data: [] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await visaService.getVisaTypes();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.visa}/types`),
        expect.any(Object)
      );
    });

    test('getVisaType calls correct endpoint with type parameter', async () => {
      const mockResponse = { success: true, data: {} };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await visaService.getVisaType('e9');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.visa}/types/e9`),
        expect.any(Object)
      );
    });

    test('getVisaDocuments calls correct endpoint', async () => {
      const mockResponse = { success: true, data: [] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await visaService.getVisaDocuments('d2');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.visa}/types/d2/documents`),
        expect.any(Object)
      );
    });

    test('getVisaFAQ calls correct endpoint', async () => {
      const mockResponse = { success: true, data: [] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await visaService.getVisaFAQ();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.visa}/faq`),
        expect.any(Object)
      );
    });

    test('submitVisaApplication calls correct endpoint with data', async () => {
      const mockResponse = { success: true, data: { id: 1 } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const applicationData = {
        userId: 'user-123',
        visaType: 'e9',
        documents: ['passport', 'contract'],
        status: 'pending' as const,
        submittedAt: new Date().toISOString(),
      };

      await visaService.submitVisaApplication(applicationData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.visa}/apply`),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(applicationData),
        })
      );
    });

    test('checkVisaStatus calls correct endpoint with application ID', async () => {
      const mockResponse = { success: true, data: { status: 'processing' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await visaService.checkVisaStatus('app-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.visa}/status/app-123`),
        expect.any(Object)
      );
    });
  });
});
