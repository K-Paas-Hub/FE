export const VISA_TYPES = {
  E9: {
    id: 'e9',
    name: 'E-9 비자',
    fullName: '비전문취업비자',
    description: '제조업, 농업, 어업 등 단순노무 종사자',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '고용계약서',
      '고용주 사업자등록증',
      '고용주 고용허가서',
      '범죄경력조회서',
      '건강검진서'
    ]
  },
  H2: {
    id: 'h2',
    name: 'H-2 비자',
    fullName: '방문취업비자',
    description: '조선족을 위한 방문취업 비자',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '고용계약서',
      '고용주 사업자등록증',
      '범죄경력조회서',
      '건강검진서'
    ]
  },
  D2: {
    id: 'd2',
    name: 'D-2 비자',
    fullName: '유학비자',
    description: '대학, 대학원 등에서 학업하는 학생',
    duration: '학업기간',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '입학허가서',
      '재정증명서',
      '학력증명서',
      '범죄경력조회서'
    ]
  },
  E7: {
    id: 'e7',
    name: 'E-7 비자',
    fullName: '특정활동비자',
    description: '기술자, 전문가 등 특정 분야 종사자',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '고용계약서',
      '고용주 사업자등록증',
      '경력증명서',
      '학력증명서',
      '범죄경력조회서',
      '건강검진서'
    ]
  },
  E8: {
    id: 'e8',
    name: 'E-8 비자',
    fullName: '연수취업비자',
    description: '기술연수를 받은 후 한국에서 취업하는 외국인',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '기술연수 수료증',
      '고용계약서',
      '고용주 사업자등록증',
      '경력증명서',
      '범죄경력조회서',
      '건강검진서'
    ]
  },
  E6: {
    id: 'e6',
    name: 'E-6 비자',
    fullName: '예술흥행비자',
    description: '연예인, 운동선수, 모델, 예술가 등',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '예술활동 증명서',
      '고용계약서',
      '포트폴리오',
      '범죄경력조회서'
    ]
  },
  C4: {
    id: 'c4',
    name: 'C-4 비자',
    fullName: '단기상용비자',
    description: '90일 이하 단기 취업',
    duration: '90일 이하',
    extension: false,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '고용계약서',
      '사업계획서',
      '범죄경력조회서'
    ]
  },
  F4: {
    id: 'f4',
    name: 'F-4 비자',
    fullName: '재외동포비자',
    description: '조선족, 재외동포를 위한 특별 비자',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '혈통증명서',
      '고용계약서',
      '범죄경력조회서'
    ]
  }
} as const;

export const VISA_STEPS = {
  E9: [
    { id: 1, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 2, name: '고용허가 신청', description: '고용주가 고용허가 신청' },
    { id: 3, name: '비자 신청', description: '고용허가서 발급 후 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  H2: [
    { id: 1, name: '사전교육', description: '한국어 및 한국문화 교육' },
    { id: 2, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 3, name: '비자 신청', description: '필요 서류와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  D2: [
    { id: 1, name: '학교 지원', description: '한국 대학에 입학 지원' },
    { id: 2, name: '입학허가', description: '학교로부터 입학허가서 발급' },
    { id: 3, name: '비자 신청', description: '입학허가서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  E7: [
    { id: 1, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 2, name: '고용허가 신청', description: '고용주가 고용허가 신청' },
    { id: 3, name: '비자 신청', description: '고용허가서 발급 후 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  E8: [
    { id: 1, name: '기술연수 참여', description: '한국에서 기술연수 프로그램 참여' },
    { id: 2, name: '연수 수료', description: '기술연수 프로그램 수료 및 수료증 발급' },
    { id: 3, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 4, name: '비자 신청', description: '연수 수료증과 고용계약서로 비자 신청' },
    { id: 5, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  E6: [
    { id: 1, name: '예술활동 계획', description: '한국에서의 예술활동 계획 수립' },
    { id: 2, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 3, name: '활동 증명서 발급', description: '관련 기관에서 예술활동 증명서 발급' },
    { id: 4, name: '비자 신청', description: '활동 증명서와 함께 비자 신청' },
    { id: 5, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  C4: [
    { id: 1, name: '단기 프로젝트 계획', description: '90일 이하 단기 프로젝트 계획 수립' },
    { id: 2, name: '고용계약 체결', description: '한국 고용주와 단기 고용계약 체결' },
    { id: 3, name: '비자 신청', description: '고용계약서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  F4: [
    { id: 1, name: '혈통 확인', description: '재외동포 혈통 확인 및 증명서 발급' },
    { id: 2, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 3, name: '비자 신청', description: '혈통증명서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ]
} as const;

// 비자 카테고리 분류
export const VISA_CATEGORIES = {
  EMPLOYMENT: ['E9', 'H2', 'E7', 'E8', 'C4', 'F4'],
  PROFESSIONAL: ['E6'],
  STUDY: ['D2']
} as const;

export const VISA_CATEGORY_LABELS = {
  ALL: '전체',
  EMPLOYMENT: '취업 비자',
  PROFESSIONAL: '전문직 비자',
  STUDY: '학업 비자'
} as const;

export type VisaCategory = keyof typeof VISA_CATEGORIES;
