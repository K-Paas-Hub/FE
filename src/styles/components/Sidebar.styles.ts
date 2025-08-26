import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    transform: none;
    flex-direction: row;
    justify-content: center;
    background: rgba(0, 0, 0, 0.95);
    padding: 1rem 0.5rem;
    gap: 0.6rem;
    backdrop-filter: blur(10px);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 0.3rem;
    gap: 0.4rem;
  }
`;

export const SidebarButton = styled(motion.button)<{ $isActive?: boolean }>`
  background: ${props => props.$isActive ? COLORS.primary : '#444444'};
  color: ${props => props.$isActive ? 'white' : '#666666'};
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 20px 0 0 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  min-height: 44px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: white;
    color: ${props => props.$isActive ? COLORS.primary : '#1a1a1a'};
    transform: translateX(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:focus {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    min-width: 90px;
    min-height: 44px;
    padding: 0.8rem 0.6rem;
    font-size: 0.75rem;
    white-space: normal;
    word-break: break-word;
    line-height: 1.2;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  @media (max-width: 480px) {
    min-width: 80px;
    min-height: 40px;
    padding: 0.6rem 0.4rem;
    font-size: 0.7rem;
    white-space: normal;
    word-break: break-word;
    line-height: 1.1;
  }
`;
