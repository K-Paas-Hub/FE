import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/MainFooter.css';

const MainFooter: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="top-nav">
          <a href="#company" className="top-nav-link">{t('mainFooter.links.company')}</a>
          <a href="#recruitment" className="top-nav-link">{t('mainFooter.links.recruitment')}</a>
          <a href="#terms" className="top-nav-link">{t('mainFooter.links.terms')}</a>
          <a href="#privacy" className="top-nav-link">{t('mainFooter.links.privacy')}</a>
          <a href="#email-reject" className="top-nav-link">{t('mainFooter.links.emailReject')}</a>
          <a href="#api" className="top-nav-link">{t('mainFooter.links.api')}</a>
          <a href="#partnership" className="top-nav-link">{t('mainFooter.links.partnership')}</a>
          <a href="#customer-center" className="top-nav-link">{t('mainFooter.links.customerCenter')}</a>
        </div>
        
        <div className="main-section">
          <div className="left-section">
            <div className="footer-logo">FairWork</div>
            <div className="customer-service">
              <br/>
              {t('mainFooter.contact.title')} {t('mainFooter.contact.phone')} ({t('mainFooter.contact.hours')})
            </div>
            <div className="contact-info">
              이메일 : {t('mainFooter.contact.email')}, Fax : {t('mainFooter.contact.fax')}
            </div>
          </div>
          
          <div className="right-section">
            <button className="email-button">{t('mainFooter.actions.emailInquiry')}</button>
            <div className="social-icons">
              <a href="#blog">B</a>
              <a href="#facebook">f</a>
            </div>
          </div>
        </div>
        
        <div className="company-info">
          {t('mainFooter.company.name')}, {t('mainFooter.company.address')}, {t('mainFooter.company.ceo')}
        </div>
        
        <div className="business-info">
          {t('footer.businessInfo')}
          <button className="business-button">{t('footer.businessInfoButton')}</button>
        </div>
        
        <div className="certification">
          <div className="isms-logo">ISMS-P</div>
        </div>
        
        <div className="copyright">
          {t('footer.copyright')}
        </div>
        
        <div className="mobile-link-container">
          <a href="#mobile" className="mobile-link">{t('footer.mobileVersion')}</a>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
