import { authService } from './authService';
import { AuthUser, AuthError } from '../types/auth';

// Mock Supabase
const mockSupabase = {
  auth: {
    signOut: jest.fn(),
    getUser: jest.fn(),
    onAuthStateChange: jest.fn(),
  },
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => mockSupabase),
}));

describe('authService', () => {
  const mockUser: AuthUser = {
    id: 'user-123',
    email: 'test@example.com',
    app_metadata: {},
    user_metadata: {},
    created_at: '2023-01-01T00:00:00.000Z',
    role: 'authenticated',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signOut', () => {
    it('should call supabase auth signOut', async () => {
      const mockSignOutResult = { error: null };
      (mockSupabase.auth.signOut as jest.Mock).mockResolvedValue(mockSignOutResult);

      const result = await authService.signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: null });
    });

    it('should handle signOut errors', async () => {
      const mockError: AuthError = { message: 'Sign out failed' };
      (mockSupabase.auth.signOut as jest.Mock).mockResolvedValue({ error: mockError });

      const result = await authService.signOut();

      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ error: mockError });
    });

    it('should handle signOut network errors', async () => {
      const networkError = new Error('Network error');
      (mockSupabase.auth.signOut as jest.Mock).mockRejectedValue(networkError);

      await expect(authService.signOut()).rejects.toThrow('Network error');
      expect(mockSupabase.auth.signOut).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCurrentUser', () => {
    it('should return user when getUser succeeds', async () => {
      const mockGetUserResult = {
        data: { user: mockUser },
        error: null,
      };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue(mockGetUserResult);

      const result = await authService.getCurrentUser();

      expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGetUserResult);
    });

    it('should return null user when getUser returns null', async () => {
      const mockGetUserResult = {
        data: { user: null },
        error: null,
      };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue(mockGetUserResult);

      const result = await authService.getCurrentUser();

      expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGetUserResult);
    });

    it('should handle getUser errors', async () => {
      const mockError: AuthError = { message: 'Failed to get user' };
      const mockGetUserResult = {
        data: { user: null },
        error: mockError,
      };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue(mockGetUserResult);

      const result = await authService.getCurrentUser();

      expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGetUserResult);
    });

    it('should handle getCurrentUser network errors', async () => {
      const networkError = new Error('Network error');
      (mockSupabase.auth.getUser as jest.Mock).mockRejectedValue(networkError);

      await expect(authService.getCurrentUser()).rejects.toThrow('Network error');
      expect(mockSupabase.auth.getUser).toHaveBeenCalledTimes(1);
    });
  });

  describe('onAuthStateChange', () => {
    it('should call supabase auth onAuthStateChange', () => {
      const mockCallback = jest.fn();
      const mockSubscription = {
        data: { subscription: { unsubscribe: jest.fn() } }
      };
      (mockSupabase.auth.onAuthStateChange as jest.Mock).mockReturnValue(mockSubscription);

      const result = authService.onAuthStateChange(mockCallback);

      expect(mockSupabase.auth.onAuthStateChange).toHaveBeenCalledWith(mockCallback);
      expect(result).toEqual(mockSubscription);
    });

    it('should handle auth state change with SIGNED_IN event', () => {
      const mockCallback = jest.fn();
      let capturedCallback: (event: any, session: any) => void;
      
      (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
        capturedCallback = callback;
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      });

      authService.onAuthStateChange(mockCallback);

      // Simulate SIGNED_IN event
      capturedCallback!('SIGNED_IN', { user: mockUser });

      expect(mockCallback).toHaveBeenCalledWith('SIGNED_IN', { user: mockUser });
    });

    it('should handle auth state change with SIGNED_OUT event', () => {
      const mockCallback = jest.fn();
      let capturedCallback: (event: any, session: any) => void;
      
      (mockSupabase.auth.onAuthStateChange as jest.Mock).mockImplementation((callback) => {
        capturedCallback = callback;
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      });

      authService.onAuthStateChange(mockCallback);

      // Simulate SIGNED_OUT event
      capturedCallback!('SIGNED_OUT', null);

      expect(mockCallback).toHaveBeenCalledWith('SIGNED_OUT', null);
    });

    it('should return subscription with unsubscribe method', () => {
      const mockCallback = jest.fn();
      const mockUnsubscribe = jest.fn();
      const mockSubscription = {
        data: { subscription: { unsubscribe: mockUnsubscribe } }
      };
      (mockSupabase.auth.onAuthStateChange as jest.Mock).mockReturnValue(mockSubscription);

      const result = authService.onAuthStateChange(mockCallback);

      expect(result).toEqual(mockSubscription);
      expect(result.data.subscription.unsubscribe).toBe(mockUnsubscribe);
    });
  });

  describe('integration tests', () => {
    it('should handle complete authentication flow', async () => {
      // Setup mocks for complete flow
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });
      (mockSupabase.auth.signOut as jest.Mock).mockResolvedValue({ error: null });
      (mockSupabase.auth.onAuthStateChange as jest.Mock).mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } }
      });

      // Test getCurrentUser
      const userResult = await authService.getCurrentUser();
      expect(userResult.data.user).toEqual(mockUser);

      // Test signOut
      const signOutResult = await authService.signOut();
      expect(signOutResult.error).toBeNull();

      // Test onAuthStateChange
      const mockCallback = jest.fn();
      const subscriptionResult = authService.onAuthStateChange(mockCallback);
      expect(subscriptionResult.data.subscription).toBeDefined();
    });
  });
});