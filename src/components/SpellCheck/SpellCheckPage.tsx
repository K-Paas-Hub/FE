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

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Content = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const ModeToggle = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const ToggleButton = styled(motion.button)<{ isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.isActive ? COLORS.primary : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.8)'};
  
  &:hover {
    background: ${props => props.isActive ? COLORS.primaryHover : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
  }
`;

const ModeDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Button = styled(motion.button)`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  background: ${COLORS.primary};
  color: white;
  box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${COLORS.textSecondary};
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const ClearButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NoDataMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const SpellCheckPage: React.FC = () => {
  const { formData } = useResumeForm();
  const {
    loading,
    error,
    result,
    sectionResults,
    sectionLoading,
    isAdvancedMode,
    checkResume,
    checkSection,
    toggleAdvancedMode,
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
      <Container>
        <MainHeader />
        <Content>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
            검사 중...
          </div>
        </Content>
        <MainFooter />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <MainHeader />
        <Content>
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.3)', 
            color: 'white', 
            padding: '1rem', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            {error}
            <button 
              onClick={handleClearError}
              style={{ 
                marginLeft: '1rem', 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              닫기
            </button>
          </div>
        </Content>
        <MainFooter />
      </Container>
    );
  }

  if (!hasResumeData(formData)) {
    return (
      <Container>
        <MainHeader />
        <Content>
          <NoDataMessage>
            <h3>이력서 데이터가 없습니다</h3>
            <p>맞춤법 검사를 하려면 먼저 이력서를 작성해주세요.</p>
          </NoDataMessage>
        </Content>
        <MainFooter />
      </Container>
    );
  }

  return (
    <Container>
      <MainHeader />
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.normal }}
      >
        <Title>맞춤법 검사</Title>
        <Subtitle>
          이력서의 맞춤법과 문법을 검사하여 완성도를 높여보세요
        </Subtitle>

        {/* 검사 모드 토글 */}
        <ModeToggle>
          <ToggleButton
            isActive={!isAdvancedMode}
            onClick={toggleAdvancedMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            기본 검사
          </ToggleButton>
          <ToggleButton
            isActive={isAdvancedMode}
            onClick={toggleAdvancedMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            네이버 맞춤법 검사
          </ToggleButton>
        </ModeToggle>
        
        <ModeDescription>
          {isAdvancedMode 
            ? "네이버 맞춤법 검사기를 사용하여 더 정확한 검사를 진행합니다."
            : "기본 형식 검사와 네이버 맞춤법 검사를 함께 진행합니다."
          }
        </ModeDescription>

        {/* 액션 버튼들 */}
        <ActionButtons>
          <Button
            onClick={handleCheckAll}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            전체 검사
          </Button>
          <ClearButton
            onClick={handleClearResult}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            결과 초기화
          </ClearButton>
        </ActionButtons>

        {/* 이력서 섹션들 */}
        <TextSection
          formData={formData}
          onCheckSection={handleCheckSection}
          sectionResults={sectionResults}
          sectionLoading={sectionLoading}
        />

        {/* 검사 결과 */}
        {result && (
          <SpellCheckResult
            result={result}
            onApplyCorrection={() => {}}
          />
        )}
      </Content>
      <MainFooter />
    </Container>
  );
};

export default SpellCheckPage;
