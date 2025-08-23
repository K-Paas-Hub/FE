import { API_ENDPOINTS } from '../constants';

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
    data?: any,
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
  async post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'POST', data, headers);
  }

  // PUT 요청
  async put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PUT', data, headers);
  }

  // DELETE 요청
  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'DELETE', undefined, headers);
  }

  // PATCH 요청
  async patch<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, 'PATCH', data, headers);
  }
}

// API 클라이언트 인스턴스 생성
export const apiClient = new ApiClient();

// 특정 API 서비스들
export const authService = {
  login: (email: string, password: string) =>
    apiClient.post(API_ENDPOINTS.auth + '/login', { email, password }),
  
  register: (userData: any) =>
    apiClient.post(API_ENDPOINTS.auth + '/register', userData),
  
  logout: () =>
    apiClient.post(API_ENDPOINTS.auth + '/logout'),
  
  refreshToken: () =>
    apiClient.post(API_ENDPOINTS.auth + '/refresh'),
};

export const userService = {
  getProfile: () =>
    apiClient.get(API_ENDPOINTS.users + '/profile'),
  
  updateProfile: (userData: any) =>
    apiClient.put(API_ENDPOINTS.users + '/profile', userData),
  
  getUsers: (params?: any) =>
    apiClient.get(API_ENDPOINTS.users + '?' + new URLSearchParams(params)),
};

export const jobService = {
  getJobs: (params?: any) =>
    apiClient.get(API_ENDPOINTS.jobs + '?' + new URLSearchParams(params)),
  
  getJob: (id: string) =>
    apiClient.get(API_ENDPOINTS.jobs + '/' + id),
  
  createJob: (jobData: any) =>
    apiClient.post(API_ENDPOINTS.jobs, jobData),
  
  updateJob: (id: string, jobData: any) =>
    apiClient.put(API_ENDPOINTS.jobs + '/' + id, jobData),
  
  deleteJob: (id: string) =>
    apiClient.delete(API_ENDPOINTS.jobs + '/' + id),
};

export const companyService = {
  getCompanies: (params?: any) =>
    apiClient.get(API_ENDPOINTS.companies + '?' + new URLSearchParams(params)),
  
  getCompany: (id: string) =>
    apiClient.get(API_ENDPOINTS.companies + '/' + id),
  
  createCompany: (companyData: any) =>
    apiClient.post(API_ENDPOINTS.companies, companyData),
  
  updateCompany: (id: string, companyData: any) =>
    apiClient.put(API_ENDPOINTS.companies + '/' + id, companyData),
};
