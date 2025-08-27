import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginForm from './LoginForm';
import Footer from '../MainFooter';
import { devLog, devError } from '../../utils/logger';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // 더미 OAuth 처리 - 백엔드 연동 시 실제 로직으로 교체
      devLog('Google OAuth 처리 시작');
      navigate('/oauth/additional-info');
    } catch (error) {
      devError('Google 로그인 에러', error);
      alert(t('auth.googleLoginError'));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFormLogin = async (id: string, pw: string) => {
    setIsFormLoading(true);
    try {
      // 여기에 실제 로그인 로직을 구현하세요
      devLog('폼 로그인 시도', { id });
      // 예시: await signInWithEmail(id, pw);
    } catch (error) {
      devError('폼 로그인 실패', error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">{t('auth.loginTitle')}</h1>
        <LoginForm 
          onSubmit={handleFormLogin} 
          isLoading={isFormLoading || isGoogleLoading}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
