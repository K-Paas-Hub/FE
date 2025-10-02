import { apiClient } from './api';
import { ApiResponse } from '../types/common';
import { 
  UserSettings, 
  ProfileResponse, 
  SettingsResponse,
  PasswordChangeData,
  ProfileUpdateData
} from '../types/myPage';

// 기존 authService 패턴과 동일한 구조
export const myPageService = {
  // 프로필 관련
  getProfile: (): Promise<ProfileResponse> => {
    return apiClient.get('/users/profile');
  },

  updateProfile: (data: ProfileUpdateData): Promise<ProfileResponse> => {
    return apiClient.put('/users/profile', data);
  },

  uploadAvatar: (file: File): Promise<ApiResponse<{ avatarUrl: string }>> => {
    const formData = new FormData();
    formData.append('avatar', file);
    return apiClient.post('/users/profile/avatar', formData, {
      'Content-Type': 'multipart/form-data'
    });
  },

  // 설정 관련
  getSettings: (): Promise<SettingsResponse> => {
    return apiClient.get('/users/settings');
  },

  updateSettings: (settings: UserSettings): Promise<SettingsResponse> => {
    return apiClient.put('/users/settings', settings);
  },

  // 비밀번호 변경
  changePassword: (data: PasswordChangeData): Promise<ApiResponse<void>> => {
    return apiClient.put('/users/password', data);
  },

  // 계정 삭제
  deleteAccount: (): Promise<ApiResponse<void>> => {
    return apiClient.delete('/users/account');
  },

  // 사용자 타입별 데이터 조회
  getWorkerData: (): Promise<ApiResponse<any>> => {
    return apiClient.get('/users/worker-data');
  },

  getStudentData: (): Promise<ApiResponse<any>> => {
    return apiClient.get('/users/student-data');
  },

  getEmployerData: (): Promise<ApiResponse<any>> => {
    return apiClient.get('/users/employer-data');
  }
};
