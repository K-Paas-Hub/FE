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
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Logo>
        <span>RECRUIT</span>
        <span>PLATFORM</span>
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
