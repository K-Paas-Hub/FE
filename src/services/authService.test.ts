import { AuthService, authService, supabase } from './authService';

// Mock Supabase
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signOut: jest.fn(),
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(),
      exchangeCodeForSession: jest.fn(),
    }
  }))
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Class instantiation', () => {
    test('creates AuthService instance correctly', () => {
      const service = new AuthService();
      expect(service).toBeInstanceOf(AuthService);
    });

    test('exports singleton authService instance', () => {
      expect(authService).toBeInstanceOf(AuthService);
    });

    test('multiple instances are separate', () => {
      const service1 = new AuthService();
      const service2 = new AuthService();
      expect(service1).not.toBe(service2);
      expect(service1).toEqual(service2); // Same class structure
    });
  });

  describe('signOut', () => {
    test('calls supabase signOut method', async () => {
      const mockResponse = { error: null };
      mockSupabase.auth.signOut.mockResolvedValue(mockResponse);

      const result = await authService.signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1);
      expect(mockSupabase.auth.signOut).toHaveBeenCalledWith();
      expect(result).toBe(mockResponse);
    });

    test('handles successful signOut', async () => {
      const mockResponse = { error: null };
      mockSupabase.auth.signOut.mockResolvedValue(mockResponse);

      const result = await authService.signOut();

      expect(result.error).toBe(null);
    });

    test('handles signOut errors', async () => {
      const mockError = { message: 'Sign out failed', __isAuthError: true };
      const mockResponse = { error: mockError };
      mockSupabase.auth.signOut.mockResolvedValue(mockResponse);

      const result = await authService.signOut();

      expect(result.error).toEqual(mockError);
    });

    test('handles network errors during signOut', async () => {
      const networkError = new Error('Network error');
      mockSupabase.auth.signOut.mockRejectedValue(networkError);

      await expect(authService.signOut()).rejects.toThrow('Network error');
    });

    test('multiple signOut calls work independently', async () => {
      const mockResponse1 = { error: null };
      const mockResponse2 = { error: { message: 'Already signed out' } };
      
      mockSupabase.auth.signOut
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const result1 = await authService.signOut();
      const result2 = await authService.signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(2);
      expect(result1).toBe(mockResponse1);
      expect(result2).toBe(mockResponse2);
    });
  });

  describe('getCurrentUser', () => {
    test('calls supabase getUser method', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };
      const mockResponse = { data: { user: mockUser }, error: null };
      mockSupabase.auth.getUser.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
      expect(mockSupabase.auth.getUser).toHaveBeenCalledWith();
      expect(result).toBe(mockResponse);
    });

    test('handles authenticated user', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };
      const mockResponse = { data: { user: mockUser }, error: null };
      mockSupabase.auth.getUser.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(result.data.user).toEqual(mockUser);
      expect(result.error).toBe(null);
    });

    test('handles unauthenticated user', async () => {
      const mockResponse = { data: { user: null }, error: null };
      mockSupabase.auth.getUser.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(result.data.user).toBe(null);
      expect(result.error).toBe(null);
    });

    test('handles authentication errors', async () => {
      const mockError = { message: 'Invalid JWT', __isAuthError: true };
      const mockResponse = { data: { user: null }, error: mockError };
      mockSupabase.auth.getUser.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(result.data.user).toBe(null);
      expect(result.error).toEqual(mockError);
    });

    test('handles network errors during getCurrentUser', async () => {
      const networkError = new Error('Network error');
      mockSupabase.auth.getUser.mockRejectedValue(networkError);

      await expect(authService.getCurrentUser()).rejects.toThrow('Network error');
    });

    test('handles user with minimal data', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com'
      };
      const mockResponse = { data: { user: mockUser }, error: null };
      mockSupabase.auth.getUser.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(result.data.user).toEqual(mockUser);
      expect(result.data.user.user_metadata).toBeUndefined();
    });

    test('handles user with full metadata', async () => {
      const mockUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: {
          full_name: 'John Doe',
          avatar_url: 'https://example.com/avatar.jpg',
          preferred_language: 'ko'
        }
      };
      const mockResponse = { data: { user: mockUser }, error: null };
      mockSupabase.auth.getUser.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(result.data.user).toEqual(mockUser);
      expect(result.data.user.user_metadata.full_name).toBe('John Doe');
      expect(result.data.user.user_metadata.preferred_language).toBe('ko');
    });
  });

  describe('onAuthStateChange', () => {
    test('calls supabase onAuthStateChange method', () => {
      const mockCallback = jest.fn();
      const mockSubscription = { unsubscribe: jest.fn() };
      const mockResponse = { data: { subscription: mockSubscription } };
      
      mockSupabase.auth.onAuthStateChange.mockReturnValue(mockResponse);

      const result = authService.onAuthStateChange(mockCallback);

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledTimes(1);
      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledWith(mockCallback);
      expect(result).toBe(mockResponse);
    });

    test('passes callback function correctly', () => {
      const mockCallback = jest.fn();
      const mockSubscription = { unsubscribe: jest.fn() };
      const mockResponse = { data: { subscription: mockSubscription } };
      
      mockSupabase.auth.onAuthStateChange.mockReturnValue(mockResponse);

      authService.onAuthStateChange(mockCallback);

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledWith(mockCallback);
    });

    test('returns subscription object', () => {
      const mockCallback = jest.fn();
      const mockSubscription = { unsubscribe: jest.fn() };
      const mockResponse = { data: { subscription: mockSubscription } };
      
      mockSupabase.auth.onAuthStateChange.mockReturnValue(mockResponse);

      const result = authService.onAuthStateChange(mockCallback);

      expect(result.data.subscription).toBe(mockSubscription);
      expect(typeof result.data.subscription.unsubscribe).toBe('function');
    });

    test('handles multiple subscriptions', () => {
      const mockCallback1 = jest.fn();
      const mockCallback2 = jest.fn();
      const mockSubscription1 = { unsubscribe: jest.fn() };
      const mockSubscription2 = { unsubscribe: jest.fn() };
      
      mockSupabase.auth.onAuthStateChange
        .mockReturnValueOnce({ data: { subscription: mockSubscription1 } })
        .mockReturnValueOnce({ data: { subscription: mockSubscription2 } });

      const result1 = authService.onAuthStateChange(mockCallback1);
      const result2 = authService.onAuthStateChange(mockCallback2);

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledTimes(2);
      expect(result1.data.subscription).toBe(mockSubscription1);
      expect(result2.data.subscription).toBe(mockSubscription2);
    });

    test('callback receives correct parameters', () => {
      let capturedCallback: (event: string, session: any) => void;
      const mockSubscription = { unsubscribe: jest.fn() };
      
      mockSupabase.auth.onAuthStateChange.mockImplementation((callback) => {
        capturedCallback = callback;
        return { data: { subscription: mockSubscription } };
      });

      const userCallback = jest.fn();
      authService.onAuthStateChange(userCallback);

      // Simulate auth state change
      const mockEvent = 'SIGNED_IN';
      const mockSession = { user: { id: '123', email: 'test@example.com' } };
      capturedCallback!(mockEvent, mockSession);

      expect(userCallback).toHaveBeenCalledWith(mockEvent, mockSession);
    });
  });

  describe('exchangeCodeForSession', () => {
    test('calls supabase exchangeCodeForSession method', async () => {
      const code = 'auth_code_123';
      const mockSession = { 
        access_token: 'access_token_123',
        user: { id: '123', email: 'test@example.com' }
      };
      const mockResponse = { data: { session: mockSession }, error: null };
      
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue(mockResponse);

      const result = await authService.exchangeCodeForSession(code);

      expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledTimes(1);
      expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledWith(code);
      expect(result).toBe(mockResponse);
    });

    test('handles successful code exchange', async () => {
      const code = 'auth_code_123';
      const mockSession = { 
        access_token: 'access_token_123',
        user: { id: '123', email: 'test@example.com' }
      };
      const mockResponse = { data: { session: mockSession }, error: null };
      
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue(mockResponse);

      const result = await authService.exchangeCodeForSession(code);

      expect(result.data.session).toEqual(mockSession);
      expect(result.error).toBe(null);
    });

    test('handles invalid code exchange', async () => {
      const code = 'invalid_code';
      const mockError = { message: 'Invalid code', __isAuthError: true };
      const mockResponse = { data: { session: null }, error: mockError };
      
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue(mockResponse);

      const result = await authService.exchangeCodeForSession(code);

      expect(result.data.session).toBe(null);
      expect(result.error).toEqual(mockError);
    });

    test('handles empty code', async () => {
      const code = '';
      const mockError = { message: 'Code cannot be empty', __isAuthError: true };
      const mockResponse = { data: { session: null }, error: mockError };
      
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue(mockResponse);

      const result = await authService.exchangeCodeForSession(code);

      expect(result.error).toEqual(mockError);
    });

    test('handles network errors during code exchange', async () => {
      const code = 'auth_code_123';
      const networkError = new Error('Network error');
      
      mockSupabase.auth.exchangeCodeForSession.mockRejectedValue(networkError);

      await expect(authService.exchangeCodeForSession(code)).rejects.toThrow('Network error');
    });

    test('handles expired code', async () => {
      const code = 'expired_code_123';
      const mockError = { message: 'Code has expired', __isAuthError: true };
      const mockResponse = { data: { session: null }, error: mockError };
      
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue(mockResponse);

      const result = await authService.exchangeCodeForSession(code);

      expect(result.error.message).toBe('Code has expired');
    });

    test('passes correct code parameter', async () => {
      const codes = ['code1', 'code2', 'special_code_!@#'];
      
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue({ 
        data: { session: null }, 
        error: null 
      });

      for (const code of codes) {
        await authService.exchangeCodeForSession(code);
        expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledWith(code);
      }

      expect(mockSupabase.auth.exchangeCodeForSession).toHaveBeenCalledTimes(codes.length);
    });
  });

  describe('Error handling patterns', () => {
    test('preserves error objects from Supabase', async () => {
      const mockError = { 
        message: 'Auth error', 
        __isAuthError: true,
        status: 400,
        statusText: 'Bad Request'
      };

      mockSupabase.auth.signOut.mockResolvedValue({ error: mockError });

      const result = await authService.signOut();

      expect(result.error).toEqual(mockError);
      expect(result.error.message).toBe('Auth error');
      expect(result.error.__isAuthError).toBe(true);
    });

    test('handles null/undefined responses gracefully', async () => {
      // @ts-ignore - Testing edge case
      mockSupabase.auth.getUser.mockResolvedValue(null);

      await expect(authService.getCurrentUser()).resolves.toBe(null);
    });

    test('handles concurrent requests correctly', async () => {
      const mockResponse1 = { data: { user: { id: '1' } }, error: null };
      const mockResponse2 = { data: { user: { id: '2' } }, error: null };

      mockSupabase.auth.getUser
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const [result1, result2] = await Promise.all([
        authService.getCurrentUser(),
        authService.getCurrentUser()
      ]);

      expect(result1.data.user.id).toBe('1');
      expect(result2.data.user.id).toBe('2');
    });
  });

  describe('Integration patterns', () => {
    test('service methods work together in typical auth flow', async () => {
      // 1. Check current user (not authenticated)
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: null }, error: null });
      
      let currentUser = await authService.getCurrentUser();
      expect(currentUser.data.user).toBe(null);

      // 2. Exchange code for session
      const mockSession = { 
        access_token: 'token',
        user: { id: '123', email: 'test@example.com' }
      };
      mockSupabase.auth.exchangeCodeForSession.mockResolvedValue({ 
        data: { session: mockSession }, 
        error: null 
      });
      
      const sessionResult = await authService.exchangeCodeForSession('code123');
      expect(sessionResult.data.session).toEqual(mockSession);

      // 3. Check current user (now authenticated)
      mockSupabase.auth.getUser.mockResolvedValue({ 
        data: { user: mockSession.user }, 
        error: null 
      });
      
      currentUser = await authService.getCurrentUser();
      expect(currentUser.data.user).toEqual(mockSession.user);

      // 4. Sign out
      mockSupabase.auth.signOut.mockResolvedValue({ error: null });
      
      const signOutResult = await authService.signOut();
      expect(signOutResult.error).toBe(null);
    });

    test('auth state change monitoring works with service methods', () => {
      const mockCallback = jest.fn();
      const mockSubscription = { unsubscribe: jest.fn() };
      
      mockSupabase.auth.onAuthStateChange.mockReturnValue({ 
        data: { subscription: mockSubscription } 
      });

      const subscription = authService.onAuthStateChange(mockCallback);
      
      expect(subscription.data.subscription).toBe(mockSubscription);
      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledWith(mockCallback);
    });
  });
});