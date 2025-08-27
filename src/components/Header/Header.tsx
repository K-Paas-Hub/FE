import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  HeaderContainer,
  HeaderLogo,
  HeaderNav,
  HeaderNavLink
} from '../../styles/components/Header.styles';

const Header: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <HeaderContainer>
      <HeaderLogo>
        <span>{t('header.logo.fair')} </span>
        <span>{t('header.logo.work')}</span>
      </HeaderLogo>
      <HeaderNav>
        <HeaderNavLink href="#about">{t('header.navigation.aboutUs')}</HeaderNavLink>
        <HeaderNavLink href="#features">{t('header.navigation.features')}</HeaderNavLink>
        <HeaderNavLink href="#partners">{t('header.navigation.partners')}</HeaderNavLink>
      </HeaderNav>
    </HeaderContainer>
  );
};

export default Header;
