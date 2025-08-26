import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import oauthService from '../services/oauthService';
import { GoogleOAuthUser, OAuthAdditionalInfo } from '../types/oauth';

const useOAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleOAuthUser | null>(null);

  const authenticateWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await oauthService.authenticateWithGoogle();
      if (response.success) {
        setGoogleUser(response.data.user);
        localStorage.setItem('oauthToken', response.data.token);
        navigate('/oauth/additional-info');
      }
    } catch (err) {
      setError('구글 로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const saveAdditionalInfo = useCallback(async (data: OAuthAdditionalInfo) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await oauthService.saveAdditionalInfo(data);
      if (response.success) {
        navigate('/oauth/success');
      }
    } catch (err) {
      setError('저장에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  return {
    isLoading,
    error,
    googleUser,
    authenticateWithGoogle,
    saveAdditionalInfo
  };
};

export default useOAuth;
