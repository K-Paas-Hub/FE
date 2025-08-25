import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${COLORS.background} 0%, ${COLORS.backgroundGradient} 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%234ade80" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
    z-index: 1;
  }
`;

const BackgroundText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12rem;
  font-weight: 900;
  color: rgba(74, 222, 128, 0.05);
  z-index: 1;
  white-space: nowrap;
  pointer-events: none;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

const LoginCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 550px;
  width: 100%;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
    max-width: 500px;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    max-width: 450px;
  }
`;

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Logo = styled.img`
  height: 60px;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    height: 50px;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  text-align: center;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Subtitle = styled(motion.p)`
  color: #666;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2.5rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const SocialButton = styled(motion.button)`
  width: 100%;
  background: white;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${COLORS.primary};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 222, 128, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover {
      border-color: #e1e5e9;
      box-shadow: none;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.95rem;
  }
`;

const GoogleButton = styled(SocialButton)`
  background: white;
  color: #374151;
  border-color: #e1e5e9;
  
  &:hover {
    background: #f8fafc;
    border-color: ${COLORS.primary};
  }
`;

const MicrosoftButton = styled(SocialButton)`
  background: #f8fafc;
  color: #6b7280;
  border-color: #e1e5e9;
  
  &:disabled {
    background: #f8fafc;
  }
`;

const AppleButton = styled(SocialButton)`
  background: #f8fafc;
  color: #6b7280;
  border-color: #e1e5e9;
  
  &:disabled {
    background: #f8fafc;
  }
`;

const PhoneButton = styled(SocialButton)`
  background: #f8fafc;
  color: #6b7280;
  border-color: #e1e5e9;
  
  &:disabled {
    background: #f8fafc;
  }
`;

const ButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;

const GoogleIcon = () => (
  <ButtonIcon>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  </ButtonIcon>
);

const MicrosoftIcon = () => (
  <ButtonIcon>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#f25022" d="M1 1h10v10H1z"/>
      <path fill="#7fba00" d="M13 1h10v10H13z"/>
      <path fill="#00a4ef" d="M1 13h10v10H1z"/>
      <path fill="#ffb900" d="M13 13h10v10H13z"/>
    </svg>
  </ButtonIcon>
);

const AppleIcon = () => (
  <ButtonIcon>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  </ButtonIcon>
);

const PhoneIcon = () => (
  <ButtonIcon>
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path fill="#6b7280" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  </ButtonIcon>
);

const FooterLinks = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e1e5e9;
`;

const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const LoginPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <BackgroundText>FAIRWORK</BackgroundText>
      
      <LoginCard
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: ANIMATIONS.duration.normal,
          ease: "easeOut"
        }}
      >
        <LogoSection>
          <Logo src="/fairwork.svg" alt="FairWork" />
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.2,
              duration: ANIMATIONS.duration.normal,
              ease: "easeOut"
            }}
          >
            FairWork에 오신 걸 환영합니다
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3,
              duration: ANIMATIONS.duration.normal,
              ease: "easeOut"
            }}
          >
            Google 계정으로 간편하게 로그인하세요
          </Subtitle>
        </LogoSection>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.4,
            duration: ANIMATIONS.duration.normal,
            ease: "easeOut"
          }}
        >
          <GoogleButton
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GoogleIcon />
            Google로 계속하기
          </GoogleButton>

          <MicrosoftButton disabled>
            <MicrosoftIcon />
            Microsoft 계정으로 계속하기 (준비 중)
          </MicrosoftButton>

          <AppleButton disabled>
            <AppleIcon />
            Apple로 계속하기 (준비 중)
          </AppleButton>

          <PhoneButton disabled>
            <PhoneIcon />
            폰으로 계속하기 (준비 중)
          </PhoneButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.6,
            duration: ANIMATIONS.duration.normal,
            ease: "easeOut"
          }}
        >
          <FooterLinks>
            <FooterLink href="#">이용약관</FooterLink>
            <span style={{ color: '#6b7280' }}>|</span>
            <FooterLink href="#">개인정보 보호 정책</FooterLink>
          </FooterLinks>
        </motion.div>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
