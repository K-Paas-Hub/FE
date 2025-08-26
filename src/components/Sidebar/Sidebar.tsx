import React from 'react';
import { ANIMATIONS } from '../../constants';
import { useScrollSpy } from '../../hooks';
import {
  SidebarContainer,
  SidebarButton
} from '../../styles/components/Sidebar.styles';



interface SidebarItem {
  id: string;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'hero', label: 'intro', href: '#hero' },
  { id: 'activity', label: 'features', href: '#activity' },
  { id: 'project', label: 'result', href: '#project' },
  { id: 'page', label: 'page', href: '#page' },
  { id: 'sponsor', label: 'sponsor', href: '#sponsor' }
];

const Sidebar: React.FC = () => {
  const sectionIds = sidebarItems.map(item => item.id);
  const activeSection = useScrollSpy(sectionIds, 160); // 헤더 높이 + 여유 공간

  const handleButtonClick = (itemId: string, href: string) => {
    // 스크롤 애니메이션
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80; // 헤더 높이 추정값
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
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
