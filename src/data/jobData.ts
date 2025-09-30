import { Job } from '../types/job';

// 외국인 노동자용 채용공고 데이터 (MainPage + JobDetailPage 통합)
export const jobData: Job[] = [
  {
    id: 1,
    company: '삼성전자 반도체',
    logo: 'S',
    logoClass: 'blue',
    title: '반도체 조립공',
    location: '경기 용인시',
    experience: '신입-경력 3년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🔧',
    salary: 28000000,
    deadline: '2024-12-31',
    likeCount: 45,
    createdAt: '2024-12-01',
    description: '삼성전자 반도체 공장에서 반도체 조립 및 검사 작업을 담당할 조립공을 모집합니다. 정확성과 꼼꼼함이 중요한 업무입니다.',
    requirements: [
      '고등학교 졸업 이상',
      '반도체 조립 경험 우대',
      '정확성과 꼼꼼함',
      '3교대 근무 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '경쟁력 있는 연봉',
      'E-9 비자 지원',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램'
    ],
    contactInfo: {
      email: 'recruit@samsung.com',
      phone: '02-1234-5678'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 20:00 (3교대)',
    salaryType: '연봉',
    address: '경기도 용인시 기흥구 동백로 150',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '반도체',
      founded: '1969년',
      website: 'https://www.samsung.com'
    }
  },
  {
    id: 2,
    company: '현대자동차',
    logo: 'H',
    logoClass: 'blue',
    title: '자동차 조립공',
    location: '울산 남구',
    experience: '신입-경력 5년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🚗',
    salary: 32000000,
    deadline: '2024-12-25',
    likeCount: 78,
    createdAt: '2024-12-05',
    description: '현대자동차 울산공장에서 자동차 조립 및 검사 작업을 담당할 조립공을 모집합니다. 팀워크와 안전의식이 중요한 업무입니다.',
    requirements: [
      '고등학교 졸업 이상',
      '자동차 조립 경험 우대',
      '팀워크 능력',
      '2교대 근무 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '안정적인 근무 환경',
      'E-9 비자 지원',
      '성과급 및 인센티브',
      '건강검진 지원',
      '사내 복지시설 이용'
    ],
    contactInfo: {
      email: 'hr@hyundai.com',
      phone: '052-2345-6789'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금'],
    workHours: '08:00 ~ 17:00',
    salaryType: '연봉',
    address: '울산광역시 남구 삼산로 300',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '자동차/부품',
      founded: '1967년',
      website: 'https://www.hyundai.com'
    }
  },
  {
    id: 3,
    company: 'LG디스플레이',
    logo: 'L',
    logoClass: 'red',
    title: 'LCD 조립공',
    location: '경기 파주시',
    experience: '신입-경력 3년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '📺',
    salary: 26000000,
    deadline: '2024-12-20',
    likeCount: 32,
    createdAt: '2024-12-10',
    description: 'LG디스플레이 파주공장에서 LCD 패널 조립 및 검사 작업을 담당할 조립공을 모집합니다. 정밀한 작업이 요구되는 업무입니다.',
    requirements: [
      '고등학교 졸업 이상',
      '전자제품 조립 경험 우대',
      '정밀한 작업 능력',
      '3교대 근무 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '경쟁력 있는 연봉',
      'E-9 비자 지원',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램'
    ],
    contactInfo: {
      email: 'recruit@lgdisplay.com',
      phone: '031-3456-7890'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 20:00 (3교대)',
    salaryType: '연봉',
    address: '경기도 파주시 문발로 100',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '전자/반도체',
      founded: '1999년',
      website: 'https://www.lgdisplay.com'
    }
  }
];