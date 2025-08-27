/**
 * 로깅 유틸리티
 * 개발/프로덕션 환경에 따라 조건부 로깅을 제공합니다.
 */

// ============================================================================
// 환경 체크
// ============================================================================

/**
 * 개발 환경인지 확인
 */
const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * 프로덕션 환경인지 확인
 */
const isProduction = process.env.NODE_ENV === 'production';

// ============================================================================
// 로깅 함수들
// ============================================================================

/**
 * 개발 환경에서만 로그를 출력하는 함수
 * @param message - 로그 메시지
 * @param data - 추가 데이터 (선택사항)
 */
export const devLog = (message: string, data?: any): void => {
  if (isDevelopment) {
    console.log(`[DEV] ${message}`, data || '');
  }
};

/**
 * 개발 환경에서만 에러를 출력하는 함수
 * @param message - 에러 메시지
 * @param error - 에러 객체 (선택사항)
 */
export const devError = (message: string, error?: any): void => {
  if (isDevelopment) {
    console.error(`[DEV ERROR] ${message}`, error || '');
  }
};

/**
 * 개발 환경에서만 경고를 출력하는 함수
 * @param message - 경고 메시지
 * @param data - 추가 데이터 (선택사항)
 */
export const devWarn = (message: string, data?: any): void => {
  if (isDevelopment) {
    console.warn(`[DEV WARN] ${message}`, data || '');
  }
};

/**
 * 개발 환경에서만 정보를 출력하는 함수
 * @param message - 정보 메시지
 * @param data - 추가 데이터 (선택사항)
 */
export const devInfo = (message: string, data?: any): void => {
  if (isDevelopment) {
    console.info(`[DEV INFO] ${message}`, data || '');
  }
};

/**
 * 개발 환경에서만 디버그 정보를 출력하는 함수
 * @param message - 디버그 메시지
 * @param data - 추가 데이터 (선택사항)
 */
export const devDebug = (message: string, data?: any): void => {
  if (isDevelopment) {
    console.debug(`[DEV DEBUG] ${message}`, data || '');
  }
};

// ============================================================================
// 프로덕션 로깅 (필요시)
// ============================================================================

/**
 * 프로덕션 환경에서도 출력되는 중요 로그
 * @param message - 로그 메시지
 * @param data - 추가 데이터 (선택사항)
 */
export const prodLog = (message: string, data?: any): void => {
  console.log(`[PROD] ${message}`, data || '');
};

/**
 * 프로덕션 환경에서도 출력되는 중요 에러
 * @param message - 에러 메시지
 * @param error - 에러 객체 (선택사항)
 */
export const prodError = (message: string, error?: any): void => {
  console.error(`[PROD ERROR] ${message}`, error || '');
};

// ============================================================================
// 조건부 로깅
// ============================================================================

/**
 * 환경에 따라 조건부로 로그를 출력하는 함수
 * @param message - 로그 메시지
 * @param data - 추가 데이터 (선택사항)
 * @param forceProduction - 프로덕션에서도 강제 출력할지 여부
 */
export const log = (message: string, data?: any, forceProduction = false): void => {
  if (isDevelopment || (isProduction && forceProduction)) {
    console.log(`[${isProduction ? 'PROD' : 'DEV'}] ${message}`, data || '');
  }
};

/**
 * 환경에 따라 조건부로 에러를 출력하는 함수
 * @param message - 에러 메시지
 * @param error - 에러 객체 (선택사항)
 * @param forceProduction - 프로덕션에서도 강제 출력할지 여부
 */
export const logError = (message: string, error?: any, forceProduction = true): void => {
  if (isDevelopment || (isProduction && forceProduction)) {
    console.error(`[${isProduction ? 'PROD' : 'DEV'} ERROR] ${message}`, error || '');
  }
};

// ============================================================================
// 성능 측정 로깅
// ============================================================================

/**
 * 성능 측정을 위한 로깅 함수
 * @param label - 측정 라벨
 * @param fn - 측정할 함수
 * @returns 함수 실행 결과
 */
export const logPerformance = async <T>(label: string, fn: () => Promise<T>): Promise<T> => {
  const start = performance.now();
  try {
    const result = await fn();
    const end = performance.now();
    devLog(`${label} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
  } catch (error) {
    const end = performance.now();
    devError(`${label} 실행 중 에러 발생 (${(end - start).toFixed(2)}ms)`, error);
    throw error;
  }
};

/**
 * 동기 함수의 성능 측정을 위한 로깅 함수
 * @param label - 측정 라벨
 * @param fn - 측정할 함수
 * @returns 함수 실행 결과
 */
export const logPerformanceSync = <T>(label: string, fn: () => T): T => {
  const start = performance.now();
  try {
    const result = fn();
    const end = performance.now();
    devLog(`${label} 실행 시간: ${(end - start).toFixed(2)}ms`);
    return result;
  } catch (error) {
    const end = performance.now();
    devError(`${label} 실행 중 에러 발생 (${(end - start).toFixed(2)}ms)`, error);
    throw error;
  }
};

// ============================================================================
// API 로깅
// ============================================================================

/**
 * API 요청 로깅
 * @param method - HTTP 메서드
 * @param url - 요청 URL
 * @param data - 요청 데이터 (선택사항)
 */
export const logApiRequest = (method: string, url: string, data?: any): void => {
  devLog(`API 요청: ${method} ${url}`, data);
};

/**
 * API 응답 로깅
 * @param method - HTTP 메서드
 * @param url - 요청 URL
 * @param status - 응답 상태
 * @param data - 응답 데이터 (선택사항)
 */
export const logApiResponse = (method: string, url: string, status: number, data?: any): void => {
  devLog(`API 응답: ${method} ${url} (${status})`, data);
};

/**
 * API 에러 로깅
 * @param method - HTTP 메서드
 * @param url - 요청 URL
 * @param error - 에러 객체
 */
export const logApiError = (method: string, url: string, error: any): void => {
  devError(`API 에러: ${method} ${url}`, error);
};

// ============================================================================
// 사용자 액션 로깅
// ============================================================================

/**
 * 사용자 액션 로깅
 * @param action - 액션 이름
 * @param data - 액션 데이터 (선택사항)
 */
export const logUserAction = (action: string, data?: any): void => {
  devLog(`사용자 액션: ${action}`, data);
};

/**
 * 페이지 네비게이션 로깅
 * @param from - 이전 페이지
 * @param to - 다음 페이지
 */
export const logNavigation = (from: string, to: string): void => {
  devLog(`페이지 이동: ${from} → ${to}`);
};

// ============================================================================
// 유틸리티 함수
// ============================================================================

/**
 * 객체를 안전하게 문자열로 변환
 * @param obj - 변환할 객체
 * @returns 문자열
 */
export const safeStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    return '[Circular or non-serializable object]';
  }
};

/**
 * 로그 메시지 포맷팅
 * @param prefix - 접두사
 * @param message - 메시지
 * @returns 포맷된 메시지
 */
export const formatLogMessage = (prefix: string, message: string): string => {
  return `[${prefix}] ${message}`;
};
