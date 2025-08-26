import React from 'react';
import { MainHeader, MainFooter } from '../';
import { useMyPage } from '../../hooks/useMyPage';
import {
  MyPageContainer,
  MyPageContent,
  MainContent,
  LoadingSpinner,
  ErrorMessage,
} from '../../styles/components/MyPage.styles';
import ProfileSection from './ProfileSection';
import SettingsSection from './SettingsSection';

const MyPage: React.FC = () => {
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
          <MainContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProfileSection profile={profile} />
            <SettingsSection settings={settings} />
          </MainContent>
        </MyPageContent>
      </MyPageContainer>
      <MainFooter />
    </>
  );
};

export default MyPage;
