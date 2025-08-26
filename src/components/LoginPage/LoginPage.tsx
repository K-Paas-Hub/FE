import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from './LoginForm';
import Footer from '../MainFooter';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // 더미 OAuth 처리 - 백엔드 연동 시 실제 로직으로 교체
      console.log('Google OAuth 처리 시작');
      navigate('/oauth/additional-info');
    } catch (error) {
      console.error('Google login error:', error);
      alert('구글 로그인 중 오류가 발생했습니다.');
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
