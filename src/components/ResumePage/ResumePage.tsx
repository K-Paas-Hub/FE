import React, { useState } from 'react';
import { MainHeader, MainFooter } from '../';
import { useResumeForm } from '../../hooks/useResumeForm';
import AddressSearch from '../AddressSearch';
import { AddressData } from '../../services/kakaoAddressService';
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
  { id: '1', name: '정보처리기사', category: 'IT/개발', description: '정보처리 관련 국가기술자격증' },
  { id: '2', name: '컴퓨터활용능력', category: 'IT/개발', description: '컴퓨터 활용 능력 평가 자격증' },
  { id: '3', name: 'SQLD', category: 'IT/개발', description: 'SQL 개발자 자격증' },
  { id: '4', name: 'SQLP', category: 'IT/개발', description: 'SQL 전문가 자격증' },
  { id: '5', name: 'ADsP', category: 'IT/개발', description: '데이터분석 준전문가' },
  { id: '6', name: 'ADP', category: 'IT/개발', description: '데이터분석 전문가' },
  { id: '7', name: 'ADsP', category: 'IT/개발', description: '데이터분석 준전문가' },
  { id: '8', name: '빅데이터분석기사', category: 'IT/개발', description: '빅데이터 분석 국가기술자격증' },
  { id: '9', name: 'AWS Solutions Architect', category: 'IT/개발', description: 'AWS 솔루션스 아키텍트 자격증' },
  { id: '10', name: 'AWS Developer', category: 'IT/개발', description: 'AWS 개발자 자격증' },
  { id: '11', name: 'AWS SysOps Administrator', category: 'IT/개발', description: 'AWS 시스템 운영 관리자 자격증' },
  { id: '12', name: 'Microsoft Azure Administrator', category: 'IT/개발', description: 'Microsoft Azure 관리자 자격증' },
  { id: '13', name: 'Microsoft Azure Developer', category: 'IT/개발', description: 'Microsoft Azure 개발자 자격증' },
  { id: '14', name: 'Google Cloud Professional', category: 'IT/개발', description: 'Google Cloud 전문가 자격증' },
  { id: '15', name: 'PMP', category: 'IT/개발', description: '프로젝트 관리 전문가 자격증' },
  { id: '16', name: 'PRINCE2', category: 'IT/개발', description: '프로젝트 관리 방법론 자격증' },
  { id: '17', name: 'ITIL', category: 'IT/개발', description: 'IT 서비스 관리 자격증' },
  { id: '18', name: 'CISSP', category: 'IT/개발', description: '정보보안 전문가 자격증' },
  { id: '19', name: 'CEH', category: 'IT/개발', description: '윤리적 해커 자격증' },
  { id: '20', name: 'CompTIA Security+', category: 'IT/개발', description: '정보보안 기초 자격증' },
  
  // 언어 관련
  { id: '21', name: 'TOEIC', category: '언어', description: '영어 능력 평가 시험' },
  { id: '22', name: 'TOEFL', category: '언어', description: '영어 능력 평가 시험' },
  { id: '23', name: 'IELTS', category: '언어', description: '영어 능력 평가 시험' },
  { id: '24', name: 'TOPIK', category: '언어', description: '한국어 능력 평가 시험' },
  { id: '25', name: 'JLPT', category: '언어', description: '일본어 능력 평가 시험' },
  { id: '26', name: 'HSK', category: '언어', description: '중국어 능력 평가 시험' },
  { id: '27', name: 'DELE', category: '언어', description: '스페인어 능력 평가 시험' },
  { id: '28', name: 'DELF', category: '언어', description: '프랑스어 능력 평가 시험' },
  { id: '29', name: 'TestDaF', category: '언어', description: '독일어 능력 평가 시험' },
  { id: '30', name: 'CELI', category: '언어', description: '이탈리아어 능력 평가 시험' },
  
  // 경영/사무 관련
  { id: '31', name: '사무자동화산업기사', category: '경영/사무', description: '사무 자동화 관련 국가기술자격증' },
  { id: '32', name: '컴퓨터활용능력', category: '경영/사무', description: '컴퓨터 활용 능력 평가 자격증' },
  { id: '33', name: '워드프로세서', category: '경영/사무', description: '워드프로세서 자격증' },
  { id: '34', name: '컴퓨터활용능력', category: '경영/사무', description: '컴퓨터 활용 능력 평가 자격증' },
  { id: '35', name: '한글속기', category: '경영/사무', description: '한글 속기 자격증' },
  { id: '36', name: '비서', category: '경영/사무', description: '비서 자격증' },
  { id: '37', name: '사무관리', category: '경영/사무', description: '사무 관리 자격증' },
  { id: '38', name: '경영지도사', category: '경영/사무', description: '경영 지도 자격증' },
  { id: '39', name: '세무사', category: '경영/사무', description: '세무 관련 전문 자격증' },
  { id: '40', name: '관세사', category: '경영/사무', description: '관세 관련 전문 자격증' },
  
  // 건설/기술 관련
  { id: '41', name: '건축기사', category: '건설/기술', description: '건축 관련 국가기술자격증' },
  { id: '42', name: '토목기사', category: '건설/기술', description: '토목 관련 국가기술자격증' },
  { id: '43', name: '전기기사', category: '건설/기술', description: '전기 관련 국가기술자격증' },
  { id: '44', name: '기계기사', category: '건설/기술', description: '기계 관련 국가기술자격증' },
  { id: '45', name: '화공기사', category: '건설/기술', description: '화학공학 관련 국가기술자격증' },
  { id: '46', name: '산업안전기사', category: '건설/기술', description: '산업안전 관련 국가기술자격증' },
  { id: '47', name: '건설안전기사', category: '건설/기술', description: '건설안전 관련 국가기술자격증' },
  { id: '48', name: '소방설비기사', category: '건설/기술', description: '소방설비 관련 국가기술자격증' },
  { id: '49', name: '조경기사', category: '건설/기술', description: '조경 관련 국가기술자격증' },
  { id: '50', name: '측량및지형공간정보기사', category: '건설/기술', description: '측량 관련 국가기술자격증' },
  
  // 제조/생산 관련
  { id: '51', name: '용접기사', category: '제조/생산', description: '용접 관련 국가기술자격증' },
  { id: '52', name: '금형기사', category: '제조/생산', description: '금형 관련 국가기술자격증' },
  { id: '53', name: '사출금형기사', category: '제조/생산', description: '사출금형 관련 국가기술자격증' },
  { id: '54', name: '프레스금형기사', category: '제조/생산', description: '프레스금형 관련 국가기술자격증' },
  { id: '55', name: '절삭기사', category: '제조/생산', description: '절삭 관련 국가기술자격증' },
  { id: '56', name: '기계조립기사', category: '제조/생산', description: '기계조립 관련 국가기술자격증' },
  { id: '57', name: '정밀측정기사', category: '제조/생산', description: '정밀측정 관련 국가기술자격증' },
  { id: '58', name: '품질경영기사', category: '제조/생산', description: '품질경영 관련 국가기술자격증' },
  { id: '59', name: '생산관리기사', category: '제조/생산', description: '생산관리 관련 국가기술자격증' },
  { id: '60', name: '자동화기사', category: '제조/생산', description: '자동화 관련 국가기술자격증' },
  
  // 서비스/영업 관련
  { id: '61', name: '여행상품개발', category: '서비스/영업', description: '여행상품개발 자격증' },
  { id: '62', name: '관광통역안내사', category: '서비스/영업', description: '관광통역안내사 자격증' },
  { id: '63', name: '호텔경영사', category: '서비스/영업', description: '호텔경영사 자격증' },
  { id: '64', name: '외식경영사', category: '서비스/영업', description: '외식경영사 자격증' },
  { id: '65', name: '미용사', category: '서비스/영업', description: '미용사 자격증' },
  { id: '66', name: '이미용사', category: '서비스/영업', description: '이미용사 자격증' },
  { id: '67', name: '네일아트', category: '서비스/영업', description: '네일아트 자격증' },
  { id: '68', name: '피부관리사', category: '서비스/영업', description: '피부관리사 자격증' },
  { id: '69', name: '스포츠마사지', category: '서비스/영업', description: '스포츠마사지 자격증' },
  { id: '70', name: '요양보호사', category: '서비스/영업', description: '요양보호사 자격증' },
  
  // 기타
  { id: '71', name: '운전면허', category: '기타', description: '운전면허증' },
  { id: '72', name: '포크레인운전기능사', category: '기타', description: '포크레인운전기능사 자격증' },
  { id: '73', name: '지게차운전기능사', category: '기타', description: '지게차운전기능사 자격증' },
  { id: '74', name: '굴삭기운전기능사', category: '기타', description: '굴삭기운전기능사 자격증' },
  { id: '75', name: '기중기운전기능사', category: '기타', description: '기중기운전기능사 자격증' }
];

