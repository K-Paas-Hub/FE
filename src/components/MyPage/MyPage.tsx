import React from 'react';
import { useTranslation } from 'react-i18next';
import { MainHeader, MainFooter } from '../';
import { useMyPage } from '../../hooks/useMyPage';
import {
  MyPageContainer,
  MyPageContent,
  Sidebar,
  MainContent,
  SectionTitle,
  LoadingSpinner,
  ErrorMessage,
} from '../../styles/components/MyPage.styles';
import ProfileSection from './ProfileSection';
import SettingsSection from './SettingsSection';
import UserTypeSection from './UserTypeSection';

const MyPage: React.FC = () => {
  const { t } = useTranslation();
  const { profile, settings, loading, error } = useMyPage();

  if (loading) {
    return (
      <>
        <MainHeader />
        <MyPageContainer>
          <LoadingSpinner>로딩 중...</LoadingSpinner>
        </MyPageContainer>
        <MainFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <MainHeader />
        <MyPageContainer>
          <ErrorMessage>오류: {error}</ErrorMessage>
        </MyPageContainer>
        <MainFooter />
      </>
    );
  }

  return (
    <>
      <MainHeader />
      <MyPageContainer>
        <MyPageContent>
          <Sidebar
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>{t('myPage.title', '마이페이지')}</SectionTitle>
            {/* 사이드바 네비게이션 - 향후 확장 예정 */}
          </Sidebar>
          
          <MainContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProfileSection profile={profile} />
            <SettingsSection settings={settings} />
            <UserTypeSection profile={profile} />
          </MainContent>
        </MyPageContent>
      </MyPageContainer>
      <MainFooter />
    </>
  );
};

export default MyPage;
