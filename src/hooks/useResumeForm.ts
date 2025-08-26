import { useState, useEffect, useCallback } from 'react';
import { resumeService } from '../services/api';
import { ResumeFormData, FileData } from '../types/resume';
import { RESUME_CONSTANTS } from '../constants';

const initialFormData: ResumeFormData = {
  name: '',
  email: '',
  phone: '',
  nationality: '',
  visaType: '',
  address: '', // 주소 필드 추가
  education: '',
  experience: '',
  skills: '',
  certifications: '', // 자격증 필드 추가
  languages: '',
  introduction: ''
};

export const useResumeForm = () => {
  const [formData, setFormData] = useState<ResumeFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // 폼 검증 함수
  const validateField = useCallback((name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '이름을 입력해주세요.';
        if (value.trim().length < 2) return '이름은 2자 이상이어야 합니다.';
        break;
      case 'email':
        if (!value.trim()) return '이메일을 입력해주세요.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return '올바른 이메일 형식을 입력해주세요.';
        break;
      case 'phone':
        if (!value.trim()) return '전화번호를 입력해주세요.';
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (!phoneRegex.test(value)) return '올바른 전화번호 형식을 입력해주세요.';
        break;
      case 'nationality':
        if (!value) return '국적을 선택해주세요.';
        break;
      case 'visaType':
        if (!value) return '비자 유형을 선택해주세요.';
        break;
    }
    return null;
  }, []);

  // 폼 입력 변경 핸들러
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 실시간 검증
    const fieldError = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldError || ''
    }));
  }, [validateField]);

  // 전체 폼 검증
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof ResumeFormData]);
      if (error) {
        errors[key] = error;
      }
    });
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validateField]);

  // 이력서 저장 (검증 없이)
  const saveResume = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await resumeService.saveResume(formData);
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.error || '저장에 실패했습니다.';
        setError(errorMessage);
        setTimeout(() => setError(null), 3000); // 3초 후 자동 사라짐
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '네트워크 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [formData]);

  // 이력서 저장 (검증 포함)
  const saveResumeWithValidation = useCallback(async () => {
    // 폼 검증
    if (!validateForm()) {
      setError('입력 정보를 확인해주세요.');
      return { success: false, error: '입력 정보를 확인해주세요.' };
    }

    return await saveResume();
  }, [validateForm, saveResume]);

  // 이력서 제출
  const submitResume = useCallback(async () => {
    // 폼 검증
    if (!validateForm()) {
      const errorMessage = '입력 정보를 확인해주세요.';
      setError(errorMessage);
      setTimeout(() => setError(null), 3000); // 3초 후 자동 사라짐
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    try {
      const response = await resumeService.submitResume(formData);
      if (response.success) {
        return { success: true, message: response.message };
      } else {
        const errorMessage = response.error || '제출에 실패했습니다.';
        setError(errorMessage);
        setTimeout(() => setError(null), 3000); // 3초 후 자동 사라짐
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '네트워크 오류가 발생했습니다.';
      setError(errorMessage);
      setTimeout(() => setError(null), 3000); // 3초 후 자동 사라짐
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm]);

  // 파일 업로드
  const uploadFile = useCallback(async (file: File) => {
    // 파일 검증
    if (file.size > RESUME_CONSTANTS.maxFileSize) {
      const errorMessage = '파일 크기가 10MB를 초과합니다.';
      setError(errorMessage);
      setTimeout(() => setError(null), 3000); // 3초 후 자동 사라짐
      return { success: false, error: errorMessage };
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !RESUME_CONSTANTS.allowedFileTypes.includes(fileExtension as any)) {
      const errorMessage = '지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX만 가능)';
      setError(errorMessage);
      setTimeout(() => setError(null), 5000); // 5초 후 자동 사라짐
      return { success: false, error: errorMessage };
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await resumeService.uploadFile(file, (progress) => {
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
      });
      
      if (response.success) {
        setFiles(prev => [...prev, response.data]);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[file.name];
          return newProgress;
        });
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.error || '파일 업로드에 실패했습니다.';
        setError(errorMessage);
        setTimeout(() => setError(null), 5000); // 5초 후 자동 사라짐
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '파일 업로드 중 오류가 발생했습니다.';
      setError(errorMessage);
      setTimeout(() => setError(null), 5000); // 5초 후 자동 사라짐
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // 파일 삭제
  const deleteFile = useCallback(async (fileId: string) => {
    try {
      const response = await resumeService.deleteFile(fileId);
      if (response.success) {
        // 메모리 정리
        setFiles(prev => {
          const fileToDelete = prev.find(file => file.id === fileId);
          if (fileToDelete && fileToDelete.url.startsWith('blob:')) {
            URL.revokeObjectURL(fileToDelete.url);
          }
          return prev.filter(file => file.id !== fileId);
        });
        return { success: true, message: response.message };
      } else {
        setError(response.error || '파일 삭제에 실패했습니다.');
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '파일 삭제 중 오류가 발생했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // 저장된 이력서 불러오기
  const loadSavedResume = useCallback(async () => {
    setLoading(true);
    try {
      const response = await resumeService.getResume('draft');
      if (response.success && response.data) {
        setFormData(response.data);
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.error };
      }
    } catch (err) {
      const errorMessage = '저장된 이력서를 불러오는데 실패했습니다.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // 컴포넌트 마운트 시 저장된 이력서 불러오기
  useEffect(() => {
    loadSavedResume();
  }, [loadSavedResume]);

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.url.startsWith('blob:')) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [files]);

  return {
    formData,
    setFormData,
    loading,
    error,
    files,
    uploadProgress,
    validationErrors,
    handleInputChange,
    saveResume,
    saveResumeWithValidation,
    submitResume,
    uploadFile,
    deleteFile,
    loadSavedResume
  };
};
