import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
import { useScrollSpy } from '../../hooks';

const SidebarContainer = styled.div`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SidebarButton = styled(motion.button)<{ $isActive?: boolean }>`
  background: ${props => props.$isActive ? COLORS.primary : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  min-width: 120px;
  text-align: center;
  
  &:hover {
    background: ${props => props.$isActive ? COLORS.primaryHover : 'rgba(255, 255, 255, 0.2)'};
    transform: translateX(-5px);
  }
`;

interface SidebarItem {
  id: string;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'activity', label: 'activity', href: '#activity' },
  { id: 'project', label: 'project', href: '#project' },
  { id: 'blog', label: 'blog', href: '#blog' },
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </SidebarButton>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
