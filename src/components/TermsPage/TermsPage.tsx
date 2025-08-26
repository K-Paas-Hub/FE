import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import MainFooter from '../MainFooter';
import '../../styles/TermsPage.css';

const TermsPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">{t('terms.title')}</h1>
        
        <div className="terms-section">
          <h2>{t('terms.sections.purpose')}</h2>
          <p>{t('terms.content.purpose')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.definitions')}</h2>
          <p>{t('terms.content.definitions')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.effectiveness')}</h2>
          <p>{t('terms.content.effectiveness')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.service')}</h2>
          <p>{t('terms.content.service')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.suspension')}</h2>
          <p>{t('terms.content.suspension')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.registration')}</h2>
          <p>{t('terms.content.registration')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.withdrawal')}</h2>
          <p>{t('terms.content.withdrawal')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.memberObligations')}</h2>
          <p>{t('terms.content.memberObligations')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.companyObligations')}</h2>
          <p>{t('terms.content.companyObligations')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.privacy')}</h2>
          <p>{t('terms.content.privacy')}</p>
        </div>

        <div className="terms-section">
          <h2>{t('terms.sections.supplementary')}</h2>
          <p>{t('terms.content.supplementary')}</p>
        </div>
        
        <div className="login-button-section">
          <Link to="/login" className="login-button">
            {t('terms.actions.backToLogin')}
          </Link>
        </div>
      </div>
      
      <MainFooter />
    </div>
  );
};

export default TermsPage;