// 어학 능력 데이터
const languageData = [
  // 영어 관련
  { id: '1', name: 'TOEIC', category: '영어', description: '영어 능력 평가 시험', levels: ['300-400', '400-500', '500-600', '600-700', '700-800', '800-900', '900-990'] },
  { id: '2', name: 'TOEFL', category: '영어', description: '영어 능력 평가 시험', levels: ['iBT 60-80', 'iBT 80-100', 'iBT 100-120'] },
  { id: '3', name: 'IELTS', category: '영어', description: '영어 능력 평가 시험', levels: ['4.0-5.0', '5.0-6.0', '6.0-7.0', '7.0-8.0', '8.0-9.0'] },
  { id: '4', name: 'OPIc', category: '영어', description: '영어 말하기 능력 평가', levels: ['AL', 'AM', 'AH', 'IL', 'IM', 'IH', 'AL'] },
  { id: '5', name: 'TEPS', category: '영어', description: '영어 능력 평가 시험', levels: ['300-400', '400-500', '500-600', '600-700', '700-800', '800-900'] },
  
  // 한국어 관련
  { id: '6', name: 'TOPIK', category: '한국어', description: '한국어 능력 평가 시험', levels: ['1급', '2급', '3급', '4급', '5급', '6급'] },
  { id: '7', name: 'KLT', category: '한국어', description: '한국어 학습자 평가', levels: ['초급', '중급', '고급'] },
  
  // 일본어 관련
  { id: '8', name: 'JLPT', category: '일본어', description: '일본어 능력 평가 시험', levels: ['N5', 'N4', 'N3', 'N2', 'N1'] },
  { id: '9', name: 'JPT', category: '일본어', description: '일본어 능력 평가 시험', levels: ['200-300', '300-400', '400-500', '500-600', '600-700', '700-800'] },
  
  // 중국어 관련
  { id: '10', name: 'HSK', category: '중국어', description: '중국어 능력 평가 시험', levels: ['1급', '2급', '3급', '4급', '5급', '6급'] },
  { id: '11', name: 'TSC', category: '중국어', description: '중국어 말하기 능력 평가', levels: ['초급', '중급', '고급'] },
  
  // 기타 언어
  { id: '12', name: 'DELE', category: '스페인어', description: '스페인어 능력 평가 시험', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { id: '13', name: 'DELF', category: '프랑스어', description: '프랑스어 능력 평가 시험', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { id: '14', name: 'TestDaF', category: '독일어', description: '독일어 능력 평가 시험', levels: ['TDN 3', 'TDN 4', 'TDN 5'] },
  { id: '15', name: 'CELI', category: '이탈리아어', description: '이탈리아어 능력 평가 시험', levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] },
  { id: '16', name: 'CELPE-Bras', category: '포르투갈어', description: '포르투갈어 능력 평가 시험', levels: ['중급', '고급'] },
  { id: '17', name: 'TOPIK II', category: '한국어', description: '한국어 능력 평가 시험 (고급)', levels: ['3급', '4급', '5급', '6급'] },
  { id: '18', name: 'OPIc 한국어', category: '한국어', description: '한국어 말하기 능력 평가', levels: ['AL', 'AM', 'AH', 'IL', 'IM', 'IH', 'AL'] },
  
  // 기타
  { id: '19', name: '기타 어학시험', category: '기타', description: '기타 어학 능력 평가', levels: ['초급', '중급', '고급'] }
];

// 학교 데이터
const schoolData = [
  // 초등학교
  { id: '1', name: '서울초등학교', category: '초등학교', type: '초등학교' },
  { id: '2', name: '부산초등학교', category: '초등학교', type: '초등학교' },
  { id: '3', name: '대구초등학교', category: '초등학교', type: '초등학교' },
  { id: '4', name: '인천초등학교', category: '초등학교', type: '초등학교' },
  { id: '5', name: '광주초등학교', category: '초등학교', type: '초등학교' },
  { id: '6', name: '대전초등학교', category: '초등학교', type: '초등학교' },
  { id: '7', name: '울산초등학교', category: '초등학교', type: '초등학교' },
  { id: '8', name: '세종초등학교', category: '초등학교', type: '초등학교' },
  
  // 중학교
  { id: '9', name: '서울중학교', category: '중학교', type: '중학교' },
  { id: '10', name: '부산중학교', category: '중학교', type: '중학교' },
  { id: '11', name: '대구중학교', category: '중학교', type: '중학교' },
  { id: '12', name: '인천중학교', category: '중학교', type: '중학교' },
  { id: '13', name: '광주중학교', category: '중학교', type: '중학교' },
  { id: '14', name: '대전중학교', category: '중학교', type: '중학교' },
  { id: '15', name: '울산중학교', category: '중학교', type: '중학교' },
  { id: '16', name: '세종중학교', category: '중학교', type: '중학교' },
  
  // 고등학교
  { id: '17', name: '서울고등학교', category: '고등학교', type: '고등학교' },
  { id: '18', name: '부산고등학교', category: '고등학교', type: '고등학교' },
  { id: '19', name: '대구고등학교', category: '고등학교', type: '고등학교' },
  { id: '20', name: '인천고등학교', category: '고등학교', type: '고등학교' },
  { id: '21', name: '광주고등학교', category: '고등학교', type: '고등학교' },
  { id: '22', name: '대전고등학교', category: '고등학교', type: '고등학교' },
  { id: '23', name: '울산고등학교', category: '고등학교', type: '고등학교' },
  { id: '24', name: '세종고등학교', category: '고등학교', type: '고등학교' },
  { id: '25', name: '서울과학고등학교', category: '고등학교', type: '고등학교' },
  { id: '26', name: '서울외국어고등학교', category: '고등학교', type: '고등학교' },
  { id: '27', name: '서울예술고등학교', category: '고등학교', type: '고등학교' },
  { id: '28', name: '서울체육고등학교', category: '고등학교', type: '고등학교' },
  { id: '29', name: '서울산업정보고등학교', category: '고등학교', type: '고등학교' },
  { id: '30', name: '서울공업고등학교', category: '고등학교', type: '고등학교' },
  
  // 전문대학
  { id: '31', name: '서울전문대학', category: '전문대학', type: '전문대학' },
  { id: '32', name: '부산전문대학', category: '전문대학', type: '전문대학' },
  { id: '33', name: '대구전문대학', category: '전문대학', type: '전문대학' },
  { id: '34', name: '인천전문대학', category: '전문대학', type: '전문대학' },
  { id: '35', name: '광주전문대학', category: '전문대학', type: '전문대학' },
  { id: '36', name: '대전전문대학', category: '전문대학', type: '전문대학' },
  { id: '37', name: '울산전문대학', category: '전문대학', type: '전문대학' },
  { id: '38', name: '세종전문대학', category: '전문대학', type: '전문대학' },
  
  // 대학교
  { id: '39', name: '서울대학교', category: '대학교', type: '대학교' },
  { id: '40', name: '연세대학교', category: '대학교', type: '대학교' },
  { id: '41', name: '고려대학교', category: '대학교', type: '대학교' },
  { id: '42', name: '성균관대학교', category: '대학교', type: '대학교' },
  { id: '43', name: '한양대학교', category: '대학교', type: '대학교' },
  { id: '44', name: '중앙대학교', category: '대학교', type: '대학교' },
  { id: '45', name: '경희대학교', category: '대학교', type: '대학교' },
  { id: '46', name: '부산대학교', category: '대학교', type: '대학교' },
  { id: '47', name: '대구대학교', category: '대학교', type: '대학교' },
  { id: '48', name: '인천대학교', category: '대학교', type: '대학교' },
  { id: '49', name: '광주대학교', category: '대학교', type: '대학교' },
  { id: '50', name: '대전대학교', category: '대학교', type: '대학교' },
  { id: '51', name: '울산대학교', category: '대학교', type: '대학교' },
  { id: '52', name: '세종대학교', category: '대학교', type: '대학교' },
  { id: '53', name: '서강대학교', category: '대학교', type: '대학교' },
  { id: '54', name: '동국대학교', category: '대학교', type: '대학교' },
  { id: '55', name: '건국대학교', category: '대학교', type: '대학교' },
  { id: '56', name: '홍익대학교', category: '대학교', type: '대학교' },
  { id: '57', name: '숙명여자대학교', category: '대학교', type: '대학교' },
  { id: '58', name: '이화여자대학교', category: '대학교', type: '대학교' },
  { id: '59', name: '서울여자대학교', category: '대학교', type: '대학교' },
  { id: '60', name: '단국대학교', category: '대학교', type: '대학교' },
  { id: '61', name: '아주대학교', category: '대학교', type: '대학교' },
  { id: '62', name: '인하대학교', category: '대학교', type: '대학교' },
  { id: '63', name: '숭실대학교', category: '대학교', type: '대학교' },
  { id: '64', name: '명지대학교', category: '대학교', type: '대학교' },
  { id: '65', name: '상명대학교', category: '대학교', type: '대학교' },
  { id: '66', name: '국민대학교', category: '대학교', type: '대학교' },
  { id: '67', name: '동덕여자대학교', category: '대학교', type: '대학교' },
  { id: '68', name: '덕성여자대학교', category: '대학교', type: '대학교' },
  { id: '69', name: '가톨릭대학교', category: '대학교', type: '대학교' },
  { id: '70', name: '한국외국어대학교', category: '대학교', type: '대학교' },
  { id: '71', name: '한국교원대학교', category: '대학교', type: '대학교' },
  { id: '72', name: '한국체육대학교', category: '대학교', type: '대학교' },
  { id: '73', name: '한국예술종합학교', category: '대학교', type: '대학교' },
  { id: '74', name: '한국기술교육대학교', category: '대학교', type: '대학교' },
  { id: '75', name: '한국산업기술대학교', category: '대학교', type: '대학교' },
  
  // 대학원
  { id: '76', name: '서울대학교 대학원', category: '대학원', type: '대학원' },
  { id: '77', name: '연세대학교 대학원', category: '대학원', type: '대학원' },
  { id: '78', name: '고려대학교 대학원', category: '대학원', type: '대학원' },
  { id: '79', name: '성균관대학교 대학원', category: '대학원', type: '대학원' },
  { id: '80', name: '한양대학교 대학원', category: '대학원', type: '대학원' },
  { id: '81', name: '중앙대학교 대학원', category: '대학원', type: '대학원' },
  { id: '82', name: '경희대학교 대학원', category: '대학원', type: '대학원' },
  { id: '83', name: '부산대학교 대학원', category: '대학원', type: '대학원' },
  { id: '84', name: '대구대학교 대학원', category: '대학원', type: '대학원' },
  { id: '85', name: '인천대학교 대학원', category: '대학원', type: '대학원' },
  { id: '86', name: '광주대학교 대학원', category: '대학원', type: '대학원' },
  { id: '87', name: '대전대학교 대학원', category: '대학원', type: '대학원' },
  { id: '88', name: '울산대학교 대학원', category: '대학원', type: '대학원' },
  { id: '89', name: '세종대학교 대학원', category: '대학원', type: '대학원' },
  
  // 기타
  { id: '90', name: '기타 학교', category: '기타', type: '기타' }
];

// 졸업 상태 옵션
const graduationStatusOptions = [
  { value: '졸업', label: '졸업' },
  { value: '중퇴', label: '중퇴' },
  { value: '재학', label: '재학' },
  { value: '휴학', label: '휴학' },
  { value: '수료', label: '수료' }
];

// 주소 데이터
const addressData = [
  // 서울특별시
  { id: '1', name: '서울특별시 강남구', category: '서울특별시', type: '강남구' },
  { id: '2', name: '서울특별시 강동구', category: '서울특별시', type: '강동구' },
  { id: '3', name: '서울특별시 강북구', category: '서울특별시', type: '강북구' },
  { id: '4', name: '서울특별시 강서구', category: '서울특별시', type: '강서구' },
  { id: '5', name: '서울특별시 관악구', category: '서울특별시', type: '관악구' },
  { id: '6', name: '서울특별시 광진구', category: '서울특별시', type: '광진구' },
  { id: '7', name: '서울특별시 구로구', category: '서울특별시', type: '구로구' },
  { id: '8', name: '서울특별시 금천구', category: '서울특별시', type: '금천구' },
  { id: '9', name: '서울특별시 노원구', category: '서울특별시', type: '노원구' },
  { id: '10', name: '서울특별시 도봉구', category: '서울특별시', type: '도봉구' },
  { id: '11', name: '서울특별시 동대문구', category: '서울특별시', type: '동대문구' },
  { id: '12', name: '서울특별시 동작구', category: '서울특별시', type: '동작구' },
  { id: '13', name: '서울특별시 마포구', category: '서울특별시', type: '마포구' },
  { id: '14', name: '서울특별시 서대문구', category: '서울특별시', type: '서대문구' },
  { id: '15', name: '서울특별시 서초구', category: '서울특별시', type: '서초구' },
  { id: '16', name: '서울특별시 성동구', category: '서울특별시', type: '성동구' },
  { id: '17', name: '서울특별시 성북구', category: '서울특별시', type: '성북구' },
  { id: '18', name: '서울특별시 송파구', category: '서울특별시', type: '송파구' },
  { id: '19', name: '서울특별시 양천구', category: '서울특별시', type: '양천구' },
  { id: '20', name: '서울특별시 영등포구', category: '서울특별시', type: '영등포구' },
  { id: '21', name: '서울특별시 용산구', category: '서울특별시', type: '용산구' },
  { id: '22', name: '서울특별시 은평구', category: '서울특별시', type: '은평구' },
  { id: '23', name: '서울특별시 종로구', category: '서울특별시', type: '종로구' },
  { id: '24', name: '서울특별시 중구', category: '서울특별시', type: '중구' },
  { id: '25', name: '서울특별시 중랑구', category: '서울특별시', type: '중랑구' },
  
  // 부산광역시
  { id: '26', name: '부산광역시 강서구', category: '부산광역시', type: '강서구' },
  { id: '27', name: '부산광역시 금정구', category: '부산광역시', type: '금정구' },
  { id: '28', name: '부산광역시 남구', category: '부산광역시', type: '남구' },
  { id: '29', name: '부산광역시 동구', category: '부산광역시', type: '동구' },
  { id: '30', name: '부산광역시 동래구', category: '부산광역시', type: '동래구' },
  { id: '31', name: '부산광역시 부산진구', category: '부산광역시', type: '부산진구' },
  { id: '32', name: '부산광역시 북구', category: '부산광역시', type: '북구' },
  { id: '33', name: '부산광역시 사상구', category: '부산광역시', type: '사상구' },
  { id: '34', name: '부산광역시 사하구', category: '부산광역시', type: '사하구' },
  { id: '35', name: '부산광역시 서구', category: '부산광역시', type: '서구' },
  { id: '36', name: '부산광역시 수영구', category: '부산광역시', type: '수영구' },
  { id: '37', name: '부산광역시 연제구', category: '부산광역시', type: '연제구' },
  { id: '38', name: '부산광역시 영도구', category: '부산광역시', type: '영도구' },
  { id: '39', name: '부산광역시 중구', category: '부산광역시', type: '중구' },
  { id: '40', name: '부산광역시 해운대구', category: '부산광역시', type: '해운대구' },
  { id: '41', name: '부산광역시 기장군', category: '부산광역시', type: '기장군' },
  
  // 대구광역시
  { id: '42', name: '대구광역시 남구', category: '대구광역시', type: '남구' },
  { id: '43', name: '대구광역시 달서구', category: '대구광역시', type: '달서구' },
  { id: '44', name: '대구광역시 달성군', category: '대구광역시', type: '달성군' },
  { id: '45', name: '대구광역시 동구', category: '대구광역시', type: '동구' },
  { id: '46', name: '대구광역시 북구', category: '대구광역시', type: '북구' },
  { id: '47', name: '대구광역시 서구', category: '대구광역시', type: '서구' },
  { id: '48', name: '대구광역시 수성구', category: '대구광역시', type: '수성구' },
  { id: '49', name: '대구광역시 중구', category: '대구광역시', type: '중구' },
  
  // 인천광역시
  { id: '50', name: '인천광역시 계양구', category: '인천광역시', type: '계양구' },
  { id: '51', name: '인천광역시 남구', category: '인천광역시', type: '남구' },
  { id: '52', name: '인천광역시 남동구', category: '인천광역시', type: '남동구' },
  { id: '53', name: '인천광역시 동구', category: '인천광역시', type: '동구' },
  { id: '54', name: '인천광역시 부평구', category: '인천광역시', type: '부평구' },
  { id: '55', name: '인천광역시 서구', category: '인천광역시', type: '서구' },
  { id: '56', name: '인천광역시 연수구', category: '인천광역시', type: '연수구' },
  { id: '57', name: '인천광역시 중구', category: '인천광역시', type: '중구' },
  { id: '58', name: '인천광역시 강화군', category: '인천광역시', type: '강화군' },
  { id: '59', name: '인천광역시 옹진군', category: '인천광역시', type: '옹진군' },
  
  // 광주광역시
  { id: '60', name: '광주광역시 광산구', category: '광주광역시', type: '광산구' },
  { id: '61', name: '광주광역시 남구', category: '광주광역시', type: '남구' },
  { id: '62', name: '광주광역시 동구', category: '광주광역시', type: '동구' },
  { id: '63', name: '광주광역시 북구', category: '광주광역시', type: '북구' },
  { id: '64', name: '광주광역시 서구', category: '광주광역시', type: '서구' },
  
  // 대전광역시
  { id: '65', name: '대전광역시 대덕구', category: '대전광역시', type: '대덕구' },
  { id: '66', name: '대전광역시 동구', category: '대전광역시', type: '동구' },
  { id: '67', name: '대전광역시 서구', category: '대전광역시', type: '서구' },
  { id: '68', name: '대전광역시 유성구', category: '대전광역시', type: '유성구' },
  { id: '69', name: '대전광역시 중구', category: '대전광역시', type: '중구' },
  
  // 울산광역시
  { id: '70', name: '울산광역시 남구', category: '울산광역시', type: '남구' },
  { id: '71', name: '울산광역시 동구', category: '울산광역시', type: '동구' },
  { id: '72', name: '울산광역시 북구', category: '울산광역시', type: '북구' },
  { id: '73', name: '울산광역시 중구', category: '울산광역시', type: '중구' },
  { id: '74', name: '울산광역시 울주군', category: '울산광역시', type: '울주군' },
  
  // 세종특별자치시
  { id: '75', name: '세종특별자치시', category: '세종특별자치시', type: '세종특별자치시' },
  
  // 경기도
  { id: '76', name: '경기도 수원시', category: '경기도', type: '수원시' },
  { id: '77', name: '경기도 성남시', category: '경기도', type: '성남시' },
  { id: '78', name: '경기도 의정부시', category: '경기도', type: '의정부시' },
  { id: '79', name: '경기도 안양시', category: '경기도', type: '안양시' },
  { id: '80', name: '경기도 부천시', category: '경기도', type: '부천시' },
  { id: '81', name: '경기도 광명시', category: '경기도', type: '광명시' },
  { id: '82', name: '경기도 평택시', category: '경기도', type: '평택시' },
  { id: '83', name: '경기도 동두천시', category: '경기도', type: '동두천시' },
  { id: '84', name: '경기도 안산시', category: '경기도', type: '안산시' },
  { id: '85', name: '경기도 고양시', category: '경기도', type: '고양시' },
  { id: '86', name: '경기도 과천시', category: '경기도', type: '과천시' },
  { id: '87', name: '경기도 구리시', category: '경기도', type: '구리시' },
  { id: '88', name: '경기도 남양주시', category: '경기도', type: '남양주시' },
  { id: '89', name: '경기도 오산시', category: '경기도', type: '오산시' },
  { id: '90', name: '경기도 시흥시', category: '경기도', type: '시흥시' },
  { id: '91', name: '경기도 군포시', category: '경기도', type: '군포시' },
  { id: '92', name: '경기도 의왕시', category: '경기도', type: '의왕시' },
  { id: '93', name: '경기도 하남시', category: '경기도', type: '하남시' },
  { id: '94', name: '경기도 용인시', category: '경기도', type: '용인시' },
  { id: '95', name: '경기도 파주시', category: '경기도', type: '파주시' },
  { id: '96', name: '경기도 이천시', category: '경기도', type: '이천시' },
  { id: '97', name: '경기도 안성시', category: '경기도', type: '안성시' },
  { id: '98', name: '경기도 김포시', category: '경기도', type: '김포시' },
  { id: '99', name: '경기도 화성시', category: '경기도', type: '화성시' },
  { id: '100', name: '경기도 광주시', category: '경기도', type: '광주시' },
  { id: '101', name: '경기도 여주시', category: '경기도', type: '여주시' },
  { id: '102', name: '경기도 양평군', category: '경기도', type: '양평군' },
  { id: '103', name: '경기도 고양군', category: '경기도', type: '고양군' },
  { id: '104', name: '경기도 연천군', category: '경기도', type: '연천군' },
  { id: '105', name: '경기도 포천군', category: '경기도', type: '포천군' },
  { id: '106', name: '경기도 가평군', category: '경기도', type: '가평군' },
  
  // 강원도
  { id: '107', name: '강원도 춘천시', category: '강원도', type: '춘천시' },
  { id: '108', name: '강원도 원주시', category: '강원도', type: '원주시' },
  { id: '109', name: '강원도 강릉시', category: '강원도', type: '강릉시' },
  { id: '110', name: '강원도 동해시', category: '강원도', type: '동해시' },
  { id: '111', name: '강원도 태백시', category: '강원도', type: '태백시' },
  { id: '112', name: '강원도 속초시', category: '강원도', type: '속초시' },
  { id: '113', name: '강원도 삼척시', category: '강원도', type: '삼척시' },
  { id: '114', name: '강원도 홍천군', category: '강원도', type: '홍천군' },
  { id: '115', name: '강원도 횡성군', category: '강원도', type: '횡성군' },
  { id: '116', name: '강원도 영월군', category: '강원도', type: '영월군' },
  { id: '117', name: '강원도 평창군', category: '강원도', type: '평창군' },
  { id: '118', name: '강원도 정선군', category: '강원도', type: '정선군' },
  { id: '119', name: '강원도 철원군', category: '강원도', type: '철원군' },
  { id: '120', name: '강원도 화천군', category: '강원도', type: '화천군' },
  { id: '121', name: '강원도 양구군', category: '강원도', type: '양구군' },
  { id: '122', name: '강원도 인제군', category: '강원도', type: '인제군' },
  { id: '123', name: '강원도 고성군', category: '강원도', type: '고성군' },
  { id: '124', name: '강원도 양양군', category: '강원도', type: '양양군' },
  
  // 충청북도
  { id: '125', name: '충청북도 청주시', category: '충청북도', type: '청주시' },
  { id: '126', name: '충청북도 충주시', category: '충청북도', type: '충주시' },
  { id: '127', name: '충청북도 제천시', category: '충청북도', type: '제천시' },
  { id: '128', name: '충청북도 보은군', category: '충청북도', type: '보은군' },
  { id: '129', name: '충청북도 옥천군', category: '충청북도', type: '옥천군' },
  { id: '130', name: '충청북도 영동군', category: '충청북도', type: '영동군' },
  { id: '131', name: '충청북도 증평군', category: '충청북도', type: '증평군' },
  { id: '132', name: '충청북도 진천군', category: '충청북도', type: '진천군' },
  { id: '133', name: '충청북도 괴산군', category: '충청북도', type: '괴산군' },
  { id: '134', name: '충청북도 음성군', category: '충청북도', type: '음성군' },
  { id: '135', name: '충청북도 단양군', category: '충청북도', type: '단양군' },
  
  // 충청남도
  { id: '136', name: '충청남도 천안시', category: '충청남도', type: '천안시' },
  { id: '137', name: '충청남도 공주시', category: '충청남도', type: '공주시' },
  { id: '138', name: '충청남도 보령시', category: '충청남도', type: '보령시' },
  { id: '139', name: '충청남도 아산시', category: '충청남도', type: '아산시' },
  { id: '140', name: '충청남도 서산시', category: '충청남도', type: '서산시' },
  { id: '141', name: '충청남도 논산시', category: '충청남도', type: '논산시' },
  { id: '142', name: '충청남도 계룡시', category: '충청남도', type: '계룡시' },
  { id: '143', name: '충청남도 당진시', category: '충청남도', type: '당진시' },
  { id: '144', name: '충청남도 금산군', category: '충청남도', type: '금산군' },
  { id: '145', name: '충청남도 부여군', category: '충청남도', type: '부여군' },
  { id: '146', name: '충청남도 서천군', category: '충청남도', type: '서천군' },
  { id: '147', name: '충청남도 청양군', category: '충청남도', type: '청양군' },
  { id: '148', name: '충청남도 홍성군', category: '충청남도', type: '홍성군' },
  { id: '149', name: '충청남도 예산군', category: '충청남도', type: '예산군' },
  { id: '150', name: '충청남도 태안군', category: '충청남도', type: '태안군' },
  
  // 전라북도
  { id: '151', name: '전라북도 전주시', category: '전라북도', type: '전주시' },
  { id: '152', name: '전라북도 군산시', category: '전라북도', type: '군산시' },
  { id: '153', name: '전라북도 익산시', category: '전라북도', type: '익산시' },
  { id: '154', name: '전라북도 정읍시', category: '전라북도', type: '정읍시' },
  { id: '155', name: '전라북도 남원시', category: '전라북도', type: '남원시' },
  { id: '156', name: '전라북도 김제시', category: '전라북도', type: '김제시' },
  { id: '157', name: '전라북도 완주군', category: '전라북도', type: '완주군' },
  { id: '158', name: '전라북도 진안군', category: '전라북도', type: '진안군' },
  { id: '159', name: '전라북도 무주군', category: '전라북도', type: '무주군' },
  { id: '160', name: '전라북도 장수군', category: '전라북도', type: '장수군' },
  { id: '161', name: '전라북도 임실군', category: '전라북도', type: '임실군' },
  { id: '162', name: '전라북도 순창군', category: '전라북도', type: '순창군' },
  { id: '163', name: '전라북도 고창군', category: '전라북도', type: '고창군' },
  { id: '164', name: '전라북도 부안군', category: '전라북도', type: '부안군' },
  
  // 전라남도
  { id: '165', name: '전라남도 목포시', category: '전라남도', type: '목포시' },
  { id: '166', name: '전라남도 여수시', category: '전라남도', type: '여수시' },
  { id: '167', name: '전라남도 순천시', category: '전라남도', type: '순천시' },
  { id: '168', name: '전라남도 나주시', category: '전라남도', type: '나주시' },
  { id: '169', name: '전라남도 광양시', category: '전라남도', type: '광양시' },
  { id: '170', name: '전라남도 담양군', category: '전라남도', type: '담양군' },
  { id: '171', name: '전라남도 곡성군', category: '전라남도', type: '곡성군' },
  { id: '172', name: '전라남도 구례군', category: '전라남도', type: '구례군' },
  { id: '173', name: '전라남도 고흥군', category: '전라남도', type: '고흥군' },
  { id: '174', name: '전라남도 보성군', category: '전라남도', type: '보성군' },
  { id: '175', name: '전라남도 화순군', category: '전라남도', type: '화순군' },
  { id: '176', name: '전라남도 장흥군', category: '전라남도', type: '장흥군' },
  { id: '177', name: '전라남도 강진군', category: '전라남도', type: '강진군' },
  { id: '178', name: '전라남도 해남군', category: '전라남도', type: '해남군' },
  { id: '179', name: '전라남도 영암군', category: '전라남도', type: '영암군' },
  { id: '180', name: '전라남도 무안군', category: '전라남도', type: '무안군' },
  { id: '181', name: '전라남도 함평군', category: '전라남도', type: '함평군' },
  { id: '182', name: '전라남도 영광군', category: '전라남도', type: '영광군' },
  { id: '183', name: '전라남도 장성군', category: '전라남도', type: '장성군' },
  { id: '184', name: '전라남도 완도군', category: '전라남도', type: '완도군' },
  { id: '185', name: '전라남도 진도군', category: '전라남도', type: '진도군' },
  { id: '186', name: '전라남도 신안군', category: '전라남도', type: '신안군' },
  
  // 경상북도
  { id: '187', name: '경상북도 포항시', category: '경상북도', type: '포항시' },
  { id: '188', name: '경상북도 경주시', category: '경상북도', type: '경주시' },
  { id: '189', name: '경상북도 김천시', category: '경상북도', type: '김천시' },
  { id: '190', name: '경상북도 안동시', category: '경상북도', type: '안동시' },
  { id: '191', name: '경상북도 구미시', category: '경상북도', type: '구미시' },
  { id: '192', name: '경상북도 영주시', category: '경상북도', type: '영주시' },
  { id: '193', name: '경상북도 영천시', category: '경상북도', type: '영천시' },
  { id: '194', name: '경상북도 상주시', category: '경상북도', type: '상주시' },
  { id: '195', name: '경상북도 문경시', category: '경상북도', type: '문경시' },
  { id: '196', name: '경상북도 경산시', category: '경상북도', type: '경산시' },
  { id: '197', name: '경상북도 군위군', category: '경상북도', type: '군위군' },
  { id: '198', name: '경상북도 의성군', category: '경상북도', type: '의성군' },
  { id: '199', name: '경상북도 청송군', category: '경상북도', type: '청송군' },
  { id: '200', name: '경상북도 영양군', category: '경상북도', type: '영양군' },
  { id: '201', name: '경상북도 영덕군', category: '경상북도', type: '영덕군' },
  { id: '202', name: '경상북도 청도군', category: '경상북도', type: '청도군' },
  { id: '203', name: '경상북도 고령군', category: '경상북도', type: '고령군' },
  { id: '204', name: '경상북도 성주군', category: '경상북도', type: '성주군' },
  { id: '205', name: '경상북도 칠곡군', category: '경상북도', type: '칠곡군' },
  { id: '206', name: '경상북도 예천군', category: '경상북도', type: '예천군' },
  { id: '207', name: '경상북도 봉화군', category: '경상북도', type: '봉화군' },
  { id: '208', name: '경상북도 울진군', category: '경상북도', type: '울진군' },
  { id: '209', name: '경상북도 울릉군', category: '경상북도', type: '울릉군' },
  
  // 경상남도
  { id: '210', name: '경상남도 창원시', category: '경상남도', type: '창원시' },
  { id: '211', name: '경상남도 진주시', category: '경상남도', type: '진주시' },
  { id: '212', name: '경상남도 통영시', category: '경상남도', type: '통영시' },
  { id: '213', name: '경상남도 사천시', category: '경상남도', type: '사천시' },
  { id: '214', name: '경상남도 김해시', category: '경상남도', type: '김해시' },
  { id: '215', name: '경상남도 밀양시', category: '경상남도', type: '밀양시' },
  { id: '216', name: '경상남도 거제시', category: '경상남도', type: '거제시' },
  { id: '217', name: '경상남도 양산시', category: '경상남도', type: '양산시' },
  { id: '218', name: '경상남도 의령군', category: '경상남도', type: '의령군' },
  { id: '219', name: '경상남도 함안군', category: '경상남도', type: '함안군' },
  { id: '220', name: '경상남도 창녕군', category: '경상남도', type: '창녕군' },
  { id: '221', name: '경상남도 고성군', category: '경상남도', type: '고성군' },
  { id: '222', name: '경상남도 남해군', category: '경상남도', type: '남해군' },
  { id: '223', name: '경상남도 하동군', category: '경상남도', type: '하동군' },
  { id: '224', name: '경상남도 산청군', category: '경상남도', type: '산청군' },
  { id: '225', name: '경상남도 함양군', category: '경상남도', type: '함양군' },
  { id: '226', name: '경상남도 거창군', category: '경상남도', type: '거창군' },
  { id: '227', name: '경상남도 합천군', category: '경상남도', type: '합천군' },
  
  // 제주특별자치도
  { id: '228', name: '제주특별자치도 제주시', category: '제주특별자치도', type: '제주시' },
  { id: '229', name: '제주특별자치도 서귀포시', category: '제주특별자치도', type: '서귀포시' },
  
  // 기타
  { id: '230', name: '기타 지역', category: '기타', type: '기타' }
];

// 경력 정보 데이터
const experienceData = [
  // IT/개발 관련
  { id: '1', name: '웹 개발자', category: 'IT/개발', description: '웹 애플리케이션 개발' },
  { id: '2', name: '프론트엔드 개발자', category: 'IT/개발', description: '프론트엔드 기술 개발' },
  { id: '3', name: '백엔드 개발자', category: 'IT/개발', description: '백엔드 시스템 개발' },
  { id: '4', name: '풀스택 개발자', category: 'IT/개발', description: '전체 스택 개발' },
  { id: '5', name: '모바일 앱 개발자', category: 'IT/개발', description: '모바일 애플리케이션 개발' },
  { id: '6', name: '데이터 분석가', category: 'IT/개발', description: '데이터 분석 및 인사이트 도출' },
  { id: '7', name: '데이터 엔지니어', category: 'IT/개발', description: '데이터 파이프라인 구축' },
  { id: '8', name: 'AI/ML 엔지니어', category: 'IT/개발', description: '인공지능/머신러닝 개발' },
  { id: '9', name: 'DevOps 엔지니어', category: 'IT/개발', description: '개발 및 운영 환경 구축' },
  { id: '10', name: '시스템 관리자', category: 'IT/개발', description: '시스템 및 네트워크 관리' },
  { id: '11', name: '보안 엔지니어', category: 'IT/개발', description: '정보보안 및 보안 시스템 구축' },
  { id: '12', name: 'QA 엔지니어', category: 'IT/개발', description: '품질 보증 및 테스트' },
  { id: '13', name: 'UI/UX 디자이너', category: 'IT/개발', description: '사용자 인터페이스 및 경험 디자인' },
  { id: '14', name: '프로덕트 매니저', category: 'IT/개발', description: '제품 기획 및 관리' },
  
  // 경영/사무 관련
  { id: '15', name: '경영진', category: '경영/사무', description: '회사 경영 및 전략 수립' },
  { id: '16', name: '부서장', category: '경영/사무', description: '부서 관리 및 운영' },
  { id: '17', name: '팀장', category: '경영/사무', description: '팀 관리 및 프로젝트 진행' },
  { id: '18', name: '사무직원', category: '경영/사무', description: '일반 사무 업무' },
  { id: '19', name: '인사담당자', category: '경영/사무', description: '인사 관리 및 채용' },
  { id: '20', name: '회계담당자', category: '경영/사무', description: '회계 및 재무 관리' },
  { id: '21', name: '마케팅 매니저', category: '경영/사무', description: '마케팅 전략 및 실행' },
  { id: '22', name: '영업 매니저', category: '경영/사무', description: '영업 관리 및 고객 관리' },
  { id: '23', name: '기획담당자', category: '경영/사무', description: '사업 기획 및 전략 수립' },
  { id: '24', name: '법무담당자', category: '경영/사무', description: '법무 및 계약 관리' },
  
  // 제조/생산 관련
  { id: '25', name: '생산 관리자', category: '제조/생산', description: '생산 계획 및 관리' },
  { id: '26', name: '품질 관리자', category: '제조/생산', description: '품질 관리 및 검사' },
  { id: '27', name: '공정 엔지니어', category: '제조/생산', description: '생산 공정 설계 및 관리' },
  { id: '28', name: '설비 엔지니어', category: '제조/생산', description: '설비 유지보수 및 관리' },
  { id: '29', name: '생산 기술자', category: '제조/생산', description: '생산 기술 개발 및 적용' },
  { id: '30', name: '조립공', category: '제조/생산', description: '제품 조립 및 생산' },
  { id: '31', name: '용접공', category: '제조/생산', description: '용접 작업 및 품질 관리' },
  { id: '32', name: '기계조작공', category: '제조/생산', description: '기계 조작 및 유지보수' },
  { id: '33', name: '검사원', category: '제조/생산', description: '제품 검사 및 품질 확인' },
  
  // 건설/기술 관련
  { id: '34', name: '건축가', category: '건설/기술', description: '건축 설계 및 감리' },
  { id: '35', name: '토목 엔지니어', category: '건설/기술', description: '토목 설계 및 시공 관리' },
  { id: '36', name: '전기 엔지니어', category: '건설/기술', description: '전기 설계 및 시공' },
  { id: '37', name: '기계 엔지니어', category: '건설/기술', description: '기계 설계 및 시공' },
  { id: '38', name: '설비 엔지니어', category: '건설/기술', description: '건축 설비 설계 및 시공' },
  { id: '39', name: '안전 관리자', category: '건설/기술', description: '건설 안전 관리' },
  { id: '40', name: '시공 관리자', category: '건설/기술', description: '건설 시공 관리' },
  { id: '41', name: '감리원', category: '건설/기술', description: '건설 감리 및 품질 관리' },
  { id: '42', name: '측량사', category: '건설/기술', description: '측량 및 지형 조사' },
  
  // 서비스/영업 관련
  { id: '43', name: '영업사원', category: '서비스/영업', description: '제품/서비스 영업' },
  { id: '44', name: '고객 서비스 담당자', category: '서비스/영업', description: '고객 응대 및 서비스 제공' },
  { id: '45', name: '마케터', category: '서비스/영업', description: '마케팅 전략 및 실행' },
  { id: '46', name: '디자이너', category: '서비스/영업', description: '그래픽 및 시각 디자인' },
  { id: '47', name: '번역가', category: '서비스/영업', description: '언어 번역 및 통역' },
  { id: '48', name: '강사', category: '서비스/영업', description: '교육 및 강의' },
  { id: '49', name: '상담사', category: '서비스/영업', description: '고객 상담 및 컨설팅' },
  { id: '50', name: '요리사', category: '서비스/영업', description: '음식 조리 및 메뉴 개발' },
  { id: '51', name: '미용사', category: '서비스/영업', description: '미용 서비스 제공' },
  { id: '52', name: '호텔 직원', category: '서비스/영업', description: '호텔 서비스 및 관리' },
  { id: '53', name: '여행 가이드', category: '서비스/영업', description: '여행 안내 및 서비스' },
  
  // 교육/연구 관련
  { id: '54', name: '교사', category: '교육/연구', description: '학교 교육 및 학생 지도' },
  { id: '55', name: '대학교수', category: '교육/연구', description: '대학 교육 및 연구' },
  { id: '56', name: '연구원', category: '교육/연구', description: '연구 및 개발' },
  { id: '57', name: '연구소 연구원', category: '교육/연구', description: '연구소 연구 및 개발' },
  { id: '58', name: '교육 컨설턴트', category: '교육/연구', description: '교육 프로그램 개발 및 컨설팅' },
  
  // 의료/보건 관련
  { id: '59', name: '의사', category: '의료/보건', description: '의료 서비스 제공' },
  { id: '60', name: '간호사', category: '의료/보건', description: '간호 서비스 제공' },
  { id: '61', name: '약사', category: '의료/보건', description: '약품 조제 및 의약품 관리' },
  { id: '62', name: '치과의사', category: '의료/보건', description: '치과 의료 서비스' },
  { id: '63', name: '물리치료사', category: '의료/보건', description: '물리치료 서비스' },
  { id: '64', name: '영양사', category: '의료/보건', description: '영양 관리 및 상담' },
  
  // 기타
  { id: '65', name: '운전기사', category: '기타', description: '운전 및 배송 서비스' },
  { id: '66', name: '배송원', category: '기타', description: '물품 배송 및 운송' },
  { id: '67', name: '청소원', category: '기타', description: '청소 및 환경 관리' },
  { id: '68', name: '보안원', category: '기타', description: '보안 및 안전 관리' },
  { id: '69', name: '기타 직종', category: '기타', description: '기타 직종 경력' }
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

const SelectedCertificationTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #4ade80;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
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
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 0.875rem;
  background: white;
  color: #374151;
  min-height: 36px;
  margin-left: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.1);
  }
