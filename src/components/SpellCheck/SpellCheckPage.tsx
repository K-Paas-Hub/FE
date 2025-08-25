import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useResumeForm } from '../../hooks/useResumeForm';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import TextSection from './TextSection';
import { COLORS } from '../../constants';

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
  const { hasResumeData } = useSpellCheck();

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
              
              <TextSection formData={formData} />
            </SpellCheckSection>

            <ButtonGroup>
              <SecondaryButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                결과 초기화
              </SecondaryButton>
              <PrimaryButton
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
