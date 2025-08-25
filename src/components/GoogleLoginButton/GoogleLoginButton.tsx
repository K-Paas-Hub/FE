import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';
import { useAuth } from '../../hooks/useAuth';

const GoogleButton = styled(motion.button)`
  background: white;
  color: #333;
  border: 1px solid #ddd;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #f8f9fa;
    border-color: #ccc;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

const GoogleIcon = styled.div`
  width: 18px;
  height: 18px;
  background: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE3LjY0IDkuMjA0NTVDMTcuNjQgOC41NjY0IDE3LjU4MjcgNy45NTI3MyAxNy40NzY0IDcuMzYzNjRIMTlWMTBIMTcuNjRWOS4yMDQ1NVoiIGZpbGw9IiNGQjQwMzAiLz4KPHBhdGggZD0iTTkgMTguMDAwMUMxMS40MyAxOC4wMDAxIDEzLjQ2NyAxNy4xOTU1IDE1LjA5NzMgMTUuNzM2NEwxMi43NTE4IDEzLjk5NTVDMTIuMDI3MyAxNC41MzE4IDExLjA3MjcgMTQuODM2NCA5IDE0LjgzNjRDNi42NTQ1NSAxNC44MzY0IDQuNjcxODIgMTMuMzY4MiAzLjg3MjczIDExLjM5NTVIMC42MzYzNjRWMTRLjA5NTVDMi4yNzI3MyAxNi4zNjM2IDQuNzI3MjcgMTguMDAwMSA5IDE4LjAwMDFaIiBmaWxsPSIjMzRBODUzIi8+CjxwYXRoIGQ9Ik0zLjg3MjczIDExLjM5NTVDMy42NzI3MyAxMC44MDQ1IDMuNTYzNjQgMTAuMTgxOCAzLjU2MzY0IDkuNUMyLjU2MzY0IDguODE4MTggMy42NzI3MyA4LjE5NTQ1IDMuODcyNzMgNy42MDQ1NUgwLjYzNjM2NFYxMC4zMDQ1QzAuMjM2MzY0IDkuNTQ1NDUgMCA4LjU0NTQ1IDAgNy41QzAgNi40NTQ1NSAwLjIzNjM2NCA1LjQ1NDU1IDAuNjM2MzY0IDQuNjk1NDVIMy44NzI3M1YxMS4zOTU1WiIgZmlsbD0iI0ZCQzA0RCIvPgo8cGF0aCBkPSJNOSAzLjYzNjM2QzEwLjMxODIgMy42MzYzNiAxMS40NTQ1IDQuMTgxODIgMTIuMzE4MiA0Ljg2MzY0TDE1LjA5NzMgMi4yNjM2NEMxMy40NjczIDAuNzE4MTgyIDExLjQzIDAgOSAwQzQuNzI3MjcgMCAyLjI3MjczIDEuNjM2MzYgMC42MzYzNjQgMy45MDQ1NUwzLjg3MjczIDYuNjA0NTVDNS4wNzI3MyA0LjY4MTgyIDYuODgxODIgMy42MzYzNiA5IDMuNjM2MzZaIiBmaWxsPSIjRkY5ODAwIi8+Cjwvc3ZnPgo=') no-repeat center;
  background-size: contain;
  flex-shrink: 0;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface GoogleLoginButtonProps {
  className?: string;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ className }) => {
  const { signInWithGoogle, loading, error } = useAuth();

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    
    if (!result.success) {
      console.error('Google 로그인 실패:', result.error);
      // 여기에 에러 처리 로직 추가 가능 (토스트 메시지 등)
    }
  };

  return (
    <GoogleButton
      className={className}
      onClick={handleGoogleLogin}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: ANIMATIONS.duration.normal }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <GoogleIcon />
      )}
      {loading ? '로그인 중...' : 'Google로 로그인'}
    </GoogleButton>
  );
};

export default GoogleLoginButton;
