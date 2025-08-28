import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../MainFooter';
import {
  TermsContainer,
  TermsContent,
  TermsTitle,
  TermsSection,
  CloseButton,
} from '../../styles/components/TermsPage.styles';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleClose = () => {
    navigate('/login');
  };
  
  return (
    <TermsContainer>
      <TermsContent>
        <CloseButton 
          onClick={handleClose}
          aria-label="페이지 닫기"
        >
          ✕
        </CloseButton>
        
        <TermsTitle>{t('privacy.title')}</TermsTitle>
        
        <TermsSection>
          <h2>{t('privacy.sections.purpose')}</h2>
          <p>{t('privacy.content.purpose')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.retention')}</h2>
          <p>{t('privacy.content.retention')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.thirdParty')}</h2>
          <p>{t('privacy.content.thirdParty')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.outsourcing')}</h2>
          <p>{t('privacy.content.outsourcing')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.rights')}</h2>
          <p>{t('privacy.content.rights')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.items')}</h2>
          <p>{t('privacy.content.items')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.destruction')}</h2>
          <p>{t('privacy.content.destruction')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.security')}</h2>
          <p>{t('privacy.content.security')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.officer')}</h2>
          <p>{t('privacy.content.officer')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.changes')}</h2>
          <p>{t('privacy.content.changes')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.inquiry')}</h2>
          <p>{t('privacy.content.inquiry')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('privacy.sections.effectiveDate')}</h2>
          <p>{t('privacy.content.effectiveDate')}</p>
        </TermsSection>
      </TermsContent>
      
      <MainFooter />
    </TermsContainer>
  );
};

export default PrivacyPage;
