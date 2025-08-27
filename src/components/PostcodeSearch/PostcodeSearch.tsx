import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './PostcodeSearch.css';
import {
  DetailAddressContainer,
  DetailAddressInput,
  ConfirmButton,
} from './PostcodeSearch.styles';

interface AddressData {
  zonecode: string;
  address: string;
  roadAddress: string;
  jibunAddress: string;
  buildingName: string;
  apartment: string;
  sido: string;
  sigungu: string;
  bname: string;
  bname1: string;
  bname2: string;
  hname: string;
  noSelected: string;
  userLanguageType: string;
  userSelectedType: string;
  roadnameCode: string;
  roadname: string;
  bcode: string;
  sigunguCode: string;
  addressType: string;
  addressEnglish: string;
  roadAddressEnglish: string;
  jibunAddressEnglish: string;
  autoRoadAddress: string;
  autoRoadAddressEnglish: string;
  autoJibunAddress: string;
  autoJibunAddressEnglish: string;
  userQueryType: string;
  query: string;
  postcode: string;
  postcode1: string;
  postcode2: string;
  postcodeSeq: string;
  buildingCode: string;
  completeAddress?: string;
}

interface PostcodeSearchProps {
  onAddressSelect: (address: AddressData) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  showDetailAddress?: boolean;
  showRoadAddress?: boolean;
  showJibunAddress?: boolean;
  theme?: {
    searchBgColor?: string;
    queryTextColor?: string;
    postcodeTextColor?: string;
    emphTextColor?: string;
    outlineColor?: string;
  };
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: any) => {
        open: (options?: any) => void;
        embed: (element: HTMLElement, options?: any) => void;
      };
    };
  }
}

