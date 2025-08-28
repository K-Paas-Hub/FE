import styled from 'styled-components';

export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const SignupContent = styled.div`
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

export const SignupTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  text-align: left;
  width: 100%;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 20px;
  }
`;

export const SignupForm = styled.form`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 4px;
  
  .required {
    color: #ef4444;
    margin-left: 0.25rem;
  }
`;

export const InputField = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${props => props.$hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #1f2937;
  min-height: 48px;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
    color: #6b7280;
    opacity: 0.6;
  }

  &::placeholder {
    color: #9ca3af;
  }

  /* iOS 줌 방지 */
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 16px;
    min-height: 52px;
  }
`;

export const SelectField = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${props => props.$hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #1f2937;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  min-height: 48px;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%230066cc' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
    color: #6b7280;
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 16px;
    min-height: 52px;
  }
`;

export const DateField = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #1f2937;
  font-family: inherit;
  min-height: 36px;

  &:focus {
    border-color: #0066cc;
    box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.5);
    min-width: 44px;
    min-height: 44px;
  }

  &::-webkit-calendar-picker-indicator:hover {
    filter: invert(0.3);
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
    min-height: 40px;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 13px;
  margin-top: 4px;
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  &::before {
    content: "⚠️";
    font-size: 0.75rem;
  }
`;

export const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
  line-height: 1.5;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  min-height: 44px;
  min-width: 44px;

  &:hover {
    background-color: rgba(0, 102, 204, 0.05);
  }

  &:focus-within {
    background-color: rgba(0, 102, 204, 0.1);
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  input[type="checkbox"] {
    margin: 0;
    width: 20px;
    height: 20px;
    accent-color: #0066cc;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 2px;
    min-width: 20px;
    min-height: 20px;
    
    &:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }
  }
  
  @media (max-width: 768px) {
    min-height: 48px;
    min-width: 48px;
    
    input[type="checkbox"] {
      width: 22px;
      height: 22px;
      min-width: 22px;
      min-height: 22px;
    }
  }
`;

export const CheckboxText = styled.span`
  font-size: 14px;
  color: #1f2937;
  line-height: 1.5;
  
  .required {
    color: #ef4444;
    margin-left: 0.25rem;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
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
  padding: 8px;
  border-radius: 4px;
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #0066cc;
    background-color: rgba(0, 102, 204, 0.1);
  }
  
  &:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
  
  @media (max-width: 768px) {
    min-height: 48px;
    min-width: 48px;
  }
`;

export const SignupButton = styled.button<{ $isEnabled?: boolean }>`
  padding: 14px 32px;
  background: ${props => props.$isEnabled ? '#0066cc' : '#9ca3af'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};
  transition: background-color 0.2s ease;
  min-width: 150px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #0052a3;
  }

  &:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    padding: 16px 32px;
    font-size: 16px;
    min-height: 52px;
  }

  @media (max-width: 480px) {
    padding: 14px 20px;
    font-size: 14px;
  }
`;

export const VisaRadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const VisaRadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
  min-height: 44px;
  min-width: 120px;
  flex: 1;

  &:hover {
    border-color: #0066cc;
  }

  &:focus-within {
    border-color: #0066cc;
    outline: 1px solid #0066cc;
  }

  input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #0066cc;
    cursor: pointer;
    min-width: 18px;
    min-height: 18px;
  }

  span {
    font-size: 14px;
    color: #1f2937;
    font-weight: 400;
  }

  input[type="radio"]:checked + span {
    color: #0066cc;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    min-width: auto;
    width: 100%;
    min-height: 48px;
    
    input[type="radio"] {
      width: 20px;
      height: 20px;
      min-width: 20px;
      min-height: 20px;
    }
  }
`;

export const SelectedAddress = styled.div`
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #166534;

  span {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 1rem;
  }
`;

// AddressSearch 컴포넌트 스타일 오버라이드
export const AddressSearchContainer = styled.div`
  width: 100%;
`;

export const AddressSearchInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-size: 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #1f2937;
  transition: all 0.3s ease;
  min-height: 48px;

  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.1);
  }

  &:disabled {
    background: #f9fafb;
    cursor: not-allowed;
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    font-size: 16px; /* iOS에서 줌 방지 */
    padding: 16px;
    min-height: 52px;
  }
`;
