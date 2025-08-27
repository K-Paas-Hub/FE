import styled from 'styled-components';

export const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin-top: 1rem;
`;

export const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

export const InputLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

export const InputField = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-bottom: 2px solid ${props => props.hasError ? '#ef4444' : '#e5e7eb'};
  border-radius: 0;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: transparent;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-bottom-color: #0066cc;
  }

  &:disabled {
    background: transparent;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  font-weight: 500;
`;

export const FormActions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

export const Link = styled.a`
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #0052a3;
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  color: #9ca3af;
`;

export const LoginButton = styled.button<{ isEnabled?: boolean }>`
  background: #4ade80;
  color: white;
  border: none;
  padding: 0.7rem 1.1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: ${props => props.isEnabled ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  min-width: 100px;
  opacity: ${props => props.isEnabled ? 1 : 0.6};

  &:hover:not(:disabled) {
    background: #4ade82;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    transform: none;
  }
`;

export const OAuthSection = styled.div`
  margin-top: 1.5rem;
`;

export const OAuthDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  color: #9ca3af;
  font-size: 0.9rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e5e7eb;
  }

  span {
    padding: 0 1rem;
  }
`;

export const OAuthButton = styled.button<{ variant?: 'google' }>`
  width: 100%;
  background: ${props => props.variant === 'google' ? 'white' : 'white'};
  color: ${props => props.variant === 'google' ? '#374151' : '#374151'};
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.8rem 1.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  margin-bottom: 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #0066cc;
    box-shadow: 0 4px 12px rgba(0, 102, 204, 0.1);
    background: ${props => props.variant === 'google' ? '#f8fafc' : '#f8fafc'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;

    &:hover {
      border-color: #e1e5e9;
      box-shadow: none;
    }
  }
`;

export const ButtonIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FooterLinks = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e1e5e9;
`;

export const FooterLink = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 0.9rem;
  margin: 0 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #4ade80;
  }
`;

// 반응형 스타일
export const FormActionsMobile = styled(FormActions)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

export const LinksMobile = styled(Links)`
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const LoginButtonMobile = styled(LoginButton)`
  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
`;

export const OAuthButtonMobile = styled(OAuthButton)`
  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 0.95rem;
  }
`;

export const ButtonIconMobile = styled(ButtonIcon)`
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
