import { API_ENDPOINTS } from '../constants';
import { UserData, JobData, CompanyData, VisaApplicationData, ResumeData } from '../types/api';

// API 응답 타입 정의
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// HTTP 메서드 타입
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API 클라이언트 클래스
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_ENDPOINTS.base) {
    this.baseURL = baseURL;
  }

  // 기본 요청 메서드
  private async request<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
      };

      // 토큰이 있으면 헤더에 추가
      const token = localStorage.getItem('authToken');
      if (token) {
        requestHeaders.Authorization = `Bearer ${token}`;
      }

      const config: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
      }

      const response = await fetch(url, config);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'API 요청에 실패했습니다.');
      }

      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      };
    }
  }

  // GET 요청
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'GET', undefined, headers);
  }

  // POST 요청
  async post<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data, headers);
  }

  // PUT 요청
  async put<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', data, headers);
  }

  // DELETE 요청
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', undefined, headers);
  }

  // PATCH 요청
  async patch<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', data, headers);
  }
}

// API 클라이언트 인스턴스 생성
export const apiClient = new ApiClient();

// 특정 API 서비스들
export const authService = {
  login: (email: string, password: string) =>
    apiClient.post(API_ENDPOINTS.auth + '/login', { email, password }),
  
  register: (userData: UserData) =>
    apiClient.post(API_ENDPOINTS.auth + '/register', userData),
  
  logout: () =>
    apiClient.post(API_ENDPOINTS.auth + '/logout'),
  
  refreshToken: () =>
    apiClient.post(API_ENDPOINTS.auth + '/refresh'),
};

export const userService = {
  getProfile: () =>
    apiClient.get(API_ENDPOINTS.users + '/profile'),
  
  updateProfile: (userData: UserData) =>
    apiClient.put(API_ENDPOINTS.users + '/profile', userData),
  
  getUsers: (params?: Record<string, string>) =>
    apiClient.get(API_ENDPOINTS.users + '?' + new URLSearchParams(params)),
};

export const jobService = {
  getJobs: (params?: Record<string, string>) =>
    apiClient.get(API_ENDPOINTS.jobs + '?' + new URLSearchParams(params)),
  
  getJob: (id: string) =>
    apiClient.get(API_ENDPOINTS.jobs + '/' + id),
  
  createJob: (jobData: JobData) =>
    apiClient.post(API_ENDPOINTS.jobs, jobData),
  
  updateJob: (id: string, jobData: JobData) =>
    apiClient.put(API_ENDPOINTS.jobs + '/' + id, jobData),
  
  deleteJob: (id: string) =>
    apiClient.delete(API_ENDPOINTS.jobs + '/' + id),
};

export const companyService = {
  getCompanies: (params?: Record<string, string>) =>
    apiClient.get(API_ENDPOINTS.companies + '?' + new URLSearchParams(params)),
  
  getCompany: (id: string) =>
    apiClient.get(API_ENDPOINTS.companies + '/' + id),
  
  createCompany: (companyData: CompanyData) =>
    apiClient.post(API_ENDPOINTS.companies, companyData),
  
  updateCompany: (id: string, companyData: CompanyData) =>
    apiClient.put(API_ENDPOINTS.companies + '/' + id, companyData),
};

export const visaService = {
  getVisaTypes: () =>
    apiClient.get(API_ENDPOINTS.visa + '/types'),
  
  getVisaType: (type: string) =>
    apiClient.get(API_ENDPOINTS.visa + '/types/' + type),
  
  getVisaDocuments: (type: string) =>
    apiClient.get(API_ENDPOINTS.visa + '/types/' + type + '/documents'),
  
  getVisaFAQ: () =>
    apiClient.get(API_ENDPOINTS.visa + '/faq'),
  
  submitVisaApplication: (data: VisaApplicationData) =>
    apiClient.post(API_ENDPOINTS.visa + '/apply', data),
  
  checkVisaStatus: (applicationId: string) =>
    apiClient.get(API_ENDPOINTS.visa + '/status/' + applicationId),
};

// 이력서 서비스 추가
export const resumeService = {
  saveResume: async (data: ResumeData): Promise<ApiResponse<ResumeData>> => {
    try {
      const serialized = JSON.stringify(data);
      if (serialized.length > 5 * 1024 * 1024) { // 5MB 제한
        return {
          success: false,
          error: '데이터가 너무 큽니다. 일부 내용을 줄여주세요.'
        };
      }
      
      localStorage.setItem('resume_draft', serialized);
      return {
        success: true,
        data: { 
          id: 'draft_' + Date.now(), 
          ...data,
          status: 'draft',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        message: '이력서가 임시저장되었습니다.'
      };
    } catch (error) {
      return {
        success: false,
        error: '저장에 실패했습니다.'
      };
    }
  },

  submitResume: async (data: ResumeData): Promise<ApiResponse<ResumeData>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { 
            id: 'resume_' + Date.now(), 
            ...data, 
            status: 'submitted',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          },
          message: '이력서가 성공적으로 제출되었습니다!'
        });
      }, 1000);
    });
  },

  getResume: async (id: string): Promise<ApiResponse<ResumeData>> => {
    try {
      const saved = localStorage.getItem('resume_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          success: true,
          data: parsed
        };
      } else {
        return {
          success: false,
          error: '저장된 이력서가 없습니다.'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: '이력서를 불러오는데 실패했습니다.'
      };
    }
  },

  uploadFile: async (file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<any>> => {
    return new Promise((resolve) => {
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 90) {
          clearInterval(progressInterval);
          progress = 90;
        }
        onProgress?.(progress);
      }, 200);

      setTimeout(() => {
        clearInterval(progressInterval);
        onProgress?.(100);
        
        const objectUrl = URL.createObjectURL(file);
        resolve({
          success: true,
          data: {
            id: 'file_' + Date.now(),
            name: file.name,
            size: file.size,
            url: objectUrl,
            type: file.type
          },
          message: '파일이 업로드되었습니다.'
        });
      }, 1500);
    });
  },

  deleteFile: async (fileId: string): Promise<ApiResponse<void>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: '파일이 삭제되었습니다.'
        });
      }, 500);
    });
  }
};
