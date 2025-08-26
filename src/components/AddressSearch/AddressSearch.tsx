import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AddressData } from '../../services/kakaoAddressService';
import { useAdvancedAddressSearch, useFavorites } from '../../hooks/useAdvancedAddressSearch';
import { formatErrorMessage, getErrorIcon } from '../../utils/errorHandling';
import { storageManager } from '../../utils/storageManager';
import {
  AddressSearchContainer,
  AddressSearchInput,
  AddressSearchButton,
  AddressResultsContainer,
  AddressResultItem,
  AddressResultTitle,
  AddressResultSubtitle,
  LoadingSpinner,
  NoResultsText,
} from './AddressSearch.styles';

interface AddressSearchProps {
  onAddressSelect: (address: AddressData) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  showFavorites?: boolean;
  showHistory?: boolean;
  enablePerformanceMode?: boolean;
  maxResults?: number;
  onError?: (error: any) => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  onAddressSelect,
  placeholder,
  disabled = false,
  className = '',
  value: controlledValue,
  onChange: controlledOnChange,
  showFavorites = true,
  showHistory = true,
  enablePerformanceMode = false,
  maxResults = 10,
  onError,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // 제어 컴포넌트인지 확인
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const displayValue = isControlled ? controlledValue : searchTerm;
  
  // 고급 주소 검색 훅 사용
  const {
    data: searchResults = [],
    error,
    isLoading,
    searchMetrics
  } = useAdvancedAddressSearch(displayValue, {
    enabled: displayValue.length >= 2,
    onError: onError
  });
  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  // 최종 결과 계산 (검색 결과 + 즐겨찾기)
  const combinedResults = useMemo(() => {
    let results = [...searchResults];
    
    // 즐겨찾기 결과 추가 (검색어가 짧을 때)
    if (showFavorites && displayValue.length < 3) {
      const favoriteResults = favorites
        .filter(fav => 
          fav.address_name.toLowerCase().includes(displayValue.toLowerCase()) ||
          (fav.nickname && fav.nickname.toLowerCase().includes(displayValue.toLowerCase()))
        )
        .slice(0, 3)
        .map(fav => ({ ...fav, isFavoriteResult: true }));
      
      results = [...favoriteResults, ...results];
    }
    
    return results.slice(0, maxResults);
  }, [searchResults, favorites, displayValue, showFavorites, maxResults]);

