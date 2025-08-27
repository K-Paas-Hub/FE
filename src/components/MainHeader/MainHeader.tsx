import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import {
  Header,
  MainHeader,
  MainHeaderContent,
  SubHeader,
  SubHeaderContent,
  Logo,
  LogoImage,
  LogoText,
  MainHeaderRight,
  NavWrapper,
  Nav,
  NavLink,
  DropdownContainer,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownItemIcon,
  LanguageButton,
  FlagIcon,
  LanguageText,
  LanguageDropdown,
  LanguageOption,
  AuthButton,
  UserButton,
  UserDropdownMenu,
  UserDropdownItem,
  MobileMenuButton,
  EllipsisText,
} from '../../styles/components/MainHeader.styles';

const MainHeaderComponent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const { user, signOut, isAuthenticated } = useAuth();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [isContractDropdownOpen, setIsContractDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageClick = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Language button clicked, current state:', isLanguageOpen);
    }
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageSelect = (language: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Language selected:', language);
    }
    changeLanguage(language);
    setIsLanguageOpen(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
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
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const getCurrentLanguageName = () => {
    const currentLang = getCurrentLanguage();
    return currentLang ? currentLang.name : t('common.korean');
  };

  // 이력서 관련 페이지인지 확인
  const isResumePage = () => {
    return location.pathname === '/resume' || location.pathname === '/spell-check';
  };

  // 근로계약서 관련 페이지인지 확인
  const isContractPage = () => {
    return location.pathname === '/contract-tutorial' || location.pathname === '/contract-analysis' || location.pathname === '/contract-quiz';
  };

  return (
    <Header>
      {/* 첫 번째 줄: 로고, 언어 선택, 인증 */}
      <MainHeader>
        <MainHeaderContent>
          <Logo onClick={() => navigate('/main')}>
            <LogoImage src="/fairwork.svg" alt="FairWork" />
            <LogoText>FairWork</LogoText>
        </Logo>
          
          <MainHeaderRight>
            <LanguageButton 
              ref={languageDropdownRef}
              onClick={handleLanguageClick} 
              className="language-dropdown"
            >
              <FlagIcon 
                src={getCurrentLanguage().flag} 
                alt={getCurrentLanguageName()} 
                className={getCurrentLanguage().code === 'ne' ? 'nepal-flag' : ''}
              />
              <LanguageText>{getCurrentLanguageName()}</LanguageText>
              <LanguageDropdown $isOpen={isLanguageOpen}>
                {languages.map((language) => (
                  <LanguageOption 
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                  >
                    <FlagIcon 
                      src={language.flag} 
                      alt={language.name} 
                      className={language.code === 'ne' ? 'nepal-flag' : ''}
                    />
                    <EllipsisText>
                      {language.name}
                    </EllipsisText>
                  </LanguageOption>
                ))}
              </LanguageDropdown>
            </LanguageButton>
            
            {isAuthenticated ? (
              <DropdownContainer
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                <UserButton $isOpen={isUserDropdownOpen}>
                  {user?.user_metadata?.full_name || user?.email || t('common.user')}
                </UserButton>
                <UserDropdownMenu $isOpen={isUserDropdownOpen}>
                  <UserDropdownItem onClick={signOut}>
                    {t('common.logout')}
                  </UserDropdownItem>
                </UserDropdownMenu>
              </DropdownContainer>
            ) : (
              <AuthButton onClick={() => navigate('/login')}>
                {t('common.login')}
              </AuthButton>
            )}
          </MainHeaderRight>
        </MainHeaderContent>
      </MainHeader>

      {/* 두 번째 줄: 네비게이션 메뉴 */}
      <SubHeader>
        <SubHeaderContent>
          <MobileMenuButton>
            ☰
          </MobileMenuButton>
          
        <NavWrapper>
          <Nav>
            <NavLink 
              to="/main" 
              className={location.pathname === '/main' ? 'active' : ''}
            >
              {t('header.jobPostings')}
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
                {t('header.myResume')}
              </DropdownTrigger>
              <DropdownMenu $isOpen={isResumeDropdownOpen}>
                <DropdownItem to="/resume">
                  {t('header.resumeWriting')}
                </DropdownItem>
                  <DropdownItem to="/spell-check">
                    <DropdownItemIcon src="/images/search.png" alt={t('header.spellCheck')} />
                    {t('header.spellCheck')}
                </DropdownItem>
              </DropdownMenu>
            </DropdownContainer>
            
            <NavLink 
              to="/visa" 
              className={location.pathname === '/visa' ? 'active' : ''}
            >
              {t('header.visaCenter')}
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
                {t('header.employmentContract')}
              </DropdownTrigger>
              <DropdownMenu $isOpen={isContractDropdownOpen}>
                <DropdownItem to="/contract-tutorial">
                  {t('header.writingGuide')}
                </DropdownItem>
                <DropdownItem to="/contract-quiz">
                  {t('header.contractQuiz')}
                </DropdownItem>
                <DropdownItem to="/contract-analysis">
                  {t('header.contractAnalysis')}
                </DropdownItem>
              </DropdownMenu>
            </DropdownContainer>
              
              <NavLink 
                to="/interview" 
                className={location.pathname === '/interview' ? 'active' : ''}
                preventScrollReset={true}
              >
                {t('header.aiInterview')}
              </NavLink>
          </Nav>
        </NavWrapper>
          

        </SubHeaderContent>
      </SubHeader>
    </Header>
  );
};

export default MainHeaderComponent;
