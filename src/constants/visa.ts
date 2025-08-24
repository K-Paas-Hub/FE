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
  ]
} as const;
