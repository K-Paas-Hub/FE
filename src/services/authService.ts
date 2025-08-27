import { createClient, AuthChangeEvent, Session } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://ucrrijvxknjzxehhpwom.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjcnJpanZ4a25qenhlaGhwd29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDIwOTUsImV4cCI6MjA3MTcxODA5NX0.x4C8R8F_cdqv51zoVYBYW2wahMiX3kOPryjxWyOOxLE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export class AuthService {
  // 로그아웃
  async signOut() {
    return await supabase.auth.signOut();
  }
  
  // 현재 사용자 정보 가져오기
  async getCurrentUser() {
    return await supabase.auth.getUser();
  }
  
  // 인증 상태 변경 감지
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
  

}

export const authService = new AuthService();