const PostcodeSearch: React.FC<PostcodeSearchProps> = ({
  onAddressSelect,
  placeholder = '주소를 검색하세요',
  disabled = false,
  className = '',
  value: controlledValue,
  onChange: controlledOnChange,
  showDetailAddress = true,
  showRoadAddress = true,
  showJibunAddress = true,
  theme = {},
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
  const [detailAddress, setDetailAddress] = useState('');
  const [isPostcodeLoaded, setIsPostcodeLoaded] = useState(false);
  const [showPostcode, setShowPostcode] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const postcodeRef = useRef<HTMLDivElement>(null);

  // 제어 컴포넌트인지 확인
  const isControlled = controlledValue !== undefined && controlledOnChange !== undefined;
  const displayValue = isControlled ? controlledValue : searchTerm;

  // 저장된 주소가 있으면 표시
  useEffect(() => {
    if (controlledValue && controlledValue.trim()) {
      setSearchTerm(controlledValue);
    }
  }, [controlledValue]);

  // 전체 주소 생성 함수
  const getCompleteAddress = () => {
    if (!selectedAddress) return '';
    
    let completeAddress = '';
    
    // 우편번호
    completeAddress += `[${selectedAddress.zonecode}] `;
    
    // 기본 주소 (도로명 또는 지번)
    if (selectedAddress.roadAddress) {
      completeAddress += selectedAddress.roadAddress;
    } else if (selectedAddress.jibunAddress) {
      completeAddress += selectedAddress.jibunAddress;
    } else {
      completeAddress += selectedAddress.address;
    }
    
    // 상세주소
    if (detailAddress.trim()) {
      completeAddress += ` ${detailAddress.trim()}`;
    }
    
    // 건물명
    if (selectedAddress.buildingName && selectedAddress.buildingName.trim()) {
      completeAddress += ` (${selectedAddress.buildingName.trim()})`;
    }
    
    return completeAddress;
  };

  // Daum 우편번호 스크립트 로드
  useEffect(() => {
    const loadPostcodeScript = () => {
      // 이미 로드되어 있는지 확인
      if (window.daum && window.daum.Postcode) {
        console.log('Daum Postcode already loaded');
        setIsPostcodeLoaded(true);
        return;
      }

      console.log('Loading Daum Postcode script...');
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = () => {
        console.log('Daum Postcode script loaded successfully');
        setIsPostcodeLoaded(true);
      };
      script.onerror = (error) => {
        console.error('Failed to load Daum Postcode script:', error);
      };
      
      document.head.appendChild(script);
    };

    loadPostcodeScript();
  }, []);

  // 우편번호 검색 팝업 열기
  const openPostcode = () => {
    console.log('openPostcode called');
    if (!isPostcodeLoaded || disabled) {
      console.log('Cannot open postcode - not loaded or disabled');
      return;
    }

    console.log('Creating Daum Postcode instance...');
    const postcode = new window.daum.Postcode({
      oncomplete: (data: AddressData) => {
        setSelectedAddress(data);
        setSearchTerm(data.address);
        setDetailAddress('');
        
        // 제어 컴포넌트인 경우 onChange 호출
        if (isControlled && controlledOnChange) {
          controlledOnChange(data.address);
        }
        
        // 부모 컴포넌트에 주소 데이터 전달 (전체 주소 포함)
        const addressWithComplete = {
          ...data,
          completeAddress: getCompleteAddress()
        };
        onAddressSelect(addressWithComplete);
        setShowPostcode(false);
      },
      onclose: (state: string) => {
        if (state === 'FORCE_CLOSE') {
          setShowPostcode(false);
        }
      },
      theme: {
        searchBgColor: theme.searchBgColor || '#3182f6',
        queryTextColor: theme.queryTextColor || '#FFFFFF',
        postcodeTextColor: theme.postcodeTextColor || '#FA4256',
        emphTextColor: theme.emphTextColor || '#008BD3',
        outlineColor: theme.outlineColor || '#E0E0E0',
      },
      width: 500,
      height: 600,
      animation: true,
      focusInput: true,
      autoMappingRoad: true,
      autoMappingJibun: true,
      shorthand: true,
      pleaseReadGuide: 5,
      pleaseReadGuideTimer: 1.5,
      maxSuggestItems: 10,
      showMoreHName: false,
      hideMapBtn: false,
      hideEngBtn: false,
      alwaysShowEngAddr: false,
      submitMode: true,
      useBannerLink: true,
    });

    postcode.open({
      popupTitle: '주소 검색',
      popupKey: 'postcode-popup',
      autoClose: true,
    });
  };

  // 레이어 모드로 우편번호 열기
  const openPostcodeLayer = () => {
    if (!isPostcodeLoaded || disabled || !postcodeRef.current) return;

    setShowPostcode(true);

    const postcode = new window.daum.Postcode({
      oncomplete: (data: AddressData) => {
        setSelectedAddress(data);
        setSearchTerm(data.address);
        setDetailAddress('');
        
        // 제어 컴포넌트인 경우 onChange 호출
        if (isControlled && controlledOnChange) {
          controlledOnChange(data.address);
        }
        
        // 부모 컴포넌트에 주소 데이터 전달 (전체 주소 포함)
        const addressWithComplete = {
          ...data,
          completeAddress: getCompleteAddress()
        };
        onAddressSelect(addressWithComplete);
        setShowPostcode(false);
      },
      onresize: (size: { width: number; height: number }) => {
        if (postcodeRef.current) {
          postcodeRef.current.style.height = size.height + 'px';
        }
      },
      onclose: (state: string) => {
        setShowPostcode(false);
      },
      theme: {
        searchBgColor: theme.searchBgColor || '#3182f6',
        queryTextColor: theme.queryTextColor || '#FFFFFF',
        postcodeTextColor: theme.postcodeTextColor || '#FA4256',
        emphTextColor: theme.emphTextColor || '#008BD3',
        outlineColor: theme.outlineColor || '#E0E0E0',
      },
      width: '100%',
      height: '100%',
      animation: true,
      focusInput: true,
      autoMappingRoad: true,
      autoMappingJibun: true,
      shorthand: true,
      pleaseReadGuide: 5,
      pleaseReadGuideTimer: 1.5,
      maxSuggestItems: 10,
      showMoreHName: false,
      hideMapBtn: false,
      hideEngBtn: false,
      alwaysShowEngAddr: false,
      submitMode: true,
      useBannerLink: true,
    });

    postcode.embed(postcodeRef.current);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (isControlled && controlledOnChange) {
      controlledOnChange(value);
    }
  };

  const handleDetailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const handleDetailAddressKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedAddress) {
      e.preventDefault();
      const addressWithComplete = {
        ...selectedAddress,
        completeAddress: getCompleteAddress()
      };
      onAddressSelect(addressWithComplete);
    }
  };

  const handleSearchClick = () => {
    openPostcode();
  };

  const handleLayerClick = () => {
    openPostcodeLayer();
  };

  const completeAddress = getCompleteAddress();

  return (
    <div className={`postcode-search-container ${className}`} ref={containerRef}>
      <div className="postcode-search-input-group">
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="postcode-search-input"
          readOnly
        />
        <button
          type="button"
          onClick={handleSearchClick}
          disabled={disabled || !isPostcodeLoaded}
          className="postcode-search-button"
        >
          {t('postcode.searchAddress')}
        </button>
      </div>

      {selectedAddress && (
        <div className="postcode-address-details">
          <div className="postcode-zonecode">
            {selectedAddress.zonecode}
          </div>
          
          {showRoadAddress && selectedAddress.roadAddress && (
            <div className="postcode-road-address">
              <strong>{t('postcode.roadAddress')}</strong> {selectedAddress.roadAddress}
            </div>
          )}
          
          {showJibunAddress && selectedAddress.jibunAddress && (
            <div className="postcode-jibun-address">
              <strong>{t('postcode.jibunAddress')}</strong> {selectedAddress.jibunAddress}
            </div>
          )}
          
          {showDetailAddress && (
            <DetailAddressContainer>
              <label htmlFor="detail-address">{t('postcode.detailAddress')}</label>
              <DetailAddressInput
                id="detail-address"
                type="text"
                value={detailAddress}
                onChange={handleDetailAddressChange}
                onKeyPress={handleDetailAddressKeyPress}
                placeholder={t('postcode.detailAddressPlaceholder')}
              />
              <ConfirmButton
                onClick={() => {
                  if (selectedAddress) {
                    const addressWithComplete = {
                      ...selectedAddress,
                      completeAddress: getCompleteAddress()
                    };
                    onAddressSelect(addressWithComplete);
                  }
                }}
              >
                {t('postcode.confirm')}
              </ConfirmButton>
            </DetailAddressContainer>
          )}
          
          {selectedAddress.buildingName && (
            <div className="postcode-building-name">
              <strong>{t('postcode.buildingName')}</strong> {selectedAddress.buildingName}
            </div>
          )}

          {completeAddress && (
            <div className="postcode-complete-address">
              {completeAddress}
            </div>
          )}
        </div>
      )}

      {showPostcode && (
        <div className="postcode-layer-overlay">
          <div className="postcode-layer-container">
            <div className="postcode-layer-header">
              <h3>{t('postcode.searchAddress')}</h3>
              <button
                type="button"
                onClick={() => setShowPostcode(false)}
                className="postcode-layer-close"
              >
                ✕
              </button>
            </div>
            <div ref={postcodeRef} className="postcode-layer-content" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostcodeSearch;
