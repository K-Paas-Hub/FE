import { GoogleOAuthUser, OAuthAdditionalInfo } from '../types/oauth';
import { devLog } from '../utils/logger';

// 백엔드 연동 전까지 더미 데이터 사용
const oauthService = {
  authenticateWithGoogle: async () => {
    // 더미 구글 사용자 데이터
    const mockUser: GoogleOAuthUser = {
      id: 'google_123',
      email: 'user@gmail.com',
      name: '홍길동',
      picture: 'https://via.placeholder.com/40'
    };
    
    return {
      success: true,
      data: { user: mockUser, token: 'dummy_token' }
    };
  },
  
  saveAdditionalInfo: async (data: OAuthAdditionalInfo) => {
    // 더미 저장 로직
    devLog('OAuth 추가 정보 저장', data);
    return { success: true };
  }
};

export default oauthService;
