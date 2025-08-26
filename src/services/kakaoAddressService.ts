// 카카오 주소 검색 API 서비스
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

export interface KakaoAddressResponse {
  documents: AddressData[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

// 카카오 API 설정
const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
const KAKAO_ADDRESS_API_URL = 'https://dapi.kakao.com/v2/local/search/address.json';

// 설정 상수
const CONFIG = {
  DEFAULT_SIZE: 15,
  ADDITIONAL_SIZE: 10,
  MAX_RESULTS: 10,
  MIN_RESULTS_FOR_ADDITIONAL: 3,
  REQUEST_TIMEOUT: 5000,
  CACHE_DURATION: 5 * 60 * 1000, // 5분
  DEBOUNCE_DELAY: 300
};

// 간단한 인메모리 캐시
const searchCache = new Map();
let abortController: AbortController | null = null;

// 개선된 카카오 API 호출 함수
const callKakaoAPI = async (query: string, size = CONFIG.DEFAULT_SIZE): Promise<KakaoAddressResponse> => {
  // 이전 요청 취소
  if (abortController) {
    abortController.abort();
  }
  
  abortController = new AbortController();
  const signal = abortController.signal;
  
  if (!KAKAO_API_KEY) {
    throw new Error('카카오 API 키가 설정되지 않았습니다.');
  }

  // 캐시 확인
  const cacheKey = `${query}_${size}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_DURATION) {
    return cached.data;
  }

  const requestUrl = `${KAKAO_ADDRESS_API_URL}?query=${encodeURIComponent(query)}&size=${size}`;

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`카카오 API 호출 실패: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // 캐시 저장
    searchCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('검색이 취소되었습니다.');
    }
    throw error;
  }
};

// 병렬 추가 검색 함수
const performParallelAdditionalSearch = async (query: string): Promise<AddressData[]> => {
  const suffixes = ['시', '구', '동', '군', '읍', '면'];
  
  // 병렬로 모든 추가 검색 실행
  const searchPromises = suffixes.map(suffix => 
    callKakaoAPI(`${query} ${suffix}`, CONFIG.ADDITIONAL_SIZE)
      .then(response => transformKakaoResponse(response))
      .catch(() => []) // 실패한 검색은 빈 배열 반환
  );
  
  try {
    const results = await Promise.all(searchPromises);
    
    // 모든 결과 병합 및 중복 제거
    const allAdditional: AddressData[] = [];
    const seenAddresses = new Set<string>();
    
    for (const resultArray of results) {
      for (const address of resultArray) {
        if (!seenAddresses.has(address.address_name)) {
          allAdditional.push(address);
          seenAddresses.add(address.address_name);
        }
      }
    }
    
    return allAdditional;
  } catch (error) {
    console.warn('병렬 추가 검색 중 오류:', error);
    return [];
  }
};

// 카카오 응답을 내부 형식으로 변환
const transformKakaoResponse = (kakaoResponse: KakaoAddressResponse): AddressData[] => {
  return kakaoResponse.documents.map((doc, index) => ({
    id: `kakao_${Date.now()}_${index}`,
    address_name: doc.address_name,
    address_type: doc.address_type,
    x: doc.x,
    y: doc.y,
    address: {
      address_name: doc.address.address_name,
      region_1depth_name: doc.address.region_1depth_name,
      region_2depth_name: doc.address.region_2depth_name,
      region_3depth_name: doc.address.region_3depth_name,
    },
  }));
};

