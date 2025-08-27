import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainFooter from '../MainFooter';
import {
  PrivacyContainer,
  PrivacyContent,
  PrivacyTitle,
  PrivacySection,
  LoginButtonSection,
  LoginButton,
} from '../../styles/components/PrivacyPage.styles';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <PrivacyContainer>
      <PrivacyContent>
        <PrivacyTitle>{t('privacy.title')}</PrivacyTitle>
        
        <PrivacySection>
          <h2>{t('privacy.sections.purpose')}</h2>
          <p>{t('privacy.content.purpose')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.retention')}</h2>
          <p>{t('privacy.content.retention')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.thirdParty')}</h2>
          <p>{t('privacy.content.thirdParty')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.outsourcing')}</h2>
          <p>{t('privacy.content.outsourcing')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.rights')}</h2>
          <p>{t('privacy.content.rights')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.items')}</h2>
          <p>{t('privacy.content.items')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.destruction')}</h2>
          <p>{t('privacy.content.destruction')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.security')}</h2>
          <p>{t('privacy.content.security')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.officer')}</h2>
          <p>{t('privacy.content.officer')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.changes')}</h2>
          <p>{t('privacy.content.changes')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.inquiry')}</h2>
          <p>{t('privacy.content.inquiry')}</p>
        </PrivacySection>

        <PrivacySection>
          <h2>{t('privacy.sections.effectiveDate')}</h2>
          <p>{t('privacy.content.effectiveDate')}</p>
        </PrivacySection>
        
        <LoginButtonSection>
          <LoginButton as={Link} to="/login">
            {t('privacy.actions.backToLogin')}
          </LoginButton>
        </LoginButtonSection>
      </PrivacyContent>
      
      <MainFooter />
    </PrivacyContainer>
  );
};

export default PrivacyPage;
