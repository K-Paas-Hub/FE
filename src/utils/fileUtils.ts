import { FILE_CONSTANTS } from '../constants';

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  // 파일 크기 검증
  if (file.size > FILE_CONSTANTS.maxSize) {
    return {
      valid: false,
      error: `파일 크기가 ${FILE_CONSTANTS.maxSize / 1024 / 1024}MB를 초과합니다.`
    };
  }

  // 파일 타입 검증
  if (!FILE_CONSTANTS.allowedTypes.includes(file.type as any)) {
    return {
      valid: false,
      error: '지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX만 가능)'
    };
  }

  return { valid: true };
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};
