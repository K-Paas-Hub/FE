import styled from 'styled-components';

/**
 * MainFooter 컴포넌트 스타일
 * MainFooter.css를 styled-components로 변환
 */

export const MainFooterContainer = styled.footer`
  background: #f8f9fa;
  color: #333;
  padding: 2rem 2rem 1rem;
  margin-top: 4rem;
  border-top: 1px solid #e5e5e5;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 1rem;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const TopNav = styled.nav`
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

export const TopNavLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    color: #4ade80;
  }
`;

export const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
`;

export const FooterLogo = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const CustomerService = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

export const ContactInfo = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;

  @media (max-width: 768px) {
    align-items: flex-start;
  }
`;

export const EmailButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: #666;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    border-color: #4ade80;
    color: #4ade80;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SocialIconLink = styled.a`
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
    background: #4ade80;
  }
`;

export const CompanyInfo = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

export const BusinessInfo = styled.div`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 1rem;
`;

export const BusinessButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  color: #666;
  font-size: 0.8rem;
  cursor: pointer;
  margin-left: 0.5rem;

  &:hover {
    border-color: #4ade80;
    color: #4ade80;
  }
`;

export const Certification = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const IsmsLogo = styled.div`
  background: linear-gradient(135deg, #4ade80, #3b82f6);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: bold;
`;

export const Copyright = styled.div`
  color: #999;
  font-size: 0.8rem;
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #e5e5e5;
`;

export const MobileLink = styled.a`
  color: #666;
  text-decoration: none;
  font-size: 0.85rem;

  &:hover {
    color: #4ade80;
  }
`;

export const MobileLinkContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`;
