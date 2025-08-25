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

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export interface GoogleAuthResponse {
  data: {
    user: AuthUser | null;
    session: any | null;
  };
  error: any | null;
}
