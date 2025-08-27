import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ANIMATIONS } from '../../constants';
import { VISA_TYPES, VISA_STEPS } from '../../constants/visa';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import {
  DetailContainer,
  DetailContent,
  BackButton,
  VisaHeader,
  VisaTitle,
  VisaDescription,
  ContentGrid,
  Section,
  SectionTitle,
  DocumentList,
  DocumentItem,
  DocumentIcon,
  DocumentText,
  StepList,
  StepItem,
  StepContent,
  StepName,
  StepDescription
} from '../../styles/components/VisaDetailPage.styles';

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
                    <DocumentText>{document}</DocumentText>
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
