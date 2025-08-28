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

const TermsPage: React.FC = () => {
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
        
        <TermsTitle>{t('terms.title')}</TermsTitle>
        
        <TermsSection>
          <h2>{t('terms.sections.purpose')}</h2>
          <p>{t('terms.content.purpose')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.definitions')}</h2>
          <p>{t('terms.content.definitions')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.effectiveness')}</h2>
          <p>{t('terms.content.effectiveness')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.service')}</h2>
          <p>{t('terms.content.service')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.suspension')}</h2>
          <p>{t('terms.content.suspension')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.registration')}</h2>
          <p>{t('terms.content.registration')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.withdrawal')}</h2>
          <p>{t('terms.content.withdrawal')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.memberObligations')}</h2>
          <p>{t('terms.content.memberObligations')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.companyObligations')}</h2>
          <p>{t('terms.content.companyObligations')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.privacy')}</h2>
          <p>{t('terms.content.privacy')}</p>
        </TermsSection>

        <TermsSection>
          <h2>{t('terms.sections.supplementary')}</h2>
          <p>{t('terms.content.supplementary')}</p>
        </TermsSection>
      </TermsContent>
      
      <MainFooter />
    </TermsContainer>
  );
};

export default TermsPage;
