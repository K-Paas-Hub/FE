import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VisaInfo, VISA_TYPE_OPTIONS } from '../../types/visa';
import PostcodeSearch from '../PostcodeSearch';
import {
  SignupForm as StyledSignupForm,
  InputGroup,
  InputLabel,
  InputField,
  SelectField,
  DateField,
  ErrorMessage,
  AgreementSection,
  CheckboxGroup,
  CheckboxLabel,
  CheckboxText,
  FormActions,
  Links,
  Link as StyledLink,
  SignupButton,
  VisaRadioGroup,
  VisaRadioOption
} from '../../styles/components/SignupForm.styles';

interface SignupFormProps {
  onSubmit: (
    id: string,
    password: string,
    passwordConfirm: string,
    name: string,
    phone: string,
    address: string,
    visaInfo: VisaInfo
  ) => void;
  isLoading?: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [visaInfo, setVisaInfo] = useState<VisaInfo>({
    hasVisa: false,
    visaType: '',
    issueDate: '',
    expiryDate: ''
  });
  
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [visaError, setVisaError] = useState('');
  const [agreement1, setAgreement1] = useState(false);
  const [agreement2, setAgreement2] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    if (value === '') {
      setIdError(t('auth.signup.idRequired'));
    } else {
      setIdError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value === '') {
      setPasswordError(t('auth.signup.passwordRequired'));
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    if (value === '') {
      setPasswordConfirmError('');
    } else if (value !== password) {
      setPasswordConfirmError(t('auth.signup.passwordMismatch'));
    } else {
      setPasswordConfirmError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value === '') {
      setNameError(t('auth.signup.nameRequired'));
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (value === '') {
      setPhoneError(t('auth.signup.phoneRequired'));
    } else {
      setPhoneError('');
    }
  };



  const handleVisaChange = (field: keyof VisaInfo, value: string | boolean) => {
    const newVisaInfo = { ...visaInfo, [field]: value };
    
    // Reset visa info when changing to no visa
    if (field === 'hasVisa' && value === false) {
      newVisaInfo.visaType = '';
      newVisaInfo.issueDate = '';
      newVisaInfo.expiryDate = '';
    }
    
    setVisaInfo(newVisaInfo);
    setVisaError('');
  };

  const validateVisaInfo = (): boolean => {
    if (visaInfo.hasVisa) {
      if (!visaInfo.visaType) {
        setVisaError(t('signup.visaTypeRequired'));
        return false;
      }
      if (!visaInfo.issueDate) {
        setVisaError(t('signup.issueDateRequired'));
        return false;
      }
      if (!visaInfo.expiryDate) {
        setVisaError(t('signup.expiryDateRequired'));
        return false;
      }
      if (visaInfo.expiryDate <= visaInfo.issueDate) {
        setVisaError(t('signup.expiryDateAfterIssue'));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!id) {
      setIdError(t('auth.signup.idRequired'));
      hasError = true;
    }
    if (!password) {
      setPasswordError(t('auth.signup.passwordRequired'));
      hasError = true;
    }
    if (!name) {
      setNameError(t('auth.signup.nameRequired'));
      hasError = true;
    }
    if (!phone) {
      setPhoneError(t('auth.signup.phoneRequired'));
      hasError = true;
    }
    if (!address) {
      setAddressError(t('signup.addressRequired'));
      hasError = true;
    }
    if (!agreement1) {
      hasError = true;
    }
    if (!validateVisaInfo()) {
      hasError = true;
    }

    if (!hasError) {
      onSubmit(id, password, passwordConfirm, name, phone, address, visaInfo);
    }
  };

  return (
    <StyledSignupForm onSubmit={handleSubmit}>
      <InputGroup>
        <InputLabel>{t('auth.signup.idLabel')}</InputLabel>
        <InputField
          type="text"
          value={id}
          onChange={handleIdChange}
          hasError={!!idError}
          placeholder={t('auth.signup.idPlaceholder')}
          disabled={isLoading}
        />
        {idError && <ErrorMessage>{idError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <InputLabel>{t('auth.signup.passwordLabel')}</InputLabel>
        <InputField
          type="password"
          value={password}
          onChange={handlePasswordChange}
          hasError={!!passwordError}
          placeholder={t('auth.signup.passwordPlaceholder')}
          disabled={isLoading}
        />
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <InputLabel>{t('auth.signup.passwordConfirmLabel')}</InputLabel>
        <InputField
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          hasError={!!passwordConfirmError}
          placeholder={t('auth.signup.passwordConfirmPlaceholder')}
          disabled={isLoading}
        />
        {passwordConfirmError && <ErrorMessage>{passwordConfirmError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <InputLabel>{t('auth.signup.nameLabel')}</InputLabel>
        <InputField
          type="text"
          value={name}
          onChange={handleNameChange}
          hasError={!!nameError}
          placeholder={t('auth.signup.namePlaceholder')}
          disabled={isLoading}
        />
        {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <InputLabel>{t('auth.signup.phoneLabel')}</InputLabel>
        <InputField
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          hasError={!!phoneError}
          placeholder={t('auth.signup.phonePlaceholder')}
          disabled={isLoading}
        />
        {phoneError && <ErrorMessage>{phoneError}</ErrorMessage>}
      </InputGroup>

      <InputGroup>
        <InputLabel>{t('signup.addressLabel')}</InputLabel>
        <PostcodeSearch
          onAddressSelect={(address) => {
            setAddress(address.address);
            setAddressError('');
          }}
          placeholder={t('signup.addressPlaceholder')}
          disabled={isLoading}
          showDetailAddress={true}
          showRoadAddress={true}
          showJibunAddress={true}
        />
        {addressError && <ErrorMessage>{addressError}</ErrorMessage>}
      </InputGroup>

      {/* Visa Information Section */}
      <InputGroup>
        <InputLabel>{t('signup.visaInfoLabel')}</InputLabel>
        <VisaRadioGroup>
          <VisaRadioOption>
            <input
              type="radio"
              name="hasVisa"
              checked={visaInfo.hasVisa === true}
              onChange={() => handleVisaChange('hasVisa', true)}
              disabled={isLoading}
            />
            <span>{t('signup.hasVisa')}</span>
          </VisaRadioOption>
          <VisaRadioOption>
            <input
              type="radio"
              name="hasVisa"
              checked={visaInfo.hasVisa === false}
              onChange={() => handleVisaChange('hasVisa', false)}
              disabled={isLoading}
            />
            <span>{t('signup.noVisa')}</span>
          </VisaRadioOption>
        </VisaRadioGroup>
      </InputGroup>

      {/* Visa Details (only shown when visa is selected) */}
      {visaInfo.hasVisa && (
        <>
          <InputGroup>
            <InputLabel>{t('signup.visaTypeLabel')}</InputLabel>
            <SelectField
              value={visaInfo.visaType}
              onChange={(e) => handleVisaChange('visaType', e.target.value)}
              hasError={!!(visaError && !visaInfo.visaType)}
              disabled={isLoading}
            >
              {VISA_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SelectField>
          </InputGroup>

          <InputGroup>
            <InputLabel>{t('signup.issueDateLabel')}</InputLabel>
            <DateField
              type="date"
              value={visaInfo.issueDate}
              onChange={(e) => handleVisaChange('issueDate', e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <InputLabel>{t('signup.expiryDateLabel')}</InputLabel>
            <DateField
              type="date"
              value={visaInfo.expiryDate}
              onChange={(e) => handleVisaChange('expiryDate', e.target.value)}
              min={visaInfo.issueDate || new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </InputGroup>
        </>
      )}

      {visaError && <ErrorMessage>{visaError}</ErrorMessage>}

      <AgreementSection>
        <CheckboxGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={agreement1}
              onChange={(e) => setAgreement1(e.target.checked)}
              disabled={isLoading}
            />
            <CheckboxText>{t('auth.signup.privacyRequired')}</CheckboxText>
          </CheckboxLabel>
        </CheckboxGroup>
        <CheckboxGroup>
          <CheckboxLabel>
            <input
              type="checkbox"
              checked={agreement2}
              onChange={(e) => setAgreement2(e.target.checked)}
              disabled={isLoading}
            />
            <CheckboxText>
              {t('auth.signup.marketingOptional')}
            </CheckboxText>
          </CheckboxLabel>
        </CheckboxGroup>
      </AgreementSection>

      <FormActions>
        <Links>
          <StyledLink as={Link} to="/login">
            {t('auth.signup.loginLink')}
          </StyledLink>
        </Links>
        <SignupButton type="submit" isEnabled={!isLoading && agreement1} disabled={isLoading || !agreement1}>
          {isLoading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccount')}
        </SignupButton>
      </FormActions>
    </StyledSignupForm>
  );
};

export default SignupForm;
