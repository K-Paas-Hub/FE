import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PasswordResetForm from './PasswordResetForm';
import Footer from '../MainFooter';
import { devLog, devError } from '../../utils/logger';
import '../../styles/PasswordResetForm.css';

const PasswordResetPage: React.FC = () => {
  const { t } = useTranslation();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setIsFormLoading(true);
    try {
      // TODO: 실제 비밀번호 재설정 API 호출
      devLog(t('passwordReset.logs.request'), { email });
      
      // 임시로 2초 대기
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 성공 처리
      alert(t('passwordReset.messages.success'));
    } catch (error) {
      devError(t('passwordReset.logs.error'), error);
      alert(t('passwordReset.messages.error'));
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
          {t('passwordReset.title')}
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
