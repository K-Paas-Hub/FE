import React, { useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useResumeForm } from '../../hooks/useResumeForm';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import SpellCheckResult from './SpellCheckResult';
import TextSection from './TextSection';
import { COLORS, ANIMATIONS } from '../../constants';

const SpellCheckContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const SpellCheckContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SpellCheckHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SpellCheckTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SpellCheckSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const SpellCheckSection = styled.section`
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



const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primaryHover};
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled(motion.button)`
  background: white;
  color: ${COLORS.primary};
  border: 2px solid ${COLORS.primary};
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primary};
    color: white;
  }
  
  &:disabled {
    border-color: #9ca3af;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
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

const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #ef4444;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ErrorCloseButton = styled.button`
  background: none;
  border: none;
  color: #dc2626;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoDataMessage = styled.div`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  color: #6b7280;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
`;

const NoDataTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #374151;
`;

const NoDataText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const SpellCheckPage: React.FC = () => {
  const { formData } = useResumeForm();
  const {
    loading,
    error,
    result,
    sectionResults,
    sectionLoading,
    checkResume,
    checkSection,
    clearResult,
    clearError,
    hasResumeData,
    getCheckableSections
  } = useSpellCheck();

  const handleCheckAll = useCallback(async () => {
    if (hasResumeData(formData)) {
      await checkResume(formData);
    }
  }, [checkResume, formData, hasResumeData]);

  const handleCheckSection = useCallback(async (section: keyof typeof formData) => {
    const text = formData[section] || '';
    if (text.trim()) {
      await checkSection(section, text);
    }
  }, [checkSection, formData]);

  const handleClearResult = useCallback(() => {
    clearResult();
  }, [clearResult]);

  const handleClearError = useCallback(() => {
    clearError();
  }, [clearError]);

  if (loading) {
    return (
      <SpellCheckContainer>
        <MainHeader />
        <SpellCheckContent>
          <LoadingSpinner />
        </SpellCheckContent>
        <MainFooter />
      </SpellCheckContainer>
    );
  }

  return (
    <SpellCheckContainer>
      <MainHeader />
      
      <SpellCheckContent>
        <SpellCheckHeader>
          <SpellCheckTitle>맞춤법 검사</SpellCheckTitle>
          <SpellCheckSubtitle>
            작성한 이력서의 맞춤법을 검사하고 수정 제안을 받아보세요
          </SpellCheckSubtitle>
        </SpellCheckHeader>

        {error && (
          <ErrorMessage>
            {error}
            <ErrorCloseButton onClick={handleClearError}>
              ✕
            </ErrorCloseButton>
          </ErrorMessage>
        )}

        {!hasResumeData(formData) ? (
          <NoDataMessage>
            <NoDataTitle>이력서 데이터가 없습니다</NoDataTitle>
            <NoDataText>
              맞춤법 검사를 하려면 먼저 이력서를 작성해주세요.
              <br />
              <a 
                href="/resume" 
                style={{ 
                  color: COLORS.primary, 
                  textDecoration: 'underline',
                  fontWeight: '600'
                }}
              >
                이력서 작성하기 →
              </a>
            </NoDataText>
          </NoDataMessage>
        ) : (
          <>


            <SpellCheckSection>
              <SectionTitle>
                <SectionIcon>📝</SectionIcon>
                이력서 내용
              </SectionTitle>
              
              <TextSection
                formData={formData}
                onCheckSection={handleCheckSection}
                sectionResults={sectionResults}
                sectionLoading={sectionLoading}
              />
            </SpellCheckSection>

            {result && (
              <SpellCheckSection>
                <SectionTitle>
                  <SectionIcon>🔍</SectionIcon>
                  검사 결과
                </SectionTitle>
                
                <SpellCheckResult
                  result={result}
                  onApplyCorrection={() => {}}
                />
              </SpellCheckSection>
            )}

            <ButtonGroup>
              <SecondaryButton
                onClick={handleClearResult}
                disabled={loading || !result}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                결과 초기화
              </SecondaryButton>
              <PrimaryButton
                onClick={handleCheckAll}
                disabled={loading || !hasResumeData(formData)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                전체 검사
              </PrimaryButton>
            </ButtonGroup>
          </>
        )}
      </SpellCheckContent>
      
      <MainFooter />
    </SpellCheckContainer>
  );
};

export default SpellCheckPage;
