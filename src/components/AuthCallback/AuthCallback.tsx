import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
import { authService, supabase } from '../../services/authService';

const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
`;

const CallbackCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid ${COLORS.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const Message = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const SuccessMessage = styled.p`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(errorDescription || 'Google OAuth 설정을 확인해주세요.');
          setTimeout(() => {
            navigate('/main');
          }, 5000);
          return;
        }

        // 먼저 현재 세션 확인
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // 이미 세션이 있으면 즉시 메인 페이지로 이동
          console.log('Session already exists:', session);
          navigate('/main');
          return;
        }

        if (!code) {
          // 코드가 없어도 세션 확인 후 처리
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            navigate('/main');
            return;
          }
          
          setStatus('error');
          setMessage('인증 코드가 없습니다. 다시 로그인해주세요.');
          setTimeout(() => {
            navigate('/main');
          }, 5000);
          return;
        }

        // 코드를 세션으로 교환
        const { data, error: exchangeError } = await authService.exchangeCodeForSession(code);
        
        if (exchangeError) {
          setStatus('error');
          setMessage(`세션 교환 중 오류: ${exchangeError.message}`);
          console.error('Exchange error:', exchangeError);
          setTimeout(() => {
            navigate('/main');
          }, 5000);
          return;
        }

        console.log('Session exchange successful:', data);

        // 즉시 메인 페이지로 리디렉션
        navigate('/main');

      } catch (error) {
        setStatus('error');
        setMessage('예상치 못한 오류가 발생했습니다.');
        setTimeout(() => {
          navigate('/main');
        }, 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <CallbackContainer>
      <CallbackCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.normal }}
      >
        {status === 'loading' && (
          <>
            <LoadingSpinner />
            <Title>로그인 처리 중...</Title>
            <Message>잠시만 기다려주세요.</Message>
          </>
        )}

        {status === 'success' && (
          <>
            <Title>로그인 성공!</Title>
            <SuccessMessage>{message}</SuccessMessage>
            <Message>메인 페이지로 이동합니다.</Message>
          </>
        )}

        {status === 'error' && (
          <>
            <Title>로그인 실패</Title>
            <ErrorMessage>{message}</ErrorMessage>
            <Message>메인 페이지로 이동합니다.</Message>
          </>
        )}
      </CallbackCard>
    </CallbackContainer>
  );
};

export default AuthCallback;
