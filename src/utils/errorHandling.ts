import { SearchError, SearchErrorType } from '../types/addressSearch';

// 에러 분류 및 사용자 친화적 메시지 생성
export const createSearchError = (error: unknown): SearchError => {
  const timestamp = Date.now();

  // AbortError 처리
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      type: 'cancelled',
      message: '검색이 취소되었습니다.',
      retry: false,
      timestamp
    };
  }

  // Network Error
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      type: 'network',
      message: '네트워크 연결을 확인해주세요.',
      action: '인터넷 연결 상태를 확인하고 다시 시도해주세요.',
      retry: true,
      timestamp
    };
  }

  // Error 객체인 경우
  if (error instanceof Error) {
    const message = error.message;

    // API 키 오류
    if (message.includes('401') || message.includes('API 키')) {
      return {
        type: 'invalid_key',
        message: 'API 키가 유효하지 않습니다.',
        action: '관리자에게 문의해주세요.',
        retry: false,
        timestamp
      };
    }

    // API 한도 초과
    if (message.includes('429') || message.includes('limit') || message.includes('quota')) {
      return {
        type: 'api_limit',
        message: 'API 호출 한도를 초과했습니다.',
        action: '잠시 후 다시 시도해주세요.',
        retry: true,
        timestamp
      };
    }

    // 타임아웃
    if (message.includes('timeout') || message.includes('시간 초과')) {
      return {
        type: 'timeout',
        message: '요청 시간이 초과되었습니다.',
        action: '다시 시도해주세요.',
        retry: true,
        timestamp
      };
    }

    // HTTP 상태 코드별 처리
    if (message.includes('404')) {
      return {
        type: 'no_results',
        message: '검색 결과를 찾을 수 없습니다.',
        action: '다른 검색어를 시도해보세요.',
        retry: false,
        timestamp
      };
    }

    if (message.includes('500') || message.includes('502') || message.includes('503')) {
      return {
        type: 'network',
        message: '서버에 일시적인 오류가 발생했습니다.',
        action: '잠시 후 다시 시도해주세요.',
        retry: true,
        timestamp
      };
    }
  }

  // 기본 에러
  return {
    type: 'unknown',
    message: '알 수 없는 오류가 발생했습니다.',
    action: '다시 시도해주세요. 문제가 계속되면 관리자에게 문의하세요.',
    retry: true,
    timestamp
  };
};

// 재시도 가능 여부 판단
export const shouldRetry = (error: SearchError, failureCount: number): boolean => {
  // 재시도 불가능한 에러 타입
  if (['invalid_key', 'cancelled', 'no_results'].includes(error.type)) {
    return false;
  }

  // 최대 재시도 횟수 확인
  if (failureCount >= 3) {
    return false;
  }

  // API 한도 초과는 1분 후 재시도
  if (error.type === 'api_limit') {
    return failureCount < 1;
  }

  return error.retry ?? true;
};

// 재시도 지연 시간 계산 (지수 백오프)
export const getRetryDelay = (failureCount: number, errorType: SearchErrorType): number => {
  const baseDelay = 1000; // 1초

  switch (errorType) {
    case 'api_limit':
      return 60000; // 1분
    case 'network':
    case 'timeout':
      return Math.min(baseDelay * Math.pow(2, failureCount), 30000); // 최대 30초
    default:
      return baseDelay * (failureCount + 1);
  }
};

// 에러 로깅 (개발 환경에서만)
export const logSearchError = (error: SearchError, context?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚨 Address Search Error: ${error.type}`);
    console.error('Message:', error.message);
    console.error('Type:', error.type);
    console.error('Retry:', error.retry);
    console.error('Timestamp:', new Date(error.timestamp).toISOString());
    if (error.action) console.info('Action:', error.action);
    if (context) console.error('Context:', context);
    console.groupEnd();
  }
};

// 사용자에게 보여줄 에러 메시지 포맷팅
export const formatErrorMessage = (error: SearchError): string => {
  let message = error.message;
  
  if (error.action) {
    message += `\n\n💡 ${error.action}`;
  }

  if (error.retry) {
    message += '\n\n🔄 재시도가 가능합니다.';
  }

  return message;
};

// 에러 타입별 아이콘
export const getErrorIcon = (errorType: SearchErrorType): string => {
  switch (errorType) {
    case 'network':
      return '🌐';
    case 'api_limit':
      return '⏰';
    case 'invalid_key':
      return '🔑';
    case 'no_results':
      return '🔍';
    case 'cancelled':
      return '⏹️';
    case 'timeout':
      return '⏱️';
    default:
      return '❌';
  }
};

// 에러 심각도 판단
export const getErrorSeverity = (errorType: SearchErrorType): 'low' | 'medium' | 'high' => {
  switch (errorType) {
    case 'cancelled':
    case 'no_results':
      return 'low';
    case 'network':
    case 'timeout':
    case 'api_limit':
      return 'medium';
    case 'invalid_key':
    case 'unknown':
      return 'high';
    default:
      return 'medium';
  }
};