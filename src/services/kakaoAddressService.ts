// 카카오 주소 검색 API 목업 서비스
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

// 목업 주소 데이터
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
  },
  {
    id: '6',
    address_name: '서울특별시 서초구 서초대로 396',
    address_type: 'ROAD_ADDR',
    x: '127.0256',
    y: '37.5012',
    address: {
      address_name: '서울특별시 서초구 서초동',
      region_1depth_name: '서울특별시',
      region_2depth_name: '서초구',
      region_3depth_name: '서초동'
    }
  },
  {
    id: '7',
    address_name: '서울특별시 서초구 강남대로 373',
    address_type: 'ROAD_ADDR',
    x: '127.0248',
    y: '37.5025',
    address: {
      address_name: '서울특별시 서초구 서초동',
      region_1depth_name: '서울특별시',
      region_2depth_name: '서초구',
      region_3depth_name: '서초동'
    }
  },
  {
    id: '8',
    address_name: '서울특별시 마포구 와우산로 94',
    address_type: 'ROAD_ADDR',
    x: '126.9234',
    y: '37.5567',
    address: {
      address_name: '서울특별시 마포구 상암동',
      region_1depth_name: '서울특별시',
      region_2depth_name: '마포구',
      region_3depth_name: '상암동'
    }
  },
  {
    id: '9',
    address_name: '서울특별시 마포구 월드컵북로 396',
    address_type: 'ROAD_ADDR',
    x: '126.9245',
    y: '37.5578',
    address: {
      address_name: '서울특별시 마포구 상암동',
      region_1depth_name: '서울특별시',
      region_2depth_name: '마포구',
      region_3depth_name: '상암동'
    }
  },
  {
    id: '10',
    address_name: '경기도 성남시 분당구 정자로 178-1',
    address_type: 'ROAD_ADDR',
    x: '127.1089',
    y: '37.3595',
    address: {
      address_name: '경기도 성남시 분당구 정자동',
      region_1depth_name: '경기도',
      region_2depth_name: '성남시 분당구',
      region_3depth_name: '정자동'
    }
  }
];

export const kakaoAddressService = {
  // 주소 검색 (목업 데이터)
  searchAddress: async (query: string): Promise<AddressData[]> => {
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!query.trim()) {
      return [];
    }
    
    // 검색어에 따른 필터링 (대소문자 구분 없이)
    const filteredAddresses = mockAddressData.filter(address => 
      address.address_name.toLowerCase().includes(query.toLowerCase()) ||
      address.address.address_name.toLowerCase().includes(query.toLowerCase()) ||
      address.address.region_2depth_name.toLowerCase().includes(query.toLowerCase())
    );
    
    // 검색 결과가 없을 경우
    if (filteredAddresses.length === 0) {
      return [];
    }
    
    // 최대 5개 결과 반환
    return filteredAddresses.slice(0, 5);
  },

  // 주소 상세 정보 조회 (목업 데이터)
  getAddressDetail: async (addressId: string): Promise<AddressData | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const address = mockAddressData.find(addr => addr.id === addressId);
    return address || null;
  },

  // 좌표로 주소 검색 (목업 데이터)
  searchAddressByCoords: async (x: string, y: string): Promise<AddressData | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 가장 가까운 주소 찾기 (간단한 거리 계산)
    const coords = { x: parseFloat(x), y: parseFloat(y) };
    let closestAddress: AddressData | null = null;
    let minDistance = Infinity;
    
    mockAddressData.forEach(address => {
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
