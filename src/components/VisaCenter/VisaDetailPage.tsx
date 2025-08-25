import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { COLORS, ANIMATIONS } from '../../constants';
import { VISA_TYPES, VISA_STEPS } from '../../constants/visa';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import CommunityBanner from '../CommunityBanner';

const DetailContainer = styled.div`
  min-height: 100vh;
  background: white;
`;

const DetailContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const VisaHeader = styled.div`
  margin-bottom: 3rem;
`;

const VisaTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const VisaDescription = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Section = styled.div`
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DocumentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DocumentItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-size: 1rem;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DocumentIcon = styled.span`
  color: ${COLORS.primary};
  font-size: 1.2rem;
`;

const StepList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: step-counter;
`;

const StepItem = styled.li`
  counter-increment: step-counter;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #f3f4f6;
  
  &:last-child {
    border-bottom: none;
  }
  
  &::before {
    content: counter(step-counter);
    background: ${COLORS.primary};
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.3rem;
`;

const StepDescription = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  line-height: 1.4;
`;

const VisaDetailPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();


  // URL 파라미터를 대문자로 변환하여 VISA_TYPES 키와 매칭
  const visaTypeKey = type?.toUpperCase() as keyof typeof VISA_TYPES;
  const visaType = VISA_TYPES[visaTypeKey];
  const visaSteps = VISA_STEPS[visaTypeKey];

  if (!visaType) {
    return <div>비자 유형을 찾을 수 없습니다.</div>;
  }


  return (
    <DetailContainer>
      <CommunityBanner />
      <MainHeader />
      <DetailContent>
        <BackButton onClick={() => navigate('/visa')}>
          ← 비자 센터로 돌아가기
        </BackButton>

        <VisaHeader>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal }}
          >
            <VisaTitle>{visaType.name} - {visaType.fullName}</VisaTitle>
            <VisaDescription>{visaType.description}</VisaDescription>
          </motion.div>
        </VisaHeader>

        <ContentGrid>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.2 }}
          >
            <Section>
              <SectionTitle>
                📋 필요 서류
              </SectionTitle>
              <DocumentList>
                {visaType.documents.map((document, index) => (
                  <DocumentItem key={index}>
                    <DocumentIcon>📄</DocumentIcon>
                    <span style={{ color: '#374151', fontWeight: '500' }}>{document}</span>
                  </DocumentItem>
                ))}
              </DocumentList>
            </Section>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.4 }}
          >
            <Section>
              <SectionTitle>
                🚀 신청 절차
              </SectionTitle>
              <StepList>
                {visaSteps.map((step) => (
                  <StepItem key={step.id}>
                    <StepContent>
                      <StepName>{step.name}</StepName>
                      <StepDescription>{step.description}</StepDescription>
                    </StepContent>
                  </StepItem>
                ))}
              </StepList>
            </Section>
          </motion.div>
        </ContentGrid>
      </DetailContent>
      <MainFooter />
    </DetailContainer>
  );
};

export default VisaDetailPage;
