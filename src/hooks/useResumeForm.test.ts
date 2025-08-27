import { renderHook, act, waitFor } from '@testing-library/react';
import { useResumeForm } from './useResumeForm';
import { resumeService } from '../services/api';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock resumeService
jest.mock('../services/api', () => ({
  resumeService: {
    saveResume: jest.fn(),
    submitResume: jest.fn(),
    getResume: jest.fn(),
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  }
}));

const mockResumeService = resumeService as jest.Mocked<typeof resumeService>;

describe('useResumeForm', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    jest.clearAllMocks();
    
    // 기본적으로 getResume이 성공하도록 모킹
    mockResumeService.getResume.mockResolvedValue({
      success: true,
      data: undefined,
      message: 'No saved resume'
    });
  });

  test('should initialize with empty form data', async () => {
    const { result } = renderHook(() => useResumeForm());
    
    // 초기에는 loading이 true (useEffect에서 loadSavedResume 호출)
    expect(result.current.loading).toBe(true);
    
    // useEffect 완료 후 상태 확인
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.formData.name).toBe('');
    expect(result.current.formData.email).toBe('');
    expect(result.current.error).toBe(null);
  });

  test('should handle input changes', async () => {
    const { result } = renderHook(() => useResumeForm());
    
    // useEffect 완료 대기
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.handleInputChange({
        target: { name: 'name', value: '홍길동' }
      } as React.ChangeEvent<HTMLInputElement>);
    });
    
    expect(result.current.formData.name).toBe('홍길동');
  });

  test('should save resume successfully', async () => {
    mockResumeService.saveResume.mockResolvedValue({
      success: true,
      message: '이력서가 저장되었습니다.'
    });
    
    const { result } = renderHook(() => useResumeForm());
    
    // useEffect 완료 대기
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      const saveResult = await result.current.saveResume();
      expect(saveResult.success).toBe(true);
    });
  });

  test('should load saved resume', async () => {
    const mockData = {
      name: '홍길동',
      email: 'test@test.com',
      phone: '010-1234-5678',
      nationality: '베트남',
      visaType: 'E9',
      address: '서울시 강남구',
      addressDetail: '테헤란로 123',
      education: '대학교 졸업',
      experience: '3년',
      skills: 'React, TypeScript',
      certifications: '자격증',
      languages: '한국어, 영어',
      introduction: '자기소개'
    };
    mockResumeService.getResume.mockResolvedValue({
      success: true,
      data: mockData,
      message: '저장된 이력서를 불러왔습니다.'
    });
    
    const { result } = renderHook(() => useResumeForm());
    
    // useEffect 완료 대기
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    await act(async () => {
      const loadResult = await result.current.loadSavedResume();
      expect(loadResult.success).toBe(true);
    });
  });
});
