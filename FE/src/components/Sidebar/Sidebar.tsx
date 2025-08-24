import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
import { useScrollSpy } from '../../hooks';

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    transform: none;
    flex-direction: row;
    justify-content: center;
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem;
    gap: 0.5rem;
  }
`;

const SidebarButton = styled(motion.button)<{ $isActive?: boolean }>`
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
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  &:hover {
    background: white;
    color: ${props => props.$isActive ? COLORS.primary : '#1a1a1a'};
    transform: translateX(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    border-radius: 20px;
    min-width: auto;
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
    
    &:hover {
      transform: translateY(-3px);
    }
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.7rem;
  }
`;

interface SidebarItem {
  id: string;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'introduce', label: 'introduce', href: '#introduce' },
  { id: 'result', label: 'result', href: '#result' },
  { id: 'features', label: 'feautres', href: '#features' },
  { id: 'sponsor', label: 'sponsor', href: '#sponsor' }
];

const Sidebar: React.FC = () => {
  const sectionIds = sidebarItems.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds, 100); // 헤더 높이만큼 오프셋

  const handleButtonClick = (itemId: string, href: string) => {
    // 스크롤 애니메이션
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <SidebarContainer>
      {sidebarItems.map((item, index) => (
        <SidebarButton
          key={item.id}
          $isActive={activeSection === item.id}
          onClick={() => handleButtonClick(item.id, item.href)}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: ANIMATIONS.duration.normal, 
            delay: index * 0.1 
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {item.label}
        </SidebarButton>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
