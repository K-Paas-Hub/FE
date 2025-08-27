import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MainFooter as StyledMainFooter,
  FooterContent,
  TopNav,
  TopNavLink,
  MainSection,
  LeftSection,
  FooterLogo,
  CustomerService,
  ContactInfo,
  RightSection,
  EmailButton,
  SocialIcons,
  SocialIcon,
  CompanyInfo,
  BusinessInfo,
  BusinessButton,
  Certification,
  IsmsLogo,
  Copyright,
  MobileLinkContainer,
  MobileLink
} from '../../styles/components/MainFooter.styles';

const MainFooter: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <StyledMainFooter>
      <FooterContent>
        <TopNav>
          <TopNavLink href="#company">{t('mainFooter.links.company')}</TopNavLink>
          <TopNavLink href="#recruitment">{t('mainFooter.links.recruitment')}</TopNavLink>
          <TopNavLink href="#terms">{t('mainFooter.links.terms')}</TopNavLink>
          <TopNavLink href="#privacy">{t('mainFooter.links.privacy')}</TopNavLink>
          <TopNavLink href="#email-reject">{t('mainFooter.links.emailReject')}</TopNavLink>
          <TopNavLink href="#api">{t('mainFooter.links.api')}</TopNavLink>
          <TopNavLink href="#partnership">{t('mainFooter.links.partnership')}</TopNavLink>
          <TopNavLink href="#customer-center">{t('mainFooter.links.customerCenter')}</TopNavLink>
        </TopNav>
        
        <MainSection>
          <LeftSection>
            <FooterLogo>FairWork</FooterLogo>
            <CustomerService>
              <br/>
              {t('mainFooter.contact.title')} {t('mainFooter.contact.phone')} ({t('mainFooter.contact.hours')})
            </CustomerService>
            <ContactInfo>
              {t('mainFooter.contact.emailLabel')} : {t('mainFooter.contact.email')}, {t('mainFooter.contact.faxLabel')} : {t('mainFooter.contact.fax')}
            </ContactInfo>
          </LeftSection>
          
          <RightSection>
            <EmailButton>{t('mainFooter.actions.emailInquiry')}</EmailButton>
            <SocialIcons>
              <SocialIcon href="#blog">B</SocialIcon>
              <SocialIcon href="#facebook">f</SocialIcon>
            </SocialIcons>
          </RightSection>
        </MainSection>
        
        <CompanyInfo>
          {t('mainFooter.company.name')}, {t('mainFooter.company.address')}, {t('mainFooter.company.ceo')}
        </CompanyInfo>
        
        <BusinessInfo>
          {t('footer.businessInfo')}
          <BusinessButton>{t('footer.businessInfoButton')}</BusinessButton>
        </BusinessInfo>
        
        <Certification>
          <IsmsLogo>ISMS-P</IsmsLogo>
        </Certification>
        
        <Copyright>
          {t('footer.copyright')}
        </Copyright>
        
        <MobileLinkContainer>
          <MobileLink href="#mobile">{t('footer.mobileVersion')}</MobileLink>
        </MobileLinkContainer>
      </FooterContent>
    </StyledMainFooter>
  );
};

export default MainFooter;
