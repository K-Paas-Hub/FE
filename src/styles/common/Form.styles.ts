import styled, { css } from 'styled-components';
import { theme } from '../theme/theme';

// Form Container
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: flex-end;
  
  ${theme.media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

// Field Group
export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  flex: 1;
`;

// Label
export const Label = styled.label<{ $required?: boolean }>`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textPrimary};
  
  ${props => props.$required && css`
    &::after {
      content: ' *';
      color: ${theme.colors.error};
    }
  `}
`;

// Input Base Styles
const inputBase = css`
  width: 100%;
  padding: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.primary};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.white};
  color: ${theme.colors.textPrimary};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  min-height: 44px;
  
  &::placeholder {
    color: ${theme.colors.textMuted};
  }
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.borderFocus};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight};
  }
  
  &:disabled {
    background: ${theme.colors.backgroundGray};
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &.error {
    border-color: ${theme.colors.error};
    box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.1);
  }
`;

// Input Components
export const Input = styled.input`
  ${inputBase}
`;

export const Textarea = styled.textarea<{ $rows?: number }>`
  ${inputBase}
  resize: vertical;
  min-height: ${props => props.$rows ? `${props.$rows * 1.5}rem` : '120px'};
  font-family: ${theme.typography.fontFamily.primary};
`;

export const Select = styled.select`
  ${inputBase}
  cursor: pointer;
  
  &:focus {
    cursor: pointer;
  }
`;

// Search Input
export const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const SearchInputField = styled(Input)`
  padding-left: ${theme.spacing['2xl']};
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.md};
  display: flex;
  align-items: center;
  color: ${theme.colors.textMuted};
  pointer-events: none;
  z-index: 1;
`;

// Checkbox and Radio
export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  accent-color: ${theme.colors.primary};
  cursor: pointer;
`;

export const RadioWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
  width: 18px;
  height: 18px;
  accent-color: ${theme.colors.primary};
  cursor: pointer;
`;

// Switch/Toggle
export const SwitchWrapper = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.textPrimary};
`;

export const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const Switch = styled.div<{ $checked?: boolean }>`
  width: 50px;
  height: 28px;
  background: ${props => props.$checked ? theme.colors.primary : theme.colors.textMuted};
  border-radius: ${theme.radius.full};
  position: relative;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.$checked ? '24px' : '2px'};
    width: 24px;
    height: 24px;
    background: ${theme.colors.white};
    border-radius: ${theme.radius.full};
    transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  }
`;

// File Input
export const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const FileInput = styled.input.attrs({ type: 'file' })`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    border-color: ${theme.colors.primary};
  }
`;

// Error and Help Text
export const ErrorText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
`;

export const HelpText = styled.span`
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  margin-top: ${theme.spacing.xs};
`;

// Field States
export const FieldError = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${theme.colors.error};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
`;

export const FieldSuccess = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid ${theme.colors.success};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.success};
  font-size: ${theme.typography.fontSize.sm};
`;

// Form Actions
export const FormActions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: flex-end;
  padding-top: ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.borderLight};
  
  ${theme.media.mobile} {
    flex-direction: column-reverse;
    justify-content: stretch;
  }
`;

// Input Group (with prefix/suffix)
export const InputGroup = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.md};
  overflow: hidden;
  
  &:focus-within {
    border-color: ${theme.colors.borderFocus};
    box-shadow: 0 0 0 2px ${theme.colors.primaryLight};
  }
`;

export const InputGroupAddon = styled.div`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${theme.colors.backgroundGray};
  border-right: 1px solid ${theme.colors.borderLight};
  white-space: nowrap;
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.textSecondary};
  
  &:last-child {
    border-right: none;
    border-left: 1px solid ${theme.colors.borderLight};
  }
`;

export const InputGroupInput = styled(Input)`
  border: none;
  border-radius: 0;
  
  &:focus {
    box-shadow: none;
  }
`;