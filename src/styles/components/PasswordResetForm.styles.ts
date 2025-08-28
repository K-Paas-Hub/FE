import styled from 'styled-components';

/**
 * PasswordResetForm 컴포넌트 스타일
 * PasswordResetForm.css를 styled-components로 변환
 */

export const PasswordResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const PasswordResetContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
  }
`;

export const SecurityIcon = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SafetyLockVideo = styled.video`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f3f4f6;
  object-fit: cover;
  display: block;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

export const PasswordResetDescription = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  text-align: left;
  margin-bottom: 24px;
  width: 100%;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

export const PasswordResetForm = styled.form`
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 6px;
  line-height: 1.4;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 4px;
`;

export const InputField = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.$hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;

  &:focus {
    border-color: #0066cc;
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
    color: #6b7280;
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

export const ErrorMessage = styled.span`
  color: #dc2626;
  font-size: 13px;
  margin-top: 4px;
  font-weight: 400;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 14px;
    align-items: stretch;
  }
`;

export const Links = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const Link = styled.a`
  color: #6b7280;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.2s ease;
  font-weight: 400;

  &:hover {
    color: #0066cc;
  }
`;

export const ResetButton = styled.button<{ $isEnabled?: boolean }>`
  padding: 12px 32px;
  background: ${props => props.$isEnabled ? '#0066cc' : '#6b7280'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;
  min-width: 100px;

  &:hover:not(:disabled) {
    background: ${props => props.$isEnabled ? '#0052a3' : '#4b5563'};
  }

  &:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    padding: 10px 24px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;
