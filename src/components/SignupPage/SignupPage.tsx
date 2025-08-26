import React, { useState } from 'react';
import SignupForm from './SignupForm';
import Footer from '../MainFooter';
import '../../styles/SignupForm.css';

const SignupPage: React.FC = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleSignup = async (
    id: string,
    password: string,
    passwordConfirm: string,
    name: string,
    phone: string
  ) => {
    setIsFormLoading(true);
    try {
      // 여기에 실제 회원가입 로직을 구현하세요
      console.log('Signup attempt:', { id, password, passwordConfirm, name, phone });
      // 예시: await signUp(id, password, name, phone);
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">회원가입</h1>
        <SignupForm onSubmit={handleSignup} isLoading={isFormLoading} />
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
