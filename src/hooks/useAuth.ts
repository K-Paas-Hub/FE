import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { AuthUser, AuthState } from '../types/auth';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  // Google 로그인
  const signInWithGoogle = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true, error: null }));
      
      const { data, error } = await authService.signInWithGoogle();
      
      if (error) {
        setAuthState(prev => ({ 
          ...prev, 
          loading: false, 
          error: error.message || 'Google 로그인에 실패했습니다.' 
        }));
        return { success: false, error };
      }
      
      setAuthState(prev => ({ 
        ...prev, 
        user: data.user, 
        loading: false 
      }));
      
      return { success: true, data };
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: '로그인 중 오류가 발생했습니다.' 
      }));
      return { success: false, error };
    }
  };

  // 로그아웃
  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }));
      
      await authService.signOut();
      
      setAuthState({
        user: null,
        loading: false,
        error: null
      });
      
      return { success: true };
    } catch (error) {
      setAuthState(prev => ({ 
        ...prev, 
        loading: false, 
        error: '로그아웃 중 오류가 발생했습니다.' 
      }));
      return { success: false, error };
    }
  };

  // 인증 상태 초기화
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { user } } = await authService.getCurrentUser();
        
        setAuthState({
          user,
          loading: false,
          error: null
        });
      } catch (error) {
        setAuthState({
          user: null,
          loading: false,
          error: null
        });
      }
    };

    initializeAuth();

    // 인증 상태 변경 감지
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setAuthState({
            user: session.user as AuthUser,
            loading: false,
            error: null
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            user: null,
            loading: false,
            error: null
          });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!authState.user
  };
};
