import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const Footer = styled.footer`
  background: #f8f9fa;
  color: #333;
  padding: 2rem 2rem 1rem;
  margin-top: 4rem;
  border-top: 1px solid #e5e5e5;
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TopNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 0.9rem;
  }
`;

const TopNavLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const LeftSection = styled.div`
  flex: 1;
`;

const Logo = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CustomerService = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ContactInfo = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

const EmailButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;
  
  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  a {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #666;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: bold;
    
    &:hover {
      background: ${COLORS.primary};
    }
  }
`;

const CompanyInfo = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const BusinessInfo = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

const BusinessButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  color: #666;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;
  
  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const Certification = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ISMSLogo = styled.div`
  background: linear-gradient(135deg, #4ade80, #3b82f6);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
`;

const Copyright = styled.div`
  color: #999;
  font-size: 0.8rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
`;

const MobileLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.85rem;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const MainFooter: React.FC = () => {
  return (
    <Footer>
      <FooterContent>
        <TopNav>
          <TopNavLink href="#company">회사소개</TopNavLink>
          <TopNavLink href="#recruitment">인재채용</TopNavLink>
          <TopNavLink href="#terms">회원약관</TopNavLink>
          <TopNavLink href="#privacy">개인정보처리방침</TopNavLink>
          <TopNavLink href="#email-reject">이메일무단수집거부</TopNavLink>
          <TopNavLink href="#api">채용정보 API</TopNavLink>
          <TopNavLink href="#partnership">제휴문의</TopNavLink>
          <TopNavLink href="#customer-center">고객센터</TopNavLink>
        </TopNav>
        
        <MainSection>
          <LeftSection>
            <Logo>fairwork</Logo>
            <CustomerService>
              FairWork 고객센터 02-1234-5678 (평일 09:00~19:00, 주말·공휴일 휴무)
            </CustomerService>
            <ContactInfo>
              이메일 : help@fairwork.co.kr, Fax : 02-1234-5679(대표), 02-1234-5680(세금계산서)
            </ContactInfo>
          </LeftSection>
          
          <RightSection>
            <EmailButton>이메일문의</EmailButton>
            <SocialIcons>
              <a href="#blog">B</a>
              <a href="#facebook">f</a>
            </SocialIcons>
          </RightSection>
        </MainSection>
        
        <CompanyInfo>
          (주)FairWork, 우: 07800, 서울특별시 강남구 테헤란로 123, FairWork빌딩 10층, 대표 : 김철수
        </CompanyInfo>
        
        <BusinessInfo>
          사업자등록: 123-45-67890, 직업정보제공사업 : 서울 강남 제 2024-1호, 통신판매업 : 제 2024-서울강남-1234호
          <BusinessButton>사업자정보확인</BusinessButton>
        </BusinessInfo>
        
        <Certification>
          <ISMSLogo>ISMS-P</ISMSLogo>
        </Certification>
        
        <Copyright>
          Copyright (c) (주)FairWork. All rights reserved.
        </Copyright>
        
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <MobileLink href="#mobile">모바일 버전 보기</MobileLink>
        </div>
      </FooterContent>
    </Footer>
  );
};

export default MainFooter;
