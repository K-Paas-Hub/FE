import React, { useState } from 'react';

import LoginForm from './LoginForm';
import Footer from '../MainFooter';
import '../../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      // Google 로그인 버튼 클릭 시 처리 (실제 OAuth는 동작하지 않음)
      console.log('Google login button clicked (OAuth disabled)');
      alert('Google 로그인 기능은 현재 비활성화되어 있습니다.');
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
