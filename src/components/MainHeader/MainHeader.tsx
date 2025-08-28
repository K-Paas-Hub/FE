import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { devLog } from '../../utils/logger';
import {
  Header,
  MainHeader,
  MainHeaderContent,
  SubHeader,
  SubHeaderContent,
  Logo,
  LogoImage,
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

/**
 * 메인 헤더 컴포넌트
 * 
 * 애플리케이션의 상단 헤더를 렌더링하며, 다음 기능을 제공합니다:
 * - 로고 및 홈 네비게이션
 * - 다국어 지원 (7개 언어)
 * - 사용자 인증 상태 관리
 * - 반응형 네비게이션 메뉴
 * - 접근성 지원 (키보드 네비게이션, ARIA 속성)
 * 
 * @returns 메인 헤더 JSX 요소
 * 
 * @example
 * ```tsx
 * <MainHeaderComponent />
 * ```
 */
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

  /**
   * 언어 드롭다운 토글 핸들러
   * 
   * 언어 선택 버튼 클릭 시 드롭다운 메뉴를 열거나 닫습니다.
   * 개발 로그를 기록하여 디버깅을 지원합니다.
   */
  const handleLanguageClick = () => {
    devLog('언어 버튼 클릭', { currentState: isLanguageOpen });
    setIsLanguageOpen(!isLanguageOpen);
  };

  /**
   * 언어 선택 핸들러
   * 
   * @param language - 선택된 언어 코드 (예: 'ko', 'vi', 'km' 등)
   * 
   * 사용자가 언어를 선택했을 때 호출되며, 다음 작업을 수행합니다:
   * - 선택된 언어로 애플리케이션 언어 변경
   * - 언어 드롭다운 메뉴 닫기
   * - 개발 로그 기록
   */
  const handleLanguageSelect = (language: string) => {
    devLog('언어 선택', { language });
    changeLanguage(language);
    setIsLanguageOpen(false);
  };

  /**
   * 외부 클릭 감지 효과
   * 
   * 언어 드롭다운이 열려있을 때 외부 클릭을 감지하여 드롭다운을 닫습니다.
   * 메모리 누수를 방지하기 위해 이벤트 리스너를 적절히 정리합니다.
   */
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

  /**
   * 현재 선택된 언어 객체를 반환
   * 
   * @returns 현재 언어 객체 또는 기본 언어(첫 번째 언어)
   * 
   * 현재 언어 코드와 일치하는 언어 객체를 찾아 반환합니다.
   * 일치하는 언어가 없으면 languages 배열의 첫 번째 언어를 반환합니다.
   */
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  /**
   * 현재 언어의 표시 이름을 반환
   * 
   * @returns 현재 언어의 표시 이름 또는 기본값 '한국어'
   * 
   * 현재 언어의 사용자 친화적인 이름을 반환합니다.
   * 언어 객체가 없으면 번역된 '한국어' 텍스트를 반환합니다.
   */
  const getCurrentLanguageName = () => {
    const currentLang = getCurrentLanguage();
    return currentLang ? currentLang.name : t('common.korean');
  };

  /**
   * 현재 페이지가 이력서 관련 페이지인지 확인
   * 
   * @returns 이력서 관련 페이지 여부
   * 
   * 이력서 작성 페이지('/resume') 또는 맞춤법 검사 페이지('/spell-check')인지 확인합니다.
   */
  const isResumePage = () => {
    return location.pathname === '/resume' || location.pathname === '/spell-check';
  };

  /**
   * 현재 페이지가 근로계약서 관련 페이지인지 확인
   * 
   * @returns 근로계약서 관련 페이지 여부
   * 
   * 근로계약서 튜토리얼, 분석, 퀴즈 페이지인지 확인합니다.
   */
  const isContractPage = () => {
    return location.pathname === '/contract-tutorial' || location.pathname === '/contract-analysis' || location.pathname === '/contract-quiz';
  };

  /**
   * 현재 페이지가 인증 관련 페이지인지 확인
   * 
   * @returns 인증 관련 페이지 여부
   * 
   * 로그인, 회원가입, 비밀번호 찾기, OAuth 관련 페이지인지 확인합니다.
   * 인증 페이지에서는 네비게이션 메뉴를 숨깁니다.
   */
  const isAuthPage = () => {
    return location.pathname === '/login' || 
           location.pathname === '/signup' || 
           location.pathname === '/find-password' ||
           location.pathname === '/oauth/additional-info' ||
           location.pathname === '/oauth/success';
  };

  return (
    <Header>
      {/* 첫 번째 줄: 로고, 언어 선택, 인증 */}
      <MainHeader>
        <MainHeaderContent>
          <Logo 
            onClick={() => navigate('/main')}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/main');
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="홈으로 이동"
          >
            <LogoImage src="/images/kareer-new-logo.png" alt="Kareer" />
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

      {/* 두 번째 줄: 네비게이션 메뉴 - 로그인/회원가입 페이지에서는 숨김 */}
      {!isAuthPage() && (
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
      )}
    </Header>
  );
};

export default MainHeaderComponent;
