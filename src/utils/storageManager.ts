import { 
  AddressData, 
  SearchHistoryItem, 
  FavoriteAddress, 
  SearchSettings, 
  DEFAULT_SEARCH_SETTINGS,
  STORAGE_KEYS 
} from '../types/addressSearch';

// 로컬 스토리지 관리 클래스
class StorageManager {
  // 검색 히스토리 관리
  getSearchHistory(): SearchHistoryItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      if (!stored) return [];
      
      const history = JSON.parse(stored) as SearchHistoryItem[];
      
      // 30일 이내 항목만 반환
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
      return history.filter(item => item.timestamp > thirtyDaysAgo);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to load search history:', error);
      }
      return [];
    }
  }

  addToSearchHistory(query: string, resultCount: number, selectedAddress?: AddressData): void {
    try {
      const settings = this.getSettings();
      if (!settings.autoSaveToHistory) return;

      const history = this.getSearchHistory();
      
      // 중복 제거 (같은 검색어가 있으면 제거)
      const filteredHistory = history.filter(item => 
        item.query.toLowerCase() !== query.toLowerCase()
      );

      const newItem: SearchHistoryItem = {
        id: `history_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        query: query.trim(),
        timestamp: Date.now(),
        resultCount,
        selectedAddress
      };

      const updatedHistory = [newItem, ...filteredHistory];
      
      // 최대 개수 제한
      const maxItems = settings.maxHistoryItems;
      if (updatedHistory.length > maxItems) {
        updatedHistory.splice(maxItems);
      }

      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updatedHistory));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to save search history:', error);
      }
    }
  }

  removeFromSearchHistory(id: string): void {
    try {
      const history = this.getSearchHistory();
      const updatedHistory = history.filter(item => item.id !== id);
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updatedHistory));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to remove from search history:', error);
      }
    }
  }

  clearSearchHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.SEARCH_HISTORY);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to clear search history:', error);
      }
    }
  }

  // 즐겨찾기 관리
  getFavorites(): FavoriteAddress[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!stored) return [];
      
      return JSON.parse(stored) as FavoriteAddress[];
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to load favorites:', error);
      }
      return [];
    }
  }

  addToFavorites(address: AddressData, nickname?: string, category?: string): boolean {
    try {
      const favorites = this.getFavorites();
      
      // 중복 확인
      const isDuplicate = favorites.some(fav => 
        fav.address_name === address.address_name || fav.id === address.id
      );
      
      if (isDuplicate) {
        return false; // 이미 즐겨찾기에 있음
      }

      const newFavorite: FavoriteAddress = {
        ...address,
        nickname,
        category: category || '기타',
        addedAt: Date.now(),
        useCount: 0
      };

      const updatedFavorites = [newFavorite, ...favorites];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
      
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to add to favorites:', error);
      }
      return false;
    }
  }

  removeFromFavorites(id: string): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.filter(fav => fav.id !== id);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to remove from favorites:', error);
      }
    }
  }

  updateFavorite(id: string, updates: Partial<FavoriteAddress>): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.map(fav => 
        fav.id === id ? { ...fav, ...updates } : fav
      );
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to update favorite:', error);
      }
    }
  }

  incrementFavoriteUseCount(id: string): void {
    try {
      const favorites = this.getFavorites();
      const updatedFavorites = favorites.map(fav => 
        fav.id === id ? { ...fav, useCount: fav.useCount + 1 } : fav
      );
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to increment favorite use count:', error);
      }
    }
  }

  isFavorite(address: AddressData): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => 
      fav.address_name === address.address_name || fav.id === address.id
    );
  }

  // 설정 관리
  getSettings(): SearchSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!stored) return DEFAULT_SEARCH_SETTINGS;
      
      const settings = JSON.parse(stored) as Partial<SearchSettings>;
      return { ...DEFAULT_SEARCH_SETTINGS, ...settings };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to load settings:', error);
      }
      return DEFAULT_SEARCH_SETTINGS;
    }
  }

  updateSettings(updates: Partial<SearchSettings>): void {
    try {
      const currentSettings = this.getSettings();
      const newSettings = { ...currentSettings, ...updates };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(newSettings));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to update settings:', error);
      }
    }
  }

  // 통계 및 분석
  getUsageStats(): {
    totalSearches: number;
    totalFavorites: number;
    mostUsedFavorite: FavoriteAddress | null;
    recentSearches: SearchHistoryItem[];
    favoritesByCategory: Record<string, number>;
  } {
    const history = this.getSearchHistory();
    const favorites = this.getFavorites();

    const mostUsedFavorite = favorites.length > 0 
      ? favorites.reduce((max, current) => 
          current.useCount > max.useCount ? current : max
        )
      : null;

    const recentSearches = history
      .filter(item => Date.now() - item.timestamp < 7 * 24 * 60 * 60 * 1000) // 최근 7일
      .slice(0, 10);

    const favoritesByCategory = favorites.reduce((acc, fav) => {
      const category = fav.category || '기타';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSearches: history.length,
      totalFavorites: favorites.length,
      mostUsedFavorite,
      recentSearches,
      favoritesByCategory
    };
  }

  // 데이터 내보내기/가져오기
  exportData(): {
    history: SearchHistoryItem[];
    favorites: FavoriteAddress[];
    settings: SearchSettings;
    exportDate: number;
  } {
    return {
      history: this.getSearchHistory(),
      favorites: this.getFavorites(),
      settings: this.getSettings(),
      exportDate: Date.now()
    };
  }

  importData(data: {
    history?: SearchHistoryItem[];
    favorites?: FavoriteAddress[];
    settings?: SearchSettings;
  }): { success: boolean; errors: string[] } {
    const errors: string[] = [];
    
    try {
      if (data.history) {
        localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(data.history));
      }
    } catch (error) {
      errors.push('검색 히스토리 가져오기 실패');
    }

    try {
      if (data.favorites) {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(data.favorites));
      }
    } catch (error) {
      errors.push('즐겨찾기 가져오기 실패');
    }

    try {
      if (data.settings) {
        const mergedSettings = { ...DEFAULT_SEARCH_SETTINGS, ...data.settings };
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(mergedSettings));
      }
    } catch (error) {
      errors.push('설정 가져오기 실패');
    }

    return {
      success: errors.length === 0,
      errors
    };
  }

  // 저장소 정리
  cleanup(): void {
    try {
      // 오래된 검색 히스토리 제거
      const history = this.getSearchHistory(); // 이미 30일 필터링됨
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));

      // 사용하지 않는 즐겨찾기 정리 (1년 이상 사용하지 않은 항목)
      const favorites = this.getFavorites();
      const oneYearAgo = Date.now() - 365 * 24 * 60 * 60 * 1000;
      const activeFavorites = favorites.filter(fav => 
        fav.addedAt > oneYearAgo || fav.useCount > 0
      );
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(activeFavorites));
      
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Storage cleanup failed:', error);
      }
    }
  }

  // 저장소 사용량 확인
  getStorageUsage(): {
    used: number;
    available: number;
    percentage: number;
  } {
    let used = 0;
    let available = 5 * 1024 * 1024; // 5MB (일반적인 localStorage 한도)

    try {
      // 대략적인 사용량 계산
      for (const key of Object.values(STORAGE_KEYS)) {
        const item = localStorage.getItem(key);
        if (item) {
          used += item.length;
        }
      }

      // 실제 사용 가능한 공간 테스트 (옵션)
      const testKey = 'storage_test';
      const testData = 'x'.repeat(1024); // 1KB
      let testSize = 0;
      
      try {
        while (testSize < available) {
          localStorage.setItem(testKey, testData.repeat(testSize / 1024 + 1));
          testSize += 1024;
        }
      } catch {
        available = testSize;
      } finally {
        localStorage.removeItem(testKey);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to calculate storage usage:', error);
      }
    }

    return {
      used,
      available,
      percentage: Math.round((used / available) * 100)
    };
  }
}

// 싱글톤 인스턴스
export const storageManager = new StorageManager();

// 주기적 정리 (1일마다)
if (typeof window !== 'undefined') {
  const lastCleanup = localStorage.getItem('last_cleanup');
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  
  if (!lastCleanup || parseInt(lastCleanup) < oneDayAgo) {
    storageManager.cleanup();
    localStorage.setItem('last_cleanup', Date.now().toString());
  }
}