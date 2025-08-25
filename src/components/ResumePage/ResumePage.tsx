import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

const ResumeContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const ResumeContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ResumeHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const ResumeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ResumeSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const ResumeSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionIcon = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ResumeForm = styled.form`
  display: grid;
  gap: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
`;

const FormInput = styled.input`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

const FormSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: ${COLORS.primary};
  border: 2px solid ${COLORS.primary};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.primary};
    color: white;
  }
`;

const ResumePreview = styled.div`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
`;

const PreviewTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  text-align: center;
`;

const PreviewContent = styled.div`
  line-height: 1.6;
  color: #374151;
`;

const FileUpload = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    background: #f0fdf4;
  }
`;

const UploadText = styled.p`
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
`;

const ResumePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    visaType: '',
    education: '',
    experience: '',
    skills: '',
    languages: '',
    introduction: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('이력서 제출:', formData);
    alert('이력서가 성공적으로 제출되었습니다!');
  };

  const handleSave = () => {
    console.log('이력서 저장:', formData);
    alert('이력서가 저장되었습니다!');
  };

  return (
    <ResumeContainer>
      <MainHeader />
      
      <ResumeContent>
        <ResumeHeader>
          <ResumeTitle>내 이력서</ResumeTitle>
          <ResumeSubtitle>
            한국 취업을 위한 이력서를 작성하고 관리하세요
          </ResumeSubtitle>
        </ResumeHeader>

        <ResumeSection>
          <SectionTitle>
            <SectionIcon>📝</SectionIcon>
            기본 정보
          </SectionTitle>
          <ResumeForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>이름 (Name)</FormLabel>
              <FormInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="홍길동"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>이메일 (Email)</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@email.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>전화번호 (Phone)</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="010-1234-5678"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>국적 (Nationality)</FormLabel>
              <FormSelect
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
              >
                <option value="">국적을 선택하세요</option>
                <option value="vietnam">베트남</option>
                <option value="china">중국</option>
                <option value="japan">일본</option>
                <option value="thailand">태국</option>
                <option value="philippines">필리핀</option>
                <option value="nepal">네팔</option>
                <option value="mongolia">몽골</option>
                <option value="other">기타</option>
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>비자 유형 (Visa Type)</FormLabel>
              <FormSelect
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                required
              >
                <option value="">비자 유형을 선택하세요</option>
                <option value="e9">E-9 (제조업)</option>
                <option value="h2">H-2 (방문취업)</option>
                <option value="d2">D-2 (유학)</option>
                <option value="e7">E-7 (특정활동)</option>
                <option value="e8">E-8 (특정활동)</option>
                <option value="e6">E-6 (예술흥행)</option>
                <option value="c4">C-4 (단기취업)</option>
                <option value="f4">F-4 (재외동포)</option>
              </FormSelect>
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        <ResumeSection>
          <SectionTitle>
            <SectionIcon>🎓</SectionIcon>
            학력 및 경력
          </SectionTitle>
          <ResumeForm>
            <FormGroup>
              <FormLabel>학력 (Education)</FormLabel>
              <FormTextarea
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="졸업한 학교, 전공, 졸업년도 등을 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>경력 (Work Experience)</FormLabel>
              <FormTextarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="이전 직장에서의 경력, 담당 업무, 성과 등을 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>기술 및 자격증 (Skills & Certifications)</FormLabel>
              <FormTextarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="보유한 기술, 자격증, 수상 경력 등을 입력하세요"
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>언어 능력 (Languages)</FormLabel>
              <FormTextarea
                name="languages"
                value={formData.languages}
                onChange={handleInputChange}
                placeholder="구사 가능한 언어와 수준을 입력하세요 (예: 한국어 - 고급, 영어 - 중급)"
              />
            </FormGroup>
          </ResumeForm>
        </ResumeSection>

        <ResumeSection>
          <SectionTitle>
            <SectionIcon>💬</SectionIcon>
            자기소개
          </SectionTitle>
          <FormGroup>
            <FormLabel>자기소개 (Self Introduction)</FormLabel>
            <FormTextarea
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="자신의 강점, 목표, 한국에서 일하고 싶은 이유 등을 자유롭게 작성하세요"
              style={{ minHeight: '200px' }}
            />
          </FormGroup>
        </ResumeSection>

        <ResumeSection>
          <SectionTitle>
            <SectionIcon>📎</SectionIcon>
            첨부 파일
          </SectionTitle>
          <FileUpload>
            <UploadText>이력서 파일을 업로드하세요</UploadText>
            <UploadSubtext>PDF, DOC, DOCX 파일 (최대 10MB)</UploadSubtext>
          </FileUpload>
        </ResumeSection>

        <ButtonGroup>
          <SecondaryButton type="button" onClick={handleSave}>
            임시 저장
          </SecondaryButton>
          <PrimaryButton type="submit" onClick={handleSubmit}>
            이력서 제출
          </PrimaryButton>
        </ButtonGroup>

        <ResumePreview>
          <PreviewTitle>이력서 미리보기</PreviewTitle>
          <PreviewContent>
            <h4>기본 정보</h4>
            <p><strong>이름:</strong> {formData.name || '입력해주세요'}</p>
            <p><strong>이메일:</strong> {formData.email || '입력해주세요'}</p>
            <p><strong>전화번호:</strong> {formData.phone || '입력해주세요'}</p>
            <p><strong>국적:</strong> {formData.nationality || '입력해주세요'}</p>
            <p><strong>비자 유형:</strong> {formData.visaType || '입력해주세요'}</p>
            
            <h4>학력 및 경력</h4>
            <p><strong>학력:</strong> {formData.education || '입력해주세요'}</p>
            <p><strong>경력:</strong> {formData.experience || '입력해주세요'}</p>
            <p><strong>기술:</strong> {formData.skills || '입력해주세요'}</p>
            <p><strong>언어:</strong> {formData.languages || '입력해주세요'}</p>
            
            <h4>자기소개</h4>
            <p>{formData.introduction || '입력해주세요'}</p>
          </PreviewContent>
        </ResumePreview>
      </ResumeContent>
      
      <MainFooter />
    </ResumeContainer>
  );
};

export default ResumePage;
