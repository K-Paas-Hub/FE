import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const FooterContainer = styled.footer`
  background: #1a1a1a;
  padding: 3rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.primary};
    transform: scale(1.1);
  }
`;

const Copyright = styled.p`
  color: #cccccc;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <SocialIcons>
        <SocialIcon>📧</SocialIcon>
        <SocialIcon>💬</SocialIcon>
        <SocialIcon>📱</SocialIcon>
        <SocialIcon>🐦</SocialIcon>
        <SocialIcon>📘</SocialIcon>
      </SocialIcons>
      <Copyright>© Recruit Platform 2024. All rights reserved.</Copyright>
    </FooterContainer>
  );
};

export default Footer;
