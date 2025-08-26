import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import LoginForm from './LoginForm';
import Footer from '../MainFooter';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { t } = useTranslation();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  const handleFormLogin = async (id: string, pw: string) => {
    setIsFormLoading(true);
    try {
      // 여기에 실제 로그인 로직을 구현하세요
      console.log('Form login attempt:', { id, pw });
      // 예시: await signInWithEmail(id, pw);
    } catch (error) {
      console.error('Form login failed:', error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">로그인</h1>
        <LoginForm onSubmit={handleFormLogin} isLoading={isFormLoading} />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