export const kakaoAddressService = {
  // 개선된 주소 검색
  searchAddress: async (query: string): Promise<AddressData[]> => {
    try {
      if (!query.trim()) {
        return [];
      }

      // 기본 검색 실행
      const kakaoResponse = await callKakaoAPI(query);
      let allResults = transformKakaoResponse(kakaoResponse);
      
      // 결과가 부족한 경우 병렬 추가 검색 수행
      if (allResults.length < CONFIG.MIN_RESULTS_FOR_ADDITIONAL && query.length >= 2) {
        const additionalResults = await performParallelAdditionalSearch(query);
        
        // 중복 제거하며 결과 병합
        const seenAddresses = new Set(allResults.map(item => item.address_name));
        for (const result of additionalResults) {
          if (!seenAddresses.has(result.address_name)) {
            allResults.push(result);
            seenAddresses.add(result.address_name);
          }
        }
      }
      
      return allResults.slice(0, CONFIG.MAX_RESULTS);
    } catch (error) {
      // API 오류 시 목업 데이터로 폴백
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage !== '검색이 취소되었습니다.') {
        return getMockAddressData(query);
      }
      throw error;
    }
  },

  // 주소 상세 정보 조회 (목업 데이터)
  getAddressDetail: async (addressId: string): Promise<AddressData | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const address = getMockAddressData('').find(addr => addr.id === addressId);
    return address || null;
  },

  // 좌표로 주소 검색 (목업 데이터)
  searchAddressByCoords: async (x: string, y: string): Promise<AddressData | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 가장 가까운 주소 찾기 (간단한 거리 계산)
    const coords = { x: parseFloat(x), y: parseFloat(y) };
    let closestAddress: AddressData | null = null;
    let minDistance = Infinity;
    
    const mockData = getMockAddressData('');
    mockData.forEach(address => {
      const addrX = parseFloat(address.x);
      const addrY = parseFloat(address.y);
      const distance = Math.sqrt(
        Math.pow(coords.x - addrX, 2) + Math.pow(coords.y - addrY, 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestAddress = address;
      }
    });
    
    return closestAddress;
  }
};

// 목업 주소 데이터 (API 오류 시 폴백용)
const getMockAddressData = (query: string): AddressData[] => {
  const mockAddressData: AddressData[] = [
    {
      id: '1',
      address_name: '서울특별시 강남구 테헤란로 152',
      address_type: 'ROAD_ADDR',
      x: '127.0286',
      y: '37.4979',
      address: {
        address_name: '서울특별시 강남구 역삼동',
        region_1depth_name: '서울특별시',
        region_2depth_name: '강남구',
        region_3depth_name: '역삼동'
      }
    },
    {
      id: '2',
      address_name: '서울특별시 강남구 강남대로 456',
      address_type: 'ROAD_ADDR',
      x: '127.0278',
      y: '37.4975',
      address: {
        address_name: '서울특별시 강남구 역삼동',
        region_1depth_name: '서울특별시',
        region_2depth_name: '강남구',
        region_3depth_name: '역삼동'
      }
    },
    {
      id: '3',
      address_name: '서울특별시 강남구 삼성로 86길 20',
      address_type: 'ROAD_ADDR',
      x: '127.0265',
      y: '37.4982',
      address: {
        address_name: '서울특별시 강남구 역삼동',
        region_1depth_name: '서울특별시',
        region_2depth_name: '강남구',
        region_3depth_name: '역삼동'
      }
    },
    {
      id: '4',
      address_name: '서울특별시 강남구 봉은사로 179',
      address_type: 'ROAD_ADDR',
      x: '127.0291',
      y: '37.4968',
      address: {
        address_name: '서울특별시 강남구 역삼동',
        region_1depth_name: '서울특별시',
        region_2depth_name: '강남구',
        region_3depth_name: '역삼동'
      }
    },
    {
      id: '5',
      address_name: '서울특별시 강남구 논현로 508',
      address_type: 'ROAD_ADDR',
      x: '127.0302',
      y: '37.4955',
      address: {
        address_name: '서울특별시 강남구 역삼동',
        region_1depth_name: '서울특별시',
        region_2depth_name: '강남구',
        region_3depth_name: '역삼동'
      }
    }
  ];

  // 검색어에 따른 필터링 (대소문자 구분 없이)
  if (!query.trim()) {
    return mockAddressData;
  }

  const filteredAddresses = mockAddressData.filter(address => 
    address.address_name.toLowerCase().includes(query.toLowerCase()) ||
    address.address.address_name.toLowerCase().includes(query.toLowerCase()) ||
    address.address.region_2depth_name.toLowerCase().includes(query.toLowerCase())
  );
  
  return filteredAddresses.slice(0, 5);
};
