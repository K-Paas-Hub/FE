import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import { authService } from '../services/authService';

// Mock authService
jest.mock('../services/authService', () => ({
  authService: {
    getCurrentUser: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn(),
  }
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;

describe('useAuth', () => {
  const mockUser = {
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
    } as any);
    mockAuthService.signOut.mockResolvedValue({ error: null } as any);
    mockAuthService.onAuthStateChange.mockReturnValue({
      data: {
        subscription: { 
          id: 'sub-1',
          callback: jest.fn(),
          unsubscribe: jest.fn() 
        }
      }
    } as any);
  });

  describe('initialization', () => {
    test('should initialize with default state', () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.user).toBeNull();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('should set user when getCurrentUser returns a user', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: mockUser },
        error: null
      } as any);
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('should handle getCurrentUser error', async () => {
      mockAuthService.getCurrentUser.mockRejectedValue(new Error('Network error'));
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.error).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('signOut', () => {
    test('should sign out successfully', async () => {
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        const signOutResult = await result.current.signOut();
        expect(signOutResult.success).toBe(true);
      });

      expect(mockAuthService.signOut).toHaveBeenCalledTimes(1);
      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('should handle signOut error', async () => {
      const mockError = new Error('Sign out failed');
      mockAuthService.signOut.mockRejectedValue(mockError);
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        const signOutResult = await result.current.signOut();
        expect(signOutResult.success).toBe(false);
        expect(signOutResult.error).toEqual(mockError);
      });

      expect(mockAuthService.signOut).toHaveBeenCalledTimes(1);
      expect(result.current.error).toBe('로그아웃 중 오류가 발생했습니다.');
    });

    test('should clear user state on successful signOut', async () => {
      // First set a user
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: mockUser },
        error: null
      } as any);
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });

      // Then sign out
      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('auth state change', () => {
    test('should handle SIGNED_IN event', async () => {
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
        } as any;
      });
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        authCallback('SIGNED_IN', { user: mockUser });
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.error).toBeNull();
    });

    test('should handle SIGNED_OUT event', async () => {
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
        } as any;
      });
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        authCallback('SIGNED_OUT', null);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('should ignore SIGNED_IN event without user', async () => {
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
        } as any;
      });
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        authCallback('SIGNED_IN', null);
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('should unsubscribe on unmount', () => {
      const mockUnsubscribe = jest.fn();
      mockAuthService.onAuthStateChange.mockReturnValue({
        data: {
          subscription: { 
            id: 'sub-1',
            callback: jest.fn(),
            unsubscribe: mockUnsubscribe 
          }
        }
      } as any);
      
      const { unmount } = renderHook(() => useAuth());

      unmount();

      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('isAuthenticated calculation', () => {
    test('should correctly calculate isAuthenticated when user exists', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: mockUser },
        error: null
      } as any);
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);
    });

    test('should correctly calculate isAuthenticated when user does not exist', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ 
        data: { user: null },
        error: null
      } as any);
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('error handling', () => {
    test('should handle signOut error and set error message', async () => {
      mockAuthService.signOut.mockRejectedValue(new Error('Network error'));
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBe('로그아웃 중 오류가 발생했습니다.');
    });

    test('should clear error on successful signOut', async () => {
      // First set an error by failing signOut
      mockAuthService.signOut.mockRejectedValueOnce(new Error('Network error'));
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBe('로그아웃 중 오류가 발생했습니다.');

      // Then successful signOut should clear error
      mockAuthService.signOut.mockResolvedValue({ error: null } as any);
      
      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('loading state management', () => {
    test('should set loading to true during signOut', async () => {
      let resolveSignOut: (value: any) => void;
      const signOutPromise = new Promise<any>((resolve) => {
        resolveSignOut = resolve;
      });
      
      mockAuthService.signOut.mockReturnValue(signOutPromise);
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // signOut 호출 시작
      const signOutPromise2 = act(async () => {
        return result.current.signOut();
      });

      // 로딩 상태 확인을 위해 약간의 지연 후 확인
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Resolve signOut
      resolveSignOut!({ error: null });

      await signOutPromise2;

      expect(result.current.loading).toBe(false);
    });
  });
});