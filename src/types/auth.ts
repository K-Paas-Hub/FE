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
