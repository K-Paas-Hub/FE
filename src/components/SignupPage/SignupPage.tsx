import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SignupForm from './SignupForm';
import Footer from '../MainFooter';
import { VisaInfo } from '../../types/visa';
import '../../styles/SignupForm.css';

const SignupPage: React.FC = () => {
  const { t } = useTranslation();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleSignup = async (
    id: string,
    password: string,
    passwordConfirm: string,
    name: string,
    phone: string,
    address: string,
    visaInfo: VisaInfo
  ) => {
    setIsFormLoading(true);
    try {
      // 여기에 실제 회원가입 로직을 구현하세요
      console.log('Signup attempt:', { 
        id, 
        password, 
        passwordConfirm, 
        name, 
        phone, 
        address,
        visaInfo 
      });
      
      // 목업 데이터로 성공 응답 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 성공 시 처리 (예: 로그인 페이지로 리다이렉트)
              alert(t('auth.signup.success'));
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Signup failed:', error);
              alert(t('auth.signup.error'));
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">{t('auth.signup.title')}</h1>
        <SignupForm onSubmit={handleSignup} isLoading={isFormLoading} />
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
