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
        <TopNav role="navigation" aria-label="푸터 네비게이션">
          <TopNavLink href="#company" aria-label="회사 정보">{t('mainFooter.links.company')}</TopNavLink>
          <TopNavLink href="#recruitment" aria-label="채용 정보">{t('mainFooter.links.recruitment')}</TopNavLink>
          <TopNavLink href="#terms" aria-label="이용약관">{t('mainFooter.links.terms')}</TopNavLink>
          <TopNavLink href="#privacy" aria-label="개인정보처리방침">{t('mainFooter.links.privacy')}</TopNavLink>
          <TopNavLink href="#email-reject" aria-label="이메일 무단수집 거부">{t('mainFooter.links.emailReject')}</TopNavLink>
          <TopNavLink href="#api" aria-label="API 정보">{t('mainFooter.links.api')}</TopNavLink>
          <TopNavLink href="#partnership" aria-label="파트너십">{t('mainFooter.links.partnership')}</TopNavLink>
          <TopNavLink href="#customer-center" aria-label="고객센터">{t('mainFooter.links.customerCenter')}</TopNavLink>
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
            <EmailButton 
              onClick={() => window.open('mailto:contact@fairwork.kr')}
              aria-label="이메일 문의하기"
            >
              {t('mainFooter.actions.emailInquiry')}
            </EmailButton>
            <SocialIcons role="group" aria-label="소셜 미디어 링크">
              <SocialIcon href="#blog" aria-label="블로그">B</SocialIcon>
              <SocialIcon href="#facebook" aria-label="페이스북">f</SocialIcon>
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
            aria-label="사업자정보 확인"
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
