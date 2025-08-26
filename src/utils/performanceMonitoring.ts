import { SearchMetrics, SearchMode } from '../types/addressSearch';

// 성능 메트릭 수집 클래스
class PerformanceMonitor {
  private metrics: SearchMetrics[] = [];
  private maxMetrics = 100; // 최대 저장할 메트릭 수

  // 검색 시작 시간 기록
  startSearch(searchTerm: string, mode: SearchMode = 'basic'): string {
    const searchId = `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 성능 마크 생성
    if (typeof performance !== 'undefined' && performance.mark) {
      performance.mark(`search-start-${searchId}`);
    }

    return searchId;
  }

  // 검색 완료 시 메트릭 기록
  endSearch(
    searchId: string,
    searchTerm: string,
    resultCount: number,
    cacheHit: boolean = false,
    apiCallCount: number = 1,
    mode: SearchMode = 'basic'
  ): SearchMetrics {
    let responseTime = 0;

    // 성능 측정
    if (typeof performance !== 'undefined' && performance.measure) {
      try {
        const measureName = `search-duration-${searchId}`;
        performance.measure(measureName, `search-start-${searchId}`);
        
        const measure = performance.getEntriesByName(measureName)[0];
        responseTime = Math.round(measure.duration);
        
        // 정리
        performance.clearMarks(`search-start-${searchId}`);
        performance.clearMeasures(measureName);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Performance measurement failed:', error);
        }
      }
    }

    const metric: SearchMetrics = {
      searchTerm,
      responseTime,
      resultCount,
      cacheHit,
      apiCallCount,
      timestamp: Date.now(),
      mode
    };

    this.addMetric(metric);
    return metric;
  }

  // 메트릭 추가
  private addMetric(metric: SearchMetrics): void {
    this.metrics.push(metric);
    
    // 최대 개수 초과 시 오래된 것 제거
    if (this.metrics.length > this.maxMetrics) {
      this.metrics = this.metrics.slice(-this.maxMetrics);
    }

    // 로컬 스토리지에 저장 (선택적)
    this.saveMetricsToStorage();
  }

  // 통계 계산
  getStatistics(): {
    totalSearches: number;
    averageResponseTime: number;
    cacheHitRate: number;
    averageResultCount: number;
    totalApiCalls: number;
    searchesPerMinute: number;
    popularTerms: Array<{ term: string; count: number }>;
    performanceTrend: 'improving' | 'degrading' | 'stable';
  } {
    if (this.metrics.length === 0) {
      return {
        totalSearches: 0,
        averageResponseTime: 0,
        cacheHitRate: 0,
        averageResultCount: 0,
        totalApiCalls: 0,
        searchesPerMinute: 0,
        popularTerms: [],
        performanceTrend: 'stable'
      };
    }

    const totalSearches = this.metrics.length;
    const averageResponseTime = Math.round(
      this.metrics.reduce((sum, m) => sum + m.responseTime, 0) / totalSearches
    );
    
    const cacheHits = this.metrics.filter(m => m.cacheHit).length;
    const cacheHitRate = Math.round((cacheHits / totalSearches) * 100);
    
    const averageResultCount = Math.round(
      this.metrics.reduce((sum, m) => sum + m.resultCount, 0) / totalSearches
    );
    
    const totalApiCalls = this.metrics.reduce((sum, m) => sum + m.apiCallCount, 0);
    
    // 최근 1분간 검색 수
    const oneMinuteAgo = Date.now() - 60000;
    const recentSearches = this.metrics.filter(m => m.timestamp > oneMinuteAgo).length;
    const searchesPerMinute = recentSearches;

    // 인기 검색어
    const termCounts = new Map<string, number>();
    this.metrics.forEach(m => {
      const count = termCounts.get(m.searchTerm) || 0;
      termCounts.set(m.searchTerm, count + 1);
    });
    
    const popularTerms = Array.from(termCounts.entries())
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // 성능 트렌드 (최근 20개와 그 이전 20개 비교)
    let performanceTrend: 'improving' | 'degrading' | 'stable' = 'stable';
    if (totalSearches >= 40) {
      const recentMetrics = this.metrics.slice(-20);
      const olderMetrics = this.metrics.slice(-40, -20);
      
      const recentAvg = recentMetrics.reduce((sum, m) => sum + m.responseTime, 0) / 20;
      const olderAvg = olderMetrics.reduce((sum, m) => sum + m.responseTime, 0) / 20;
      
      const improvementThreshold = 50; // 50ms 이상 차이
      
      if (recentAvg < olderAvg - improvementThreshold) {
        performanceTrend = 'improving';
      } else if (recentAvg > olderAvg + improvementThreshold) {
        performanceTrend = 'degrading';
      }
    }

    return {
      totalSearches,
      averageResponseTime,
      cacheHitRate,
      averageResultCount,
      totalApiCalls,
      searchesPerMinute,
      popularTerms,
      performanceTrend
    };
  }

  // 성능 임계값 확인
  getPerformanceIssues(): Array<{
    type: 'slow_response' | 'low_cache_hit' | 'high_api_usage' | 'frequent_errors';
    severity: 'warning' | 'critical';
    message: string;
    suggestion: string;
  }> {
    const stats = this.getStatistics();
    const issues = [];

    // 느린 응답 시간
    if (stats.averageResponseTime > 2000) {
      issues.push({
        type: 'slow_response' as const,
        severity: 'critical' as const,
        message: `평균 응답 시간이 ${stats.averageResponseTime}ms로 너무 깁니다.`,
        suggestion: '네트워크 상태를 확인하거나 캐시 전략을 개선해보세요.'
      });
    } else if (stats.averageResponseTime > 1000) {
      issues.push({
        type: 'slow_response' as const,
        severity: 'warning' as const,
        message: `평균 응답 시간이 ${stats.averageResponseTime}ms입니다.`,
        suggestion: '캐시 사용률을 높여 성능을 개선할 수 있습니다.'
      });
    }

    // 낮은 캐시 적중률
    if (stats.totalSearches > 10 && stats.cacheHitRate < 30) {
      issues.push({
        type: 'low_cache_hit' as const,
        severity: 'warning' as const,
        message: `캐시 적중률이 ${stats.cacheHitRate}%로 낮습니다.`,
        suggestion: '캐시 유효 시간을 늘리거나 캐시 키 전략을 검토해보세요.'
      });
    }

    // 높은 API 사용량
    if (stats.totalApiCalls > stats.totalSearches * 2) {
      issues.push({
        type: 'high_api_usage' as const,
        severity: 'warning' as const,
        message: 'API 호출량이 많습니다.',
        suggestion: '캐시 사용률을 높이고 불필요한 API 호출을 줄여보세요.'
      });
    }

    return issues;
  }

  // 메트릭 내보내기 (분석용)
  exportMetrics(): SearchMetrics[] {
    return [...this.metrics];
  }

  // 메트릭 초기화
  clearMetrics(): void {
    this.metrics = [];
    localStorage.removeItem('address_search_metrics');
  }

  // 로컬 스토리지에 저장
  private saveMetricsToStorage(): void {
    try {
      // 최근 50개만 저장 (스토리지 용량 고려)
      const recentMetrics = this.metrics.slice(-50);
      localStorage.setItem('address_search_metrics', JSON.stringify(recentMetrics));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to save metrics to storage:', error);
      }
    }
  }

  // 로컬 스토리지에서 로드
  loadMetricsFromStorage(): void {
    try {
      const stored = localStorage.getItem('address_search_metrics');
      if (stored) {
        const metrics = JSON.parse(stored) as SearchMetrics[];
        this.metrics = metrics.filter(m => 
          // 24시간 이내 메트릭만 로드
          Date.now() - m.timestamp < 24 * 60 * 60 * 1000
        );
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to load metrics from storage:', error);
      }
    }
  }

  // 실시간 성능 알림
  checkPerformanceAlerts(metric: SearchMetrics): Array<{
    type: string;
    message: string;
  }> {
    const alerts = [];

    // 매우 느린 응답
    if (metric.responseTime > 5000) {
      alerts.push({
        type: 'slow_response',
        message: '검색 응답이 5초를 초과했습니다.'
      });
    }

    // API 호출 실패 (결과 0개)
    if (metric.resultCount === 0 && !metric.cacheHit) {
      alerts.push({
        type: 'no_results',
        message: '검색 결과가 없습니다.'
      });
    }

    return alerts;
  }
}

// 싱글톤 인스턴스
export const performanceMonitor = new PerformanceMonitor();

// 초기화 시 저장된 메트릭 로드
if (typeof window !== 'undefined') {
  performanceMonitor.loadMetricsFromStorage();
}

// 페이지 언로드 시 메트릭 저장
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    // 현재 메트릭 저장은 이미 자동으로 되고 있음
  });
}