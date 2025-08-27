import styled from 'styled-components';

export const HeaderContainer = styled.header`
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

export const HeaderLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  span:first-child {
    color: #4ade80;
  }

  span:last-child {
    color: white;
  }
`;

export const HeaderNav = styled.nav`
  display: flex;
  gap: 2rem;
`;

export const HeaderNavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  min-height: 44px;
  display: flex;
  align-items: center;

  &:hover {
    color: #4ade80;
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
    min-height: 36px;
  }
`;

export const HeaderContainerMobile = styled(HeaderContainer)`
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const HeaderLogoMobile = styled(HeaderLogo)`
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const HeaderNavMobile = styled(HeaderNav)`
  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
  }
`;
