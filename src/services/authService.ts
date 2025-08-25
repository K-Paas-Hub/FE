import { createClient } from '@supabase/supabase-js';
import { GoogleAuthResponse } from '../types/auth';

// Supabase 클라이언트 생성
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ucrrijvxknjzxehhpwom.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcnJpanZ4a25qenhlaGhwd29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDIwOTUsImV4cCI6MjA3MTcxODA5NX0.x4C8R8F_cdqv51zoVYBYW2wahMiX3kOPryjxWyOOxLE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class AuthService {
  // Google 로그인
  async signInWithGoogle(): Promise<GoogleAuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });
      
      // signInWithOAuth는 URL을 반환하므로, 실제 사용자 데이터는 콜백에서 처리
      return { 
        data: { user: null, session: null }, 
        error 
      };
    } catch (error) {
      return { 
        data: { user: null, session: null }, 
        error 
      };
    }
  }
  
  // 로그아웃
  async signOut() {
    return await supabase.auth.signOut();
  }
  
  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    return await supabase.auth.getUser();
  }
  
  // 인증 상태 변경 감지
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
  
  // 코드를 세션으로 교환
  async exchangeCodeForSession(code: string) {
    return await supabase.auth.exchangeCodeForSession(code);
  }
}

export const authService = new AuthService();
