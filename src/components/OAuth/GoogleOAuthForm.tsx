import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MainHeader, MainFooter } from '../';
import AddressSearch from '../AddressSearch';
import useOAuth from '../../hooks/useOAuth';
import { OAuthAdditionalInfo } from '../../types/oauth';
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
  PrimaryButton,
} from '../../styles/components/ResumePage.styles';
import styled from 'styled-components';

// 통일된 입력 요소 스타일
const UnifiedInput = styled.input`
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

const UnifiedSelect = styled.select`
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

// 에러 메시지 스타일
const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// 체크박스 컨테이너
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #4ade80;
`;

// 비자 정보 섹션 스타일
const VisaSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const VisaLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
  margin: 0;
`;

const CheckboxLabel = styled.span`
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
  margin: 0;
`;

// 기존 ResumePage의 옵션 데이터 재사용
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

const userTypeOptions = [
  { value: 'worker', label: '외국인 근로자' },
  { value: 'student', label: '유학생' },
  { value: 'employer', label: '한국인 사업자' }
];

const languageOptions = [
  { value: 'ko', label: '한국어' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'km', label: 'ភាសាខ្មែរ' },
  { value: 'ne', label: 'नेपाली' },
  { value: 'id', label: 'Bahasa Indonesia' },
  { value: 'zh', label: '中文' },
  { value: 'th', label: 'ไทย' }
];

const GoogleOAuthForm: React.FC = () => {
  const { isLoading, error, googleUser, saveAdditionalInfo, authenticateWithGoogle } = useOAuth();
  const [formData, setFormData] = useState<OAuthAdditionalInfo>({
    phone: '',
    address: '',
    nationality: '',
    visaType: '',
    hasVisa: false,
    visaIssueDate: '',
    visaExpiryDate: '',
    userType: 'worker',
    language: 'ko'
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // 컴포넌트 마운트 시 googleUser가 없으면 인증 시도
  useEffect(() => {
    if (!googleUser) {
      authenticateWithGoogle();
    }
  }, [googleUser, authenticateWithGoogle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'hasVisa' && !checked) {
      setFormData(prev => ({
        ...prev,
        visaType: '',
        visaIssueDate: '',
        visaExpiryDate: ''
      }));
    }
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddressSelect = (address: any) => {
    setFormData(prev => ({
      ...prev,
      address: address.address_name
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.phone.trim()) {
      errors.phone = '전화번호를 입력해주세요.';
    }

    if (!formData.address.trim()) {
      errors.address = '주소를 입력해주세요.';
    }

    if (!formData.nationality) {
      errors.nationality = '국적을 선택해주세요.';
    }

    if (formData.hasVisa) {
      if (!formData.visaType) {
        errors.visaType = '비자 유형을 선택해주세요.';
      }
      if (!formData.visaIssueDate) {
        errors.visaIssueDate = '발급일을 입력해주세요.';
      }
      if (!formData.visaExpiryDate) {
        errors.visaExpiryDate = '만료일을 입력해주세요.';
      }
      if (formData.visaExpiryDate && formData.visaIssueDate && 
          formData.visaExpiryDate <= formData.visaIssueDate) {
        errors.visaExpiryDate = '만료일은 발급일보다 늦어야 합니다.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    await saveAdditionalInfo(formData);
  };

  if (!googleUser) {
    return (
      <>
        <MainHeader />
        <ResumeContainer>
          <ResumeContent>
            <ResumeSection>
              <ErrorMessage>
                구글 계정 정보를 불러올 수 없습니다. 다시 로그인해주세요.
              </ErrorMessage>
            </ResumeSection>
          </ResumeContent>
        </ResumeContainer>
        <MainFooter />
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <ResumeContainer>
        <ResumeContent>
          <ResumeSection>
            <SectionTitle>
              <SectionIcon>👤</SectionIcon>
              추가 정보 입력
            </SectionTitle>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {googleUser && (
              <div style={{
                background: '#f9fafb',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                {googleUser.picture && (
                  <img 
                    src={googleUser.picture} 
                    alt="프로필" 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%'
                    }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: '600', color: '#374151' }}>
                    {googleUser.name}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {googleUser.email}
                  </div>
                </div>
              </div>
            )}

            <ResumeForm onSubmit={handleSubmit}>

          <FormGroup>
            <FormLabel>전화번호</FormLabel>
            <UnifiedInput
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="전화번호를 입력하세요"
            />
            {validationErrors.phone && (
              <ErrorMessage>{validationErrors.phone}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel>주소</FormLabel>
            <div style={{ position: 'relative' }}>
              <AddressSearch
                onAddressSelect={handleAddressSelect}
                placeholder="주소를 검색하세요"
              />
            </div>
            {validationErrors.address && (
              <ErrorMessage>{validationErrors.address}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel>국적</FormLabel>
            <UnifiedSelect
              name="nationality"
              value={formData.nationality}
              onChange={handleInputChange}
            >
              {nationalityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </UnifiedSelect>
            {validationErrors.nationality && (
              <ErrorMessage>{validationErrors.nationality}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel>사용자 유형</FormLabel>
            <UnifiedSelect
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
            >
              {userTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </UnifiedSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>선호 언어</FormLabel>
            <UnifiedSelect
              name="language"
              value={formData.language}
              onChange={handleInputChange}
            >
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </UnifiedSelect>
          </FormGroup>

          <VisaSection>
            <VisaLabel>비자 정보</VisaLabel>
            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                name="hasVisa"
                checked={formData.hasVisa}
                onChange={handleInputChange}
              />
              <CheckboxLabel>비자 있음</CheckboxLabel>
            </CheckboxContainer>
          </VisaSection>

          {formData.hasVisa && (
            <>
              <FormGroup>
                <FormLabel>비자 유형</FormLabel>
                <UnifiedSelect
                  name="visaType"
                  value={formData.visaType}
                  onChange={handleInputChange}
                >
                  {visaTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </UnifiedSelect>
                {validationErrors.visaType && (
                  <ErrorMessage>{validationErrors.visaType}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>발급일</FormLabel>
                <UnifiedInput
                  type="date"
                  name="visaIssueDate"
                  value={formData.visaIssueDate}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                />
                {validationErrors.visaIssueDate && (
                  <ErrorMessage>{validationErrors.visaIssueDate}</ErrorMessage>
                )}
              </FormGroup>

              <FormGroup>
                <FormLabel>만료일</FormLabel>
                <UnifiedInput
                  type="date"
                  name="visaExpiryDate"
                  value={formData.visaExpiryDate}
                  onChange={handleInputChange}
                  min={formData.visaIssueDate || new Date().toISOString().split('T')[0]}
                />
                {validationErrors.visaExpiryDate && (
                  <ErrorMessage>{validationErrors.visaExpiryDate}</ErrorMessage>
                )}
              </FormGroup>
            </>
          )}

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem'
          }}>
            <PrimaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '저장 중...' : '저장'}
            </PrimaryButton>
          </div>
            </ResumeForm>
          </ResumeSection>
        </ResumeContent>
      </ResumeContainer>
      <MainFooter />
    </>
  );
};

export default GoogleOAuthForm;
