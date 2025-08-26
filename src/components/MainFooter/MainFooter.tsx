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
          사업자등록: 123-45-67890, 직업정보제공사업 : 서울 강남 제 2024-1호, 통신판매업 : 제 2024-서울강남-1234호
          <button className="business-button">사업자정보확인</button>
        </div>
        
        <div className="certification">
          <div className="isms-logo">ISMS-P</div>
        </div>
        
        <div className="copyright">
          Copyright (c) (주)FairWork. All rights reserved.
        </div>
        
        <div className="mobile-link-container">
          <a href="#mobile" className="mobile-link">모바일 버전 보기</a>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
