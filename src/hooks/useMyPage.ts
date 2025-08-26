import { useState, useEffect, useCallback } from 'react';
import { myPageService } from '../services/myPageService';
import { UserProfile, UserSettings, ProfileUpdateData, PasswordChangeData } from '../types/myPage';

// 기존 useResumeForm 패턴과 동일한 구조
export const useMyPage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // 프로필 검증 함수
  const validateProfile = useCallback((data: ProfileUpdateData): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (data.fullName && data.fullName.trim().length < 2) {
      errors.fullName = '이름은 2자 이상이어야 합니다.';
    }
    
    if (data.phoneNumber) {
      const phoneRegex = /^[0-9-+\s()]+$/;
      if (!phoneRegex.test(data.phoneNumber)) {
        errors.phoneNumber = '올바른 전화번호 형식을 입력해주세요.';
      }
    }
    
    return errors;
  }, []);

  // 비밀번호 검증 함수
  const validatePassword = useCallback((data: PasswordChangeData): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (!data.currentPassword) {
      errors.currentPassword = '현재 비밀번호를 입력해주세요.';
    }
    
    if (!data.newPassword) {
      errors.newPassword = '새 비밀번호를 입력해주세요.';
    } else if (data.newPassword.length < 8) {
      errors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
    }
    
    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }
    
    return errors;
  }, []);

  // 프로필 조회
  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    // 임시 mock 데이터 (백엔드 API가 없으므로)
    setTimeout(() => {
      const mockProfile = {
        id: '1',
        email: 'user@example.com',
        user_metadata: {
          full_name: '홍길동'
        },
        app_metadata: {
          provider: 'email'
        },
        userType: 'worker' as const,
        language: 'ko' as const,
        phoneNumber: '010-1234-5678',
        nationality: '베트남',
        avatarUrl: undefined,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setProfile(mockProfile);
      setLoading(false);
    }, 1000);
  }, []);

  // 프로필 업데이트
  const updateProfile = useCallback(async (data: ProfileUpdateData) => {
    const errors = validateProfile(data);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return { success: false, errors };
    }

    setLoading(true);
    setError(null);
    
    // 임시 mock 업데이트 (백엔드 API가 없으므로)
    setTimeout(() => {
      setProfile(prev => prev ? {
        ...prev,
        user_metadata: {
          ...prev.user_metadata,
          full_name: data.fullName || prev.user_metadata?.full_name
        },
        phoneNumber: data.phoneNumber || prev.phoneNumber,
        nationality: data.nationality || prev.nationality,
        language: (data.language as 'ko' | 'vi' | 'km' | 'ne' | 'id' | 'zh' | 'th') || prev.language
      } : null);
      setValidationErrors({});
      setLoading(false);
    }, 1000);
    
    return { success: true, error: undefined };
  }, [validateProfile]);

  // 아바타 업로드
  const uploadAvatar = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await myPageService.uploadAvatar(file);
      if (response.success) {
        setProfile(prev => prev ? { ...prev, avatarUrl: response.data?.avatarUrl || '' } : null);
        return { success: true };
      } else {
        setError(response.error || '아바타 업로드에 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '네트워크 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // 설정 조회
  const fetchSettings = useCallback(async () => {
    // 임시 mock 데이터 (백엔드 API가 없으므로)
    setTimeout(() => {
      const mockSettings = {
        language: 'ko',
        notifications: {
          email: true,
          push: false,
          sms: true
        },
        privacy: {
          profileVisibility: 'public' as const,
          dataSharing: false
        }
      };
      setSettings(mockSettings);
    }, 500);
  }, []);

  // 설정 업데이트
  const updateSettings = useCallback(async (newSettings: UserSettings) => {
    // 임시 mock 업데이트 (백엔드 API가 없으므로)
    setSettings(newSettings);
    return { success: true, error: undefined };
  }, []);

  // 비밀번호 변경
  const changePassword = useCallback(async (data: PasswordChangeData) => {
    const errors = validatePassword(data);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return { success: false, errors };
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await myPageService.changePassword(data);
      if (response.success) {
        setValidationErrors({});
        return { success: true };
      } else {
        setError(response.error || '비밀번호 변경에 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '네트워크 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [validatePassword]);

  // 계정 삭제
  const deleteAccount = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await myPageService.deleteAccount();
      if (response.success) {
        return { success: true };
      } else {
        setError(response.error || '계정 삭제에 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '네트워크 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchSettings();
  }, [fetchProfile, fetchSettings]);

  return {
    profile,
    settings,
    loading,
    error,
    validationErrors,
    updateProfile,
    uploadAvatar,
    updateSettings,
    changePassword,
    deleteAccount,
    refetchProfile: fetchProfile,
    refetchSettings: fetchSettings
  };
};
