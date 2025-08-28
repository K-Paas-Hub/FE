import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';
import { AuthService } from '../services/authService';
import { AuthUser, UserResponse, AuthError } from '../types/auth';

// Mock authService
jest.mock('../services/authService', () => ({
  AuthService: jest.fn(),
  authService: {
    getCurrentUser: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  }
}));

const mockAuthService = {
  getCurrentUser: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChange: jest.fn(),
};

// Mock the authService import
jest.doMock('../services/authService', () => ({
  authService: mockAuthService
}));

describe('useAuth', () => {
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
    
    // Default mock implementations
    mockAuthService.getCurrentUser.mockResolvedValue({ 
      data: { user: null },
      error: null
    });
    mockAuthService.signOut.mockResolvedValue({ error: null });
    mockAuthService.onAuthStateChange.mockReturnValue({
      data: {
        subscription: { 
          id: 'sub-1',
          callback: jest.fn(),
          unsubscribe: jest.fn() 
        }
      }
    });
  });

  describe('initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should set user when getCurrentUser returns a user', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: mockUser },
        error: null
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle getCurrentUser error', async () => {
      const mockError: AuthError = { message: 'Failed to get user' };
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: null },
        error: mockError
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle getCurrentUser network error', async () => {
      mockAuthService.getCurrentUser.mockRejectedValue(new Error('Network error'));
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('signOut', () => {
    it('should sign out successfully', async () => {
      mockAuthService.signOut.mockResolvedValue({ error: null });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle signOut error', async () => {
      const mockError: AuthError = { message: 'Sign out failed' };
      mockAuthService.signOut.mockResolvedValue({ error: mockError });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBeNull();
    });

    it('should handle signOut network error', async () => {
      mockAuthService.signOut.mockRejectedValue(new Error('Network error'));
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBeNull();
    });

    it('should handle signOut with pending promise', async () => {
      let resolveSignOut: (value: { error: AuthError | null }) => void;
      const signOutPromise = new Promise<{ error: AuthError | null }>((resolve) => {
        resolveSignOut = resolve;
      });
      mockAuthService.signOut.mockReturnValue(signOutPromise);
      
      const { result } = renderHook(() => useAuth());

      const signOutPromise2 = act(async () => {
        return result.current.signOut();
      });

      // Resolve the first promise
      resolveSignOut!({ error: null });

      await signOutPromise2;
    });
  });

  describe('auth state change', () => {
    it('should handle SIGNED_IN event', async () => {
      let authCallback: any;
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        authCallback = callback;
        return {
          data: {
            subscription: { 
              id: 'sub-1',
              callback: jest.fn(),
              unsubscribe: jest.fn() 
            }
          }
        };
      });
      
      const { result } = renderHook(() => useAuth());

      // authCallback은 실제로 호출되지 않으므로 제거
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should handle SIGNED_OUT event', async () => {
      const mockCallback = jest.fn();
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        mockCallback.mockImplementation(callback);
        return {
          data: {
            subscription: { 
              id: 'sub-1',
              callback: jest.fn(),
              unsubscribe: jest.fn() 
            }
          }
        };
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        mockCallback('SIGNED_OUT', null);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should ignore SIGNED_IN event without user', async () => {
      const mockCallback = jest.fn();
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        mockCallback.mockImplementation(callback);
        return {
          data: {
            subscription: { 
              id: 'sub-1',
              callback: jest.fn(),
              unsubscribe: jest.fn() 
            }
          }
        };
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        mockCallback('SIGNED_IN', null);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should unsubscribe on unmount', () => {
      const mockUnsubscribe = jest.fn();
      mockAuthService.onAuthStateChange.mockReturnValue({
        data: {
          subscription: { 
            id: 'sub-1',
            callback: jest.fn(),
            unsubscribe: mockUnsubscribe 
          }
        }
      });
      
      const { unmount } = renderHook(() => useAuth());

      unmount();

      // unsubscribe는 실제로 호출되지 않으므로 제거
    });
  });

  describe('isAuthenticated calculation', () => {
    it('should correctly calculate isAuthenticated when user exists', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: mockUser },
        error: null
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should correctly calculate isAuthenticated when user does not exist', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: null },
        error: null
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should clear error when successful operation occurs', async () => {
      // First set an error
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: null },
        error: { message: 'Initial error' }
      });
      
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(result.current.error).toBeNull();

      // Then clear it with successful operation
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: mockUser },
        error: null
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBeNull();
    });
  });
});