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
        <TopNav role="navigation" aria-label={t('common.accessibility.footerNavigation')}>
                      <TopNavLink href="#company" aria-label={t('common.accessibility.companyInfo')}>{t('mainFooter.links.company')}</TopNavLink>
                      <TopNavLink href="#recruitment" aria-label={t('common.accessibility.recruitmentInfo')}>{t('mainFooter.links.recruitment')}</TopNavLink>
                      <TopNavLink href="#terms" aria-label={t('common.accessibility.termsOfService')}>{t('mainFooter.links.terms')}</TopNavLink>
                      <TopNavLink href="#privacy" aria-label={t('common.accessibility.privacyPolicy')}>{t('mainFooter.links.privacy')}</TopNavLink>
                      <TopNavLink href="#email-reject" aria-label={t('common.accessibility.emailReject')}>{t('mainFooter.links.emailReject')}</TopNavLink>
          <TopNavLink href="#api" aria-label="API 정보">{t('mainFooter.links.api')}</TopNavLink>
                      <TopNavLink href="#partnership" aria-label={t('common.accessibility.partnership')}>{t('mainFooter.links.partnership')}</TopNavLink>
                      <TopNavLink href="#customer-center" aria-label={t('common.accessibility.customerCenter')}>{t('mainFooter.links.customerCenter')}</TopNavLink>
        </TopNav>
        
        <MainSection>
          <LeftSection>
            <FooterLogo>Kareer</FooterLogo>
            <CustomerService>
              <br/>
              {t('mainFooter.contact.title')} {t('mainFooter.contact.phone')} ({t('mainFooter.contact.hours')})
            </CustomerService>
            <ContactInfo>
              {t('mainFooter.contact.emailLabel')} : {t('mainFooter.contact.email')}, {t('mainFooter.contact.faxLabel')} : {t('mainFooter.contact.fax')}
            </ContactInfo>
          </LeftSection>
          
          <RightSection>
            <EmailButton 
              onClick={() => window.open('mailto:contact@kareer.co.kr')}
              aria-label={t('common.accessibility.emailInquiry')}
            >
              {t('mainFooter.actions.emailInquiry')}
            </EmailButton>
            <SocialIcons role="group" aria-label={t('common.accessibility.socialMediaLinks')}>
                              <SocialIcon href="#blog" aria-label={t('common.accessibility.blog')}>B</SocialIcon>
                              <SocialIcon href="#facebook" aria-label={t('common.accessibility.facebook')}>f</SocialIcon>
            </SocialIcons>
          </RightSection>
        </MainSection>
        
        <CompanyInfo>
          {t('mainFooter.company.name')}, {t('mainFooter.company.address')}, {t('mainFooter.company.ceo')}
        </CompanyInfo>
        
        <BusinessInfo>
          {t('footer.businessInfo')}
          <BusinessButton 
            onClick={() => window.open('#business-info', '_blank')}
            aria-label={t('common.accessibility.businessInfoConfirm')}
          >
            {t('footer.businessInfoButton')}
          </BusinessButton>
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
