import React, { useState } from 'react';
import { MainHeader, MainFooter } from '../';
import { useResumeForm } from '../../hooks/useResumeForm';
import PostcodeSearch from '../PostcodeSearch';
import {
  ResumeContainer,
  ResumeContent,
  ResumeSection,
  SectionTitle,
  SectionIcon,
  ResumeForm,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonGroup,
  PrimaryButton,
  SecondaryButton,
} from '../../styles/components/ResumePage.styles';
import styled from 'styled-components';

// 드롭다운 스타일
const FormSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #374151;
  min-height: 44px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 16px; /* iOS에서 줌 방지 */
  }
`;

// 국적 옵션
const nationalityOptions = [
  { value: '', label: '국적을 선택하세요' },
  { value: '베트남', label: '베트남' },
  { value: '캄보디아', label: '캄보디아' },
  { value: '네팔', label: '네팔' },
  { value: '인도네시아', label: '인도네시아' },
  { value: '중국', label: '중국' },
  { value: '태국', label: '태국' },
  { value: '필리핀', label: '필리핀' },
  { value: '미얀마', label: '미얀마' },
  { value: '몽골', label: '몽골' },
  { value: '우즈베키스탄', label: '우즈베키스탄' },
  { value: '카자흐스탄', label: '카자흐스탄' },
  { value: '키르기스스탄', label: '키르기스스탄' },
  { value: '타지키스탄', label: '타지키스탄' },
  { value: '터키', label: '터키' },
  { value: '이란', label: '이란' },
  { value: '파키스탄', label: '파키스탄' },
  { value: '방글라데시', label: '방글라데시' },
  { value: '스리랑카', label: '스리랑카' },
  { value: '인도', label: '인도' },
  { value: '기타', label: '기타' }
];

// 비자 유형 옵션
const visaTypeOptions = [
  { value: '', label: '비자 유형을 선택하세요' },
  { value: 'E-1', label: 'E-1 (조약에 의한 무역업무)' },
  { value: 'E-2', label: 'E-2 (투자)' },
  { value: 'E-3', label: 'E-3 (연구)' },
  { value: 'E-4', label: 'E-4 (기술지도)' },
  { value: 'E-5', label: 'E-5 (전문직업)' },
  { value: 'E-6', label: 'E-6 (예술흥행)' },
  { value: 'E-7', label: 'E-7 (특정활동)' },
  { value: 'E-8', label: 'E-8 (연수취업)' },
  { value: 'E-9', label: 'E-9 (비전문취업)' },
  { value: 'E-10', label: 'E-10 (선원취업)' },
  { value: 'F-1', label: 'F-1 (방문동거)' },
  { value: 'F-2', label: 'F-2 (거주)' },
  { value: 'F-3', label: 'F-3 (동반가족)' },
  { value: 'F-4', label: 'F-4 (재외동포)' },
  { value: 'F-5', label: 'F-5 (영주)' },
  { value: 'F-6', label: 'F-6 (결혼이민)' },
  { value: 'D-1', label: 'D-1 (문화예술)' },
  { value: 'D-2', label: 'D-2 (유학)' },
  { value: 'D-3', label: 'D-3 (산업연수)' },
  { value: 'D-4', label: 'D-4 (일반연수)' },
  { value: 'D-5', label: 'D-5 (취재)' },
  { value: 'D-6', label: 'D-6 (종교)' },
  { value: 'D-7', label: 'D-7 (주재)' },
  { value: 'D-8', label: 'D-8 (기업투자)' },
  { value: 'D-9', label: 'D-9 (무역경영)' },
  { value: 'D-10', label: 'D-10 (구직)' },
  { value: 'H-1', label: 'H-1 (관광취업)' },
  { value: 'H-2', label: 'H-2 (방문취업)' },
  { value: 'C-1', label: 'C-1 (단기방문)' },
  { value: 'C-2', label: 'C-2 (단기상용)' },
  { value: 'C-3', label: 'C-3 (단기종합)' },
  { value: 'C-4', label: 'C-4 (단기취업)' },
  { value: '기타', label: '기타' }
];

// 자격증 데이터
const certificationData = [
  // IT/개발 관련
  { id: '1', name: '정보처리기사', category: 'IT/개발', description: '정보처리 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '2', name: '컴퓨터활용능력', category: 'IT/개발', description: '컴퓨터 활용 능력 평가 자격증', grades: ['1급', '2급', '3급'] },
  { id: '3', name: 'SQLD', category: 'IT/개발', description: 'SQL 개발자 자격증', grades: ['합격', '불합격'] },
  { id: '4', name: 'SQLP', category: 'IT/개발', description: 'SQL 전문가 자격증', grades: ['합격', '불합격'] },
  { id: '5', name: 'ADsP', category: 'IT/개발', description: '데이터분석 준전문가', grades: ['합격', '불합격'] },
  { id: '6', name: 'ADP', category: 'IT/개발', description: '데이터분석 전문가', grades: ['합격', '불합격'] },
  { id: '7', name: 'ADsP', category: 'IT/개발', description: '데이터분석 준전문가', grades: ['합격', '불합격'] },
  { id: '8', name: '빅데이터분석기사', category: 'IT/개발', description: '빅데이터 분석 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '9', name: 'AWS Solutions Architect', category: 'IT/개발', description: 'AWS 솔루션스 아키텍트 자격증', grades: ['Associate', 'Professional'] },
  { id: '10', name: 'AWS Developer', category: 'IT/개발', description: 'AWS 개발자 자격증', grades: ['Associate', 'Professional'] },
  { id: '11', name: 'AWS SysOps Administrator', category: 'IT/개발', description: 'AWS 시스템 운영 관리자 자격증', grades: ['Associate', 'Professional'] },
  { id: '12', name: 'Microsoft Azure Administrator', category: 'IT/개발', description: 'Microsoft Azure 관리자 자격증', grades: ['AZ-104', 'AZ-303', 'AZ-304'] },
  { id: '13', name: 'Microsoft Azure Developer', category: 'IT/개발', description: 'Microsoft Azure 개발자 자격증', grades: ['AZ-204', 'AZ-400'] },
  { id: '14', name: 'Google Cloud Professional', category: 'IT/개발', description: 'Google Cloud 전문가 자격증', grades: ['Associate', 'Professional'] },
  { id: '15', name: 'PMP', category: 'IT/개발', description: '프로젝트 관리 전문가 자격증', grades: ['합격', '불합격'] },
  { id: '16', name: 'PRINCE2', category: 'IT/개발', description: '프로젝트 관리 방법론 자격증', grades: ['Foundation', 'Practitioner'] },
  { id: '17', name: 'ITIL', category: 'IT/개발', description: 'IT 서비스 관리 자격증', grades: ['Foundation', 'Intermediate', 'Expert'] },
  { id: '18', name: 'CISSP', category: 'IT/개발', description: '정보보안 전문가 자격증', grades: ['합격', '불합격'] },
  { id: '19', name: 'CEH', category: 'IT/개발', description: '윤리적 해커 자격증', grades: ['합격', '불합격'] },
  { id: '20', name: 'CompTIA Security+', category: 'IT/개발', description: '정보보안 기초 자격증', grades: ['합격', '불합격'] },
  
  // 언어 관련
  { id: '21', name: 'TOEIC', category: '언어', description: '영어 능력 평가 시험', grades: ['300-400', '400-500', '500-600', '600-700', '700-800', '800-900', '900-990'] },
  { id: '22', name: 'TOEFL', category: '언어', description: '영어 능력 평가 시험', grades: ['iBT 60-80', 'iBT 80-100', 'iBT 100-120'] },
  { id: '23', name: 'IELTS', category: '언어', description: '영어 능력 평가 시험', grades: ['4.0-5.0', '5.0-6.0', '6.0-7.0', '7.0-8.0', '8.0-9.0'] },
  { id: '24', name: 'TOPIK', category: '언어', description: '한국어 능력 평가 시험', grades: ['1급', '2급', '3급', '4급', '5급', '6급'] },
  { id: '25', name: 'JLPT', category: '언어', description: '일본어 능력 평가 시험', grades: ['N5', 'N4', 'N3', 'N2', 'N1'] },
  { id: '26', name: 'HSK', category: '언어', description: '중국어 능력 평가 시험', grades: ['1급', '2급', '3급', '4급', '5급', '6급'] },
  { id: '27', name: 'DELE', category: '언어', description: '스페인어 능력 평가 시험', grades: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { id: '28', name: 'DELF', category: '언어', description: '프랑스어 능력 평가 시험', grades: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { id: '29', name: 'TestDaF', category: '언어', description: '독일어 능력 평가 시험', grades: ['TDN 3', 'TDN 4', 'TDN 5'] },
  { id: '30', name: 'CELI', category: '언어', description: '이탈리아어 능력 평가 시험', grades: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  
  // 경영/사무 관련
  { id: '31', name: '사무자동화산업기사', category: '경영/사무', description: '사무 자동화 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '32', name: '컴퓨터활용능력', category: '경영/사무', description: '컴퓨터 활용 능력 평가 자격증', grades: ['1급', '2급', '3급'] },
  { id: '33', name: '워드프로세서', category: '경영/사무', description: '워드프로세서 자격증', grades: ['1급', '2급', '3급'] },
  { id: '34', name: '컴퓨터활용능력', category: '경영/사무', description: '컴퓨터 활용 능력 평가 자격증', grades: ['1급', '2급', '3급'] },
  { id: '35', name: '한글속기', category: '경영/사무', description: '한글 속기 자격증', grades: ['1급', '2급', '3급'] },
  { id: '36', name: '비서', category: '경영/사무', description: '비서 자격증', grades: ['1급', '2급', '3급'] },
  { id: '37', name: '사무관리', category: '경영/사무', description: '사무 관리 자격증', grades: ['1급', '2급', '3급'] },
  { id: '38', name: '경영지도사', category: '경영/사무', description: '경영 지도 자격증', grades: ['1급', '2급', '3급'] },
  { id: '39', name: '세무사', category: '경영/사무', description: '세무 관련 전문 자격증', grades: ['합격', '불합격'] },
  { id: '40', name: '관세사', category: '경영/사무', description: '관세 관련 전문 자격증', grades: ['합격', '불합격'] },
  
  // 건설/기술 관련
  { id: '41', name: '건축기사', category: '건설/기술', description: '건축 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '42', name: '토목기사', category: '건설/기술', description: '토목 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '43', name: '전기기사', category: '건설/기술', description: '전기 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '44', name: '기계기사', category: '건설/기술', description: '기계 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '45', name: '화공기사', category: '건설/기술', description: '화학공학 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '46', name: '산업안전기사', category: '건설/기술', description: '산업안전 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '47', name: '건설안전기사', category: '건설/기술', description: '건설안전 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '48', name: '소방설비기사', category: '건설/기술', description: '소방설비 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '49', name: '조경기사', category: '건설/기술', description: '조경 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '50', name: '측량및지형공간정보기사', category: '건설/기술', description: '측량 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  
  // 제조/생산 관련
  { id: '51', name: '용접기사', category: '제조/생산', description: '용접 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '52', name: '금형기사', category: '제조/생산', description: '금형 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '53', name: '사출금형기사', category: '제조/생산', description: '사출금형 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '54', name: '프레스금형기사', category: '제조/생산', description: '프레스금형 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '55', name: '절삭기사', category: '제조/생산', description: '절삭 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '56', name: '기계조립기사', category: '제조/생산', description: '기계조립 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '57', name: '정밀측정기사', category: '제조/생산', description: '정밀측정 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '58', name: '품질경영기사', category: '제조/생산', description: '품질경영 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '59', name: '생산관리기사', category: '제조/생산', description: '생산관리 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  { id: '60', name: '자동화기사', category: '제조/생산', description: '자동화 관련 국가기술자격증', grades: ['1급', '2급', '3급'] },
  
  // 서비스/영업 관련
  { id: '61', name: '여행상품개발', category: '서비스/영업', description: '여행상품개발 자격증', grades: ['1급', '2급', '3급'] },
  { id: '62', name: '관광통역안내사', category: '서비스/영업', description: '관광통역안내사 자격증', grades: ['1급', '2급', '3급'] },
  { id: '63', name: '호텔경영사', category: '서비스/영업', description: '호텔경영사 자격증', grades: ['1급', '2급', '3급'] },
  { id: '64', name: '외식경영사', category: '서비스/영업', description: '외식경영사 자격증', grades: ['1급', '2급', '3급'] },
  { id: '65', name: '미용사', category: '서비스/영업', description: '미용사 자격증', grades: ['1급', '2급', '3급'] },
  { id: '66', name: '이미용사', category: '서비스/영업', description: '이미용사 자격증', grades: ['1급', '2급', '3급'] },
  { id: '67', name: '네일아트', category: '서비스/영업', description: '네일아트 자격증', grades: ['1급', '2급', '3급'] },
  { id: '68', name: '피부관리사', category: '서비스/영업', description: '피부관리사 자격증', grades: ['1급', '2급', '3급'] },
  { id: '69', name: '스포츠마사지', category: '서비스/영업', description: '스포츠마사지 자격증', grades: ['1급', '2급', '3급'] },
  { id: '70', name: '요양보호사', category: '서비스/영업', description: '요양보호사 자격증', grades: ['1급', '2급', '3급'] },
  
  // 기타
  { id: '71', name: '운전면허', category: '기타', description: '운전면허증', grades: ['1종 대형', '1종 보통', '2종 보통', '2종 소형'] },
  { id: '72', name: '포크레인운전기능사', category: '기타', description: '포크레인운전기능사 자격증', grades: ['합격', '불합격'] },
  { id: '73', name: '지게차운전기능사', category: '기타', description: '지게차운전기능사 자격증', grades: ['합격', '불합격'] },
  { id: '74', name: '굴삭기운전기능사', category: '기타', description: '굴삭기운전기능사 자격증', grades: ['합격', '불합격'] },
  { id: '75', name: '기중기운전기능사', category: '기타', description: '기중기운전기능사 자격증', grades: ['합격', '불합격'] }
];

// 어학 능력 데이터
const languageData = [
  // 영어
  { id: '1', name: '영어', category: '영어', type: '영어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '2', name: 'TOEIC', category: '영어', type: '영어', level: '', levels: ['300-400', '400-500', '500-600', '600-700', '700-800', '800-900', '900-990'] },
  { id: '3', name: 'TOEFL', category: '영어', type: '영어', level: '', levels: ['iBT 60-80', 'iBT 80-100', 'iBT 100-120'] },
  { id: '4', name: 'IELTS', category: '영어', type: '영어', level: '', levels: ['4.0-5.0', '5.0-6.0', '6.0-7.0', '7.0-8.0', '8.0-9.0'] },
  { id: '5', name: 'OPIc', category: '영어', type: '영어', level: '', levels: ['AL', 'AM', 'AH', 'IL', 'IM', 'IH', 'AL'] },
  
  // 한국어
  { id: '6', name: '한국어', category: '한국어', type: '한국어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '7', name: 'TOPIK', category: '한국어', type: '한국어', level: '', levels: ['1급', '2급', '3급', '4급', '5급', '6급'] },
  { id: '8', name: 'KLT', category: '한국어', type: '한국어', level: '', levels: ['초급', '중급', '고급'] },
  
  // 중국어
  { id: '9', name: '중국어', category: '중국어', type: '중국어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '10', name: 'HSK', category: '중국어', type: '중국어', level: '', levels: ['1급', '2급', '3급', '4급', '5급', '6급'] },
  { id: '11', name: 'HSKK', category: '중국어', type: '중국어', level: '', levels: ['초급', '중급', '고급'] },
  
  // 일본어
  { id: '12', name: '일본어', category: '일본어', type: '일본어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '13', name: 'JLPT', category: '일본어', type: '일본어', level: '', levels: ['N5', 'N4', 'N3', 'N2', 'N1'] },
  { id: '14', name: 'JPT', category: '일본어', type: '일본어', level: '', levels: ['200-300', '300-400', '400-500', '500-600', '600-700', '700-800'] },
  
  // 베트남어
  { id: '15', name: '베트남어', category: '베트남어', type: '베트남어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '16', name: 'VLT', category: '베트남어', type: '베트남어', level: '', levels: ['초급', '중급', '고급'] },
  
  // 태국어
  { id: '17', name: '태국어', category: '태국어', type: '태국어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '18', name: 'TLT', category: '태국어', type: '태국어', level: '', levels: ['초급', '중급', '고급'] },
  
  // 러시아어
  { id: '19', name: '러시아어', category: '러시아어', type: '러시아어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '20', name: 'TORFL', category: '러시아어', type: '러시아어', level: '', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  
  // 독일어
  { id: '21', name: '독일어', category: '독일어', type: '독일어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '22', name: 'TestDaF', category: '독일어', type: '독일어', level: '', levels: ['TDN 3', 'TDN 4', 'TDN 5'] },
  { id: '23', name: 'Goethe-Zertifikat', category: '독일어', type: '독일어', level: '', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  
  // 프랑스어
  { id: '24', name: '프랑스어', category: '프랑스어', type: '프랑스어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '25', name: 'DELF', category: '프랑스어', type: '프랑스어', level: '', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { id: '26', name: 'DALF', category: '프랑스어', type: '프랑스어', level: '', levels: ['C1', 'C2'] },
  
  // 스페인어
  { id: '27', name: '스페인어', category: '스페인어', type: '스페인어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '28', name: 'DELE', category: '스페인어', type: '스페인어', level: '', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  
  // 이탈리아어
  { id: '29', name: '이탈리아어', category: '이탈리아어', type: '이탈리아어', level: '', levels: ['초급', '중급', '고급', '원어민'] },
  { id: '30', name: 'CELI', category: '이탈리아어', type: '이탈리아어', level: '', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] }
];

// 학교 데이터
const schoolData = [
  // 대학교
  { id: '1', name: '서울대학교', category: '대학교', type: '대학교' },
  { id: '2', name: '연세대학교', category: '대학교', type: '대학교' },
  { id: '3', name: '고려대학교', category: '대학교', type: '대학교' },
  { id: '4', name: '성균관대학교', category: '대학교', type: '대학교' },
  { id: '5', name: '한양대학교', category: '대학교', type: '대학교' },
  { id: '6', name: '중앙대학교', category: '대학교', type: '대학교' },
  { id: '7', name: '경희대학교', category: '대학교', type: '대학교' },
  { id: '8', name: '서강대학교', category: '대학교', type: '대학교' },
  { id: '9', name: '동국대학교', category: '대학교', type: '대학교' },
  { id: '10', name: '건국대학교', category: '대학교', type: '대학교' },
  
  // 전문대학
  { id: '11', name: '서울과학기술대학교', category: '전문대학', type: '전문대학' },
  { id: '12', name: '한국기술교육대학교', category: '전문대학', type: '전문대학' },
  { id: '13', name: '한국교통대학교', category: '전문대학', type: '전문대학' },
  { id: '14', name: '한국해양대학교', category: '전문대학', type: '전문대학' },
  { id: '15', name: '한국체육대학교', category: '전문대학', type: '전문대학' },
  
  // 고등학교
  { id: '16', name: '서울고등학교', category: '고등학교', type: '고등학교' },
  { id: '17', name: '경기고등학교', category: '고등학교', type: '고등학교' },
  { id: '18', name: '대성고등학교', category: '고등학교', type: '고등학교' },
  { id: '19', name: '휘문고등학교', category: '고등학교', type: '고등학교' },
  { id: '20', name: '중앙고등학교', category: '고등학교', type: '고등학교' },
  
  // 중학교
  { id: '21', name: '서울중학교', category: '중학교', type: '중학교' },
  { id: '22', name: '경기중학교', category: '중학교', type: '중학교' },
  { id: '23', name: '대성중학교', category: '중학교', type: '중학교' },
  { id: '24', name: '휘문중학교', category: '중학교', type: '중학교' },
  { id: '25', name: '중앙중학교', category: '중학교', type: '중학교' },
  
  // 초등학교
  { id: '26', name: '서울초등학교', category: '초등학교', type: '초등학교' },
  { id: '27', name: '경기초등학교', category: '초등학교', type: '초등학교' },
  { id: '28', name: '대성초등학교', category: '초등학교', type: '초등학교' },
  { id: '29', name: '휘문초등학교', category: '초등학교', type: '초등학교' },
  { id: '30', name: '중앙초등학교', category: '초등학교', type: '초등학교' }
];

// 졸업 상태 옵션
const graduationStatusOptions = [
  { value: '졸업', label: '졸업' },
  { value: '중퇴', label: '중퇴' },
  { value: '재학', label: '재학' },
  { value: '휴학', label: '휴학' },
  { value: '수료', label: '수료' }
];



// 경력 정보 데이터
const experienceData = [
  // IT/개발 관련
  { id: '1', name: '웹 개발자', category: 'IT/개발', description: '웹 애플리케이션 개발', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '2', name: '프론트엔드 개발자', category: 'IT/개발', description: '사용자 인터페이스 개발', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '3', name: '백엔드 개발자', category: 'IT/개발', description: '서버 및 데이터베이스 개발', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '4', name: '풀스택 개발자', category: 'IT/개발', description: '전체 스택 개발', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '5', name: '모바일 앱 개발자', category: 'IT/개발', description: '모바일 애플리케이션 개발', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '6', name: '데이터 분석가', category: 'IT/개발', description: '데이터 분석 및 시각화', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '7', name: 'DevOps 엔지니어', category: 'IT/개발', description: '개발 및 운영 자동화', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '8', name: 'QA 엔지니어', category: 'IT/개발', description: '품질 보증 및 테스트', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '9', name: '시스템 관리자', category: 'IT/개발', description: '시스템 및 네트워크 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '10', name: 'UI/UX 디자이너', category: 'IT/개발', description: '사용자 인터페이스 및 경험 디자인', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 제조업 관련
  { id: '11', name: '생산 관리자', category: '제조업', description: '생산 공정 관리 및 최적화', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '12', name: '품질 관리자', category: '제조업', description: '제품 품질 관리 및 검사', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '13', name: '기계 조작원', category: '제조업', description: '산업용 기계 조작 및 유지보수', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '14', name: '전기 기술자', category: '제조업', description: '전기 설비 설치 및 유지보수', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '15', name: '용접공', category: '제조업', description: '금속 용접 및 가공', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '16', name: '조립공', category: '제조업', description: '제품 조립 및 검사', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '17', name: '도장공', category: '제조업', description: '제품 도장 및 마감 작업', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '18', name: '포장공', category: '제조업', description: '제품 포장 및 출하 준비', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 건설업 관련
  { id: '19', name: '건설 현장 관리자', category: '건설업', description: '건설 현장 관리 및 감독', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '20', name: '목수', category: '건설업', description: '목재 가공 및 건축 작업', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '21', name: '미장공', category: '건설업', description: '벽면 마감 및 도장 작업', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '22', name: '타일공', category: '건설업', description: '타일 시공 및 마감', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '23', name: '철근공', category: '건설업', description: '철근 가공 및 설치', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '24', name: '콘크리트공', category: '건설업', description: '콘크리트 타설 및 양생', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '25', name: '건설기계조작사', category: '건설업', description: '건설기계 조작 및 운전', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 서비스업 관련
  { id: '26', name: '영업사원', category: '서비스업', description: '제품 및 서비스 영업', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '27', name: '고객 서비스 담당자', category: '서비스업', description: '고객 문의 및 상담', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '28', name: '마케팅 담당자', category: '서비스업', description: '마케팅 전략 및 실행', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '29', name: '인사 담당자', category: '서비스업', description: '인사 관리 및 채용', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '30', name: '회계 담당자', category: '서비스업', description: '회계 및 재무 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '31', name: '법무 담당자', category: '서비스업', description: '법무 및 계약 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '32', name: '총무 담당자', category: '서비스업', description: '일반 행정 및 총무', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '33', name: '기획 담당자', category: '서비스업', description: '사업 기획 및 전략 수립', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 요식업 관련
  { id: '34', name: '요리사', category: '요식업', description: '음식 조리 및 메뉴 개발', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '35', name: '서버', category: '요식업', description: '음식 서빙 및 고객 응대', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '36', name: '바리스타', category: '요식업', description: '커피 제조 및 서빙', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '37', name: '주방 보조', category: '요식업', description: '주방 보조 및 정리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '38', name: '매장 관리자', category: '요식업', description: '매장 운영 및 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 운송업 관련
  { id: '39', name: '택시 운전사', category: '운송업', description: '택시 운전 및 고객 서비스', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '40', name: '트럭 운전사', category: '운송업', description: '화물 운송 및 배송', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '41', name: '배송원', category: '운송업', description: '택배 및 소화물 배송', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '42', name: '물류 관리자', category: '운송업', description: '물류 및 창고 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 농업 관련
  { id: '43', name: '농작업자', category: '농업', description: '농작물 재배 및 수확', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '44', name: '축산업자', category: '농업', description: '가축 사육 및 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '45', name: '농기계 조작사', category: '농업', description: '농기계 조작 및 유지보수', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 어업 관련
  { id: '46', name: '어부', category: '어업', description: '어업 및 수산물 생산', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '47', name: '양식업자', category: '어업', description: '수산물 양식 및 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 광업 관련
  { id: '48', name: '광부', category: '광업', description: '광물 채굴 및 가공', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '49', name: '채석공', category: '광업', description: '석재 채굴 및 가공', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 교육업 관련
  { id: '50', name: '강사', category: '교육업', description: '교육 및 강의', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '51', name: '교사', category: '교육업', description: '학교 교육 및 학생 지도', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '52', name: '교육 관리자', category: '교육업', description: '교육 기관 운영 및 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 의료업 관련
  { id: '53', name: '간호사', category: '의료업', description: '환자 간호 및 의료 보조', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '54', name: '의료 보조원', category: '의료업', description: '의료 기기 조작 및 보조', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '55', name: '약사', category: '의료업', description: '약품 조제 및 약학 서비스', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 금융업 관련
  { id: '56', name: '은행원', category: '금융업', description: '은행 업무 및 고객 서비스', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '57', name: '보험 설계사', category: '금융업', description: '보험 상품 설계 및 판매', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '58', name: '증권사 직원', category: '금융업', description: '증권 거래 및 투자 상담', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },

  // 기타
  { id: '59', name: '청소원', category: '기타', description: '건물 청소 및 정리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '60', name: '경비원', category: '기타', description: '시설 보안 및 안전 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '61', name: '사무보조', category: '기타', description: '사무 보조 및 문서 처리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '62', name: '통역사', category: '기타', description: '언어 통역 및 번역', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '63', name: '번역가', category: '기타', description: '문서 번역 및 언어 서비스', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '64', name: '디자이너', category: '기타', description: '그래픽 및 시각 디자인', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '65', name: '사진작가', category: '기타', description: '사진 촬영 및 편집', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '66', name: '작가', category: '기타', description: '글쓰기 및 콘텐츠 제작', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '67', name: '기자', category: '기타', description: '뉴스 취재 및 기사 작성', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '68', name: '보안원', category: '기타', description: '보안 및 안전 관리', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] },
  { id: '69', name: '기타 직종', category: '기타', description: '기타 직종 경력', years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'] }
];

// 기술 데이터
const skillData = [
  // IT/개발 관련
  { id: '1', name: 'JavaScript', category: 'IT/개발', description: '웹 개발 프로그래밍 언어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '2', name: 'React', category: 'IT/개발', description: 'JavaScript UI 라이브러리', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '3', name: 'Vue.js', category: 'IT/개발', description: 'JavaScript 프레임워크', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '4', name: 'Angular', category: 'IT/개발', description: 'TypeScript 기반 프레임워크', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '5', name: 'Node.js', category: 'IT/개발', description: '서버 사이드 JavaScript', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '6', name: 'Python', category: 'IT/개발', description: '다목적 프로그래밍 언어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '7', name: 'Java', category: 'IT/개발', description: '객체지향 프로그래밍 언어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '8', name: 'C++', category: 'IT/개발', description: '시스템 프로그래밍 언어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '9', name: 'C#', category: 'IT/개발', description: 'Microsoft 개발 언어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '10', name: 'PHP', category: 'IT/개발', description: '웹 서버 프로그래밍 언어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '11', name: 'TypeScript', category: 'IT/개발', description: 'JavaScript 타입 확장', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '12', name: 'Django', category: 'IT/개발', description: 'Python 웹 프레임워크', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '13', name: 'Spring', category: 'IT/개발', description: 'Java 엔터프라이즈 프레임워크', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '14', name: 'Express.js', category: 'IT/개발', description: 'Node.js 웹 프레임워크', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '15', name: 'Laravel', category: 'IT/개발', description: 'PHP 웹 프레임워크', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '16', name: 'MySQL', category: 'IT/개발', description: '관계형 데이터베이스', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '17', name: 'PostgreSQL', category: 'IT/개발', description: '오픈소스 데이터베이스', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '18', name: 'MongoDB', category: 'IT/개발', description: 'NoSQL 데이터베이스', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '19', name: 'Redis', category: 'IT/개발', description: '인메모리 데이터베이스', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '20', name: 'Docker', category: 'IT/개발', description: '컨테이너 플랫폼', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '21', name: 'Kubernetes', category: 'IT/개발', description: '컨테이너 오케스트레이션', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '22', name: 'AWS', category: 'IT/개발', description: '클라우드 플랫폼', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '23', name: 'Azure', category: 'IT/개발', description: 'Microsoft 클라우드', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '24', name: 'GCP', category: 'IT/개발', description: 'Google 클라우드', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '25', name: 'Git', category: 'IT/개발', description: '버전 관리 시스템', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '26', name: 'Jenkins', category: 'IT/개발', description: 'CI/CD 도구', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '27', name: 'Jira', category: 'IT/개발', description: '프로젝트 관리 도구', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '28', name: 'Confluence', category: 'IT/개발', description: '협업 도구', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '29', name: 'Slack', category: 'IT/개발', description: '팀 커뮤니케이션', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '30', name: 'Figma', category: 'IT/개발', description: '디자인 협업 도구', levels: ['초급', '중급', '고급', '전문가'] },
  
  // 디자인 관련
  { id: '31', name: 'Photoshop', category: '디자인', description: '이미지 편집 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '32', name: 'Illustrator', category: '디자인', description: '벡터 그래픽 편집', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '33', name: 'InDesign', category: '디자인', description: '페이지 레이아웃 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '34', name: 'XD', category: '디자인', description: 'UI/UX 디자인 도구', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '35', name: 'Sketch', category: '디자인', description: 'Mac 디자인 도구', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '36', name: 'After Effects', category: '디자인', description: '모션 그래픽 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '37', name: 'Premiere Pro', category: '디자인', description: '비디오 편집 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '38', name: 'Cinema 4D', category: '디자인', description: '3D 모델링 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '39', name: 'Blender', category: '디자인', description: '오픈소스 3D 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '40', name: 'Canva', category: '디자인', description: '온라인 디자인 도구', levels: ['초급', '중급', '고급', '전문가'] },
  
  // 마케팅 관련
  { id: '41', name: 'Google Analytics', category: '마케팅', description: '웹 분석 도구', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '42', name: 'Google Ads', category: '마케팅', description: '검색 광고 플랫폼', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '43', name: 'Facebook Ads', category: '마케팅', description: '소셜 미디어 광고', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '44', name: 'Instagram Ads', category: '마케팅', description: '인스타그램 광고', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '45', name: 'YouTube Ads', category: '마케팅', description: '유튜브 광고', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '46', name: 'SEO', category: '마케팅', description: '검색 엔진 최적화', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '47', name: 'SEM', category: '마케팅', description: '검색 엔진 마케팅', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '48', name: 'Email Marketing', category: '마케팅', description: '이메일 마케팅', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '49', name: 'Content Marketing', category: '마케팅', description: '콘텐츠 마케팅', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '50', name: 'Social Media Marketing', category: '마케팅', description: '소셜 미디어 마케팅', levels: ['초급', '중급', '고급', '전문가'] },
  
  // 기타
  { id: '51', name: 'Excel', category: '기타', description: '스프레드시트 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '52', name: 'PowerPoint', category: '기타', description: '프레젠테이션 소프트웨어', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '53', name: 'Word', category: '기타', description: '워드 프로세서', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '54', name: 'Power BI', category: '기타', description: '비즈니스 인텔리전스', levels: ['초급', '중급', '고급', '전문가'] },
  { id: '55', name: 'Tableau', category: '기타', description: '데이터 시각화 도구', levels: ['초급', '중급', '고급', '전문가'] }
];

// 미리보기 모달 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 4px;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

const PreviewSection = styled.div`
  margin-bottom: 2rem;
