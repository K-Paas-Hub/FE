import React, { useState } from 'react';
import PasswordResetForm from './PasswordResetForm';
import Footer from '../MainFooter';
import '../../styles/PasswordResetForm.css';

const PasswordResetPage: React.FC = () => {
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setIsFormLoading(true);
    try {
      // TODO: 실제 비밀번호 재설정 API 호출
      console.log('비밀번호 재설정 요청:', email);
      
      // 임시로 2초 대기
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 성공 처리
      alert('임시 비밀번호가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error('비밀번호 재설정 오류:', error);
      alert('비밀번호 재설정 중 오류가 발생했습니다.');
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-content">
        <div className="security-icon">
          <video 
            src="/images/safety_lock.mp4" 
            className="safety-lock-video"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        
        <div className="password-reset-description">
          FairWork 계정의<br />
          비밀번호를 재설정합니다.
        </div>
        
        <PasswordResetForm 
          onSubmit={handlePasswordReset}
          isLoading={isFormLoading}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default PasswordResetPage;
