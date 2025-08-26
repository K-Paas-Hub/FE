import React, { useState } from 'react';
import { MainHeader, MainFooter } from '../';
import { useResumeForm } from '../../hooks/useResumeForm';
import {
  ResumeContainer,
  ResumeContent,
  ResumeHeader,
  ResumeTitle,
  ResumeSubtitle,
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
                {formData.education || <EmptyText>입력되지 않음</EmptyText>}
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
                {formData.experience || <EmptyText>입력되지 않음</EmptyText>}
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
                <strong>어학 능력:</strong> {formData.languages || <EmptyText>입력되지 않음</EmptyText>}
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
              <FormInput 
                type="text" 
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                placeholder="국적을 입력하세요" 
                aria-describedby={validationErrors.nationality ? "nationality-error" : undefined}
              />
              {validationErrors.nationality && (
                <div id="nationality-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.nationality}
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <FormLabel>비자 유형</FormLabel>
              <FormInput 
                type="text" 
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                placeholder="비자 유형을 입력하세요 (예: E9, H2, D2)" 
                aria-describedby={validationErrors.visaType ? "visaType-error" : undefined}
              />
              {validationErrors.visaType && (
                <div id="visaType-error" role="alert" style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {validationErrors.visaType}
                </div>
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
            <FormGroup>
              <FormLabel>학력</FormLabel>
              <FormInput 
                type="text" 
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="학력 정보를 입력하세요 (학교명, 전공, 졸업년도 등)" 
              />
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
            <FormGroup>
              <FormLabel>경력</FormLabel>
              <FormInput 
                type="text" 
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="경력 정보를 입력하세요 (회사명, 직책, 근무기간 등)" 
              />
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
            <FormGroup>
              <FormLabel>어학 능력</FormLabel>
              <FormInput 
                type="text" 
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                placeholder="어학 능력을 입력하세요 (예: TOEIC 850, TOPIK 5급)" 
              />
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
