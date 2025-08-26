// 주소 검색 관련 타입 정의
export interface AddressData {
  id: string;
  address_name: string;
  address_type: string;
  x: string;
  y: string;
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
  };
}

// 검색 상태 타입
export type SearchStatus = 'idle' | 'loading' | 'success' | 'error';

// 에러 타입 분류
export type SearchErrorType = 
  | 'network'          // 네트워크 연결 오류
  | 'api_limit'        // API 호출 한도 초과
  | 'invalid_key'      // 잘못된 API 키
  | 'no_results'       // 검색 결과 없음
  | 'cancelled'        // 요청 취소
  | 'timeout'          // 요청 시간 초과
  | 'unknown';         // 알 수 없는 오류

// 에러 정보 인터페이스
export interface SearchError {
  type: SearchErrorType;
  message: string;
  action?: string;      // 사용자가 취할 수 있는 액션
  retry?: boolean;      // 재시도 가능 여부
  timestamp: number;
}

// 검색 모드
export type SearchMode = 'basic' | 'extended' | 'nearby';

// 성능 메트릭
export interface SearchMetrics {
  searchTerm: string;
  responseTime: number;
  resultCount: number;
  cacheHit: boolean;
  apiCallCount: number;
  timestamp: number;
  mode: SearchMode;
}

// 검색 히스토리 아이템
export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  resultCount: number;
  selectedAddress?: AddressData;
}

// 즐겨찾기 주소
export interface FavoriteAddress extends AddressData {
  nickname?: string;    // 사용자 지정 별명
  category?: string;    // 카테고리 (집, 회사, 기타 등)
  addedAt: number;     // 추가 날짜
  useCount: number;    // 사용 횟수
}

// 검색 상태 관리
export interface AddressSearchState {
  data: AddressData[];
  loading: boolean;
  error: SearchError | null;
  status: SearchStatus;
  lastSearchTerm: string;
  metrics: SearchMetrics | null;
}

// React Query 옵션
export interface AddressSearchOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: number | boolean | ((failureCount: number, error: any) => boolean);
  retryDelay?: number;
  onSuccess?: (data: AddressData[]) => void;
  onError?: (error: SearchError) => void;
}

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'address_search_history',
  FAVORITES: 'address_favorites',
  METRICS: 'address_search_metrics',
  SETTINGS: 'address_search_settings'
} as const;

// 검색 설정
export interface SearchSettings {
  maxHistoryItems: number;
  enableGeolocation: boolean;
  defaultSearchMode: SearchMode;
  autoSaveToHistory: boolean;
  debounceDelay: number;
}

// 기본 설정
export const DEFAULT_SEARCH_SETTINGS: SearchSettings = {
  maxHistoryItems: 50,
  enableGeolocation: false,
  defaultSearchMode: 'basic',
  autoSaveToHistory: true,
  debounceDelay: 300
};