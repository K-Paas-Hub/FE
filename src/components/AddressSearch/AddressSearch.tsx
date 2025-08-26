import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { kakaoAddressService, AddressData } from '../../services/kakaoAddressService';
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
}

const AddressSearch: React.FC<AddressSearchProps> = ({
  onAddressSelect,
  placeholder,
  disabled = false,
  className = '',
  value: controlledValue,
  onChange: controlledOnChange,
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<AddressData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 제어 컴포넌트인지 확인
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const displayValue = isControlled ? controlledValue : searchTerm;

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const addressResults = await kakaoAddressService.searchAddress(term);
      setResults(addressResults);
      setShowResults(true);
    } catch (error) {
      console.error('주소 검색 실패:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isControlled) {
      controlledOnChange(value);
    } else {
      setSearchTerm(value);
    }
    
    // 디바운싱 적용
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleAddressSelect = (address: AddressData) => {
    setSelectedAddress(address);
    if (isControlled) {
      controlledOnChange(address.address_name);
    } else {
      setSearchTerm(address.address_name);
    }
    onAddressSelect(address);
    setShowResults(false);
  };

  const handleClear = () => {
    setSelectedAddress(null);
    if (isControlled) {
      controlledOnChange('');
    } else {
      setSearchTerm('');
    }
    setResults([]);
    setShowResults(false);
  };

  const handleManualSearch = () => {
    const term = isControlled ? controlledValue : searchTerm;
    handleSearch(term);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <AddressSearchContainer ref={containerRef} className={className}>
      <AddressSearchInput
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setShowResults(true)}
        placeholder={placeholder || t('address.searchPlaceholder', '주소를 검색하세요')}
        disabled={disabled}
        autoComplete="off"
      />
      
      <AddressSearchButton
        onClick={handleManualSearch}
        disabled={disabled || loading}
        type="button"
      >
        {loading ? (
          <LoadingSpinner />
        ) : selectedAddress ? (
          '✕'
        ) : (
          '🔍'
        )}
      </AddressSearchButton>

      <AnimatePresence>
        {showResults && (results.length > 0 || loading) && (
          <AddressResultsContainer
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <div style={{ padding: '1rem', textAlign: 'center' }}>
                <LoadingSpinner />
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  검색 중...
                </div>
              </div>
            ) : results.length > 0 ? (
              results.map((address, index) => (
                <AddressResultItem
                  key={address.id}
                  onClick={() => handleAddressSelect(address)}
                  whileHover={{ backgroundColor: '#f9fafb' }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AddressResultTitle>{address.address_name}</AddressResultTitle>
                  <AddressResultSubtitle>
                    {address.address.region_1depth_name} {address.address.region_2depth_name} {address.address.region_3depth_name}
                  </AddressResultSubtitle>
                </AddressResultItem>
              ))
            ) : (
              <NoResultsText>검색 결과가 없습니다.</NoResultsText>
            )}
          </AddressResultsContainer>
        )}
      </AnimatePresence>
    </AddressSearchContainer>
  );
};

export default AddressSearch;
