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

// 카카오 API 호출 함수
const callKakaoAPI = async (query: string): Promise<KakaoAddressResponse> => {
  console.log('🔍 카카오 API 호출 시작');
  console.log('📝 검색어:', query);
  console.log('🔑 API 키:', KAKAO_API_KEY ? `${KAKAO_API_KEY.substring(0, 8)}...` : '없음');
  console.log('🌐 API URL:', KAKAO_ADDRESS_API_URL);

  if (!KAKAO_API_KEY) {
    throw new Error('카카오 API 키가 설정되지 않았습니다.');
  }

  // 더 많은 결과를 받기 위해 size를 15로 증가
  const requestUrl = `${KAKAO_ADDRESS_API_URL}?query=${encodeURIComponent(query)}&size=15`;
  console.log('📡 요청 URL:', requestUrl);

  try {
    console.log('🚀 API 요청 전송 중...');
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('📊 응답 상태:', response.status, response.statusText);
    console.log('📋 응답 헤더:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API 오류 응답:', errorText);
      throw new Error(`카카오 API 호출 실패: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ API 응답 성공:', data);
    console.log('📋 전체 응답 내용:', JSON.stringify(data, null, 2));
    console.log('📊 documents 개수:', data.documents?.length || 0);
    console.log('📊 meta 정보:', data.meta);
    return data;
  } catch (error) {
    console.error('💥 API 호출 중 오류:', error);
    throw error;
  }
};

// 추가 검색을 위한 함수
const callKakaoAPIWithSuffix = async (query: string, suffix: string): Promise<KakaoAddressResponse> => {
  const fullQuery = `${query} ${suffix}`;
  console.log(`🔍 추가 검색: "${fullQuery}"`);
  
  const requestUrl = `${KAKAO_ADDRESS_API_URL}?query=${encodeURIComponent(fullQuery)}&size=10`;
  
  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Authorization': `KakaoAK ${KAKAO_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { documents: [], meta: { total_count: 0, pageable_count: 0, is_end: true } };
    }

    const data = await response.json();
    console.log(`✅ 추가 검색 결과 (${suffix}):`, data.documents?.length || 0, '개');
    return data;
  } catch (error) {
    console.error(`❌ 추가 검색 오류 (${suffix}):`, error);
    return { documents: [], meta: { total_count: 0, pageable_count: 0, is_end: true } };
  }
};

// 카카오 응답을 내부 형식으로 변환
const transformKakaoResponse = (kakaoResponse: KakaoAddressResponse): AddressData[] => {
  console.log('🔄 응답 변환 시작:', kakaoResponse);
  
  const transformedData = kakaoResponse.documents.map((doc, index) => ({
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

  console.log('✅ 변환된 데이터:', transformedData);
  return transformedData;
};

export const kakaoAddressService = {
  // 주소 검색 (실제 카카오 API 사용)
  searchAddress: async (query: string): Promise<AddressData[]> => {
    console.log('🎯 주소 검색 시작:', query);
    
    try {
      // 실제 API 호출을 시뮬레이션하기 위한 지연
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (!query.trim()) {
        console.log('⚠️ 빈 검색어, 빈 결과 반환');
        return [];
      }

      console.log('🌐 카카오 API 호출 시도...');
      // 기본 카카오 API 호출
      const kakaoResponse = await callKakaoAPI(query);
      
      console.log('🔄 응답 변환 중...');
      // 기본 응답 변환
      let allResults = transformKakaoResponse(kakaoResponse);
      
      // 기본 검색 결과가 부족한 경우 추가 검색 수행
      if (allResults.length < 3 && query.length >= 2) {
        console.log('🔍 추가 검색 수행 (결과가 부족함)');
        
        // 일반적인 지역 접미사들로 추가 검색
        const suffixes = ['시', '구', '동', '군', '읍', '면'];
        const additionalResults: AddressData[] = [];
        
        for (const suffix of suffixes) {
          try {
            const additionalResponse = await callKakaoAPIWithSuffix(query, suffix);
            const transformed = transformKakaoResponse(additionalResponse);
            additionalResults.push(...transformed);
          } catch (error) {
            console.warn(`추가 검색 실패 (${suffix}):`, error);
          }
        }
        
        // 중복 제거 및 결과 합치기
        const seenIds = new Set(allResults.map(item => item.address_name));
        for (const result of additionalResults) {
          if (!seenIds.has(result.address_name)) {
            allResults.push(result);
            seenIds.add(result.address_name);
          }
        }
        
        console.log('📊 추가 검색 후 총 결과:', allResults.length, '개');
      }
      
      console.log('🎉 검색 완료, 결과:', allResults.length, '개');
      return allResults.slice(0, 10); // 최대 10개로 제한
    } catch (error) {
      console.error('❌ 카카오 주소 검색 API 오류:', error);
      
      // API 오류 시 목업 데이터로 폴백
      console.warn('🔄 목업 데이터로 폴백합니다.');
      const mockData = getMockAddressData(query);
      console.log('📋 목업 데이터 반환:', mockData);
      return mockData;
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
