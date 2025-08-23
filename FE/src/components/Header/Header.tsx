import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  span:first-child {
    color: ${COLORS.primary};
  }
  span:last-child {
    color: white;
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${COLORS.primary};
    }
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
    
    a {
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    
    a {
      font-size: 0.8rem;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <span>Fair </span>
        <span>Work</span>
      </Logo>
      <Nav>
        <a href="#about">ABOUT US</a>
        <a href="#features">FEATURES</a>
        <a href="#partners">PARTNERS</a>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
