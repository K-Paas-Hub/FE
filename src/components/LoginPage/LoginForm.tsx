import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  LoginForm as StyledLoginForm,
  InputGroup,
  InputLabel,
  InputField,
  ErrorMessage,
  FormActions,
  Links,
  Link as StyledLink,
  Separator,
  LoginButton,
  OAuthSection,
  OAuthDivider,
  OAuthButton,
  ButtonIcon,
  FooterLinks,
  FooterLink
} from '../../styles/components/LoginForm.styles';

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();

  // 비밀번호 표시/숨김 토글
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
    if (onGoogleLogin && !isLoading) {
      onGoogleLogin();
    }
  };

  return (
    <div role="main" aria-labelledby="login-title">
      <h2 id="login-title" className="sr-only">{t('auth.loginTitle')}</h2>
      
      <StyledLoginForm onSubmit={handleSubmit} noValidate>
        <InputGroup>
          <InputLabel htmlFor="login-id">
            {t('auth.login.idLabel')}
            <span aria-label="필수 입력 항목" className="required">*</span>
          </InputLabel>
          <InputField
            id="login-id"
            type="text"
            value={id}
            onChange={handleIdChange}
            $hasError={!!idError}
            placeholder={t('auth.login.idPlaceholder')}
            disabled={isLoading}
            aria-describedby={idError ? "id-error" : "id-help"}
            aria-invalid={!!idError}
            aria-required="true"
            autoComplete="username"
            autoFocus
          />
          {idError && (
            <ErrorMessage 
              id="id-error" 
              role="alert" 
              aria-live="polite"
            >
              {idError}
            </ErrorMessage>
          )}
          <div id="id-help" className="sr-only">
            {t('auth.login.idPlaceholder')}
          </div>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="login-password">
            {t('auth.login.passwordLabel')}
            <span aria-label="필수 입력 항목" className="required">*</span>
          </InputLabel>
          <div style={{ position: 'relative' }}>
            <InputField
              id="login-password"
              type={isPasswordVisible ? "text" : "password"}
              value={pw}
              onChange={handlePwChange}
              $hasError={!!pwError}
              placeholder={t('auth.login.passwordPlaceholder')}
              disabled={isLoading}
              aria-describedby={pwError ? "password-error" : "password-help"}
              aria-invalid={!!pwError}
              aria-required="true"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPasswordVisible ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {pwError && (
            <ErrorMessage 
              id="password-error" 
              role="alert" 
              aria-live="polite"
            >
              {pwError}
            </ErrorMessage>
          )}
          <div id="password-help" className="sr-only">
            {t('auth.login.passwordPlaceholder')}
          </div>
        </InputGroup>

        <FormActions>
          <Links role="navigation" aria-label="추가 링크">
            <StyledLink 
              as={Link} 
              to="/signup"
              aria-label="회원가입 페이지로 이동"
            >
              {t('auth.login.signupLink')}
            </StyledLink>
            <Separator aria-hidden="true">|</Separator>
            <StyledLink 
              as={Link} 
              to="/find-password"
              aria-label="비밀번호 찾기 페이지로 이동"
            >
              {t('auth.login.findPasswordLink')}
            </StyledLink>
          </Links>
          <LoginButton 
            type="submit" 
            $isEnabled={!isLoading}
            disabled={isLoading}
            aria-describedby="login-button-help"
          >
            {isLoading ? t('auth.login.loggingIn') : t('auth.login.loginButton')}
          </LoginButton>
          <div id="login-button-help" className="sr-only">
            로그인 버튼을 클릭하거나 Enter 키를 눌러 로그인하세요
          </div>
        </FormActions>
      </StyledLoginForm>

      <OAuthSection>
        <OAuthDivider>
          <span>{t('auth.login.or')}</span>
        </OAuthDivider>
        
        <OAuthButton 
          $variant="google"
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          aria-label="Google 계정으로 로그인"
          aria-describedby="google-login-help"
        >
          <ButtonIcon aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </ButtonIcon>
          {isLoading ? '로그인 중...' : t('auth.googleContinue')}
        </OAuthButton>
        <div id="google-login-help" className="sr-only">
          Google 계정으로 로그인하려면 버튼을 클릭하거나 Enter 키를 누르세요
        </div>
      </OAuthSection>

      <FooterLinks role="contentinfo">
        <FooterLink 
          as={Link} 
          to="/terms"
          aria-label="이용약관 페이지로 이동"
        >
          {t('auth.termsOfService')}
        </FooterLink>
        <Separator aria-hidden="true">|</Separator>
        <FooterLink 
          as={Link} 
          to="/privacy"
          aria-label="개인정보처리방침 페이지로 이동"
        >
          {t('auth.privacyPolicy')}
        </FooterLink>
      </FooterLinks>
    </div>
  );
};

export default LoginForm;
