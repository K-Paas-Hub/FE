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
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 4px;
`;

export const InputField = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#dc2626' : '#d1d5db'};
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

export const SelectField = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${props => props.hasError ? '#dc2626' : '#d1d5db'};
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    border-color: #0066cc;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%234ade80' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  }

  &:disabled {
    background-color: #f9fafb;
    cursor: not-allowed;
    color: #6b7280;
  }
`;

export const DateField = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #333333;
  font-family: inherit;
  font-size: 1rem;

  &:focus {
    border-color: #0066cc;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.5);
  }

  &::-webkit-calendar-picker-indicator:hover {
    filter: invert(0.3);
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 13px;
  margin-top: 4px;
  font-weight: 400;
`;

export const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #333333;
  line-height: 1.4;

  input[type="checkbox"] {
    margin: 0;
    width: 16px;
    height: 16px;
    accent-color: #0066cc;
    cursor: pointer;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

export const CheckboxText = styled.span`
  font-size: 14px;
  color: #333333;
  line-height: 1.4;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
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

export const SignupButton = styled.button<{ isEnabled?: boolean }>`
  padding: 12px 32px;
  background: ${props => props.isEnabled ? '#0066cc' : '#9ca3af'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => props.isEnabled ? 'pointer' : 'not-allowed'};
  transition: background-color 0.2s ease;
  min-width: 150px;

  &:hover:not(:disabled) {
    background: #0052a3;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const VisaRadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const VisaRadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
  min-width: 120px;
  flex: 1;

  &:hover {
    border-color: #4ade80;
    background: #f0fdf4;
  }

  input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #4ade80;
    cursor: pointer;

    &:checked {
      background-color: #4ade80;
    }
  }

  span {
    font-size: 14px;
    color: #333333;
    font-weight: 400;
    white-space: nowrap;
  }

  input[type="radio"]:checked + span {
    color: #059669;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    min-width: auto;
    width: 100%;
  }
`;

export const SelectedAddress = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
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
    padding: 0.75rem;
  }
`;

// AddressSearch 컴포넌트 스타일 오버라이드
export const AddressSearchContainer = styled.div`
  width: 100%;
`;

export const AddressSearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #1f2937;
  transition: all 0.3s ease;
  min-height: 44px;

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
  }
`;
