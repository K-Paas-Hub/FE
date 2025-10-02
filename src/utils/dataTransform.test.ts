import {
  transformBackendJobToFrontend,
  transformBackendCompanyToFrontend,
} from './dataTransform';
import { BackendJobResponse, BackendCompanyResponse } from '../types/api';

describe('dataTransform', () => {
  describe('transformBackendJobToFrontend', () => {
    const mockBackendJob: BackendJobResponse = {
      postLink: 'https://example.com/jobs/12345',
      companyName: '테스트 회사',
      jobTitle: '소프트웨어 엔지니어',
      jobRegion: '서울특별시',
      jobExperience: '경력 3년 이상',
      categories: ['IT', '소프트웨어'],
      salary: '4000만원',
      jobDeadline: '2025-12-31',
      jobUploadDate: '2025-01-01',
      jobEducation: '대졸 이상',
      jobStatus: 'active',
      employmentTypes: ['정규직'],
      companyWebsite: 'https://test-company.com',
    };

    test('백엔드 응답을 프론트엔드 형식으로 올바르게 변환', () => {
      const result = transformBackendJobToFrontend(mockBackendJob);

      expect(result).toMatchObject({
        company: '테스트 회사',
        title: '소프트웨어 엔지니어',
        location: '서울특별시',
        experience: '경력 3년 이상',
        industry: 'IT/소프트웨어',
        salary: 40000000,
        deadline: '2025-12-31',
        hasVisa: false,
        isLiked: false,
        likeCount: 0,
        createdAt: '2025-01-01',
        contractType: '정규직',
      });
    });

    test('회사 로고를 첫 글자로 생성', () => {
      const result = transformBackendJobToFrontend(mockBackendJob);
      expect(result.logo).toBe('테');
    });

    test('영문 회사명은 대문자로 변환', () => {
      const englishJob = { ...mockBackendJob, companyName: 'google' };
      const result = transformBackendJobToFrontend(englishJob);
      expect(result.logo).toBe('G');
    });

    test('회사 로고 클래스를 일관되게 생성', () => {
      const result1 = transformBackendJobToFrontend(mockBackendJob);
      const result2 = transformBackendJobToFrontend(mockBackendJob);
      expect(result1.logoClass).toBe(result2.logoClass);
      expect(['blue', 'green', 'red', 'orange', 'purple']).toContain(result1.logoClass);
    });

    test('카테고리에서 업종을 올바르게 매핑', () => {
      const testCases = [
        { categories: ['생산'], expected: '생산/제조' },
        { categories: ['IT'], expected: 'IT/소프트웨어' },
        { categories: ['영업'], expected: '영업/마케팅' },
        { categories: ['건설'], expected: '건설' },
        { categories: ['의료'], expected: '의료/복지' },
        { categories: ['알 수 없음'], expected: '기타' },
        { categories: [], expected: '기타' },
      ];

      testCases.forEach(({ categories, expected }) => {
        const job = { ...mockBackendJob, categories };
        const result = transformBackendJobToFrontend(job);
        expect(result.industry).toBe(expected);
      });
    });

    test('급여를 올바르게 파싱', () => {
      const testCases = [
        { salary: '3000만원', expected: 30000000 },
        { salary: '2500만원 ~ 3000만원', expected: 30000000 },
        { salary: '연봉 4000만원', expected: 40000000 },
        { salary: '3500', expected: 35000000 },
        { salary: '', expected: 0 },
      ];

      testCases.forEach(({ salary, expected }) => {
        const job = { ...mockBackendJob, salary };
        const result = transformBackendJobToFrontend(job);
        expect(result.salary).toBe(expected);
      });
    });

    test('마감일 검증 및 변환', () => {
      const testCases = [
        { deadline: '2025-12-31', expected: '2025-12-31' },
        { deadline: '', expected: '상시채용' },
        { deadline: null, expected: '상시채용' },
        { deadline: 'N/A', expected: '상시채용' },
        { deadline: 'Invalid Date', expected: '상시채용' },
        { deadline: '마감', expected: '상시채용' },
        { deadline: '   ', expected: '상시채용' },
      ];

      testCases.forEach(({ deadline, expected }) => {
        const job = { ...mockBackendJob, jobDeadline: deadline as any };
        const result = transformBackendJobToFrontend(job);
        expect(result.deadline).toBe(expected);
      });
    });

    test('비자 지원 키워드 감지', () => {
      const testCases = [
        { title: '외국인 근로자 모집', categories: [], expected: true },
        { title: 'E-9 비자 가능', categories: [], expected: true },
        { title: '소프트웨어 개발자', categories: ['외국인'], expected: true },
        { title: 'F-4 비자 우대', categories: [], expected: true },
        { title: '일반 채용', categories: ['IT'], expected: false },
      ];

      testCases.forEach(({ title, categories, expected }) => {
        const job = { ...mockBackendJob, jobTitle: title, categories };
        const result = transformBackendJobToFrontend(job);
        expect(result.hasVisa).toBe(expected);
      });
    });

    test('카테고리별 아이콘 매핑', () => {
      const testCases = [
        { categories: ['생산'], expected: '🏭' },
        { categories: ['IT'], expected: '💻' },
        { categories: ['건설'], expected: '🏗️' },
        { categories: ['의료'], expected: '🏥' },
        { categories: ['교육'], expected: '🎓' },
        { categories: ['알 수 없음'], expected: '💼' },
      ];

      testCases.forEach(({ categories, expected }) => {
        const job = { ...mockBackendJob, categories };
        const result = transformBackendJobToFrontend(job);
        expect(result.imageContent).toBe(expected);
      });
    });

    test('계약 타입을 올바르게 매핑', () => {
      const testCases = [
        { employmentTypes: ['정규직'], expected: '정규직' },
        { employmentTypes: ['계약직'], expected: '계약직' },
        { employmentTypes: ['기타'], expected: '정규직' },
        { employmentTypes: undefined, expected: '정규직' },
      ];

      testCases.forEach(({ employmentTypes, expected }) => {
        const job = { ...mockBackendJob, employmentTypes: employmentTypes || [] };
        const result = transformBackendJobToFrontend(job);
        expect(result.contractType).toBe(expected);
      });
    });

    test('필수 필드가 없을 때 기본값 사용', () => {
      const minimalJob: BackendJobResponse = {
        postLink: 'https://example.com/job/1',
        jobTitle: '제목 없음',
        companyName: '회사명 없음',
        jobRegion: '지역 미정',
        jobExperience: '경력 무관',
        jobEducation: '학력 무관',
        salary: '0',
        jobUploadDate: '2025-01-01',
        jobDeadline: null,
        jobStatus: 'active',
        categories: [], // categories는 빈 배열로 설정
        employmentTypes: [],
      };

      const result = transformBackendJobToFrontend(minimalJob);

      expect(result.company).toBe('회사명 없음');
      expect(result.title).toBe('제목 없음');
      expect(result.location).toBe('지역 미정');
      expect(result.experience).toBe('경력 무관');
      expect(result.industry).toBe('기타');
    });
  });

  describe('transformBackendCompanyToFrontend', () => {
    const mockBackendCompany: BackendCompanyResponse = {
      companyName: '테스트 기업',
      industry: 'IT/소프트웨어',
      companyType: '중소기업',
      website: 'https://test-company.com',
      address: '서울특별시 강남구',
      introduce: '혁신적인 IT 기업입니다.',
    };

    test('백엔드 회사 정보를 프론트엔드 형식으로 변환', () => {
      const result = transformBackendCompanyToFrontend(mockBackendCompany);

      expect(result).toMatchObject({
        name: '테스트 기업',
        industry: 'IT/소프트웨어',
        size: '중소기업',
        website: 'https://test-company.com',
        address: '서울특별시 강남구',
        description: '혁신적인 IT 기업입니다.',
      });
    });

    test('회사 로고를 첫 글자로 생성', () => {
      const result = transformBackendCompanyToFrontend(mockBackendCompany);
      expect(result.logo).toBe('테');
    });

    test('필수 필드가 없을 때 기본값 사용', () => {
      const minimalCompany: BackendCompanyResponse = {
        companyName: '회사',
      } as any;

      const result = transformBackendCompanyToFrontend(minimalCompany);

      expect(result.industry).toBe('업종 미정');
      expect(result.size).toBe('회사 규모 미정');
      expect(result.website).toBe('웹사이트 없음');
      expect(result.address).toBe('주소 미정');
      expect(result.description).toBe('회사 소개 없음');
    });
  });
});
