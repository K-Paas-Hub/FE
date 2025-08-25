import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { COLORS } from '../../constants';

const Header = styled.header`
  background: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 50px;
  
  @media (max-width: 768px) {
    height: 40px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: #ecfdf5;
    color: #059669;
    transform: translateY(-1px);
  }
  
  &.active {
    background: ${COLORS.primary};
    color: white;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #059669;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }
  
  &:hover::after {
    width: 60%;
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

// 드롭다운 관련 스타일 컴포넌트 추가
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownTrigger = styled.div<{ $isOpen: boolean }>`
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    background: #ecfdf5;
    color: #059669;
    transform: translateY(-1px);
  }
  
  &.active {
    background: ${COLORS.primary};
    color: white;
  }
  
  &::after {
    content: '▼';
    font-size: 0.8rem;
    transition: transform 0.3s ease;
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 180px;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  margin-top: 0.5rem;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f3f4f6;
  
  &:hover {
    background: #f8f9fa;
    color: ${COLORS.primary};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LanguageButton = styled.div`
  background: none;
  border: 1px solid #e5e5e5;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  
  &:hover {
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const FlagIcon = styled.img`
  width: 20px;
  height: 15px;
  border-radius: 2px;
  margin-right: 0.5rem;
`;

const LanguageDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 160px;
  display: ${props => props.$isOpen ? 'block' : 'none'};
  margin-top: 0.5rem;
`;

const LanguageOption = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  color: #333;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;

const AuthButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(5, 150, 105, 0.2);
  
  &:hover {
    background: #10b981;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const MainHeader: React.FC = () => {
  const location = useLocation();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [isContractDropdownOpen, setIsContractDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('KO');

  const languages = [
    { code: 'KO', name: '한국어', flag: '/images/flags/south-korea.png' },
    { code: 'EN', name: 'English', flag: '/images/flags/usa.png' },
    { code: '中文', name: '中文', flag: '/images/flags/china.png' },
    { code: '日本語', name: '日本語', flag: '/images/flags/japan.png' },
    { code: 'Tiếng Việt', name: 'Tiếng Việt', flag: '/images/flags/vietnam.png' },
    { code: 'ไทย', name: 'ไทย', flag: '/images/flags/thailand.png' }
  ];

  const handleLanguageClick = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const handleResumeDropdownMouseEnter = () => {
    setIsResumeDropdownOpen(true);
  };

  const handleResumeDropdownMouseLeave = () => {
    setIsResumeDropdownOpen(false);
  };

  const handleContractDropdownMouseEnter = () => {
    setIsContractDropdownOpen(true);
  };

  const handleContractDropdownMouseLeave = () => {
    setIsContractDropdownOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === selectedLanguage) || languages[0];
  };

  const getCurrentLanguageName = () => {
    const currentLang = getCurrentLanguage();
    return currentLang ? currentLang.name : '한국어';
  };

  // 이력서 관련 페이지인지 확인
  const isResumePage = () => {
    return location.pathname === '/resume' || location.pathname === '/spell-check';
  };

  // 근로계약서 관련 페이지인지 확인
  const isContractPage = () => {
    return location.pathname === '/contract-tutorial' || location.pathname === '/contract-analysis';
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-dropdown')) {
        setIsLanguageOpen(false);
      }
    };

    if (isLanguageOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  return (
    <Header>
      <HeaderContent>
        <Logo>
          <LogoImage src="/images/fairwork.png" alt="FairWork" />
        </Logo>
        <Nav>
          <NavLink 
            to="/main" 
            className={location.pathname === '/main' ? 'active' : ''}
          >
            채용 공고
          </NavLink>
          
          {/* 이력서 드롭다운 메뉴 */}
          <DropdownContainer
            onMouseEnter={handleResumeDropdownMouseEnter}
            onMouseLeave={handleResumeDropdownMouseLeave}
          >
            <DropdownTrigger 
              $isOpen={isResumeDropdownOpen}
              className={isResumePage() ? 'active' : ''}
            >
              내 이력서
            </DropdownTrigger>
            <DropdownMenu $isOpen={isResumeDropdownOpen}>
              <DropdownItem to="/resume">
                📄 이력서 작성
              </DropdownItem>
              <DropdownItem to="/spell-check">
                ✏️ 맞춤법 검사
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
          
          <NavLink 
            to="/visa" 
            className={location.pathname === '/visa' ? 'active' : ''}
          >
            비자 센터
          </NavLink>
          
          {/* 근로계약서 드롭다운 메뉴 */}
          <DropdownContainer
            onMouseEnter={handleContractDropdownMouseEnter}
            onMouseLeave={handleContractDropdownMouseLeave}
          >
            <DropdownTrigger 
              $isOpen={isContractDropdownOpen}
              className={isContractPage() ? 'active' : ''}
            >
              근로계약서
            </DropdownTrigger>
            <DropdownMenu $isOpen={isContractDropdownOpen}>
              <DropdownItem to="/contract-tutorial">
                📝 작성 가이드
              </DropdownItem>
              <DropdownItem to="/contract-analysis">
                🔍 계약서 분석
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        </Nav>
        <RightSection>
          <LanguageButton onClick={handleLanguageClick} className="language-dropdown">
            <FlagIcon src={getCurrentLanguage().flag} alt={getCurrentLanguageName()} />
            {getCurrentLanguageName()}
            <LanguageDropdown $isOpen={isLanguageOpen}>
              {languages.map((language) => (
                <LanguageOption 
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                >
                  <FlagIcon src={language.flag} alt={language.name} />
                  {language.name}
                </LanguageOption>
              ))}
            </LanguageDropdown>
          </LanguageButton>
          <AuthButton>로그인/회원가입</AuthButton>
        </RightSection>
      </HeaderContent>
    </Header>
  );
};

export default MainHeader;
