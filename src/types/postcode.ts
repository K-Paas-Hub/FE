/**
 * DaumPostcode API 타입 정의
 * 다음 우편번호 서비스 API의 타입들을 정의합니다.
 */

// ============================================================================
// 주소 데이터 타입
// ============================================================================

/**
 * 주소 데이터 인터페이스
 * DaumPostcode API에서 반환하는 주소 정보
 */
export interface AddressData {
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

// ============================================================================
// DaumPostcode 옵션 타입
// ============================================================================

/**
 * DaumPostcode 테마 옵션
 */
export interface PostcodeTheme {
  searchBgColor?: string;
  queryTextColor?: string;
  postcodeTextColor?: string;
  emphTextColor?: string;
  outlineColor?: string;
}

/**
 * DaumPostcode 설정 옵션
 */
export interface PostcodeOptions {
  oncomplete?: (data: AddressData) => void;
  onresize?: (size: { width: number; height: number }) => void;
  onclose?: (state: string) => void;
  onsearch?: (data: { q: string }) => void;
  width?: string | number;
  height?: string | number;
  animation?: boolean;
  focusInput?: boolean;
  autoMapping?: boolean;
  hideMapBtn?: boolean;
  hideEngBtn?: boolean;
  pleaseReadGuide?: number;
  pleaseReadGuideTimer?: number;
  maxSuggestItems?: number;
  showMoreHName?: boolean;
  showMoreJibun?: boolean;
  showMoreRoad?: boolean;
  showMoreBuilding?: boolean;
  showMoreApartment?: boolean;
  showMoreDetail?: boolean;
  showMoreEnglish?: boolean;
  showMorePostcode?: boolean;
  showMoreAddress?: boolean;
  showMoreRoadAddress?: boolean;
  showMoreJibunAddress?: boolean;
  showMoreBuildingName?: boolean;
  showMoreApartmentName?: boolean;
  showMoreDetailAddress?: boolean;
  showMoreEnglishAddress?: boolean;
  showMoreEnglishRoadAddress?: boolean;
  showMoreEnglishJibunAddress?: boolean;
  showMoreEnglishBuildingName?: boolean;
  showMoreEnglishApartmentName?: boolean;
  showMoreEnglishDetailAddress?: boolean;
  showMorePostcode1?: boolean;
  showMorePostcode2?: boolean;
  showMorePostcodeSeq?: boolean;
  showMoreBuildingCode?: boolean;
  showMoreBcode?: boolean;
  showMoreSigunguCode?: boolean;
  showMoreRoadnameCode?: boolean;
  showMoreRoadname?: boolean;
  showMoreBname?: boolean;
  showMoreBname1?: boolean;
  showMoreBname2?: boolean;
  showMoreHname?: boolean;
  showMoreNoSelected?: boolean;
  showMoreUserLanguageType?: boolean;
  showMoreUserSelectedType?: boolean;
  showMoreAddressType?: boolean;
  showMoreUserQueryType?: boolean;
  showMoreQuery?: boolean;
  showMoreAutoRoadAddress?: boolean;
  showMoreAutoRoadAddressEnglish?: boolean;
  showMoreAutoJibunAddress?: boolean;
  showMoreAutoJibunAddressEnglish?: boolean;
  theme?: PostcodeTheme;
  autoMappingRoad?: boolean;
  autoMappingJibun?: boolean;
  shorthand?: boolean;
  alwaysShowEngAddr?: boolean;
  submitMode?: boolean;
  useBannerLink?: boolean;
  popupKey?: string;
  autoClose?: boolean;
}

/**
 * DaumPostcode 열기 옵션
 */
export interface PostcodeOpenOptions extends PostcodeOptions {
  left?: string | number;
  top?: string | number;
  popupTitle?: string;
}

/**
 * DaumPostcode 임베드 옵션
 */
export interface PostcodeEmbedOptions extends PostcodeOptions {
  q?: string;
}

// ============================================================================
// DaumPostcode 인스턴스 타입
// ============================================================================

/**
 * DaumPostcode 인스턴스 인터페이스
 */
export interface PostcodeInstance {
  open: (options?: PostcodeOpenOptions) => void;
  embed: (element: HTMLElement, options?: PostcodeEmbedOptions) => void;
}

/**
 * DaumPostcode 생성자 타입
 */
export interface PostcodeConstructor {
  new (options?: PostcodeOptions): PostcodeInstance;
}

// ============================================================================
// 전역 Window 타입 확장
// ============================================================================

/**
 * 전역 Window 인터페이스에 Daum 타입 추가
 */
declare global {
  interface Window {
    daum: {
      Postcode: PostcodeConstructor;
    };
  }
}

// ============================================================================
// 컴포넌트 Props 타입
// ============================================================================

/**
 * PostcodeSearch 컴포넌트 Props
 */
export interface PostcodeSearchProps {
  onAddressSelect: (address: AddressData) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  showDetailAddress?: boolean;
  showRoadAddress?: boolean;
  showJibunAddress?: boolean;
  theme?: PostcodeTheme;
}

// ============================================================================
// 유틸리티 타입
// ============================================================================

/**
 * 주소 데이터에서 특정 필드만 선택하는 타입
 */
export type AddressDataField = keyof AddressData;

/**
 * 주소 데이터의 선택적 필드 타입
 */
export type PartialAddressData = Partial<AddressData>;

/**
 * 필수 주소 필드 타입
 */
export type RequiredAddressFields = 'zonecode' | 'address' | 'roadAddress' | 'jibunAddress';

/**
 * 필수 주소 데이터 타입
 */
export type RequiredAddressData = Required<Pick<AddressData, RequiredAddressFields>> & Partial<Omit<AddressData, RequiredAddressFields>>;