`;

const SelectedLanguageTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const SelectedEducationTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #8b5cf6;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
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
`;

const SelectedAddressTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #10b981;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  margin: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

const ResumePage: React.FC = () => {
  const {
    formData,
    loading,
    error,
    validationErrors,
    handleInputChange,
    saveResumeWithValidation,
  } = useResumeForm();

  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [certificationSearch, setCertificationSearch] = useState('');
  const [showCertificationDropdown, setShowCertificationDropdown] = useState(false);
  const [selectedCertifications, setSelectedCertifications] = useState<Array<{id: string, name: string, category: string}>>([]);
  
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
  const [selectedExperiences, setSelectedExperiences] = useState<Array<{id: string, name: string, category: string}>>([]);
  
  // 주소 정보 상태
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);

  // 저장된 자격증 데이터를 selectedCertifications로 변환
  React.useEffect(() => {
    if (formData.certifications) {
      const certificationNames = formData.certifications.split(', ').filter(name => name.trim());
      const certifications = certificationNames.map(name => {
        const foundCert = certificationData.find(cert => cert.name === name.trim());
        return foundCert || { id: `custom-${name}`, name: name.trim(), category: '기타' };
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
      const experienceNames = formData.experience.split(', ').filter(name => name.trim());
      const experiences = experienceNames.map(name => {
        const foundExp = experienceData.find(exp => exp.name === name.trim());
        return foundExp || { id: `custom-${name}`, name: name.trim(), category: '기타' };
      });
      setSelectedExperiences(experiences);
    }
  }, [formData.experience]);

  // 저장된 주소 데이터를 selectedAddress로 변환
  React.useEffect(() => {
    if (formData.address) {
      // 기존 주소 데이터가 있으면 AddressData 형태로 변환
      const foundAddress = addressData.find(addr => addr.name === formData.address.trim());
      if (foundAddress) {
        const addressData: AddressData = {
          id: foundAddress.id,
          address_name: foundAddress.name,
          address_type: 'ROAD_ADDR',
          x: '127.0286',
          y: '37.4979',
          address: {
            address_name: foundAddress.name,
            region_1depth_name: foundAddress.category,
            region_2depth_name: foundAddress.type,
            region_3depth_name: ''
          }
        };
        setSelectedAddress(addressData);
      }
    }
  }, [formData.address]);

  const handleSave = async () => {
    const result = await saveResumeWithValidation();
    if (result.success) {
      setSaveMessage('이력서가 성공적으로 저장되었습니다!');
      setTimeout(() => setSaveMessage(null), 3000);
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
  const filteredCertifications = certificationData.filter(cert =>
    cert.name.toLowerCase().includes(certificationSearch.toLowerCase()) ||
    cert.category.toLowerCase().includes(certificationSearch.toLowerCase())
  );

  // 자격증 선택
  const handleCertificationSelect = (certification: {id: string, name: string, category: string}) => {
    if (!selectedCertifications.find(cert => cert.id === certification.id)) {
      const newSelectedCertifications = [...selectedCertifications, certification];
      setSelectedCertifications(newSelectedCertifications);
      
      // formData에 자격증 문자열로 저장
      const certificationNames = newSelectedCertifications.map(cert => cert.name).join(', ');
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
    const certificationNames = newSelectedCertifications.map(cert => cert.name).join(', ');
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
  const filteredLanguages = languageData.filter(lang =>
    lang.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
    lang.category.toLowerCase().includes(languageSearch.toLowerCase())
  );

  // 어학 능력 선택
  const handleLanguageSelect = (language: {id: string, name: string, category: string, levels: string[]}) => {
    if (!selectedLanguages.find(lang => lang.id === language.id)) {
      const newSelectedLanguages = [...selectedLanguages, { ...language, level: '' }];
      setSelectedLanguages(newSelectedLanguages);
      
      // formData에 어학 능력 문자열로 저장
      const languageNames = newSelectedLanguages.map(lang => lang.level ? `${lang.name} ${lang.level}` : lang.name).join(', ');
      handleInputChange({
        target: { name: 'languages', value: languageNames }
      } as React.ChangeEvent<HTMLInputElement>);
    }
    setLanguageSearch('');
    setShowLanguageDropdown(false);
  };

  // 어학 능력 제거
  const handleLanguageRemove = (languageId: string) => {
    const newSelectedLanguages = selectedLanguages.filter(lang => lang.id !== languageId);
    setSelectedLanguages(newSelectedLanguages);
    
    // formData에 어학 능력 문자열로 업데이트
    const languageNames = newSelectedLanguages.map(lang => lang.level ? `${lang.name} ${lang.level}` : lang.name).join(', ');
    handleInputChange({
      target: { name: 'languages', value: languageNames }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 어학 능력 레벨 변경
  const handleLanguageLevelChange = (languageId: string, level: string) => {
    const newSelectedLanguages = selectedLanguages.map(lang => 
      lang.id === languageId ? { ...lang, level } : lang
    );
    setSelectedLanguages(newSelectedLanguages);
    
    // formData에 어학 능력 문자열로 업데이트
    const languageNames = newSelectedLanguages.map(lang => lang.level ? `${lang.name} ${lang.level}` : lang.name).join(', ');
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
  const filteredSchools = schoolData.filter(school =>
    school.name.toLowerCase().includes(schoolSearch.toLowerCase()) ||
    school.category.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  // 학교 선택
  const handleSchoolSelect = (school: {id: string, name: string, category: string, type: string}) => {
    // 이미 선택된 학교인지 확인
    if (!selectedSchools.find(s => s.id === school.id)) {
      // 졸업 상태 선택을 위해 임시로 추가 (실제로는 드롭다운에서 선택)
      const schoolWithStatus = { ...school, status: '졸업' };
      const newSelectedSchools = [...selectedSchools, schoolWithStatus];
      setSelectedSchools(newSelectedSchools);
      
      // formData에 학력 정보 저장 (학교명 + 졸업상태)
      const educationText = newSelectedSchools.map(s => `${s.name} ${s.status}`).join(', ');
      handleInputChange({
        target: { name: 'education', value: educationText }
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
    
    // formData 업데이트
    const educationText = newSelectedSchools.map(s => `${s.name} ${s.status}`).join(', ');
    handleInputChange({
      target: { name: 'education', value: educationText }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // 학교 제거
  const handleSchoolRemove = (schoolId: string) => {
    const newSelectedSchools = selectedSchools.filter(school => school.id !== schoolId);
    setSelectedSchools(newSelectedSchools);
    
    // formData 업데이트
    const educationText = newSelectedSchools.map(s => `${s.name} ${s.status}`).join(', ');
    handleInputChange({
      target: { name: 'education', value: educationText }
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
  const filteredExperience = experienceData.filter(exp =>
    exp.name.toLowerCase().includes(experienceSearch.toLowerCase()) ||
    exp.category.toLowerCase().includes(experienceSearch.toLowerCase())
  );

  // 경력 정보 선택
  const handleExperienceSelect = (experience: {id: string, name: string, category: string}) => {
    if (!selectedExperiences.find(exp => exp.id === experience.id)) {
      const newSelectedExperiences = [...selectedExperiences, experience];
      setSelectedExperiences(newSelectedExperiences);
      
      // formData에 경력 정보 문자열로 저장
      const experienceNames = newSelectedExperiences.map(exp => exp.name).join(', ');
      handleInputChange({
        target: { name: 'experience', value: experienceNames }
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
    const experienceNames = newSelectedExperiences.map(exp => exp.name).join(', ');
    handleInputChange({
      target: { name: 'experience', value: experienceNames }
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
                <strong>주소:</strong> {selectedAddress ? selectedAddress.address_name : <EmptyText>입력되지 않음</EmptyText>}
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
                  selectedExperiences.map(exp => exp.name).join(', ')
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
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>주소</FormLabel>
              <AddressSearch
                onAddressSelect={(address: AddressData) => {
                  setSelectedAddress(address);
                  handleInputChange({
                    target: { name: 'address', value: address.address_name }
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
                placeholder="주소를 검색하세요 (예: 서울특별시 강남구, 경기도 수원시)"
              />
              {selectedAddress && (
                <SelectedCertificationsContainer>
                  <SelectedAddressTag>
                    {selectedAddress.address_name}
                    <RemoveButton
                      onClick={() => {
                        setSelectedAddress(null);
                        handleInputChange({
                          target: { name: 'address', value: '' }
                        } as React.ChangeEvent<HTMLInputElement>);
                      }}
                      aria-label={`${selectedAddress.address_name} 제거`}
                    >
                      ×
                    </RemoveButton>
                  </SelectedAddressTag>
                </SelectedCertificationsContainer>
              )}
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
              <CertificationSearchContainer>
                <FormInput 
                  type="text" 
                  value={schoolSearch}
                  onChange={handleSchoolSearchChange}
                  onFocus={handleSchoolSearchFocus}
                  onBlur={handleSchoolSearchBlur}
                  placeholder="학교를 검색하세요 (예: 서울고등학교, 연세대학교)" 
                  aria-label="학교 검색"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                {showSchoolDropdown && (
                  <CertificationDropdown>
                    {filteredSchools.length > 0 ? (
                      filteredSchools.map((school) => (
                        <CertificationOption
                          key={school.id}
                          onClick={() => handleSchoolSelect(school)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <CertificationName>{school.name}</CertificationName>
                          <CertificationCategory>{school.category}</CertificationCategory>
                        </CertificationOption>
                      ))
                    ) : (
                      <NoResultsText>검색 결과가 없습니다.</NoResultsText>
                    )}
                  </CertificationDropdown>
                )}
              </CertificationSearchContainer>
              {selectedSchools.length > 0 && (
                <SelectedCertificationsContainer>
                  {selectedSchools.map((school) => (
                    <SelectedEducationTag key={school.id}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{school.name}</span>
                        <FormSelect
                          value={school.status}
                          onChange={(e) => handleGraduationStatusChange(school.id, e.target.value)}
                          style={{ 
                            fontSize: '0.75rem', 
                            padding: '0.25rem 0.5rem',
                            minWidth: 'auto',
                            width: 'auto'
                          }}
                        >
                          {graduationStatusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </FormSelect>
                      </div>
                      <RemoveButton
                        onClick={() => handleSchoolRemove(school.id)}
                        aria-label={`${school.name} 제거`}
                      >
                        ×
                      </RemoveButton>
                    </SelectedEducationTag>
                  ))}
                </SelectedCertificationsContainer>
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
              <CertificationSearchContainer>
                <FormInput 
                  type="text" 
                  value={experienceSearch}
                  onChange={handleExperienceSearchChange}
                  onFocus={handleExperienceSearchFocus}
                  onBlur={handleExperienceSearchBlur}
                  placeholder="경력을 검색하세요 (예: 웹 개발자, 영업사원, 생산 관리자)" 
                  aria-label="경력 검색"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                {showExperienceDropdown && (
                  <CertificationDropdown>
                    {filteredExperience.length > 0 ? (
                      filteredExperience.map((experience) => (
                        <CertificationOption
                          key={experience.id}
                          onClick={() => handleExperienceSelect(experience)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <CertificationName>{experience.name}</CertificationName>
                          <CertificationCategory>{experience.category}</CertificationCategory>
                        </CertificationOption>
                      ))
                    ) : (
                      <NoResultsText>검색 결과가 없습니다.</NoResultsText>
                    )}
                  </CertificationDropdown>
                )}
              </CertificationSearchContainer>
              {selectedExperiences.length > 0 && (
                <SelectedCertificationsContainer>
                  {selectedExperiences.map((experience) => (
                    <SelectedExperienceTag key={experience.id}>
                      {experience.name}
                      <RemoveButton
                        onClick={() => handleExperienceRemove(experience.id)}
                        aria-label={`${experience.name} 제거`}
                      >
                        ×
                      </RemoveButton>
                    </SelectedExperienceTag>
                  ))}
                </SelectedCertificationsContainer>
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
            <FormGroup>
              <FormLabel>보유 기술</FormLabel>
              <FormInput 
                type="text" 
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="보유 기술을 입력하세요 (예: JavaScript, React, Python)" 
              />
            </FormGroup>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>자격증</FormLabel>
              <CertificationSearchContainer>
                <FormInput 
                  type="text" 
                  value={certificationSearch}
                  onChange={handleCertificationSearchChange}
                  onFocus={handleCertificationSearchFocus}
                  onBlur={handleCertificationSearchBlur}
                  placeholder="자격증을 검색하세요 (예: 정보처리기사, TOEIC)" 
                  aria-label="자격증 검색"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                {showCertificationDropdown && (
                  <CertificationDropdown>
                    {filteredCertifications.length > 0 ? (
                      filteredCertifications.map((certification) => (
                        <CertificationOption
                          key={certification.id}
                          onClick={() => handleCertificationSelect(certification)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <CertificationName>{certification.name}</CertificationName>
                          <CertificationCategory>{certification.category}</CertificationCategory>
                        </CertificationOption>
                      ))
                    ) : (
                      <NoResultsText>검색 결과가 없습니다.</NoResultsText>
                    )}
                  </CertificationDropdown>
                )}
              </CertificationSearchContainer>
              {selectedCertifications.length > 0 && (
                <SelectedCertificationsContainer>
                  {selectedCertifications.map((certification) => (
                    <SelectedCertificationTag key={certification.id}>
                      {certification.name}
                      <RemoveButton
                        onClick={() => handleCertificationRemove(certification.id)}
                        aria-label={`${certification.name} 제거`}
                      >
                        ×
                      </RemoveButton>
                    </SelectedCertificationTag>
                  ))}
                </SelectedCertificationsContainer>
              )}
            </FormGroup>
            <FormGroup style={{ minWidth: '100%' }}>
              <FormLabel>어학 능력</FormLabel>
              <CertificationSearchContainer>
                <FormInput 
                  type="text" 
                  value={languageSearch}
                  onChange={handleLanguageSearchChange}
                  onFocus={handleLanguageSearchFocus}
                  onBlur={handleLanguageSearchBlur}
                  placeholder="어학 능력을 검색하세요 (예: TOEIC, TOPIK, JLPT)" 
                  aria-label="어학 능력 검색"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                {showLanguageDropdown && (
                  <CertificationDropdown>
                    {filteredLanguages.length > 0 ? (
                      filteredLanguages.map((language) => (
                        <CertificationOption
                          key={language.id}
                          onClick={() => handleLanguageSelect(language)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <CertificationName>{language.name}</CertificationName>
                          <CertificationCategory>{language.category}</CertificationCategory>
                        </CertificationOption>
                      ))
                    ) : (
                      <NoResultsText>검색 결과가 없습니다.</NoResultsText>
                    )}
                  </CertificationDropdown>
                )}
              </CertificationSearchContainer>
              {selectedLanguages.length > 0 && (
                <SelectedCertificationsContainer>
                  {selectedLanguages.map((language) => (
                    <SelectedLanguageTag key={language.id}>
                      {language.name}
                      {language.levels && language.levels.length > 0 && (
                        <LanguageLevelSelect
                          value={language.level}
                          onChange={(e) => handleLanguageLevelChange(language.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="">레벨 선택</option>
                          {language.levels.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </LanguageLevelSelect>
                      )}
                      <RemoveButton
                        onClick={() => handleLanguageRemove(language.id)}
                        aria-label={`${language.name} 제거`}
                      >
                        ×
                      </RemoveButton>
                    </SelectedLanguageTag>
                  ))}
                </SelectedCertificationsContainer>
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

        {/* 성공 메시지 */}
        {saveMessage && (
          <div role="status" style={{ 
            color: 'green', 
            backgroundColor: '#f0fdf4', 
            border: '1px solid #bbf7d0', 
            borderRadius: '8px', 
            padding: '1rem', 
            marginBottom: '1rem' 
          }}>
            {saveMessage}
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
