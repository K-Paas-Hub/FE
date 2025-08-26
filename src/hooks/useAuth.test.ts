import { renderHook, act, waitFor } from '@testing-library/react';
import { useAuth } from './useAuth';
import { authService } from '../services/authService';
import { AuthUser } from '../types/auth';

// Mock authService
jest.mock('../services/authService');

const mockAuthService = authService as jest.Mocked<typeof authService>;

// Mock subscription object
const mockSubscription = {
  unsubscribe: jest.fn(),
};

describe('useAuth hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSubscription.unsubscribe.mockClear();
  });

  describe('Initialization', () => {
    test('starts with loading state', () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      expect(result.current.loading).toBe(true);
      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('initializes with authenticated user', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('initializes with no user', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('handles initialization errors gracefully', async () => {
      mockAuthService.getCurrentUser.mockRejectedValue(new Error('Auth error'));
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toBe(null);
      expect(result.current.error).toBe(null); // Errors are suppressed in initialization
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('Auth State Changes', () => {
    test('handles SIGNED_IN event', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      
      let authStateChangeCallback: (event: string, session: any) => void;
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        authStateChangeCallback = callback;
        return { data: { subscription: mockSubscription } };
      });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Simulate sign in event
      act(() => {
        authStateChangeCallback('SIGNED_IN', { user: mockUser });
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('handles SIGNED_OUT event', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      
      let authStateChangeCallback: (event: string, session: any) => void;
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        authStateChangeCallback = callback;
        return { data: { subscription: mockSubscription } };
      });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Initially should have user
      expect(result.current.isAuthenticated).toBe(true);

      // Simulate sign out event
      act(() => {
        authStateChangeCallback('SIGNED_OUT', null);
      });

      expect(result.current.user).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('ignores other auth events', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      
      let authStateChangeCallback: (event: string, session: any) => void;
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        authStateChangeCallback = callback;
        return { data: { subscription: mockSubscription } };
      });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const initialState = { ...result.current };

      // Simulate unknown event
      act(() => {
        authStateChangeCallback('TOKEN_REFRESHED', null);
      });

      expect(result.current.user).toBe(initialState.user);
      expect(result.current.loading).toBe(initialState.loading);
      expect(result.current.error).toBe(initialState.error);
      expect(result.current.isAuthenticated).toBe(initialState.isAuthenticated);
    });

    test('handles SIGNED_IN event without user gracefully', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      
      let authStateChangeCallback: (event: string, session: any) => void;
      mockAuthService.onAuthStateChange.mockImplementation((callback) => {
        authStateChangeCallback = callback;
        return { data: { subscription: mockSubscription } };
      });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Simulate sign in event without user
      act(() => {
        authStateChangeCallback('SIGNED_IN', { user: null });
      });

      expect(result.current.user).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('signOut function', () => {
    test('successfully signs out user', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });
      mockAuthService.signOut.mockResolvedValue(undefined);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);

      let signOutResult;
      await act(async () => {
        signOutResult = await result.current.signOut();
      });

      expect(mockAuthService.signOut).toHaveBeenCalled();
      expect(signOutResult).toEqual({ success: true });
      expect(result.current.user).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });

    test('handles signOut errors', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      const signOutError = new Error('Sign out failed');

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });
      mockAuthService.signOut.mockRejectedValue(signOutError);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);

      let signOutResult;
      await act(async () => {
        signOutResult = await result.current.signOut();
      });

      expect(mockAuthService.signOut).toHaveBeenCalled();
      expect(signOutResult).toEqual({ success: false, error: signOutError });
      expect(result.current.user).toEqual(mockUser); // User should remain
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('로그아웃 중 오류가 발생했습니다.');
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('shows loading state during signOut', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });
      
      // Make signOut hang to test loading state
      let resolveSignOut: () => void;
      const signOutPromise = new Promise<void>((resolve) => {
        resolveSignOut = resolve;
      });
      mockAuthService.signOut.mockReturnValue(signOutPromise);

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Start sign out
      act(() => {
        result.current.signOut();
      });

      expect(result.current.loading).toBe(true);

      // Resolve sign out
      act(() => {
        resolveSignOut();
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('Subscription management', () => {
    test('unsubscribes on unmount', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { unmount } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(mockSubscription.unsubscribe).not.toHaveBeenCalled();
      });

      unmount();

      expect(mockSubscription.unsubscribe).toHaveBeenCalled();
    });

    test('handles multiple subscription lifecycles', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { unmount, rerender } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(mockAuthService.onAuthStateChange).toHaveBeenCalledTimes(1);
      });

      rerender();

      // Should not create additional subscriptions on rerender
      expect(mockAuthService.onAuthStateChange).toHaveBeenCalledTimes(1);

      unmount();

      expect(mockSubscription.unsubscribe).toHaveBeenCalledTimes(1);
    });
  });

  describe('isAuthenticated computed property', () => {
    test('returns true when user exists', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(true);
    });

    test('returns false when user is null', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: null } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    test('returns false when user is undefined', async () => {
      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: undefined } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('Error handling', () => {
    test('clears error on successful operations', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });
      mockAuthService.signOut.mockRejectedValueOnce(new Error('First error'));
      
      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // First signOut fails
      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBe('로그아웃 중 오류가 발생했습니다.');

      // Second signOut succeeds
      mockAuthService.signOut.mockResolvedValueOnce(undefined);
      
      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.error).toBe(null);
    });

    test('preserves user data on signOut error', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: { full_name: 'John Doe' }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });
      mockAuthService.signOut.mockRejectedValue(new Error('Sign out failed'));

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const initialUser = result.current.user;

      await act(async () => {
        await result.current.signOut();
      });

      expect(result.current.user).toEqual(initialUser);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  describe('User data handling', () => {
    test('handles user with minimal data', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com'
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('handles user with full metadata', async () => {
      const mockUser: AuthUser = {
        id: '123',
        email: 'test@example.com',
        user_metadata: {
          full_name: 'John Doe',
          avatar_url: 'https://example.com/avatar.jpg',
          preferred_language: 'en'
        }
      };

      mockAuthService.getCurrentUser.mockResolvedValue({ data: { user: mockUser } });
      mockAuthService.onAuthStateChange.mockReturnValue({ data: { subscription: mockSubscription } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
});