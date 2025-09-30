import { Job } from '../types/job';
import { BackendJobResponse, BackendCompanyResponse } from '../types/api';

// URL에서 ID 생성하는 함수
const generateId = (url: string): number => {
  // URL의 마지막 부분에서 숫자 추출
  const match = url.match(/\d+/);
  return match ? parseInt(match[0]) : Date.now();
};

// 유효한 마감일 검증 및 변환 함수
const getValidDeadline = (deadline: string | null | undefined): string => {
  // null, undefined, 빈 문자열 처리
  if (!deadline || deadline.trim() === '') {
    return '상시채용';
  }
  
  const trimmedDeadline = deadline.trim();
  
  // 유효하지 않은 값들 처리
  const invalidValues = ['N/A', '마감', 'Invalid Date', 'null', 'undefined', '-', '--'];
  if (invalidValues.includes(trimmedDeadline)) {
    return '상시채용';
  }
  
  // 날짜 형식 검증
  const date = new Date(trimmedDeadline);
  if (isNaN(date.getTime())) {
    return '상시채용';
  }
  
  // 유효한 날짜인 경우 원본 반환
  return trimmedDeadline;
};

// 회사 로고 텍스트 생성
const getCompanyLogo = (companyName: string): string => {
  if (!companyName) return '?';
  
  // 괄호 제거
  const cleanName = companyName.replace(/[()]/g, '');
  
  // 첫 글자 추출
  const firstChar = cleanName.charAt(0);
  
  // 한글이면 첫 글자, 영문이면 첫 글자 대문자
  return /[가-힣]/.test(firstChar) ? firstChar : firstChar.toUpperCase();
};

// 회사 로고 클래스 생성
const getCompanyLogoClass = (companyName: string): string => {
  if (!companyName) return 'default';
  
  const colors = ['blue', 'green', 'red', 'orange', 'purple'];
  const hash = companyName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
};

// 카테고리에서 업종 추출
const getIndustryFromCategories = (categories: string[]): string => {
  if (!categories || categories.length === 0) return '기타';
  
  const categoryMap: Record<string, string> = {
    '생산': '생산/제조',
    '제조': '생산/제조',
    '건설': '건설',
    '서비스': '서비스',
    'IT': 'IT/소프트웨어',
    '소프트웨어': 'IT/소프트웨어',
    '영업': '영업/마케팅',
    '마케팅': '영업/마케팅',
    '사무': '사무/관리',
    '관리': '사무/관리',
    '물류': '물류/운송',
    '운송': '물류/운송',
    '의료': '의료/복지',
    '복지': '의료/복지',
    '교육': '교육/연구',
    '연구': '교육/연구',
  };
  
  for (const category of categories) {
    for (const [key, value] of Object.entries(categoryMap)) {
      if (category.includes(key)) {
        return value;
      }
    }
  }
  
  return '기타';
};

// 급여 파싱 함수
const parseSalary = (salary: string): number => {
  if (!salary || salary.trim() === '') return 0;
  
  // 숫자만 추출
  const numbers = salary.match(/\d+/g);
  if (!numbers) return 0;
  
  // 가장 큰 숫자 사용
  const maxNumber = Math.max(...numbers.map(Number));
  
  // 만원 단위로 변환
  if (salary.includes('만원')) {
    return maxNumber * 10000;
  } else if (salary.includes('원')) {
    return maxNumber;
  }
  
  return maxNumber * 10000; // 기본적으로 만원 단위로 가정
};

// 비자 지원 여부 확인
const checkVisaSupport = (jobTitle: string, categories: string[]): boolean => {
  const visaKeywords = ['외국인', '비자', 'E-9', 'E-7', 'F-4'];
  const text = (jobTitle + ' ' + categories.join(' ')).toLowerCase();
  
  return visaKeywords.some(keyword => text.includes(keyword.toLowerCase()));
};

// 업종별 아이콘 생성
const getIndustryIcon = (categories: string[]): string => {
  if (!categories || categories.length === 0) return '💼';
  
  const iconMap: Record<string, string> = {
    '생산': '🏭',
    '제조': '🏭',
    '건설': '🏗️',
    'IT': '💻',
    '소프트웨어': '💻',
    '영업': '📞',
    '마케팅': '📢',
    '사무': '📋',
    '관리': '📊',
    '물류': '🚚',
    '운송': '🚚',
    '의료': '🏥',
    '복지': '🏥',
    '교육': '🎓',
    '연구': '🔬',
    '서비스': '🛎️',
  };
  
  for (const category of categories) {
    for (const [key, icon] of Object.entries(iconMap)) {
      if (category.includes(key)) {
        return icon;
      }
    }
  }
  
  return '💼';
};

// 백엔드 Job 응답을 프론트엔드 Job 인터페이스로 변환
export const transformBackendJobToFrontend = (backendJob: BackendJobResponse): Job => {
  return {
    id: generateId(backendJob.postLink),
    company: backendJob.companyName || '회사명 없음',
    logo: getCompanyLogo(backendJob.companyName),
    logoClass: getCompanyLogoClass(backendJob.companyName),
    title: backendJob.jobTitle || '제목 없음',
    location: backendJob.jobRegion || '지역 미정',
    experience: backendJob.jobExperience || '경력 무관',
    industry: getIndustryFromCategories(backendJob.categories),
    salary: parseSalary(backendJob.salary),
    deadline: getValidDeadline(backendJob.jobDeadline),
    hasVisa: checkVisaSupport(backendJob.jobTitle, backendJob.categories),
    isLiked: false,
    likeCount: 0,
    createdAt: backendJob.jobUploadDate || new Date().toISOString().split('T')[0],
    imageContent: getIndustryIcon(backendJob.categories),
    
    // 상세 정보 (기본값 설정)
    description: `${backendJob.companyName}에서 ${backendJob.jobTitle}을 모집합니다.`,
    requirements: [
      backendJob.jobEducation || '학력 무관',
      backendJob.jobExperience || '경력 무관',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '경쟁력 있는 급여',
      '4대보험',
      '연차휴가'
    ],
    contactInfo: {
      email: 'recruit@company.com',
      phone: '02-0000-0000'
    },
    contractType: backendJob.employmentTypes?.[0] === '정규직' ? '정규직' : 
                  backendJob.employmentTypes?.[0] === '계약직' ? '계약직' : '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금'],
    workHours: '09:00 ~ 18:00',
    salaryType: '연봉',
    address: backendJob.jobRegion || '주소 미정',
    isScrapped: false,
    companyInfo: {
      size: '중소기업',
      industry: getIndustryFromCategories(backendJob.categories),
      founded: '설립년도 미정',
      website: backendJob.companyWebsite || 'https://company.com'
    }
  };
};

// 백엔드 Company 응답을 프론트엔드 Company 인터페이스로 변환
export const transformBackendCompanyToFrontend = (backendCompany: BackendCompanyResponse) => {
  return {
    id: generateId(backendCompany.companyName),
    name: backendCompany.companyName || '회사명 없음',
    logo: getCompanyLogo(backendCompany.companyName),
    logoClass: getCompanyLogoClass(backendCompany.companyName),
    industry: backendCompany.industry || '업종 미정',
    size: backendCompany.companyType || '회사 규모 미정',
    website: backendCompany.website || '웹사이트 없음',
    address: backendCompany.address || '주소 미정',
    description: backendCompany.introduce || '회사 소개 없음'
  };
};