`;

const PreviewSectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PreviewContent = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4ade80;
`;

const PreviewText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
`;

const EmptyText = styled.p`
  color: #9ca3af;
  font-style: italic;
  margin: 0;
`;

// 자격증 검색 드롭다운 스타일
const CertificationSearchContainer = styled.div`
  position: relative;
  width: 100%;
  min-width: 300px;
`;

const CertificationDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-top: none;
  border-radius: 0 0 8px 8px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  width: 100%;
`;

const CertificationOption = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  min-height: 44px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background-color: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;



const CertificationName = styled.span`
  font-weight: 500;
  color: #374151;
`;

const CertificationCategory = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const SelectedCertificationsContainer = styled.div`
  margin-top: 1rem;
`;



const RemoveButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-left: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  padding: 0;
  min-width: 20px;
  min-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    opacity: 0.8;
  }
`;

const NoResultsText = styled.div`
  padding: 1rem;
  text-align: center;
  color: #6b7280;
  font-style: italic;
`;

// 어학 능력 레벨 선택 스타일
const LanguageLevelSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;



const SelectedExperienceTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f59e0b;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
`;

const ExperienceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
`;

const ExperienceName = styled.span`
  font-weight: 500;
  color: white;
`;

const ExperienceYearSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  font-size: 0.875rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  min-height: 32px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
  }
  
  option {
    background-color: #f59e0b;
    color: white;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;



// 학력 정보 관련 스타일드 컴포넌트
const SchoolTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SchoolTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  background: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    background: ${props => props.$active ? '#4ade80' : '#f0fdf4'};
  }
`;

const SmartSearchContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  color: #374151;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1rem;
`;

const SchoolCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`;

const SchoolCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const SchoolCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SchoolIcon = styled.span`
  font-size: 1.5rem;
`;

const SchoolName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const SchoolCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const SchoolCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const NoResultsCard = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-style: italic;
`;

const EducationTimeline = styled.div`
  margin-top: 1.5rem;
`;

const TimelineTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 2.5rem;
    bottom: -1rem;
    width: 2px;
    background: #e5e7eb;
  }
  
  &:last-child::before {
    display: none;
  }
`;



const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineSchoolCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

const TimelineSchoolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TimelineSchoolIcon = styled.span`
  font-size: 1.25rem;
`;

const TimelineSchoolInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

const TimelineSchoolName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const TimelineSchoolCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const TimelineRemoveButton = styled.button`
  background: none;
  color: #6b7280;
  border: none;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    color: #374151;
    background: #f3f4f6;
  }
`;

const TimelineSchoolBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

// 어학 능력 관련 스타일드 컴포넌트
const LanguageTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const LanguageTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  background: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    background: ${props => props.$active ? '#4ade80' : '#f0fdf4'};
  }
`;

const LanguageCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`;

const LanguageCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const LanguageCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const LanguageIcon = styled.span`
  font-size: 1.5rem;
`;

