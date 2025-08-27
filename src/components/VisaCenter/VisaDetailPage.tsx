import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();


  // URL 파라미터를 대문자로 변환하여 VISA_TYPES 키와 매칭
  const visaTypeKey = type?.toUpperCase() as keyof typeof VISA_TYPES;
  const visaType = VISA_TYPES[visaTypeKey];
  const visaSteps = VISA_STEPS[visaTypeKey as keyof typeof VISA_STEPS];

  if (!visaType) {
    return <div>{t('visaDetail.visaTypeNotFound')}</div>;
  }


  return (
    <DetailContainer>
      <MainHeader />
      <DetailContent>
        <BackButton onClick={() => navigate('/visa')}>
          {t('visaDetail.backToVisaCenter')}
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
                {t('visaDetail.requiredDocuments')}
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
                {t('visaDetail.applicationProcess')}
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
