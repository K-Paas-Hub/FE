import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PostcodeSearchContainer,
  PostcodeSearchInputGroup,
  PostcodeSearchInput,
  PostcodeSearchButton,
  PostcodeAddressDetails,
  PostcodeZonecode,
  PostcodeRoadAddress,
  PostcodeJibunAddress,
  PostcodeDetailAddress,
  PostcodeBuildingName,
  PostcodeCompleteAddress,
  PostcodeLayerOverlay,
  PostcodeLayerContainer,
  PostcodeLayerHeader,
  PostcodeLayerClose,
  PostcodeLayerContent,
  DetailAddressContainer,
  DetailAddressInput,
  ConfirmButton,
} from './PostcodeSearch.styles';
import {
  AddressData,
  PostcodeSearchProps,
} from '../../types/postcode';
import { devLog } from '../../utils/logger';



const PostcodeSearch: React.FC<PostcodeSearchProps> = ({
  onAddressSelect,
  placeholder,
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
  
  // 기본 placeholder 설정
  const defaultPlaceholder = t('postcode.searchAddressPlaceholder');
  const displayPlaceholder = placeholder || defaultPlaceholder;
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
        devLog('Daum Postcode 이미 로드됨');
        setIsPostcodeLoaded(true);
        return;
      }

      devLog('Daum Postcode 스크립트 로딩 중...');
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = () => {
        devLog('Daum Postcode 스크립트 로드 성공');
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
    devLog('우편번호 팝업 열기 호출');
    if (!isPostcodeLoaded || disabled) {
      devLog('우편번호를 열 수 없음 - 로드되지 않았거나 비활성화됨');
      return;
    }

    devLog('Daum Postcode 인스턴스 생성 중...');
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
      popupTitle: t('postcode.searchAddress'),
      popupKey: 'postcode-popup',
      autoClose: true,
    });
  };

  // openPostcodeLayer 함수 제거 (미사용)

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

  // handleLayerClick 함수 제거 (미사용)

  const completeAddress = getCompleteAddress();

  return (
    <PostcodeSearchContainer className={className} ref={containerRef}>
      <PostcodeSearchInputGroup>
        <PostcodeSearchInput
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={displayPlaceholder}
          disabled={disabled}
          readOnly
        />
        <PostcodeSearchButton
          type="button"
          onClick={handleSearchClick}
          disabled={disabled || !isPostcodeLoaded}
        >
          {t('postcode.searchAddress')}
        </PostcodeSearchButton>
      </PostcodeSearchInputGroup>

      {selectedAddress && (
        <PostcodeAddressDetails>
          <PostcodeZonecode>
            {selectedAddress.zonecode}
          </PostcodeZonecode>
          
          {showRoadAddress && selectedAddress.roadAddress && (
            <PostcodeRoadAddress>
              <strong>{t('postcode.roadAddress')}</strong> {selectedAddress.roadAddress}
            </PostcodeRoadAddress>
          )}
          
          {showJibunAddress && selectedAddress.jibunAddress && (
            <PostcodeJibunAddress>
              <strong>{t('postcode.jibunAddress')}</strong> {selectedAddress.jibunAddress}
            </PostcodeJibunAddress>
          )}
          
          {showDetailAddress && (
            <PostcodeDetailAddress>
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
            </PostcodeDetailAddress>
          )}
          
          {selectedAddress.buildingName && (
            <PostcodeBuildingName>
              <strong>{t('postcode.buildingName')}</strong> {selectedAddress.buildingName}
            </PostcodeBuildingName>
          )}

          {completeAddress && (
            <PostcodeCompleteAddress>
              {completeAddress}
            </PostcodeCompleteAddress>
          )}
        </PostcodeAddressDetails>
      )}

      {showPostcode && (
        <PostcodeLayerOverlay>
          <PostcodeLayerContainer>
            <PostcodeLayerHeader>
              <h3>{t('postcode.searchAddress')}</h3>
              <PostcodeLayerClose
                type="button"
                onClick={() => setShowPostcode(false)}
              >
                ✕
              </PostcodeLayerClose>
            </PostcodeLayerHeader>
            <PostcodeLayerContent ref={postcodeRef} />
          </PostcodeLayerContainer>
        </PostcodeLayerOverlay>
      )}
    </PostcodeSearchContainer>
  );
};

export default PostcodeSearch;
