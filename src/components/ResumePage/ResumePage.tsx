import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../constants';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import CommunityBanner from '../CommunityBanner';
import { useResumeForm } from '../../hooks/useResumeForm';
import { useAutoSave } from '../../hooks/useAutoSave';


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

const FormInput = styled.input<{ $hasError?: boolean }>`
  padding: 0.8rem 1rem;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : COLORS.primary};
  }
`;

const FormTextarea = styled.textarea<{ $hasError?: boolean }>`
  padding: 0.8rem 1rem;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : COLORS.primary};
  }
`;

const FormSelect = styled.select<{ $hasError?: boolean }>`
  padding: 0.8rem 1rem;
  border: 2px solid ${props => props.$hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : COLORS.primary};
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



const PreviewContent = styled.div`
  line-height: 1.6;
  
  h4 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #1f2937;
    margin: 1.5rem 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${COLORS.primary};
  }
  
  h4:first-child {
    margin-top: 0;
  }
  
  p {
    margin: 0.5rem 0;
    color: #374151;
  }
  
  strong {
    color: #1f2937;
    font-weight: 600;
  }
  
  .empty-field {
    color: #9ca3af;
    font-style: italic;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  
  &::after {
    content: '';
    width: 32px;
    height: 32px;
    border: 4px solid #e5e7eb;
    border-top: 4px solid ${COLORS.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;



const FieldError = styled.div`
  color: #dc2626;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &::before {
    content: '⚠';
    font-size: 0.9rem;
  }
`;

const SuccessMessage = styled.div`
  background: #f0fdf4;
  border: 1px solid #10b981;
  color: #059669;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const FileUpload = styled.div<{ $dragActive: boolean }>`
  border: 3px dashed ${props => props.$dragActive ? COLORS.primary : '#d1d5db'};
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$dragActive ? '#f0fdf4' : '#f9fafb'};
  
  &:hover {
    border-color: ${COLORS.primary};
    background: #f0fdf4;
  }
`;

const UploadProgress = styled.div`
  margin-top: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${COLORS.primary};
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const FileList = styled.div`
  margin-top: 1rem;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  border: 1px solid #e5e7eb;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #dc2626;
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

// 미리보기 모달 스타일
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f3f4f6;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
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
  border-radius: 50%;
  transition: all 0.2s;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

// 미리보기 버튼 스타일
const PreviewButton = styled(motion.button)`
  background: white;
  color: #6b7280;
  border: 2px solid #d1d5db;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6b7280;
    color: white;
    border-color: #6b7280;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #f3f4f6;
    color: #9ca3af;
    border-color: #e5e7eb;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ResumePage: React.FC = () => {
  const {
    formData,
    setFormData,
    loading,
    error,
    files,
    uploadProgress,
    validationErrors,
    handleInputChange,
    saveResume,
    saveResumeWithValidation,
    submitResume,
    uploadFile,
    deleteFile
  } = useResumeForm();

  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false); // 미리보기 모달 상태

  // 자동 저장 활성화
  useAutoSave(formData, async () => {
    const result = await saveResume();
    if (result.success) {
      console.log('자동 저장 완료');
    }
  }, true);

  // 드래그 앤 드롭 핸들러
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
      e.target.value = ''; // input 초기화
    }
  };

  const handleFileUpload = async (file: File) => {
    const result = await uploadFile(file);
    if (result.success) {
      setSuccessMessage('파일이 업로드되었습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      setSuccessMessage(result.error || '파일 업로드에 실패했습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSave = async () => {
    const result = await saveResumeWithValidation();
    if (result.success) {
      setSuccessMessage(result.message || '저장되었습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleSubmit = async () => {
    const result = await submitResume();
    if (result.success) {
      setSuccessMessage(result.message || '제출되었습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
      // 제출 후 폼 초기화 (파일은 유지)
      setFormData({
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
    }
  };

  const handleFileDelete = async (fileId: string) => {
    const result = await deleteFile(fileId);
    if (result.success) {
      setSuccessMessage(result.message || '파일이 삭제되었습니다.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // 미리보기 모달 닫기
  const handleClosePreview = () => {
    setShowPreview(false);
  };

  // 미리보기 열기
  const handleOpenPreview = () => {
    setShowPreview(true);
  };

  return (
    <ResumeContainer>
      <CommunityBanner />
      <MainHeader />
      
      <ResumeContent>
        <ResumeHeader>
          <ResumeTitle>내 이력서</ResumeTitle>
          <ResumeSubtitle>
            한국 취업을 위한 이력서를 작성하고 관리하세요
          </ResumeSubtitle>
        </ResumeHeader>

        {loading && <LoadingSpinner />}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

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
                $hasError={!!validationErrors.name}
              />
              {validationErrors.name && <FieldError>{validationErrors.name}</FieldError>}
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
                $hasError={!!validationErrors.email}
              />
              {validationErrors.email && <FieldError>{validationErrors.email}</FieldError>}
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
                $hasError={!!validationErrors.phone}
              />
              {validationErrors.phone && <FieldError>{validationErrors.phone}</FieldError>}
            </FormGroup>

            <FormGroup>
              <FormLabel>국적 (Nationality)</FormLabel>
              <FormSelect
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                required
                $hasError={!!validationErrors.nationality}
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
              {validationErrors.nationality && <FieldError>{validationErrors.nationality}</FieldError>}
            </FormGroup>

            <FormGroup>
              <FormLabel>비자 유형 (Visa Type)</FormLabel>
              <FormSelect
                name="visaType"
                value={formData.visaType}
                onChange={handleInputChange}
                required
                $hasError={!!validationErrors.visaType}
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
              {validationErrors.visaType && <FieldError>{validationErrors.visaType}</FieldError>}
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
          
          <FileUpload
            $dragActive={dragActive}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              id="file-upload"
            />
            <div>
              <UploadText>파일을 드래그하거나 클릭하여 업로드</UploadText>
              <UploadSubtext>PDF, DOC, DOCX 파일 (최대 10MB)</UploadSubtext>
            </div>
          </FileUpload>

          {/* 업로드 진행률 표시 */}
          {Object.keys(uploadProgress).length > 0 && (
            <UploadProgress>
              {Object.entries(uploadProgress).map(([fileName, progress]) => (
                <div key={fileName}>
                  <div>{fileName} - {progress}%</div>
                  <ProgressBar>
                    <ProgressFill $progress={progress} />
                  </ProgressBar>
                </div>
              ))}
            </UploadProgress>
          )}

          {/* 파일 목록 */}
          {files.length > 0 && (
            <FileList>
              {files.map(file => (
                <FileItem key={file.id}>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '0.2rem', color: '#1f2937' }}>{file.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {file.size > 1024 * 1024 
                        ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                        : `${(file.size / 1024).toFixed(1)} KB`
                      }
                    </div>
                  </div>
                  <DeleteButton onClick={() => handleFileDelete(file.id)}>삭제</DeleteButton>
                </FileItem>
              ))}
            </FileList>
          )}
        </ResumeSection>

        <ButtonGroup>
          <SecondaryButton type="button" onClick={handleSave} disabled={loading}>
            임시 저장
          </SecondaryButton>
          <PreviewButton 
            type="button" 
            onClick={handleOpenPreview}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            👁️ 미리보기
          </PreviewButton>
          <PrimaryButton type="submit" onClick={handleSubmit} disabled={loading}>
            이력서 제출
          </PrimaryButton>
        </ButtonGroup>
      </ResumeContent>
      
      {/* 미리보기 모달 */}
      <AnimatePresence>
        {showPreview && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePreview}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>이력서 미리보기</ModalTitle>
                <CloseButton onClick={handleClosePreview}>✕</CloseButton>
              </ModalHeader>
              
              <PreviewContent>
                <h4>기본 정보</h4>
                <p><strong>이름:</strong> {formData.name || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>이메일:</strong> {formData.email || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>전화번호:</strong> {formData.phone || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>국적:</strong> {formData.nationality || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>비자 유형:</strong> {formData.visaType || <span className="empty-field">입력해주세요</span>}</p>
                
                <h4>학력 및 경력</h4>
                <p><strong>학력:</strong> {formData.education || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>경력:</strong> {formData.experience || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>기술:</strong> {formData.skills || <span className="empty-field">입력해주세요</span>}</p>
                <p><strong>언어:</strong> {formData.languages || <span className="empty-field">입력해주세요</span>}</p>
                
                <h4>자기소개</h4>
                <p>{formData.introduction || <span className="empty-field">입력해주세요</span>}</p>
                
                {files.length > 0 && (
                  <>
                    <h4>첨부 파일</h4>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {files.map(file => (
                        <li key={file.id} style={{ margin: '0.5rem 0' }}>
                          {file.name} ({file.size > 1024 * 1024 
                            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                            : `${(file.size / 1024).toFixed(1)} KB`
                          })
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </PreviewContent>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      <MainFooter />
    </ResumeContainer>
  );
};

export default ResumePage;
