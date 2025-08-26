import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import Footer from '../MainFooter';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // 백엔드 API 호출
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // 성공 시 처리 (예: 토큰 저장, 리디렉션 등)
        console.log('Google login successful:', data);
      } else {
        console.error('Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsGoogleLoading(false);
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
