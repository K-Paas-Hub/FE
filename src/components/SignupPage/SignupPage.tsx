import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SignupForm from './SignupForm';
import MainHeader from '../MainHeader';
import Footer from '../MainFooter';
import { VisaInfo } from '../../types/visa';
import { devLog, devError } from '../../utils/logger';
import {
  SignupContainer,
  SignupContent,
  SignupTitle
} from '../../styles/components/SignupForm.styles';

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
      // Implement actual signup logic here
      devLog(t('auth.signup.logs.signupAttempt'), { 
        id, 
        name, 
        phone, 
        address,
        visaInfo 
      });
      
      // Simulate success response with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Handle success (e.g., redirect to login page)
      alert(t('auth.signup.success'));
      window.location.href = '/login';
      
    } catch (error) {
      devError(t('auth.signup.logs.signupFailed'), error);
      alert(t('auth.signup.error'));
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <SignupContainer>
      <MainHeader />
      <SignupContent>
        <SignupTitle>{t('auth.signup.title')}</SignupTitle>
        <SignupForm onSubmit={handleSignup} isLoading={isFormLoading} />
      </SignupContent>
      <Footer />
    </SignupContainer>
  );
};

export default SignupPage;
