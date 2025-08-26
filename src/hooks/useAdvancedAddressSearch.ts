import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { kakaoAddressService } from '../services/kakaoAddressService';
import { 
  AddressData, 
  SearchError, 
  SearchMetrics,
  AddressSearchOptions 
} from '../types/addressSearch';
import { createSearchError, shouldRetry, getRetryDelay, logSearchError } from '../utils/errorHandling';
import { performanceMonitor } from '../utils/performanceMonitoring';
import { storageManager } from '../utils/storageManager';

// React Query Provider 설정을 위한 기본 클라이언트
export { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 주소 검색 결과 타입
interface AddressSearchResult {
  data: AddressData[] | undefined;
  error: SearchError | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
  searchMetrics: SearchMetrics | null;
  searchId: string | null;
}

// 고급 주소 검색 훅
export const useAdvancedAddressSearch = (
  query: string,
  options: AddressSearchOptions = {}
): AddressSearchResult => {
  const [searchId, setSearchId] = useState<string | null>(null);
  const [searchMetrics, setSearchMetrics] = useState<SearchMetrics | null>(null);
  
  // 스마트 디바운싱 (검색어 길이에 따라 지연 시간 조정)
  const debounceDelay = useMemo(() => {
    if (options.enabled === false) return 0;
    if (query.length === 0) return 0;
    if (query.length < 3) return 600;
    if (query.length < 5) return 400;
    return 200;
  }, [query.length, options.enabled]);

  const [debouncedQuery] = useDebounce(query.trim(), debounceDelay);

  // 캐시 키 생성
  const queryKey = useMemo(() => ['address-search', debouncedQuery], [debouncedQuery]);

  // React Query 설정
  const queryResult = useQuery({
    queryKey,
    queryFn: async (): Promise<AddressData[]> => {
      if (!debouncedQuery || debouncedQuery.length < 2) {
        return [];
      }

      // 성능 모니터링 시작
      const currentSearchId = performanceMonitor.startSearch(debouncedQuery, 'basic');
      setSearchId(currentSearchId);

      try {
        // 주소 검색 실행
        const results = await kakaoAddressService.searchAddress(debouncedQuery);
        
        // 성능 메트릭 기록
        const metrics = performanceMonitor.endSearch(
          currentSearchId,
          debouncedQuery,
          results.length,
          false, // 캐시 히트는 React Query가 관리
          1,
          'basic'
        );
        
        setSearchMetrics(metrics);

        // 검색 히스토리에 추가
        if (results.length > 0) {
          storageManager.addToSearchHistory(debouncedQuery, results.length);
        }

        // 실시간 성능 알림 확인
        const alerts = performanceMonitor.checkPerformanceAlerts(metrics);
        if (process.env.NODE_ENV === 'development') {
          alerts.forEach(alert => {
            console.warn(`Performance Alert: ${alert.message}`);
          });
        }

        // 성공 콜백 호출
        if (options.onSuccess) {
          options.onSuccess(results);
        }

        return results;
      } catch (error) {
        // 에러 처리
        const searchError = createSearchError(error);
        logSearchError(searchError, { query: debouncedQuery, searchId: currentSearchId });
        
        // 성능 메트릭 (에러 케이스)
        const errorMetrics = performanceMonitor.endSearch(
          currentSearchId,
          debouncedQuery,
          0,
          false,
          1,
          'basic'
        );
        setSearchMetrics(errorMetrics);

        // 에러 콜백 호출
        if (options.onError) {
          options.onError(searchError);
        }

        throw searchError;
      }
    },
    enabled: 
      (options.enabled !== false) && 
      debouncedQuery.length >= 2 && 
      debouncedQuery.length > 0,
    staleTime: options.staleTime ?? 5 * 60 * 1000, // 5분
    gcTime: options.cacheTime ?? 10 * 60 * 1000, // 10분 (v5에서 cacheTime -> gcTime)
    retry: (failureCount, error) => {
      if (options.retry !== undefined) {
        if (typeof options.retry === 'boolean') return options.retry;
        if (typeof options.retry === 'number') return failureCount < options.retry;
        if (typeof options.retry === 'function') return options.retry(failureCount, error);
      }
      
      const searchError = createSearchError(error);
      return shouldRetry(searchError, failureCount);
    },
    retryDelay: (attemptIndex, error) => {
      if (options.retryDelay) return options.retryDelay;
      
      const searchError = createSearchError(error);
      return getRetryDelay(attemptIndex, searchError.type);
    }
  });

  // 에러 상태 변환
  const searchError = useMemo((): SearchError | null => {
    if (!queryResult.error) return null;
    return createSearchError(queryResult.error);
  }, [queryResult.error]);

  // 수동 새로고침 함수
  const refetch = useCallback(() => {
    queryResult.refetch();
  }, [queryResult]);


  return {
    data: queryResult.data as AddressData[] | undefined,
    error: searchError,
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    isError: queryResult.isError,
    isSuccess: queryResult.isSuccess,
    refetch,
    searchMetrics,
    searchId
  };
};

// 검색 제안 훅 (인기 검색어, 최근 검색어)
export const useSearchSuggestions = (currentQuery: string = '') => {
  const [suggestions, setSuggestions] = useState<{
    recent: string[];
    popular: string[];
    favorites: { nickname: string; address: string }[];
  }>({
    recent: [],
    popular: [],
    favorites: []
  });

  useEffect(() => {
    const history = storageManager.getSearchHistory();
    const favorites = storageManager.getFavorites();
    const stats = performanceMonitor.getStatistics();

    // 최근 검색어 (현재 쿼리와 다른 것들만)
    const recent = history
      .filter(item => 
        item.query.toLowerCase() !== currentQuery.toLowerCase() &&
        item.query.toLowerCase().includes(currentQuery.toLowerCase())
      )
      .slice(0, 5)
      .map(item => item.query);

    // 인기 검색어
    const popular = stats.popularTerms
      .filter(item => 
        item.term.toLowerCase() !== currentQuery.toLowerCase() &&
        item.term.toLowerCase().includes(currentQuery.toLowerCase())
      )
      .slice(0, 5)
      .map(item => item.term);

    // 즐겨찾기 주소
    const favoriteSuggestions = favorites
      .filter(fav => {
        const searchText = `${fav.nickname || ''} ${fav.address_name}`.toLowerCase();
        return searchText.includes(currentQuery.toLowerCase());
      })
      .slice(0, 3)
      .map(fav => ({
        nickname: fav.nickname || fav.address.region_2depth_name,
        address: fav.address_name
      }));

    setSuggestions({
      recent,
      popular,
      favorites: favoriteSuggestions
    });
  }, [currentQuery]);

  return suggestions;
};

// 성능 통계 훅
export const useSearchPerformance = () => {
  const [stats, setStats] = useState(() => performanceMonitor.getStatistics());
  const [issues, setIssues] = useState(() => performanceMonitor.getPerformanceIssues());

  const refresh = useCallback(() => {
    setStats(performanceMonitor.getStatistics());
    setIssues(performanceMonitor.getPerformanceIssues());
  }, []);

  // 자동 새로고침 (10초마다)
  useEffect(() => {
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  return {
    stats,
    issues,
    refresh,
    exportMetrics: performanceMonitor.exportMetrics.bind(performanceMonitor),
    clearMetrics: performanceMonitor.clearMetrics.bind(performanceMonitor)
  };
};

// 즐겨찾기 관리 훅
export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => storageManager.getFavorites());

  const addFavorite = useCallback((address: AddressData, nickname?: string, category?: string) => {
    const success = storageManager.addToFavorites(address, nickname, category);
    if (success) {
      setFavorites(storageManager.getFavorites());
    }
    return success;
  }, []);

  const removeFavorite = useCallback((id: string) => {
    storageManager.removeFromFavorites(id);
    setFavorites(storageManager.getFavorites());
  }, []);

  const updateFavorite = useCallback((id: string, updates: any) => {
    storageManager.updateFavorite(id, updates);
    setFavorites(storageManager.getFavorites());
  }, []);

  const isFavorite = useCallback((address: AddressData) => {
    return storageManager.isFavorite(address);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    updateFavorite,
    isFavorite,
    refresh: () => setFavorites(storageManager.getFavorites())
  };
};