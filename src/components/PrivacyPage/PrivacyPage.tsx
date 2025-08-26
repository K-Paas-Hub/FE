import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainFooter from '../MainFooter';
import '../../styles/PrivacyPage.css';

const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1 className="privacy-title">{t('privacy.title')}</h1>
        
        <div className="privacy-section">
          <h2>{t('privacy.sections.purpose')}</h2>
          <p>{t('privacy.content.purpose')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.retention')}</h2>
          <p>{t('privacy.content.retention')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.thirdParty')}</h2>
          <p>{t('privacy.content.thirdParty')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.outsourcing')}</h2>
          <p>{t('privacy.content.outsourcing')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.rights')}</h2>
          <p>{t('privacy.content.rights')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.items')}</h2>
          <p>{t('privacy.content.items')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.destruction')}</h2>
          <p>{t('privacy.content.destruction')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.security')}</h2>
          <p>{t('privacy.content.security')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.officer')}</h2>
          <p>{t('privacy.content.officer')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.changes')}</h2>
          <p>{t('privacy.content.changes')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.inquiry')}</h2>
          <p>{t('privacy.content.inquiry')}</p>
        </div>

        <div className="privacy-section">
          <h2>{t('privacy.sections.effectiveDate')}</h2>
          <p>{t('privacy.content.effectiveDate')}</p>
        </div>
        
        <div className="login-button-section">
          <Link to="/login" className="login-button">
            {t('privacy.actions.backToLogin')}
          </Link>
        </div>
      </div>
      
      <MainFooter />
    </div>
  );
};

export default PrivacyPage;
