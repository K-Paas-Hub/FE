import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PasswordResetForm from './PasswordResetForm';
import Footer from '../MainFooter';
import { devLog, devError } from '../../utils/logger';
import {
  PasswordResetContainer,
  PasswordResetContent,
  SecurityIcon,
  SafetyLockVideo,
  PasswordResetDescription,
} from '../../styles/components/PasswordResetForm.styles';

const PasswordResetPage: React.FC = () => {
  const { t } = useTranslation();
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setIsFormLoading(true);
    try {
      // TODO: 실제 비밀번호 재설정 API 호출
      devLog('비밀번호 재설정 요청', { email });
      
      // 임시로 2초 대기
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 성공 처리
      alert(t('passwordReset.messages.success'));
    } catch (error) {
      devError('비밀번호 재설정 오류', error);
      alert(t('passwordReset.messages.error'));
    } finally {
      setIsFormLoading(false);
    }
  };

  return (
    <PasswordResetContainer>
      <PasswordResetContent>
        <SecurityIcon>
          <SafetyLockVideo
            src="/images/safety_lock.mp4" 
            autoPlay
            loop
            muted
            playsInline
          />
        </SecurityIcon>
        
        <PasswordResetDescription>
          {t('passwordReset.title')}
        </PasswordResetDescription>
        
        <PasswordResetForm 
          onSubmit={handlePasswordReset}
          isLoading={isFormLoading}
        />
      </PasswordResetContent>
      
      <Footer />
    </PasswordResetContainer>
  );
};

export default PasswordResetPage;
