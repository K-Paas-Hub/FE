import { apiClient, visaService, authService, userService, jobService, companyService, resumeService } from './api';
import { API_ENDPOINTS } from '../constants';

// Mock fetch
global.fetch = jest.fn();

// Increase timeout for async tests
jest.setTimeout(10000);

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

    test('makes PUT request correctly', async () => {
      const mockResponse = { success: true, data: { id: 1, updated: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const putData = { name: 'updated test' };
      const result = await apiClient.put('/test/1', putData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(putData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
    });

    test('makes DELETE request correctly', async () => {
      const mockResponse = { success: true, data: { deleted: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.delete('/test/1');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
      expect(result.success).toBe(true);
    });

    test('makes PATCH request correctly', async () => {
      const mockResponse = { success: true, data: { id: 1, patched: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const patchData = { status: 'active' };
      const result = await apiClient.patch('/test/1', patchData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/test/1'),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(patchData),
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

  describe('authService', () => {
    test('login calls correct endpoint with credentials', async () => {
      const mockResponse = { success: true, data: { token: 'auth-token', user: { id: 1 } } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const credentials = { email: 'test@example.com', password: 'password123' };
      await authService.login(credentials.email, credentials.password);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.auth}/login`),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(credentials),
        })
      );
    });

    test('register calls correct endpoint with user data', async () => {
      const mockResponse = { success: true, data: { id: 1, message: 'User created' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const userData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
        nationality: 'Korea'
      };

      await authService.register(userData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.auth}/register`),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(userData),
        })
      );
    });

    test('logout calls correct endpoint', async () => {
      const mockResponse = { success: true, data: { message: 'Logged out' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await authService.logout();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.auth}/logout`),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });

    test('refreshToken calls correct endpoint', async () => {
      const mockResponse = { success: true, data: { token: 'new-token' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await authService.refreshToken();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.auth}/refresh`),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  describe('userService', () => {
    test('getProfile calls correct endpoint', async () => {
      const mockResponse = { success: true, data: { id: 1, name: 'Test User' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await userService.getProfile();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.users}/profile`),
        expect.any(Object)
      );
    });

    test('updateProfile calls correct endpoint with user data', async () => {
      const mockResponse = { success: true, data: { id: 1, updated: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const userData = { 
        name: 'Updated User', 
        email: 'updated@example.com',
        nationality: 'Vietnam' 
      };
      await userService.updateProfile(userData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.users}/profile`),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(userData),
        })
      );
    });

    test('getUsers calls correct endpoint with query parameters', async () => {
      const mockResponse = { success: true, data: [{ id: 1 }, { id: 2 }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const params = { page: '1', limit: '10' };
      await userService.getUsers(params);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.users}?page=1&limit=10`),
        expect.any(Object)
      );
    });
  });

  describe('jobService', () => {
    test('getJobs calls correct endpoint', async () => {
      const mockResponse = { success: true, data: [{ id: 1, title: 'Developer' }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await jobService.getJobs();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.jobs),
        expect.any(Object)
      );
    });

    test('getJob calls correct endpoint with job ID', async () => {
      const mockResponse = { success: true, data: { id: 1, title: 'Developer' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await jobService.getJob('job-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.jobs}/job-123`),
        expect.any(Object)
      );
    });

    test('createJob calls correct endpoint with job data', async () => {
      const mockResponse = { success: true, data: { id: 1, created: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const jobData = {
        title: 'Developer',
        company: 'Tech Corp',
        location: 'Seoul',
        salary: '40000',
        description: 'Great job',
        requirements: 'React, TypeScript experience',
        type: 'full-time' as const
      };

      await jobService.createJob(jobData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.jobs),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(jobData),
        })
      );
    });

    test('updateJob calls correct endpoint with job data', async () => {
      const mockResponse = { success: true, data: { id: 1, updated: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const jobData = { 
        title: 'Senior Developer',
        company: 'Tech Corp',
        description: 'Senior developer position',
        requirements: '5+ years experience',
        location: 'Seoul',
        type: 'full-time' as const
      };
      await jobService.updateJob('job-123', jobData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.jobs}/job-123`),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(jobData),
        })
      );
    });

    test('deleteJob calls correct endpoint with job ID', async () => {
      const mockResponse = { success: true, data: { deleted: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await jobService.deleteJob('job-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.jobs}/job-123`),
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('companyService', () => {
    test('getCompanies calls correct endpoint', async () => {
      const mockResponse = { success: true, data: [{ id: 1, name: 'Tech Corp' }] };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await companyService.getCompanies();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.companies),
        expect.any(Object)
      );
    });

    test('getCompany calls correct endpoint with company ID', async () => {
      const mockResponse = { success: true, data: { id: 1, name: 'Tech Corp' } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await companyService.getCompany('company-123');

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.companies}/company-123`),
        expect.any(Object)
      );
    });

    test('createCompany calls correct endpoint with company data', async () => {
      const mockResponse = { success: true, data: { id: 1, created: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const companyData = {
        name: 'New Tech Corp',
        description: 'Technology company',
        industry: 'Technology',
        location: 'Seoul',
        size: '100-500'
      };

      await companyService.createCompany(companyData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(API_ENDPOINTS.companies),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(companyData),
        })
      );
    });

    test('updateCompany calls correct endpoint with company data', async () => {
      const mockResponse = { success: true, data: { id: 1, updated: true } };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const companyData = { 
        name: 'Updated Tech Corp',
        description: 'Updated technology company',
        industry: 'Technology',
        size: '100-500',
        location: 'Seoul'
      };
      await companyService.updateCompany('company-123', companyData);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`${API_ENDPOINTS.companies}/company-123`),
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(companyData),
        })
      );
    });
  });

  describe('resumeService', () => {
    beforeEach(() => {
      // Set timeout for async tests
      jest.setTimeout(10000);
      
      // localStorage mock
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true,
      });
      
      // Use fake timers for async tests
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('saveResume saves to localStorage successfully', async () => {
      const resumeData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '010-1234-5678',
        nationality: 'Vietnam',
        visaType: 'E9',
        address: 'Seoul, Korea',
        addressDetail: 'Gangnam-gu',
        education: 'Bachelor degree',
        experience: '3 years',
        skills: 'React, TypeScript',
        certifications: 'AWS Certified',
        languages: 'Korean, English',
        introduction: 'Experienced developer'
      };

      const result = await resumeService.saveResume(resumeData);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'resume_draft',
        JSON.stringify(resumeData)
      );
      expect(result.success).toBe(true);
      expect(result.message).toBe('이력서가 임시저장되었습니다.');
    });

    test('saveResume handles data size limit', async () => {
      // Create large data object that exceeds 5MB
      const largeData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '010-1234-5678',
        nationality: 'Vietnam',
        visaType: 'E9',
        address: 'Seoul, Korea',
        addressDetail: 'Gangnam-gu',
        education: 'Bachelor degree',
        experience: 'A'.repeat(6 * 1024 * 1024), // 6MB of data
        skills: 'React, TypeScript',
        certifications: 'AWS Certified',
        languages: 'Korean, English',
        introduction: 'Experienced developer'
      };

      const result = await resumeService.saveResume(largeData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('데이터가 너무 큽니다. 일부 내용을 줄여주세요.');
    });

    test('saveResume handles save errors', async () => {
      const resumeData = { 
        name: 'Test User',
        email: 'test@example.com',
        phone: '010-1234-5678',
        nationality: 'Vietnam',
        visaType: 'E9',
        address: 'Seoul, Korea',
        addressDetail: 'Gangnam-gu',
        education: 'Bachelor degree',
        experience: '3 years',
        skills: 'React, TypeScript',
        certifications: 'AWS Certified',
        languages: 'Korean, English',
        introduction: 'Experienced developer'
      };
      
      // Mock localStorage.setItem to throw error
      (localStorage.setItem as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Storage error');
      });

      const result = await resumeService.saveResume(resumeData);

      expect(result.success).toBe(false);
      expect(result.error).toBe('저장에 실패했습니다.');
    });

    test('submitResume submits successfully with mock delay', async () => {
      const resumeData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '010-1234-5678',
        nationality: 'Vietnam',
        visaType: 'E9',
        address: 'Seoul, Korea',
        addressDetail: 'Gangnam-gu',
        education: 'Bachelor degree',
        experience: '3 years',
        skills: 'React, TypeScript',
        certifications: 'AWS Certified',
        languages: 'Korean, English',
        introduction: 'Experienced developer'
      };

      const promise = resumeService.submitResume(resumeData);
      
      // Fast-forward timers
      jest.runAllTimers();
      
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data?.status).toBe('submitted');
      expect(result.message).toBe('이력서가 성공적으로 제출되었습니다!');
    });

    test('getResume retrieves saved resume from localStorage', async () => {
      const savedData = { personalInfo: { name: 'Saved User' } };
      (localStorage.getItem as jest.Mock).mockReturnValueOnce(JSON.stringify(savedData));

      const result = await resumeService.getResume('draft_123');

      expect(localStorage.getItem).toHaveBeenCalledWith('resume_draft');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(savedData);
    });

    test('getResume handles no saved resume', async () => {
      (localStorage.getItem as jest.Mock).mockReturnValueOnce(null);

      const result = await resumeService.getResume('draft_123');

      expect(result.success).toBe(false);
      expect(result.error).toBe('저장된 이력서가 없습니다.');
    });

    test('getResume handles parse errors', async () => {
      (localStorage.getItem as jest.Mock).mockReturnValueOnce('invalid json');

      const result = await resumeService.getResume('draft_123');

      expect(result.success).toBe(false);
      expect(result.error).toBe('이력서를 불러오는데 실패했습니다.');
    });

    test('uploadFile simulates file upload with progress', async () => {
      const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
      const progressCallback = jest.fn();

      // Mock URL.createObjectURL
      global.URL.createObjectURL = jest.fn(() => 'blob:test-url');

      const promise = resumeService.uploadFile(file, progressCallback);
      
      // Fast-forward timers
      jest.runAllTimers();
      
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.data?.name).toBe('test.pdf');
      expect(result.data?.type).toBe('application/pdf');
      expect(result.message).toBe('파일이 업로드되었습니다.');
      expect(progressCallback).toHaveBeenCalledWith(100);
    });

    test('deleteFile simulates file deletion', async () => {
      const promise = resumeService.deleteFile('file_123');
      
      // Fast-forward timers
      jest.runAllTimers();
      
      const result = await promise;

      expect(result.success).toBe(true);
      expect(result.message).toBe('파일이 삭제되었습니다.');
    });
  });
});
