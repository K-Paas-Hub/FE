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
  E3: {
    id: 'e3',
    name: 'E-3 비자',
    fullName: '연구비자',
    description: '연구기관에서 연구활동을 하는 외국인',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '연구기관 초빙장',
      '학력증명서',
      '경력증명서',
      '연구계획서',
      '범죄경력조회서'
    ]
  },
  E4: {
    id: 'e4',
    name: 'E-4 비자',
    fullName: '기술지도비자',
    description: '기술지도, 기술이전 등을 목적으로 하는 외국인',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '기술지도 계약서',
      '기술자격증',
      '경력증명서',
      '범죄경력조회서'
    ]
  },
  E5: {
    id: 'e5',
    name: 'E-5 비자',
    fullName: '전문취업비자',
    description: '전문직, 기술직 등 고급 인력',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '고용계약서',
      '고용주 사업자등록증',
      '학력증명서',
      '경력증명서',
      '전문자격증',
      '범죄경력조회서',
      '건강검진서'
    ]
  },
  E10: {
    id: 'e10',
    name: 'E-10 비자',
    fullName: '선원취업비자',
    description: '한국 선박에서 근무하는 외국인 선원',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '선원계약서',
      '선박소유자 등록증',
      '선원면허증',
      '범죄경력조회서',
      '건강검진서'
    ]
  },
  D10: {
    id: 'd10',
    name: 'D-10 비자',
    fullName: '구직비자',
    description: '한국에서 취업을 준비하는 외국인',
    duration: '1년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '학력증명서',
      '재정증명서',
      '범죄경력조회서'
    ]
  },
  F2: {
    id: 'f2',
    name: 'F-2 비자',
    fullName: '거주비자',
    description: '한국에서 장기 거주하는 외국인',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '거주지 증명서',
      '소득증명서',
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
  },
  F6: {
    id: 'f6',
    name: 'F-6 비자',
    fullName: '결혼이민비자',
    description: '한국인과 결혼한 외국인',
    duration: '3년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '결혼증명서',
      '배우자 신분증',
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
  H1: {
    id: 'h1',
    name: 'H-1 비자',
    fullName: '관광취업비자',
    description: '관광과 취업을 목적으로 하는 외국인',
    duration: '1년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '관광계획서',
      '재정증명서',
      '범죄경력조회서'
    ]
  },
  G1: {
    id: 'g1',
    name: 'G-1 비자',
    fullName: '기타비자',
    description: '기타 목적으로 한국에 체류하는 외국인',
    duration: '1년',
    extension: true,
    documents: [
      '여권 사본',
      '여권용 사진',
      '신청서',
      '체류목적 증명서',
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
  E3: [
    { id: 1, name: '연구기관 초빙', description: '한국 연구기관에서 초빙장 발급' },
    { id: 2, name: '연구계획 수립', description: '연구활동 계획 수립' },
    { id: 3, name: '비자 신청', description: '초빙장과 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  E4: [
    { id: 1, name: '기술지도 계약', description: '기술지도 계약 체결' },
    { id: 2, name: '기술자격 확인', description: '기술자격증 및 경력 확인' },
    { id: 3, name: '비자 신청', description: '계약서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  E5: [
    { id: 1, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 2, name: '전문자격 확인', description: '전문자격증 및 학력 확인' },
    { id: 3, name: '비자 신청', description: '고용계약서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  E10: [
    { id: 1, name: '선원계약 체결', description: '한국 선박소유자와 선원계약 체결' },
    { id: 2, name: '선원면허 확인', description: '선원면허증 확인' },
    { id: 3, name: '비자 신청', description: '선원계약서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  D10: [
    { id: 1, name: '학력 확인', description: '대학 졸업 이상 학력 확인' },
    { id: 2, name: '재정 증명', description: '한국 체류 중 생활비 증명' },
    { id: 3, name: '비자 신청', description: '필요 서류와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  F2: [
    { id: 1, name: '거주지 확보', description: '한국에서 거주지 확보' },
    { id: 2, name: '소득 증명', description: '안정적인 소득 증명' },
    { id: 3, name: '비자 신청', description: '거주지 및 소득 증명서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  F4: [
    { id: 1, name: '혈통 확인', description: '재외동포 혈통 확인 및 증명서 발급' },
    { id: 2, name: '고용계약 체결', description: '한국 고용주와 고용계약 체결' },
    { id: 3, name: '비자 신청', description: '혈통증명서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  F6: [
    { id: 1, name: '결혼 등록', description: '한국에서 결혼 등록' },
    { id: 2, name: '배우자 확인', description: '한국인 배우자 신분 확인' },
    { id: 3, name: '비자 신청', description: '결혼증명서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  C4: [
    { id: 1, name: '단기 프로젝트 계획', description: '90일 이하 단기 프로젝트 계획 수립' },
    { id: 2, name: '고용계약 체결', description: '한국 고용주와 단기 고용계약 체결' },
    { id: 3, name: '비자 신청', description: '고용계약서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  H1: [
    { id: 1, name: '관광계획 수립', description: '한국 관광 및 취업 계획 수립' },
    { id: 2, name: '재정 증명', description: '관광 및 체류 비용 증명' },
    { id: 3, name: '비자 신청', description: '관광계획서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ],
  G1: [
    { id: 1, name: '체류목적 확인', description: '한국 체류 목적 확인' },
    { id: 2, name: '목적 증명', description: '체류목적에 따른 증명서 발급' },
    { id: 3, name: '비자 신청', description: '목적 증명서와 함께 비자 신청' },
    { id: 4, name: '입국', description: '비자 발급 후 한국 입국' }
  ]
} as const;

// 비자 카테고리 분류
export const VISA_CATEGORIES = {
  EMPLOYMENT: ['E9', 'H2', 'E7', 'E8', 'E3', 'E4', 'E5', 'E10', 'C4'],
  RESIDENCE: ['F2', 'F4', 'F6'],
  PREPARATION: ['D10', 'H1', 'G1']
} as const;

export const VISA_CATEGORY_LABELS = {
  EMPLOYMENT: 'visaCenter.categories.employment',
  RESIDENCE: 'visaCenter.categories.residence',
  PREPARATION: 'visaCenter.categories.preparation'
} as const;

export type VisaCategory = keyof typeof VISA_CATEGORIES;
