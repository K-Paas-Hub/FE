import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MainHeader, MainFooter } from '../';
import { PrimaryButton } from '../../styles/components/GoogleOAuthForm.styles';
import {
  SuccessContainer,
  SuccessIcon,
  SuccessTitle,
  SuccessDescription,
  ButtonContainer,
  SecondaryButton,
} from './OAuthSuccess.styles';

const OAuthSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainHeader />
      <SuccessContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SuccessIcon>
            ✅
          </SuccessIcon>
          
          <SuccessTitle>
            가입이 완료되었습니다!
          </SuccessTitle>
          
          <SuccessDescription>
            FairWork에 오신 것을 환영합니다.<br />
            이제 다양한 서비스를 이용하실 수 있습니다.
          </SuccessDescription>
          
          <ButtonContainer>
            <PrimaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/main')}
            >
              메인 페이지로 이동
            </PrimaryButton>
            
            <SecondaryButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/resume')}
            >
              이력서 작성하기
            </SecondaryButton>
          </ButtonContainer>
        </motion.div>
      </SuccessContainer>
      <MainFooter />
    </>
  );
};

export default OAuthSuccess;
