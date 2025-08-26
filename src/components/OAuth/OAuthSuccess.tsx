import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MainHeader, MainFooter } from '../';
import { theme } from '../../styles/theme/theme';
import { PrimaryButton } from '../../styles/components/GoogleOAuthForm.styles';

const OAuthSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <div style={{
        maxWidth: theme.containers.wide,
        margin: '0 auto',
        padding: theme.spacing.xl,
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            fontSize: '4rem',
            marginBottom: theme.spacing.lg
          }}>
            ✅
          </div>
          
          <h1 style={{
            fontSize: theme.typography.fontSize['3xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.textPrimary,
            marginBottom: theme.spacing.lg
          }}>
            가입이 완료되었습니다!
          </h1>
          
          <p style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.textSecondary,
            marginBottom: theme.spacing.xl,
            lineHeight: theme.typography.lineHeight.relaxed
          }}>
            FairWork에 오신 것을 환영합니다.<br />
            이제 다양한 서비스를 이용하실 수 있습니다.
          </p>
          
          <div style={{
            display: 'flex',
            gap: theme.spacing.md,
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <PrimaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/main')}
            >
              메인 페이지로 이동
            </PrimaryButton>
            
            <PrimaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/resume')}
              style={{ background: theme.colors.secondary }}
            >
              이력서 작성하기
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
      <MainFooter />
    </>
  );
};

export default OAuthSuccess;