const LanguageName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const LanguageCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const LanguageCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const LanguageDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const LanguageCardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const LanguageTimeline = styled.div`
  margin-top: 1.5rem;
`;

const TimelineLanguageCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

const TimelineLanguageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TimelineLanguageIcon = styled.span`
  font-size: 1.25rem;
`;

const TimelineLanguageInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

const TimelineLanguageName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const TimelineLanguageCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const TimelineLanguageBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// 자격증 관련 스타일드 컴포넌트
const CertificationTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const CertificationTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  background: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    background: ${props => props.$active ? '#4ade80' : '#f0fdf4'};
  }
`;

const CertificationCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`;

const CertificationCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const CertificationCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const CertificationIcon = styled.span`
  font-size: 1.5rem;
`;

const CertificationCardName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const CertificationCardCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const CertificationCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const CertificationDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const CertificationCardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const CertificationTimeline = styled.div`
  margin-top: 1.5rem;
`;

const TimelineCertificationCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

const TimelineCertificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TimelineCertificationIcon = styled.span`
  font-size: 1.25rem;
`;

const TimelineCertificationInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

const TimelineCertificationName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const TimelineCertificationCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const TimelineCertificationBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// 자격증 급수 선택 스타일
const CertificationGradeSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

// 기술 관련 스타일드 컴포넌트
const SkillTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const SkillTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  background: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    background: ${props => props.$active ? '#4ade80' : '#f0fdf4'};
  }
`;

const SkillCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
`;

const SkillCard = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const SkillCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SkillIcon = styled.span`
  font-size: 1.5rem;
`;

const SkillCardName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const SkillCardCategory = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const SkillCardBody = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const SkillDescription = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const SkillCardFooter = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const SkillTimeline = styled.div`
  margin-top: 1.5rem;
`;

const TimelineSkillCard = styled.div`
  background: #f9fafb;
  border-radius: 6px;
  padding: 0.75rem;
`;

const TimelineSkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TimelineSkillIcon = styled.span`
  font-size: 1.25rem;
`;

const TimelineSkillInfo = styled.div`
  /* flex: 1 제거해서 필요한 만큼만 공간 차지 */
`;

const TimelineSkillName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

const TimelineSkillCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const TimelineSkillBody = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// 기술 레벨 선택 스타일
const SkillLevelSelect = styled.select`
  padding: 0.25rem 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.75rem;
  background: white;
  color: #374151;
  margin-left: 0.125rem;
  margin-right: 0.5rem;
  align-self: flex-start;
  margin-top: -0.125rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

const ResumePage: React.FC = () => {
  const {
    formData,
    loading,
    error,
    validationErrors,
    handleInputChange,
    saveResumeWithValidation,
    loadSavedResume,
  } = useResumeForm();


  const [showPreview, setShowPreview] = useState(false);
  const [certificationSearch, setCertificationSearch] = useState('');
  const [showCertificationDropdown, setShowCertificationDropdown] = useState(false);
  const [selectedCertifications, setSelectedCertifications] = useState<Array<{id: string, name: string, category: string, description: string, grade: string, grades: string[]}>>([]);
  
  // 기술 상태
  const [skillSearch, setSkillSearch] = useState('');
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Array<{id: string, name: string, category: string, description: string, level: string, levels: string[]}>>([]);
  
  // 어학 능력 상태
  const [languageSearch, setLanguageSearch] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Array<{id: string, name: string, category: string, level: string, levels: string[]}>>([]);
  
  // 학력 정보 상태
  const [schoolSearch, setSchoolSearch] = useState('');
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState<Array<{id: string, name: string, category: string, type: string, status: string}>>([]);
  
  // 경력 정보 상태
  const [experienceSearch, setExperienceSearch] = useState('');
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
  const [selectedExperiences, setSelectedExperiences] = useState<Array<{id: string, name: string, category: string, description: string, years: string[], selectedYear: string}>>([]);
  
  // 주소 정보 상태
  

  // 학력 정보와 어학 능력 필터 상태
  const [schoolTypeFilter, setSchoolTypeFilter] = useState<string>('전체');
  const [languageTypeFilter, setLanguageTypeFilter] = useState<string>('전체');
  const [certificationTypeFilter, setCertificationTypeFilter] = useState<string>('전체');
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>('전체');
  const [experienceTypeFilter, setExperienceTypeFilter] = useState<string>('전체');

  // 저장된 자격증 데이터를 selectedCertifications로 변환
  React.useEffect(() => {
    if (formData.certifications) {
      const certificationEntries = formData.certifications.split(', ').filter(entry => entry.trim());
      const certifications = certificationEntries.map(entry => {
        // "자격증명 급수" 형태에서 분리
        const parts = entry.trim().split(' ');
        const certificationName = parts[0];
        const grade = parts.slice(1).join(' ');
        
        const foundCert = certificationData.find(cert => cert.name === certificationName);
        if (foundCert) {
          return { ...foundCert, grade: grade || '' };
        } else {
          return { id: `custom-${certificationName}`, name: certificationName, category: '기타', description: '기타 자격증', grade: grade || '', grades: [] };
        }
      });
      setSelectedCertifications(certifications);
    }
  }, [formData.certifications]);

  // 저장된 어학 능력 데이터를 selectedLanguages로 변환
  React.useEffect(() => {
    if (formData.languages) {
      const languageEntries = formData.languages.split(', ').filter(entry => entry.trim());
      const languages = languageEntries.map(entry => {
        // "TOEIC 850" 형태에서 "TOEIC"와 "850" 분리
        const parts = entry.trim().split(' ');
        const languageName = parts[0];
        const level = parts.slice(1).join(' ');
        
        const foundLanguage = languageData.find(lang => lang.name === languageName);
        if (foundLanguage) {
          return { ...foundLanguage, level };
        } else {
          return { id: `custom-${languageName}`, name: languageName, category: '기타', level, levels: [] };
        }
      });
      setSelectedLanguages(languages);
    }
  }, [formData.languages]);

  // 저장된 학력 데이터를 selectedSchools로 변환
  React.useEffect(() => {
    if (formData.education) {
      const educationParts = formData.education.split(', ').filter(part => part.trim());
      const schools = educationParts.map(part => {
        // "학교명 졸업상태" 형식에서 분리
        const words = part.trim().split(' ');
        const status = words[words.length - 1]; // 마지막 단어가 졸업상태
        const schoolName = words.slice(0, -1).join(' '); // 나머지가 학교명
        
        const foundSchool = schoolData.find(school => school.name === schoolName);
        return foundSchool 
          ? { ...foundSchool, status }
          : { id: `custom-${schoolName}`, name: schoolName, category: '기타', type: '기타', status };
      });
      setSelectedSchools(schools);
    }
  }, [formData.education]);

  // 저장된 경력 데이터를 selectedExperiences로 변환
  React.useEffect(() => {
    if (formData.experience) {
      const experienceEntries = formData.experience.split(', ').filter(entry => entry.trim());
      const experiences = experienceEntries.map(entry => {
        // "직업명 연도" 형태에서 분리
        const parts = entry.trim().split(' ');
        const year = parts[parts.length - 1]; // 마지막 단어가 연도
        const jobName = parts.slice(0, -1).join(' '); // 나머지가 직업명
        
        const foundExp = experienceData.find(exp => exp.name === jobName);
        if (foundExp) {
          return { 
            ...foundExp, 
            selectedYear: year || '1년 미만' 
          };
        } else {
          return { 
            id: `custom-${jobName}`, 
            name: jobName, 
            category: '기타', 
            description: '기타 경력',
            years: ['1년 미만', '1-2년', '3-5년', '6-10년', '10년 이상'],
            selectedYear: year || '1년 미만' 
          };
        }
      });
      setSelectedExperiences(experiences);
    }
  }, [formData.experience]);



  // 저장된 기술 데이터를 selectedSkills로 변환
  React.useEffect(() => {
    if (formData.skills) {
      const skillEntries = formData.skills.split(', ').filter(entry => entry.trim());
      const skills = skillEntries.map(entry => {
        // "기술명 레벨" 형태에서 분리
        const parts = entry.trim().split(' ');
        const skillName = parts[0];
        const level = parts.slice(1).join(' ');
        
        const foundSkill = skillData.find(skill => skill.name === skillName);
        if (foundSkill) {
          return { ...foundSkill, level: level || '' };
        } else {
          return { id: `custom-${skillName}`, name: skillName, category: '기타', description: '기타 기술', level: level || '', levels: [] };
        }
      });
      setSelectedSkills(skills);
    }
  }, [formData.skills]);

  const handleSave = async () => {
    const result = await saveResumeWithValidation();
    if (result.success) {
      alert('이력서가 성공적으로 저장되었습니다!');
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePreview();
    }
  };

  // 자격증 검색 필터링
  const filteredCertifications = certificationData.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(certificationSearch.toLowerCase()) ||
                         cert.category.toLowerCase().includes(certificationSearch.toLowerCase()) ||
                         cert.description.toLowerCase().includes(certificationSearch.toLowerCase());
    const matchesType = certificationTypeFilter === '전체' || cert.category === certificationTypeFilter;
    return matchesSearch && matchesType;
  });

  // 자격증 선택
  const handleCertificationSelect = (certification: {id: string, name: string, category: string, description: string, grades: string[]}) => {
    if (!selectedCertifications.find(cert => cert.id === certification.id)) {
      const newSelectedCertifications = [...selectedCertifications, { ...certification, grade: '' }];
      setSelectedCertifications(newSelectedCertifications);
      
      // formData에 자격증 문자열로 저장
      const certificationNames = newSelectedCertifications.map(cert => cert.grade ? `${cert.name} ${cert.grade}` : cert.name).join(', ');
      handleInputChange({
        target: { name: 'certifications', value: certificationNames }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setCertificationSearch('');
    setShowCertificationDropdown(false);
  };

  // 자격증 제거
  const handleCertificationRemove = (certificationId: string) => {
    const newSelectedCertifications = selectedCertifications.filter(cert => cert.id !== certificationId);
    setSelectedCertifications(newSelectedCertifications);
    
    // formData에 자격증 문자열로 업데이트
    const certificationNames = newSelectedCertifications.map(cert => cert.grade ? `${cert.name} ${cert.grade}` : cert.name).join(', ');
    handleInputChange({
      target: { name: 'certifications', value: certificationNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 자격증 급수 변경
  const handleCertificationGradeChange = (certificationId: string, grade: string) => {
    const newSelectedCertifications = selectedCertifications.map(certification => 
      certification.id === certificationId ? { ...certification, grade } : certification
    );
    setSelectedCertifications(newSelectedCertifications);
    
    // formData에 자격증 문자열로 업데이트
    const certificationNames = newSelectedCertifications.map(cert => cert.grade ? `${cert.name} ${cert.grade}` : cert.name).join(', ');
    handleInputChange({
      target: { name: 'certifications', value: certificationNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 자격증 검색 입력 처리
  const handleCertificationSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCertificationSearch(e.target.value);
    setShowCertificationDropdown(true);
  };

  // 자격증 검색 포커스 처리
  const handleCertificationSearchFocus = () => {
    setShowCertificationDropdown(true);
  };

  // 자격증 검색 블러 처리
  const handleCertificationSearchBlur = () => {
    setTimeout(() => {
      setShowCertificationDropdown(false);
    }, 200);
  };

  // 어학 능력 검색 필터링
  const filteredLanguages = languageData.filter(lang => {
    const matchesSearch = lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
                         lang.category.toLowerCase().includes(languageSearch.toLowerCase());
    const matchesType = languageTypeFilter === '전체' || lang.category === languageTypeFilter;
    return matchesSearch && matchesType;
  });

  // 어학 능력 선택
  const handleLanguageSelect = (language: {id: string, name: string, category: string, type: string, level: string, levels: string[]}) => {
    if (!selectedLanguages.find(l => l.id === language.id)) {
      const newSelectedLanguages = [...selectedLanguages, language];
      setSelectedLanguages(newSelectedLanguages);
      
      // formData에 어학 능력 문자열로 저장
      const languageNames = newSelectedLanguages.map(l => l.level ? `${l.name} ${l.level}` : l.name).join(', ');
      handleInputChange({
        target: { name: 'languages', value: languageNames }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setLanguageSearch('');
    setShowLanguageDropdown(false);
  };

  // 어학 능력 제거
  const handleLanguageRemove = (languageId: string) => {
    const newSelectedLanguages = selectedLanguages.filter(language => language.id !== languageId);
    setSelectedLanguages(newSelectedLanguages);
    
    // formData에 어학 능력 문자열로 업데이트
    const languageNames = newSelectedLanguages.map(l => l.level ? `${l.name} ${l.level}` : l.name).join(', ');
    handleInputChange({
      target: { name: 'languages', value: languageNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 어학 능력 레벨 변경
  const handleLanguageLevelChange = (languageId: string, level: string) => {
    const newSelectedLanguages = selectedLanguages.map(language => 
      language.id === languageId ? { ...language, level } : language
    );
    setSelectedLanguages(newSelectedLanguages);
    
    // formData에 어학 능력 문자열로 업데이트
    const languageNames = newSelectedLanguages.map(l => l.level ? `${l.name} ${l.level}` : l.name).join(', ');
    handleInputChange({
      target: { name: 'languages', value: languageNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 어학 능력 검색 입력 처리
  const handleLanguageSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguageSearch(e.target.value);
    setShowLanguageDropdown(true);
  };

  // 어학 능력 검색 포커스/블러 처리
  const handleLanguageSearchFocus = () => {
    setShowLanguageDropdown(true);
  };

  const handleLanguageSearchBlur = () => {
    setTimeout(() => {
      setShowLanguageDropdown(false);
    }, 200);
  };

  // 학교 검색 필터링
  const filteredSchools = schoolData.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
                         school.category.toLowerCase().includes(schoolSearch.toLowerCase());
    const matchesType = schoolTypeFilter === '전체' || school.category === schoolTypeFilter;
    return matchesSearch && matchesType;
  });

  // 학교 선택
  const handleSchoolSelect = (school: {id: string, name: string, category: string, type: string}) => {
    if (!selectedSchools.find(s => s.id === school.id)) {
      const newSelectedSchools = [...selectedSchools, { ...school, status: '졸업' }];
      setSelectedSchools(newSelectedSchools);
      
      // formData에 학력 정보 문자열로 저장
      const schoolNames = newSelectedSchools.map(s => `${s.name} ${s.status}`).join(', ');
      handleInputChange({
        target: { name: 'education', value: schoolNames }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setSchoolSearch('');
    setShowSchoolDropdown(false);
  };

  // 졸업 상태 변경
  const handleGraduationStatusChange = (schoolId: string, status: string) => {
    const newSelectedSchools = selectedSchools.map(school => 
      school.id === schoolId ? { ...school, status } : school
    );
    setSelectedSchools(newSelectedSchools);
    
    // formData에 학력 정보 문자열로 업데이트
    const schoolNames = newSelectedSchools.map(s => `${s.name} ${s.status}`).join(', ');
    handleInputChange({
      target: { name: 'education', value: schoolNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 학교 제거
  const handleSchoolRemove = (schoolId: string) => {
    const newSelectedSchools = selectedSchools.filter(school => school.id !== schoolId);
    setSelectedSchools(newSelectedSchools);
    
    // formData에 학력 정보 문자열로 업데이트
    const schoolNames = newSelectedSchools.map(s => `${s.name} ${s.status}`).join(', ');
    handleInputChange({
      target: { name: 'education', value: schoolNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 학교 검색 입력 처리
  const handleSchoolSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolSearch(e.target.value);
    setShowSchoolDropdown(true);
  };

  // 학교 검색 포커스/블러 처리
  const handleSchoolSearchFocus = () => {
    setShowSchoolDropdown(true);
  };

  const handleSchoolSearchBlur = () => {
    setTimeout(() => {
      setShowSchoolDropdown(false);
    }, 200);
  };

  // 경력 정보 검색 필터링
  const filteredExperience = experienceData.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(experienceSearch.toLowerCase()) ||
                         exp.category.toLowerCase().includes(experienceSearch.toLowerCase()) ||
                         exp.description.toLowerCase().includes(experienceSearch.toLowerCase());
    const matchesType = experienceTypeFilter === '전체' || exp.category === experienceTypeFilter;
    return matchesSearch && matchesType;
  });

  // 경력 정보 선택
  const handleExperienceSelect = (experience: {id: string, name: string, category: string, description: string, years: string[]}) => {
    if (!selectedExperiences.find(exp => exp.id === experience.id)) {
      const newSelectedExperiences = [...selectedExperiences, { ...experience, selectedYear: '1년 미만' }];
      setSelectedExperiences(newSelectedExperiences);
      
      // formData에 경력 정보 문자열로 저장
      const experienceEntries = newSelectedExperiences.map(exp => `${exp.name} ${exp.selectedYear}`).join(', ');
      handleInputChange({
        target: { name: 'experience', value: experienceEntries }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setExperienceSearch('');
    setShowExperienceDropdown(false);
  };

  // 경력 정보 제거
  const handleExperienceRemove = (experienceId: string) => {
    const newSelectedExperiences = selectedExperiences.filter(exp => exp.id !== experienceId);
    setSelectedExperiences(newSelectedExperiences);
    
    // formData에 경력 정보 문자열로 업데이트
    const experienceEntries = newSelectedExperiences.map(exp => `${exp.name} ${exp.selectedYear}`).join(', ');
    handleInputChange({
      target: { name: 'experience', value: experienceEntries }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 경력 정보 검색 입력 처리
  const handleExperienceSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExperienceSearch(e.target.value);
    setShowExperienceDropdown(true);
  };

  // 경력 정보 검색 포커스/블러 처리
  const handleExperienceSearchFocus = () => {
    setShowExperienceDropdown(true);
  };

  const handleExperienceSearchBlur = () => {
    setTimeout(() => {
      setShowExperienceDropdown(false);
    }, 200);
  };

  // 경력 연도 변경
  const handleExperienceYearChange = (experienceId: string, year: string) => {
    const newSelectedExperiences = selectedExperiences.map(exp => 
      exp.id === experienceId ? { ...exp, selectedYear: year } : exp
    );
    setSelectedExperiences(newSelectedExperiences);
    
    // formData에 경력 정보 문자열로 업데이트
    const experienceEntries = newSelectedExperiences.map(exp => `${exp.name} ${exp.selectedYear}`).join(', ');
    handleInputChange({
      target: { name: 'experience', value: experienceEntries }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 기술 검색 필터링
  const filteredSkills = skillData.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
                         skill.category.toLowerCase().includes(skillSearch.toLowerCase()) ||
                         skill.description.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesType = skillTypeFilter === '전체' || skill.category === skillTypeFilter;
    return matchesSearch && matchesType;
  });

  // 기술 선택
  const handleSkillSelect = (skill: {id: string, name: string, category: string, description: string, levels: string[]}) => {
    if (!selectedSkills.find(s => s.id === skill.id)) {
      const newSelectedSkills = [...selectedSkills, { ...skill, level: '' }];
      setSelectedSkills(newSelectedSkills);
      
      // formData에 기술 문자열로 저장
      const skillNames = newSelectedSkills.map(s => s.level ? `${s.name} ${s.level}` : s.name).join(', ');
      handleInputChange({
        target: { name: 'skills', value: skillNames }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setSkillSearch('');
    setShowSkillDropdown(false);
  };

  // 기술 제거
  const handleSkillRemove = (skillId: string) => {
    const newSelectedSkills = selectedSkills.filter(skill => skill.id !== skillId);
    setSelectedSkills(newSelectedSkills);
    
    // formData에 기술 문자열로 업데이트
    const skillNames = newSelectedSkills.map(s => s.level ? `${s.name} ${s.level}` : s.name).join(', ');
    handleInputChange({
      target: { name: 'skills', value: skillNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 기술 레벨 변경
  const handleSkillLevelChange = (skillId: string, level: string) => {
    const newSelectedSkills = selectedSkills.map(skill => 
      skill.id === skillId ? { ...skill, level } : skill
    );
    setSelectedSkills(newSelectedSkills);
    
    // formData에 기술 문자열로 업데이트
    const skillNames = newSelectedSkills.map(s => s.level ? `${s.name} ${s.level}` : s.name).join(', ');
    handleInputChange({
      target: { name: 'skills', value: skillNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 기술 검색 입력 처리
  const handleSkillSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillSearch(e.target.value);
    setShowSkillDropdown(true);
  };

  // 기술 검색 포커스 처리
  const handleSkillSearchFocus = () => {
    setShowSkillDropdown(true);
  };

  // 기술 검색 블러 처리
  const handleSkillSearchBlur = () => {
    setTimeout(() => {
      setShowSkillDropdown(false);
    }, 200);
  };

  // 미리보기 모달
  const PreviewModal: React.FC = () => {
    if (!showPreview) return null;

    return (
      <ModalOverlay onClick={handleOverlayClick}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>이력서 미리보기</ModalTitle>
            <CloseButton 
              onClick={closePreview}
              aria-label="미리보기 닫기"
            >
              ✕
            </CloseButton>
          </ModalHeader>

          {/* 기본 정보 */}
          <PreviewSection>
            <PreviewSectionTitle>
              <span>👤</span>
              기본 정보
            </PreviewSectionTitle>
            <PreviewContent>
              <PreviewText>
                <strong>이름:</strong> {formData.name || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
              <PreviewText>
                <strong>이메일:</strong> {formData.email || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
              <PreviewText>
                <strong>전화번호:</strong> {formData.phone || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
              <PreviewText>
                <strong>국적:</strong> {formData.nationality || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
              <PreviewText>
                <strong>비자 유형:</strong> {formData.visaType || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
              <PreviewText>
                <strong>주소:</strong> {formData.address || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
            </PreviewContent>
          </PreviewSection>

          {/* 학력 정보 */}
          <PreviewSection>
            <PreviewSectionTitle>
              <span>🎓</span>
              학력 정보
            </PreviewSectionTitle>
            <PreviewContent>
              <PreviewText>
                {selectedSchools.length > 0 ? (
                  selectedSchools.map(school => `${school.name} ${school.status}`).join(', ')
                ) : (
                  <EmptyText>입력되지 않음</EmptyText>
                )}
              </PreviewText>
            </PreviewContent>
          </PreviewSection>

          {/* 경력 정보 */}
          <PreviewSection>
            <PreviewSectionTitle>
              <span>💼</span>
              경력 정보
            </PreviewSectionTitle>
            <PreviewContent>
              <PreviewText>
                {selectedExperiences.length > 0 ? (
                  selectedExperiences.map(exp => `${exp.name} ${exp.selectedYear}`).join(', ')
                ) : (
                  <EmptyText>입력되지 않음</EmptyText>
                )}
              </PreviewText>
            </PreviewContent>
          </PreviewSection>

          {/* 기술/자격증 */}
          <PreviewSection>
            <PreviewSectionTitle>
              <span>🔧</span>
              기술/자격증
            </PreviewSectionTitle>
            <PreviewContent>
              <PreviewText>
                <strong>보유 기술:</strong> {formData.skills || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
              <PreviewText>
                <strong>자격증:</strong> {selectedCertifications.length > 0 ? (
                  selectedCertifications.map(cert => cert.name).join(', ')
                ) : (
                  <EmptyText>입력되지 않음</EmptyText>
                )}
              </PreviewText>
              <PreviewText>
                <strong>어학 능력:</strong> {selectedLanguages.length > 0 ? (
                  selectedLanguages.map(lang => lang.level ? `${lang.name} ${lang.level}` : lang.name).join(', ')
                ) : (
                  <EmptyText>입력되지 않음</EmptyText>
                )}
              </PreviewText>
            </PreviewContent>
          </PreviewSection>

          {/* 자기소개서 */}
          <PreviewSection>
            <PreviewSectionTitle>
              <span>📄</span>
              자기소개서
            </PreviewSectionTitle>
            <PreviewContent>
              <PreviewText>
                {formData.introduction || <EmptyText>입력되지 않음</EmptyText>}
              </PreviewText>
            </PreviewContent>
          </PreviewSection>
        </ModalContent>
      </ModalOverlay>
    );
  };

  return (
    <ResumeContainer>
      <MainHeader />
      <ResumeContent>
        {/* 기본 정보 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>👤</SectionIcon>
            기본 정보
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>이름</FormLabel>
              <FormInput 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력하세요" 
                aria-describedby={validationErrors.name ? "name-error" : undefined}
              />
              {validationErrors.name && (
                <div id="name-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.name}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <FormInput 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="이메일을 입력하세요" 
                aria-describedby={validationErrors.email ? "email-error" : undefined}
              />
              {validationErrors.email && (
                <div id="email-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.email}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>전화번호</FormLabel>
              <FormInput 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="전화번호를 입력하세요" 
                aria-describedby={validationErrors.phone ? "phone-error" : undefined}
              />
              {validationErrors.phone && (
                <div id="phone-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.phone}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>국적</FormLabel>
              <FormSelect 
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                aria-describedby={validationErrors.nationality ? "nationality-error" : undefined}
                aria-label="국적 선택"
              >
                {nationalityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
              {validationErrors.nationality && (
                <div id="nationality-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.nationality}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>비자 유형</FormLabel>
              <FormSelect 
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                aria-describedby={validationErrors.visaType ? "visaType-error" : undefined}
                aria-label="비자 유형 선택"
              >
                {visaTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
              {validationErrors.visaType && (
                <div id="visaType-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.visaType}
                </div>
              )}
            </FormGroup>
            <FormGroup style={{ width: '100%' }}>
              <FormLabel>주소</FormLabel>
              <div style={{ width: '100%' }}>
                <PostcodeSearch
                  value={formData.address}
                  onChange={(value) => {
                    handleInputChange({
                      target: { name: 'address', value }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  onAddressSelect={(address) => {
                    // 전체 주소를 저장 (우편번호, 도로명주소, 상세주소 포함)
                    const completeAddress = address.completeAddress || address.address;
                    handleInputChange({
                      target: { name: 'address', value: completeAddress }
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                  placeholder="주소를 검색하세요"
                  showDetailAddress={true}
                  showRoadAddress={true}
                  showJibunAddress={true}
                />
              </div>
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 학력 정보 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>🎓</SectionIcon>
            학력 정보
          </SectionTitle>
          <ResumeForm>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>학력</FormLabel>
              
              {/* 학력 유형 필터 */}
              <SchoolTypeFilter>
                {['전체', '대학교', '전문대학', '고등학교', '중학교', '초등학교'].map((type) => (
                  <SchoolTypeButton
                    key={type}
                    $active={schoolTypeFilter === type}
                    onClick={(e) => {
                      e.preventDefault();
                      setSchoolTypeFilter(type);
                    }}
                  >
                    {type}
                  </SchoolTypeButton>
                ))}
              </SchoolTypeFilter>

              {/* 스마트 검색 */}
              <SmartSearchContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                  type="text"
                  value={schoolSearch}
                  onChange={handleSchoolSearchChange}
                  onFocus={handleSchoolSearchFocus}
                  onBlur={handleSchoolSearchBlur}
                  placeholder="학교명을 검색하세요 (예: 서울대학교, 연세대학교)"
                />
              </SmartSearchContainer>

              {/* 학교 카드 그리드 */}
              {showSchoolDropdown && (
                <SchoolCardGrid>
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((school) => (
                      <SchoolCard
                        key={school.id}
                        onClick={() => handleSchoolSelect(school)}
                      >
                        <SchoolCardHeader>
                          <SchoolIcon>{school.category === '대학교' ? '🎓' : '🏫'}</SchoolIcon>
                          <div>
                            <SchoolName>{school.name}</SchoolName>
                            <SchoolCategory>{school.category}</SchoolCategory>
                          </div>
                        </SchoolCardHeader>
                        <SchoolCardBody>
                          {school.category === '대학교' ? '종합대학교' : school.category}
                        </SchoolCardBody>
                      </SchoolCard>
                    ))
                  ) : (
                    <NoResultsCard>검색 결과가 없습니다.</NoResultsCard>
                  )}
                </SchoolCardGrid>
              )}

              {/* 선택된 학력 타임라인 */}
              {selectedSchools.length > 0 && (
                <EducationTimeline>
                  <TimelineTitle>📚 학력 이력</TimelineTitle>
                  <TimelineContainer>
                    {selectedSchools.map((school, index) => (
                      <TimelineItem key={school.id}>
                        <TimelineContent>
                          <TimelineSchoolCard>
                            <TimelineSchoolHeader>
                              <TimelineSchoolIcon>{school.category === '대학교' ? '🎓' : '🏫'}</TimelineSchoolIcon>
                              <TimelineSchoolInfo>
                                <TimelineSchoolName>{school.name}</TimelineSchoolName>
                                <TimelineSchoolCategory>{school.category}</TimelineSchoolCategory>
                              </TimelineSchoolInfo>
                              <StatusSelect
                                value={school.status}
                                onChange={(e) => handleGraduationStatusChange(school.id, e.target.value)}
                              >
                                {graduationStatusOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </StatusSelect>
                              <div style={{ flex: 1 }}></div>
                              <TimelineRemoveButton
                                onClick={() => handleSchoolRemove(school.id)}
                                aria-label={`${school.name} 제거`}
                              >
                                ×
                              </TimelineRemoveButton>
                            </TimelineSchoolHeader>
                            <TimelineSchoolBody>
                              <span>{school.category === '대학교' ? '종합대학교' : school.category}</span>
                            </TimelineSchoolBody>
                          </TimelineSchoolCard>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </TimelineContainer>
                </EducationTimeline>
              )}
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 경력 정보 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>💼</SectionIcon>
            경력 정보
          </SectionTitle>
          <ResumeForm>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>경력</FormLabel>
              
              {/* 경력 유형 필터 */}
              <CertificationTypeFilter>
                {['전체', 'IT/개발', '제조업', '서비스업', '건설업', '금융업', '의료/헬스케어', '교육', '기타'].map((type) => (
                  <CertificationTypeButton
                    key={type}
                    $active={experienceTypeFilter === type}
                    onClick={(e) => {
                      e.preventDefault();
                      setExperienceTypeFilter(type);
                    }}
                  >
                    {type}
                  </CertificationTypeButton>
                ))}
              </CertificationTypeFilter>

              {/* 스마트 검색 */}
              <SmartSearchContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                  type="text"
                  value={experienceSearch}
                  onChange={handleExperienceSearchChange}
                  onFocus={handleExperienceSearchFocus}
                  onBlur={handleExperienceSearchBlur}
                  placeholder="경력을 검색하세요 (예: 웹 개발자, 영업사원, 생산 관리자)"
                />
              </SmartSearchContainer>

              {/* 경력 카드 그리드 */}
              {showExperienceDropdown && (
                <CertificationCardGrid>
                  {filteredExperience.length > 0 ? (
                    filteredExperience.map((experience) => (
                      <CertificationCard
                        key={experience.id}
                        onClick={() => handleExperienceSelect(experience)}
                      >
                        <CertificationCardHeader>
                          <CertificationIcon>
                            {experience.category === 'IT/개발' ? '💻' :
                             experience.category === '제조업' ? '⚙️' :
                             experience.category === '서비스업' ? '🎯' :
                             experience.category === '건설업' ? '🏗️' :
                             experience.category === '금융업' ? '💰' :
                             experience.category === '의료/헬스케어' ? '🏥' :
                             experience.category === '교육' ? '📚' : '🔧'}
                          </CertificationIcon>
                          <div>
                            <CertificationCardName>{experience.name}</CertificationCardName>
                            <CertificationCardCategory>{experience.category}</CertificationCardCategory>
                          </div>
                        </CertificationCardHeader>
                        <CertificationCardBody>
                          <CertificationDescription>
                            {experience.description}
                          </CertificationDescription>
                          <CertificationCardFooter>
                            {experience.years.length > 0 ? `${experience.years.length}개 연도 지원` : '전문 경력'}
                          </CertificationCardFooter>
                        </CertificationCardBody>
                      </CertificationCard>
                    ))
                  ) : (
                    <NoResultsCard>검색 결과가 없습니다.</NoResultsCard>
                  )}
                </CertificationCardGrid>
              )}
              {/* 선택된 경력 타임라인 */}
              {selectedExperiences.length > 0 && (
                <CertificationTimeline>
                  <TimelineTitle>💼 보유 경력</TimelineTitle>
                  <TimelineContainer>
                    {selectedExperiences.map((experience, index) => (
                      <TimelineItem key={experience.id}>
                        <TimelineContent>
                          <TimelineCertificationCard>
                            <TimelineCertificationHeader>
                              <TimelineCertificationIcon>
                                {experience.category === 'IT/개발' ? '💻' :
                                 experience.category === '제조업' ? '⚙️' :
                                 experience.category === '서비스업' ? '🎯' :
                                 experience.category === '건설업' ? '🏗️' :
                                 experience.category === '금융업' ? '💰' :
                                 experience.category === '의료/헬스케어' ? '🏥' :
                                 experience.category === '교육' ? '📚' : '🔧'}
                              </TimelineCertificationIcon>
                              <TimelineCertificationInfo>
                                <TimelineCertificationName>
                                  {experience.name}
                                </TimelineCertificationName>
                                <TimelineCertificationCategory>{experience.category}</TimelineCertificationCategory>
                              </TimelineCertificationInfo>
                              {experience.years.length > 0 && (
                                <CertificationGradeSelect
                                  value={experience.selectedYear}
                                  onChange={(e) => handleExperienceYearChange(experience.id, e.target.value)}
                                >
                                  <option value="">연도 선택</option>
                                  {experience.years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option>
                                  ))}
                                </CertificationGradeSelect>
                              )}
                              <div style={{ flex: 1 }}></div>
                              <TimelineRemoveButton
                                onClick={() => handleExperienceRemove(experience.id)}
                                aria-label={`${experience.name} 제거`}
                              >
                                ×
                              </TimelineRemoveButton>
                            </TimelineCertificationHeader>
                            <TimelineCertificationBody>
                              <span>{experience.description}</span>
                            </TimelineCertificationBody>
                          </TimelineCertificationCard>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </TimelineContainer>
                </CertificationTimeline>
              )}
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 기술/자격증 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>🔧</SectionIcon>
            기술/자격증
          </SectionTitle>
          <ResumeForm>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>보유 기술</FormLabel>
              
              {/* 기술 유형 필터 */}
              <SkillTypeFilter>
                {['전체', 'IT/개발', '디자인', '마케팅', '기타'].map((type) => (
                  <SkillTypeButton
                    key={type}
                    $active={skillTypeFilter === type}
                    onClick={(e) => {
                      e.preventDefault();
                      setSkillTypeFilter(type);
                    }}
                  >
                    {type}
                  </SkillTypeButton>
                ))}
              </SkillTypeFilter>

              {/* 스마트 검색 */}
              <SmartSearchContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                  type="text"
                  value={skillSearch}
                  onChange={handleSkillSearchChange}
                  onFocus={handleSkillSearchFocus}
                  onBlur={handleSkillSearchBlur}
                  placeholder="기술을 검색하세요 (예: JavaScript, React, Photoshop)"
                />
              </SmartSearchContainer>

              {/* 기술 카드 그리드 */}
              {showSkillDropdown && (
                <SkillCardGrid>
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        onClick={() => handleSkillSelect(skill)}
                      >
                        <SkillCardHeader>
                          <SkillIcon>
                            {skill.category === 'IT/개발' ? '💻' :
                             skill.category === '디자인' ? '🎨' :
                             skill.category === '마케팅' ? '📈' : '🔧'}
                          </SkillIcon>
                          <div>
                            <SkillCardName>{skill.name}</SkillCardName>
                            <SkillCardCategory>{skill.category}</SkillCardCategory>
                          </div>
                        </SkillCardHeader>
                        <SkillCardBody>
                          <SkillDescription>
                            {skill.description}
                          </SkillDescription>
                          <SkillCardFooter>
                            {skill.levels.length > 0 ? `${skill.levels.length}개 레벨 지원` : '전문 기술'}
                          </SkillCardFooter>
                        </SkillCardBody>
                      </SkillCard>
                    ))
                  ) : (
                    <NoResultsCard>검색 결과가 없습니다.</NoResultsCard>
                  )}
                </SkillCardGrid>
              )}

              {/* 선택된 기술 타임라인 */}
              {selectedSkills.length > 0 && (
                <SkillTimeline>
                  <TimelineTitle>🛠️ 보유 기술</TimelineTitle>
                  <TimelineContainer>
                    {selectedSkills.map((skill, index) => (
                      <TimelineItem key={skill.id}>
                        <TimelineContent>
                          <TimelineSkillCard>
                            <TimelineSkillHeader>
                              <TimelineSkillIcon>
                                {skill.category === 'IT/개발' ? '💻' :
                                 skill.category === '디자인' ? '🎨' :
                                 skill.category === '마케팅' ? '📈' : '🔧'}
                              </TimelineSkillIcon>
                              <TimelineSkillInfo>
                                <TimelineSkillName>
                                  {skill.name}
                                </TimelineSkillName>
                                <TimelineSkillCategory>{skill.category}</TimelineSkillCategory>
                              </TimelineSkillInfo>
                              {skill.levels.length > 0 && (
                                <SkillLevelSelect
                                  value={skill.level}
                                  onChange={(e) => handleSkillLevelChange(skill.id, e.target.value)}
                                >
                                  <option value="">레벨 선택</option>
                                  {skill.levels.map((level) => (
                                    <option key={level} value={level}>
                                      {level}
                                    </option>
                                  ))}
                                </SkillLevelSelect>
                              )}
                              <div style={{ flex: 1 }}></div>
                              <TimelineRemoveButton
                                onClick={() => handleSkillRemove(skill.id)}
                                aria-label={`${skill.name} 제거`}
                              >
                                ×
                              </TimelineRemoveButton>
                            </TimelineSkillHeader>
                            <TimelineSkillBody>
                              <span>{skill.description}</span>
                            </TimelineSkillBody>
                          </TimelineSkillCard>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </TimelineContainer>
                </SkillTimeline>
              )}
            </FormGroup>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>자격증</FormLabel>
              
              {/* 자격증 유형 필터 */}
              <CertificationTypeFilter>
                {['전체', 'IT/개발', '언어', '경영/사무', '건설/기술', '제조/생산', '서비스/영업', '기타'].map((type) => (
                  <CertificationTypeButton
                    key={type}
                    $active={certificationTypeFilter === type}
                    onClick={(e) => {
                      e.preventDefault();
                      setCertificationTypeFilter(type);
                    }}
                  >
                    {type}
                  </CertificationTypeButton>
                ))}
              </CertificationTypeFilter>

              {/* 스마트 검색 */}
              <SmartSearchContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                  type="text"
                  value={certificationSearch}
                  onChange={handleCertificationSearchChange}
                  onFocus={handleCertificationSearchFocus}
                  onBlur={handleCertificationSearchBlur}
                  placeholder="자격증을 검색하세요 (예: 정보처리기사, TOEIC, AWS)"
                />
              </SmartSearchContainer>

              {/* 자격증 카드 그리드 */}
              {showCertificationDropdown && (
                <CertificationCardGrid>
                  {filteredCertifications.length > 0 ? (
                    filteredCertifications.map((certification) => (
                      <CertificationCard
                        key={certification.id}
                        onClick={() => handleCertificationSelect(certification)}
                      >
                        <CertificationCardHeader>
                          <CertificationIcon>
                            {certification.category === 'IT/개발' ? '💻' :
                             certification.category === '언어' ? '🌍' :
                             certification.category === '경영/사무' ? '📊' :
                             certification.category === '건설/기술' ? '🏗️' :
                             certification.category === '제조/생산' ? '⚙️' :
                             certification.category === '서비스/영업' ? '🎯' : '🔧'}
                          </CertificationIcon>
                          <div>
                            <CertificationCardName>{certification.name}</CertificationCardName>
                            <CertificationCardCategory>{certification.category}</CertificationCardCategory>
                          </div>
                        </CertificationCardHeader>
                        <CertificationCardBody>
                          <CertificationDescription>
                            {certification.description}
                          </CertificationDescription>
                          <CertificationCardFooter>
                            {certification.grades.length > 0 ? `${certification.grades.length}개 급수 지원` : '전문 자격증'}
                          </CertificationCardFooter>
                        </CertificationCardBody>
                      </CertificationCard>
                    ))
                  ) : (
                    <NoResultsCard>검색 결과가 없습니다.</NoResultsCard>
                  )}
                </CertificationCardGrid>
              )}

              {/* 선택된 자격증 타임라인 */}
              {selectedCertifications.length > 0 && (
                <CertificationTimeline>
                  <TimelineTitle>🏆 보유 자격증</TimelineTitle>
                  <TimelineContainer>
                    {selectedCertifications.map((certification, index) => (
                      <TimelineItem key={certification.id}>
                        <TimelineContent>
                          <TimelineCertificationCard>
                            <TimelineCertificationHeader>
                              <TimelineCertificationIcon>
                                {certification.category === 'IT/개발' ? '💻' :
                                 certification.category === '언어' ? '🌍' :
                                 certification.category === '경영/사무' ? '📊' :
                                 certification.category === '건설/기술' ? '🏗️' :
                                 certification.category === '제조/생산' ? '⚙️' :
                                 certification.category === '서비스/영업' ? '🎯' : '🔧'}
                              </TimelineCertificationIcon>
                              <TimelineCertificationInfo>
                                <TimelineCertificationName>
                                  {certification.name}
                                </TimelineCertificationName>
                                <TimelineCertificationCategory>{certification.category}</TimelineCertificationCategory>
                              </TimelineCertificationInfo>
                              {certification.grades.length > 0 && (
                                <CertificationGradeSelect
                                  value={certification.grade}
                                  onChange={(e) => handleCertificationGradeChange(certification.id, e.target.value)}
                                >
                                  <option value="">급수 선택</option>
                                  {certification.grades.map((grade) => (
                                    <option key={grade} value={grade}>
                                      {grade}
                                    </option>
                                  ))}
                                </CertificationGradeSelect>
                              )}
                              <div style={{ flex: 1 }}></div>
                              <TimelineRemoveButton
                                onClick={() => handleCertificationRemove(certification.id)}
                                aria-label={`${certification.name} 제거`}
                              >
                                ×
                              </TimelineRemoveButton>
                            </TimelineCertificationHeader>
                            <TimelineCertificationBody>
                              <span>{certification.description}</span>
                            </TimelineCertificationBody>
                          </TimelineCertificationCard>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </TimelineContainer>
                </CertificationTimeline>
              )}
            </FormGroup>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>어학 능력</FormLabel>
              
              {/* 어학 유형 필터 */}
              <LanguageTypeFilter>
                {['전체', '영어', '한국어', '중국어', '일본어', '베트남어', '태국어', '러시아어', '독일어', '프랑스어', '스페인어', '이탈리아어'].map((type) => (
                  <LanguageTypeButton
                    key={type}
                    $active={languageTypeFilter === type}
                    onClick={(e) => {
                      e.preventDefault();
                      setLanguageTypeFilter(type);
                    }}
                  >
                    {type}
                  </LanguageTypeButton>
                ))}
              </LanguageTypeFilter>

              {/* 스마트 검색 */}
              <SmartSearchContainer>
                <SearchIcon>🔍</SearchIcon>
                <SearchInput
                  type="text"
                  value={languageSearch}
                  onChange={handleLanguageSearchChange}
                  onFocus={handleLanguageSearchFocus}
                  onBlur={handleLanguageSearchBlur}
                  placeholder="어학 능력을 검색하세요 (예: TOEIC, TOPIK, JLPT)"
                />
              </SmartSearchContainer>

              {/* 어학 카드 그리드 */}
              {showLanguageDropdown && (
                <LanguageCardGrid>
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((language) => (
                      <LanguageCard
                        key={language.id}
                        onClick={() => handleLanguageSelect(language)}
                      >
                        <LanguageCardHeader>
                          <LanguageIcon>{language.category === '영어' ? '🇺🇸' : 
                                           language.category === '한국어' ? '🇰🇷' :
                                           language.category === '중국어' ? '🇨🇳' :
                                           language.category === '일본어' ? '🇯🇵' :
                                           language.category === '베트남어' ? '🇻🇳' :
                                           language.category === '태국어' ? '🇹🇭' :
                                           language.category === '러시아어' ? '🇷🇺' :
                                           language.category === '독일어' ? '🇩🇪' :
                                           language.category === '프랑스어' ? '🇫🇷' :
                                           language.category === '스페인어' ? '🇪🇸' :
                                           language.category === '이탈리아어' ? '🇮🇹' : '🌐'}</LanguageIcon>
                          <div>
                            <LanguageName>{language.name}</LanguageName>
                            <LanguageCategory>{language.category}</LanguageCategory>
                          </div>
                        </LanguageCardHeader>
                        <LanguageCardBody>
                          <LanguageDescription>
                            {language.name === 'TOEIC' ? '영어 능력 평가 시험' :
                             language.name === 'TOPIK' ? '한국어 능력 평가 시험' :
                             language.name === 'JLPT' ? '일본어 능력 평가 시험' :
                             language.name === 'HSK' ? '중국어 능력 평가 시험' :
                             language.name} 시험
                          </LanguageDescription>
                          <LanguageCardFooter>
                            {language.levels.length}개 레벨 지원
                          </LanguageCardFooter>
                        </LanguageCardBody>
                      </LanguageCard>
                    ))
                  ) : (
                    <NoResultsCard>검색 결과가 없습니다.</NoResultsCard>
                  )}
                </LanguageCardGrid>
              )}

              {/* 선택된 어학 타임라인 */}
              {selectedLanguages.length > 0 && (
                <LanguageTimeline>
                  <TimelineTitle>🌍 어학 능력</TimelineTitle>
                  <TimelineContainer>
                    {selectedLanguages.map((language, index) => (
                      <TimelineItem key={language.id}>
                        <TimelineContent>
                          <TimelineLanguageCard>
                            <TimelineLanguageHeader>
                              <TimelineLanguageIcon>{language.category === '영어' ? '🇺🇸' : 
                                                   language.category === '한국어' ? '🇰🇷' :
                                                   language.category === '중국어' ? '🇨🇳' :
                                                   language.category === '일본어' ? '🇯🇵' :
                                                   language.category === '베트남어' ? '🇻🇳' :
                                                   language.category === '태국어' ? '🇹🇭' :
                                                   language.category === '러시아어' ? '🇷🇺' :
                                                   language.category === '독일어' ? '🇩🇪' :
                                                   language.category === '프랑스어' ? '🇫🇷' :
                                                   language.category === '스페인어' ? '🇪🇸' :
                                                   language.category === '이탈리아어' ? '🇮🇹' : '🌐'}</TimelineLanguageIcon>
                              <TimelineLanguageInfo>
                                <TimelineLanguageName>{language.name}</TimelineLanguageName>
                                <TimelineLanguageCategory>{language.category}</TimelineLanguageCategory>
                              </TimelineLanguageInfo>
                              {language.levels && language.levels.length > 0 && (
                                <LanguageLevelSelect
                                  value={language.level}
                                  onChange={(e) => handleLanguageLevelChange(language.id, e.target.value)}
                                >
                                  <option value="">레벨 선택</option>
                                  {language.levels.map((level) => (
                                    <option key={level} value={level}>
                                      {level}
                                    </option>
                                  ))}
                                </LanguageLevelSelect>
                              )}
                              <div style={{ flex: 1 }}></div>
                              <TimelineRemoveButton
                                onClick={() => handleLanguageRemove(language.id)}
                                aria-label={`${language.name} 제거`}
                              >
                                ×
                              </TimelineRemoveButton>
                            </TimelineLanguageHeader>
                            <TimelineLanguageBody>
                              <span>{language.name === 'TOEIC' ? '영어 능력 평가 시험' :
                                     language.name === 'TOPIK' ? '한국어 능력 평가 시험' :
                                     language.name === 'JLPT' ? '일본어 능력 평가 시험' :
                                     language.name === 'HSK' ? '중국어 능력 평가 시험' :
                                     language.name} 시험</span>
                            </TimelineLanguageBody>
                          </TimelineLanguageCard>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                  </TimelineContainer>
                </LanguageTimeline>
              )}
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 자기소개서 섹션 */}
        <ResumeSection>
          <SectionTitle>
            <SectionIcon>📄</SectionIcon>
            자기소개서
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>자기소개</FormLabel>
              <FormInput 
                as="textarea" 
                name="introduction"
                value={formData.introduction}
                onChange={handleInputChange}
                placeholder="자기소개를 입력하세요 (성장 과정, 지원 동기, 포부 등을 포함하여 작성하세요)"
                rows={6}
              />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        {/* 에러 메시지 */}
        {error && (
          <div role="alert" style={{ 
            color: 'red', 
            backgroundColor: '#fef2f2', 
            border: '1px solid #fecaca', 
            borderRadius: '8px', 
            padding: '1rem', 
            marginBottom: '1rem' 
          }}>
            {error}
          </div>
        )}



        {/* 하단 버튼 */}
        <ButtonGroup>
          <PrimaryButton 
            onClick={handleSave}
            disabled={loading}
            aria-label="이력서 저장"
          >
            {loading ? '저장 중...' : '저장'}
          </PrimaryButton>
          <SecondaryButton 
            onClick={handlePreview}
            aria-label="이력서 미리보기"
          >
            미리보기
          </SecondaryButton>
        </ButtonGroup>
      </ResumeContent>
      <MainFooter />
      
      {/* 미리보기 모달 */}
      <PreviewModal />
    </ResumeContainer>
  );
};

export default ResumePage;
