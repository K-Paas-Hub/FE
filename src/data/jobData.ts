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
    // JobDetailPage용 추가 필드
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
  },
  {
    id: 4,
    company: '포스코',
    logo: 'P',
    logoClass: 'orange',
    title: '철강 생산직',
    location: '경북 포항시',
    experience: '신입-경력 5년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏭',
    salary: 35000000,
    deadline: '2024-12-15',
    likeCount: 95,
    createdAt: '2024-11-25',
    description: '포스코 포항제철소에서 철강 생산 및 제조 작업을 담당할 생산직을 모집합니다. 중장비 조작 경험이 있는 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '중장비 조작 경험 우대',
      '체력이 좋은 분',
      '3교대 근무 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '최고 수준의 연봉',
      'E-9 비자 지원',
      '연구개발 특별 인센티브',
      '해외 연수 기회',
      '최신 장비 및 도구 제공'
    ],
    contactInfo: {
      email: 'careers@posco.com',
      phone: '054-4567-8901'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 20:00 (3교대)',
    salaryType: '연봉',
    address: '경상북도 포항시 남구 포스코대로 6261',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '철강/금속',
      founded: '1968년',
      website: 'https://www.posco.com'
    }
  },
  {
    id: 5,
    company: '대우건설',
    logo: 'D',
    logoClass: 'blue',
    title: '건설 현장 노무자',
    location: '서울 강남구',
    experience: '신입-경력 3년',
    industry: '건설',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏗️',
    salary: 30000000,
    deadline: '2024-12-28',
    likeCount: 28,
    createdAt: '2024-12-08',
    description: '대우건설에서 건설 현장의 다양한 노무 작업을 담당할 노무자를 모집합니다. 건설 경험이 있는 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '건설 현장 경험 우대',
      '체력이 좋은 분',
      '야간 작업 가능',
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
      email: 'hr@daewoo.com',
      phone: '02-5678-9012'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '07:00 ~ 18:00',
    salaryType: '연봉',
    address: '서울 강남구 테헤란로 316',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '건설',
      founded: '1973년',
      website: 'https://www.daewoo.com'
    }
  },
  {
    id: 6,
    company: 'GS건설',
    logo: 'G',
    logoClass: 'green',
    title: '건설 현장 보조원',
    location: '경기 성남시',
    experience: '신입-경력 2년',
    industry: '건설',
    isLiked: false,
    hasVisa: true,
    imageContent: '🔨',
    salary: 28000000,
    deadline: '2024-12-10',
    likeCount: 120,
    createdAt: '2024-11-20',
    description: 'GS건설에서 건설 현장의 보조 작업을 담당할 보조원을 모집합니다. 성실하고 꼼꼼한 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '건설 현장 경험 우대',
      '성실하고 꼼꼼함',
      '야간 작업 가능',
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
      email: 'recruit@gsconst.co.kr',
      phone: '031-6789-0123'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '07:00 ~ 18:00',
    salaryType: '연봉',
    address: '경기도 성남시 분당구 성남대로 34',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '건설',
      founded: '1969년',
      website: 'https://www.gsconst.co.kr'
    }
  },
  {
    id: 7,
    company: '농협중앙회',
    logo: 'N',
    logoClass: 'green',
    title: '농작물 수확원',
    location: '충남 논산시',
    experience: '신입-경력 2년',
    industry: '농업/어업',
    isLiked: false,
    hasVisa: true,
    imageContent: '🌾',
    salary: 22000000,
    deadline: '2024-12-22',
    likeCount: 56,
    createdAt: '2024-12-03',
    description: '농협중앙회에서 농작물 수확 및 관리 작업을 담당할 수확원을 모집합니다. 농업 경험이 있는 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '농업 경험 우대',
      '체력이 좋은 분',
      '야간 작업 가능',
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
      email: 'hr@nh.or.kr',
      phone: '041-7890-1234'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '06:00 ~ 17:00',
    salaryType: '연봉',
    address: '충청남도 논산시 연산면 연산로 175',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '농업/어업',
      founded: '1961년',
      website: 'https://www.nh.or.kr'
    }
  },
  {
    id: 8,
    company: '롯데마트',
    logo: 'L',
    logoClass: 'red',
    title: '상품 진열원',
    location: '서울 강남구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🛒',
    salary: 24000000,
    deadline: '2024-12-18',
    likeCount: 89,
    createdAt: '2024-11-28',
    description: '롯데마트에서 상품 진열 및 관리 작업을 담당할 진열원을 모집합니다. 고객 서비스 마인드가 있는 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '유통업 경험 우대',
      '고객 서비스 마인드',
      '야간 작업 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '경쟁력 있는 연봉',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램',
      '직원 할인 혜택'
    ],
    contactInfo: {
      email: 'recruit@lottemart.com',
      phone: '02-8901-2345'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '09:00 ~ 18:00',
    salaryType: '연봉',
    address: '서울 강남구 테헤란로 123',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '유통/서비스',
      founded: '1998년',
      website: 'https://www.lottemart.com'
    }
  },
  {
    id: 9,
    company: '부산항만공사',
    logo: 'P',
    logoClass: 'blue',
    title: '화물 하역원',
    location: '부산 중구',
    experience: '신입-경력 2년',
    industry: '무역/물류',
    isLiked: false,
    hasVisa: true,
    imageContent: '🚢',
    salary: 26000000,
    deadline: '2024-12-12',
    likeCount: 15,
    createdAt: '2024-12-12',
    description: '부산항만공사에서 화물 하역 및 관리 작업을 담당할 하역원을 모집합니다. 중장비 조작 경험이 있는 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '중장비 조작 경험 우대',
      '체력이 좋은 분',
      '야간 작업 가능',
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
      email: 'hr@busanpa.com',
      phone: '051-9012-3456'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 17:00',
    salaryType: '연봉',
    address: '부산광역시 중구 충장대로 21',
    isScrapped: false,
    companyInfo: {
      size: '공기업',
      industry: '무역/물류',
      founded: '2004년',
      website: 'https://www.busanpa.com'
    }
  },
  {
    id: 10,
    company: '이마트',
    logo: 'E',
    logoClass: 'green',
    title: '상품 정리원',
    location: '대구 중구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🛍️',
    salary: 22000000,
    deadline: '2024-12-30',
    likeCount: 22,
    createdAt: '2024-12-15',
    description: '이마트에서 상품 정리 및 관리 작업을 담당할 정리원을 모집합니다. 꼼꼼하고 성실한 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '유통업 경험 우대',
      '꼼꼼하고 성실함',
      '야간 작업 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '경쟁력 있는 연봉',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램',
      '직원 할인 혜택'
    ],
    contactInfo: {
      email: 'recruit@emart.com',
      phone: '053-0123-4567'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '09:00 ~ 18:00',
    salaryType: '연봉',
    address: '대구광역시 중구 동성로 123',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '유통/서비스',
      founded: '1993년',
      website: 'https://www.emart.com'
    }
  },
  {
    id: 11,
    company: '인천국제공항공사',
    logo: 'I',
    logoClass: 'blue',
    title: '공항 청소원',
    location: '인천 중구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🧹',
    salary: 20000000,
    deadline: '2024-12-08',
    likeCount: 18,
    createdAt: '2024-12-18',
    description: '인천국제공항에서 청소 및 관리 작업을 담당할 청소원을 모집합니다. 꼼꼼하고 성실한 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '청소업 경험 우대',
      '꼼꼼하고 성실함',
      '야간 작업 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '안정적인 근무 환경',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램',
      '공항 이용 혜택'
    ],
    contactInfo: {
      email: 'hr@airport.kr',
      phone: '032-1234-5678'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 17:00',
    salaryType: '연봉',
    address: '인천광역시 중구 공항로 272',
    isScrapped: false,
    companyInfo: {
      size: '공기업',
      industry: '서비스',
      founded: '1999년',
      website: 'https://www.airport.kr'
    }
  },
  {
    id: 12,
    company: '대전과학기술원',
    logo: 'K',
    logoClass: 'purple',
    title: '연구소 청소원',
    location: '대전 유성구',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '🧹',
    salary: 18000000,
    deadline: '2024-12-05',
    likeCount: 67,
    createdAt: '2024-11-15',
    description: '대전과학기술원에서 청소 및 관리 작업을 담당할 청소원을 모집합니다. 꼼꼼하고 성실한 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '청소업 경험 우대',
      '꼼꼼하고 성실함',
      '야간 작업 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '안정적인 근무 환경',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램',
      '연구소 이용 혜택'
    ],
    contactInfo: {
      email: 'hr@kaist.ac.kr',
      phone: '042-2345-6789'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 17:00',
    salaryType: '연봉',
    address: '대전광역시 유성구 대학로 291',
    isScrapped: false,
    companyInfo: {
      size: '공기업',
      industry: '연구/교육',
      founded: '1971년',
      website: 'https://www.kaist.ac.kr'
    }
  },
  {
    id: 13,
    company: '광주과학기술원',
    logo: 'G',
    logoClass: 'green',
    title: '연구소 보안원',
    location: '광주 북구',
    experience: '신입-경력 2년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '👮',
    salary: 24000000,
    deadline: '2024-12-03',
    likeCount: 35,
    createdAt: '2024-12-20',
    description: '광주과학기술원에서 보안 및 관리 작업을 담당할 보안원을 모집합니다. 책임감이 강한 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '보안업 경험 우대',
      '책임감이 강함',
      '야간 작업 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '안정적인 근무 환경',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램',
      '연구소 이용 혜택'
    ],
    contactInfo: {
      email: 'hr@gist.ac.kr',
      phone: '062-3456-7890'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 17:00',
    salaryType: '연봉',
    address: '광주광역시 북구 첨단과기로 123',
    isScrapped: false,
    companyInfo: {
      size: '공기업',
      industry: '연구/교육',
      founded: '1993년',
      website: 'https://www.gist.ac.kr'
    }
  },
  {
    id: 14,
    company: '포스코',
    logo: 'P',
    logoClass: 'orange',
    title: '철강 생산직',
    location: '경북 포항시',
    experience: '신입-경력 5년',
    industry: '생산/제조',
    isLiked: false,
    hasVisa: true,
    imageContent: '🏭',
    salary: 35000000,
    deadline: '2024-12-01',
    likeCount: 42,
    createdAt: '2024-11-10',
    description: '포스코 포항제철소에서 철강 생산 및 제조 작업을 담당할 생산직을 모집합니다. 중장비 조작 경험이 있는 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '중장비 조작 경험 우대',
      '체력이 좋은 분',
      '3교대 근무 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '최고 수준의 연봉',
      'E-9 비자 지원',
      '연구개발 특별 인센티브',
      '해외 연수 기회',
      '최신 장비 및 도구 제공'
    ],
    contactInfo: {
      email: 'careers@posco.com',
      phone: '054-4567-8901'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 20:00 (3교대)',
    salaryType: '연봉',
    address: '경상북도 포항시 남구 포스코대로 6261',
    isScrapped: false,
    companyInfo: {
      size: '대기업',
      industry: '철강/금속',
      founded: '1968년',
      website: 'https://www.posco.com'
    }
  },
  {
    id: 15,
    company: '제주항공',
    logo: 'J',
    logoClass: 'blue',
    title: '항공기 청소원',
    location: '제주 제주시',
    experience: '신입-경력 1년',
    industry: '서비스',
    isLiked: false,
    hasVisa: false,
    imageContent: '✈️',
    salary: 20000000,
    deadline: '2024-12-27',
    likeCount: 12,
    createdAt: '2024-12-22',
    description: '제주항공에서 항공기 청소 및 관리 작업을 담당할 청소원을 모집합니다. 꼼꼼하고 성실한 분을 우대합니다.',
    requirements: [
      '고등학교 졸업 이상',
      '청소업 경험 우대',
      '꼼꼼하고 성실함',
      '야간 작업 가능',
      '한국어 기본 회화 가능'
    ],
    benefits: [
      '안정적인 근무 환경',
      '건강보험 및 4대보험',
      '연차휴가 및 반차제도',
      '사내 교육 프로그램',
      '항공 이용 혜택'
    ],
    contactInfo: {
      email: 'hr@jejuair.net',
      phone: '064-4567-8901'
    },
    contractType: '정규직',
    workType: '전사근무',
    workDays: ['월', '화', '수', '목', '금', '토'],
    workHours: '08:00 ~ 17:00',
    salaryType: '연봉',
    address: '제주특별자치도 제주시 공항로 2',
    isScrapped: false,
    companyInfo: {
      size: '중견기업',
      industry: '항공/운송',
      founded: '2005년',
      website: 'https://www.jejuair.net'
    }
  }
];
