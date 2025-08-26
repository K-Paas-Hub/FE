export interface AuthUser {
  id: string;
  email?: string;
  user_metadata: {
    full_name?: string;
    avatar_url?: string;
    provider?: string;
  };
  app_metadata: {
    provider?: string;
  };
}

export interface AuthError {
  message: string;
  __isAuthError?: boolean;
  status?: number;
  statusText?: string;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface UserResponse {
  data: {
    user: AuthUser | null;
  };
  error: AuthError | null;
}

export interface AuthTokenResponse {
  data: {
    session: any | null;
  };
  error: AuthError | null;
}

export interface SignOutResponse {
  error: AuthError | null;
}

export interface Subscription {
  id: string;
  callback: (event: string, session: any) => void;
  unsubscribe: () => void;
}

export interface AuthStateChangeResponse {
  data: {
    subscription: Subscription;
  };
}
