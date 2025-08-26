import styled from 'styled-components';
import { COLORS } from '../../constants';

export const FooterContainer = styled.footer`
  background: #1a1a1a;
  padding: 4rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.8rem;
    margin-bottom: 1rem;
  }
`;

export const SocialIcon = styled.a`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primary};
    transform: scale(1.1);
  }

  svg {
    width: 30px;
    height: 30px;
    fill: white;
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    
    svg {
      width: 25px;
      height: 25px;
    }
  }
  
  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

export const Copyright = styled.p`
  color: #cccccc;
  font-size: 1.1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

