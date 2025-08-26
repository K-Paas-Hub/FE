import React from 'react';
import { useTranslation } from 'react-i18next';
import { ANIMATIONS } from '../../constants';
import { useScrollSpy } from '../../hooks';
import {
  SidebarContainer,
  SidebarButton
} from '../../styles/components/Sidebar.styles';



interface SidebarItem {
  id: string;
  labelKey: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { id: 'hero', labelKey: 'hero', href: '#hero' },
  { id: 'activity', labelKey: 'activity', href: '#activity' },
  { id: 'project', labelKey: 'project', href: '#project' },
  { id: 'page', labelKey: 'page', href: '#page' },
  { id: 'sponsor', labelKey: 'sponsor', href: '#sponsor' }
];

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
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
          {t(`sidebar.items.${item.labelKey}`)}
        </SidebarButton>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