  // 키보드 내비게이션 처리
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!showResults || combinedResults.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < combinedResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : combinedResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < combinedResults.length) {
          handleAddressSelect(combinedResults[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowResults(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [showResults, combinedResults, selectedIndex]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isControlled) {
      controlledOnChange(value);
    } else {
      setSearchTerm(value);
    }
    
    setSelectedIndex(-1);
    setShowResults(true);
    
    // 검색어가 비어있으면 제안 사항 보여주기
    setShowSuggestions(value.length === 0);
  };

  const handleAddressSelect = useCallback((address: AddressData) => {
    setSelectedAddress(address);
    if (isControlled) {
      controlledOnChange(address.address_name);
    } else {
      setSearchTerm(address.address_name);
    }
    
    // 주소 선택 내역 저장
    storageManager.addToSearchHistory(address.address_name, 1, address);
    
    // 즐겨찾기 사용 횟수 증가
    if ('isFavoriteResult' in address && address.isFavoriteResult) {
      storageManager.incrementFavoriteUseCount(address.id);
    }
    
    onAddressSelect(address);
    setShowResults(false);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  }, [isControlled, controlledOnChange, onAddressSelect]);

  // 즐겨찾기 토글 처리
  const handleFavoriteToggle = useCallback((address: AddressData, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFavorite(address)) {
      removeFavorite(address.id);
    } else {
      addFavorite(address);
    }
  }, [isFavorite, addFavorite, removeFavorite, handleAddressSelect]);
  
  // 검색 입력 포커스 처리
  const handleInputFocus = () => {
    if (displayValue.length === 0) {
      setShowSuggestions(true);
    } else {
      setShowResults(true);
    }
  };
  
  // 수동 검색 버튼 처리
  const handleManualSearch = () => {
    setShowResults(true);
    setShowSuggestions(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 선택된 인덱스가 변경되면 스크롤 조정
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedItem = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });
      }
    }
  }, [selectedIndex]);
  
  // 결과 변경 시 선택 인덱스 초기화
  useEffect(() => {
    setSelectedIndex(-1);
  }, [combinedResults]);

  return (
    <AddressSearchContainer ref={containerRef} className={className}>
      <AddressSearchInput
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || t('address.searchPlaceholder', '주소를 검색하세요')}
        disabled={disabled}
        autoComplete="off"
        role="combobox"
        aria-expanded={showResults || showSuggestions}
        aria-haspopup="listbox"
        aria-describedby="address-search-description"
        aria-activedescendant={selectedIndex >= 0 ? `address-result-${selectedIndex}` : undefined}
      />
      
      <AddressSearchButton
        onClick={handleManualSearch}
        disabled={disabled || isLoading}
        type="button"
        aria-label={isLoading ? '검색 중' : '주소 검색'}
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : selectedAddress ? (
          '✕'
        ) : (
          '🔍'
        )}
      </AddressSearchButton>
      
      {/* 스크린 리더를 위한 설명 */}
      <div 
        id="address-search-description" 
        className="sr-only"
        aria-live="polite"
      >
        {isLoading && '주소 검색 중입니다.'}
        {error && `오류: ${error.message}`}
        {combinedResults.length > 0 && `${combinedResults.length}개의 검색 결과가 있습니다.`}
      </div>

      <AnimatePresence>
        {(showResults || showSuggestions) && (
          <AddressResultsContainer
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            role="listbox"
            aria-label="주소 검색 결과"
          >
            {/* 로딩 상태 */}
            {isLoading && (
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <LoadingSpinner />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  검색 중...
                </div>
              </div>
            )}
            
            {/* 에러 메시지 */}
            {error && (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#dc2626' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {getErrorIcon(error.type)}
                </div>
                <div style={{ fontSize: '0.875rem' }}>
                  {formatErrorMessage(error)}
                </div>
                {error.retry && (
                  <button
                    onClick={() => window.location.reload()}
                    style={{ 
                      marginTop: '0.5rem',
                      padding: '0.25rem 0.5rem',
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    다시 시도
                  </button>
                )}
              </div>
            )}
            
            {/* 검색 결과 */}
            {!isLoading && !error && combinedResults.length > 0 && (
              combinedResults.map((address, index) => (
                <AddressResultItem
                  key={address.id}
                  id={`address-result-${index}`}
                  onClick={() => handleAddressSelect(address)}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  role="option"
                  aria-selected={selectedIndex === index}
                  style={{
                    backgroundColor: selectedIndex === index ? '#f3f4f6' : 'transparent',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <AddressResultTitle>
                      {`${'isFavoriteResult' in address && address.isFavoriteResult ? '⭐ ' : ''}${address.address_name}`}
                    </AddressResultTitle>
                    <AddressResultSubtitle>
                      {address.address.region_1depth_name} {address.address.region_2depth_name} {address.address.region_3depth_name}
                    </AddressResultSubtitle>
                  </div>
                  
                  {/* 즐겨찾기 버튼 */}
                  {showFavorites && (
                    <button
                      onClick={(e) => handleFavoriteToggle(address, e)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        marginLeft: '0.5rem'
                      }}
                      aria-label={isFavorite(address) ? '즐겨찾기에서 제거' : '즐겨찾기에 추가'}
                    >
                      {isFavorite(address) ? '❤️' : '🤍'}
                    </button>
                  )}
                </AddressResultItem>
              ))
            )}
            
            {/* 검색 결과 없음 */}
            {!isLoading && !error && showResults && combinedResults.length === 0 && displayValue.length >= 2 && (
              <NoResultsText>
                '{displayValue}'에 대한 검색 결과가 없습니다.
                <br />
                <small>다른 검색어를 시도해보세요.</small>
              </NoResultsText>
            )}
            
            {/* 성능 메트릭 표시 (개발 모드) */}
            {enablePerformanceMode && searchMetrics && (
              <div style={{ 
                padding: '0.5rem',
                fontSize: '0.75rem',
                color: '#6b7280',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb'
              }}>
                ⏱️ {searchMetrics.responseTime}ms | 
                📄 {searchMetrics.resultCount}개 | 
                💾 {searchMetrics.cacheHit ? '캐시 히트' : 'API 호출'}
              </div>
            )}
          </AddressResultsContainer>
        )}
      </AnimatePresence>
      
      {/* 숨긴 스타일 (접근성) */}
      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </AddressSearchContainer>
  );
};

export default AddressSearch;
