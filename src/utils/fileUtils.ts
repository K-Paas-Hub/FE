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
  
  // 1바이트 미만의 경우 특별 처리
  if (bytes < 1 && bytes > -1) {
    if (Math.abs(bytes) < 0.1) return '0 Bytes';
    return `${bytes.toFixed(1)} Bytes`;
  }
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  
  // 음수 처리
  const isNegative = bytes < 0;
  const absBytes = Math.abs(bytes);
  
  // 1024 이상인 경우에만 KB 단위로 변환 (1024 포함)
  if (absBytes >= k) {
    const i = Math.floor(Math.log(absBytes) / Math.log(k));
    const sizeIndex = Math.min(i, sizes.length - 1);
    const size = sizes[sizeIndex];
    const formattedSize = parseFloat((absBytes / Math.pow(k, sizeIndex)).toFixed(2));
    const sign = isNegative ? '-' : '';
    return `${sign}${formattedSize} ${size}`;
  } else {
    // 1024 미만인 경우 Bytes 단위로 표시
    const sign = isNegative ? '-' : '';
    return `${sign}${absBytes} Bytes`;
  }
};

export const getFileExtension = (filename: string): string => {
  // 파일명이 점으로 시작하는 경우 (숨김 파일) 처리
  if (filename.startsWith('.')) {
    const parts = filename.split('.');
    // .config.json 같은 경우 json을 반환
    return parts.length > 2 ? parts[parts.length - 1].toLowerCase() : '';
  }
  
  const parts = filename.split('.');
  // 확장자가 없는 경우 빈 문자열 반환
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};
