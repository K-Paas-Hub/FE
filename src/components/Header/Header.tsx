import React from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/Header.css';

const Header: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <header className="header-container">
      <div className="header-logo">
        <span>{t('header.logo.fair')} </span>
        <span>{t('header.logo.work')}</span>
      </div>
      <nav className="header-nav">
        <a href="#about">{t('header.navigation.aboutUs')}</a>
        <a href="#features">{t('header.navigation.features')}</a>
        <a href="#partners">{t('header.navigation.partners')}</a>
      </nav>
    </header>
  );
};

export default Header;
