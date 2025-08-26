// 카카오 주소 검색 API 서비스 (서버리스 프록시 사용 버전: 브라우저에서 키 미노출)
import type { AddressData } from '../types/addressSearch';

export type { AddressData };

export interface KakaoAddressResponse {
  documents: AddressData[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

// 내부 프록시 엔드포인트 (Vercel Serverless Function: /api/kakao-address)
const KAKAO_ADDRESS_PROXY_URL = '/api/kakao-address';

// 설정 상수
const CONFIG = {
  DEFAULT_SIZE: 15,
  ADDITIONAL_SIZE: 10,
  MAX_RESULTS: 10,
  MIN_RESULTS_FOR_ADDITIONAL: 3,
  REQUEST_TIMEOUT: 5000,
  CACHE_DURATION: 5 * 60 * 1000, // 5분
  DEBOUNCE_DELAY: 300,
};

// 간단한 인메모리 캐시
const searchCache = new Map<
  string,
  { data: KakaoAddressResponse; timestamp: number }
>();
let abortController: AbortController | null = null;

// 개선된 카카오 API 호출 함수 (프록시 경유)
const callKakaoAPI = async (
  query: string,
  size = CONFIG.DEFAULT_SIZE
): Promise<KakaoAddressResponse> => {
  // 이전 요청 취소
  if (abortController) {
    abortController.abort();
  }

  abortController = new AbortController();
  const signal = abortController.signal;

  // 캐시 확인
  const cacheKey = `${query}_${size}`;
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_DURATION) {
    return cached.data;
  }

  const requestUrl = `${KAKAO_ADDRESS_PROXY_URL}?query=${encodeURIComponent(
    query
  )}&size=${size}`;

  // 타임아웃 처리
  const timeoutId = setTimeout(() => {
    try {
      abortController?.abort();
    } catch {}
  }, CONFIG.REQUEST_TIMEOUT);

  try {
    const response = await fetch(requestUrl, {
      method: 'GET',
      signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`카카오 API 호출 실패: ${response.status} - ${errorText}`);
    }

    const data: KakaoAddressResponse = await response.json();

    // 캐시 저장
    searchCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('검색이 취소되었습니다.');
    }
    throw error;
  }
};

// 병렬 추가 검색 함수
const performParallelAdditionalSearch = async (
  query: string
): Promise<AddressData[]> => {
  const suffixes = ['시', '구', '동', '군', '읍', '면'];

  // 병렬로 모든 추가 검색 실행
  const searchPromises = suffixes.map((suffix) =>
    callKakaoAPI(`${query} ${suffix}`, CONFIG.ADDITIONAL_SIZE)
      .then((response) => transformKakaoResponse(response))
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
const transformKakaoResponse = (
  kakaoResponse: KakaoAddressResponse
): AddressData[] => {
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
    if (!query.trim()) {
      return [];
    }

    // 기본 검색 실행
    const kakaoResponse = await callKakaoAPI(query);
    let allResults = transformKakaoResponse(kakaoResponse);

    // 결과가 부족한 경우 병렬 추가 검색 수행
    if (
      allResults.length < CONFIG.MIN_RESULTS_FOR_ADDITIONAL &&
      query.length >= 2
    ) {
      const additionalResults = await performParallelAdditionalSearch(query);

      // 중복 제거하며 결과 병합
      const seenAddresses = new Set(allResults.map((item) => item.address_name));
      for (const result of additionalResults) {
        if (!seenAddresses.has(result.address_name)) {
          allResults.push(result);
          seenAddresses.add(result.address_name);
        }
      }
    }

    return allResults.slice(0, CONFIG.MAX_RESULTS);
  },
};
