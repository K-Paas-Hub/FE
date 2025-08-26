import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/LoginForm.css';

interface LoginFormProps {
  onSubmit: (id: string, pw: string) => void;
  isLoading?: boolean;
  onGoogleLogin?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  onGoogleLogin 
}) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');
  const { t } = useTranslation();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    if (value === '') {
      setIdError(t('auth.login.idRequired'));
    } else {
      setIdError('');
    }
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPw(value);
    if (value === '') {
      setPwError(t('auth.login.passwordRequired'));
    } else {
      setPwError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!id) {
      setIdError(t('auth.login.idRequired'));
      hasError = true;
    }
    if (!pw) {
      setPwError(t('auth.login.passwordRequired'));
      hasError = true;
    }

    if (!hasError) {
      onSubmit(id, pw);
    }
  };

  const handleGoogleLogin = () => {
    if (onGoogleLogin) {
      onGoogleLogin();
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">{t('auth.login.idLabel')}</label>
          <input
            type="text"
            value={id}
            onChange={handleIdChange}
            className={`input-field ${idError ? 'error' : ''}`}
            placeholder={t('auth.login.idPlaceholder')}
            disabled={isLoading}
          />
          {idError && <div className="error-message">{idError}</div>}
        </div>

        <div className="input-group">
          <label className="input-label">{t('auth.login.passwordLabel')}</label>
          <input
            type="password"
            value={pw}
            onChange={handlePwChange}
            className={`input-field ${pwError ? 'error' : ''}`}
            placeholder={t('auth.login.passwordPlaceholder')}
            disabled={isLoading}
          />
          {pwError && <div className="error-message">{pwError}</div>}
        </div>

        <div className="form-actions">
          <div className="links">
            <Link to="/signup" className="link">{t('auth.login.signupLink')}</Link>
            <span className="separator">|</span>
            <Link to="/find-password" className="link">{t('auth.login.findPasswordLink')}</Link>
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? t('auth.login.loggingIn') : t('auth.login.loginButton')}
          </button>
        </div>
      </form>

      <div className="oauth-section">
        <div className="oauth-divider">
          <span>{t('auth.login.or')}</span>
        </div>
        
        <button 
          className="oauth-button google" 
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <div className="button-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          {isLoading ? '로그인 중...' : t('auth.googleContinue')}
        </button>
      </div>

      <div className="footer-links">
        <Link to="/terms" className="footer-link">{t('auth.termsOfService')}</Link>
        <span style={{ color: '#6b7280' }}>|</span>
        <Link to="/privacy" className="footer-link">{t('auth.privacyPolicy')}</Link>
      </div>
    </div>
  );
};

export default LoginForm;
