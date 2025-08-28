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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] = useState(false);

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

  // 비밀번호 표시/숨김 토글
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const togglePasswordConfirmVisibility = () => {
    setIsPasswordConfirmVisible(!isPasswordConfirmVisible);
  };

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
    
    // 비밀번호 확인 재검증
    if (passwordConfirm && value !== passwordConfirm) {
      setPasswordConfirmError(t('auth.signup.passwordMismatch'));
    } else if (passwordConfirm) {
      setPasswordConfirmError('');
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
    <div role="main" aria-labelledby="signup-title">
      <h2 id="signup-title" className="sr-only">{t('auth.signup.title')}</h2>
      
      <StyledSignupForm onSubmit={handleSubmit} noValidate>
        <InputGroup>
          <InputLabel htmlFor="signup-id">
            {t('auth.signup.idLabel')}
            <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
          </InputLabel>
          <InputField
            id="signup-id"
            type="text"
            value={id}
            onChange={handleIdChange}
            $hasError={!!idError}
            placeholder={t('auth.signup.idPlaceholder')}
            disabled={isLoading}
            aria-describedby={idError ? "id-error" : "id-help"}
            aria-invalid={!!idError}
            aria-required="true"
            autoComplete="username"
            autoFocus
          />
          {idError && (
            <ErrorMessage id="id-error" role="alert" aria-live="polite">
              {idError}
            </ErrorMessage>
          )}
          <div id="id-help" className="sr-only">
            {t('auth.signup.idPlaceholder')}
          </div>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="signup-password">
            {t('auth.signup.passwordLabel')}
            <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
          </InputLabel>
          <div style={{ position: 'relative' }}>
            <InputField
              id="signup-password"
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              $hasError={!!passwordError}
              placeholder={t('auth.signup.passwordPlaceholder')}
              disabled={isLoading}
              aria-describedby={passwordError ? "password-error" : "password-help"}
              aria-invalid={!!passwordError}
              aria-required="true"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={isLoading}
              aria-label={isPasswordVisible ? t('common.accessibility.passwordHide') : t('common.accessibility.passwordShow')}
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
          {passwordError && (
            <ErrorMessage id="password-error" role="alert" aria-live="polite">
              {passwordError}
            </ErrorMessage>
          )}
          <div id="password-help" className="sr-only">
            {t('auth.signup.passwordPlaceholder')}
          </div>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="signup-password-confirm">
            {t('auth.signup.passwordConfirmLabel')}
            <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
          </InputLabel>
          <div style={{ position: 'relative' }}>
            <InputField
              id="signup-password-confirm"
              type={isPasswordConfirmVisible ? "text" : "password"}
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              $hasError={!!passwordConfirmError}
              placeholder={t('auth.signup.passwordConfirmPlaceholder')}
              disabled={isLoading}
              aria-describedby={passwordConfirmError ? "password-confirm-error" : "password-confirm-help"}
              aria-invalid={!!passwordConfirmError}
              aria-required="true"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={togglePasswordConfirmVisibility}
              disabled={isLoading}
              aria-label={isPasswordConfirmVisible ? t('common.accessibility.passwordConfirmHide') : t('common.accessibility.passwordConfirmShow')}
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
              {isPasswordConfirmVisible ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {passwordConfirmError && (
            <ErrorMessage id="password-confirm-error" role="alert" aria-live="polite">
              {passwordConfirmError}
            </ErrorMessage>
          )}
          <div id="password-confirm-help" className="sr-only">
            {t('auth.signup.passwordConfirmPlaceholder')}
          </div>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="signup-name">
            {t('auth.signup.nameLabel')}
            <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
          </InputLabel>
          <InputField
            id="signup-name"
            type="text"
            value={name}
            onChange={handleNameChange}
            $hasError={!!nameError}
            placeholder={t('auth.signup.namePlaceholder')}
            disabled={isLoading}
            aria-describedby={nameError ? "name-error" : "name-help"}
            aria-invalid={!!nameError}
            aria-required="true"
            autoComplete="name"
          />
          {nameError && (
            <ErrorMessage id="name-error" role="alert" aria-live="polite">
              {nameError}
            </ErrorMessage>
          )}
          <div id="name-help" className="sr-only">
            {t('auth.signup.namePlaceholder')}
          </div>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="signup-phone">
            {t('auth.signup.phoneLabel')}
            <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
          </InputLabel>
          <InputField
            id="signup-phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            $hasError={!!phoneError}
            placeholder={t('auth.signup.phonePlaceholder')}
            disabled={isLoading}
            aria-describedby={phoneError ? "phone-error" : "phone-help"}
            aria-invalid={!!phoneError}
            aria-required="true"
            autoComplete="tel"
          />
          {phoneError && (
            <ErrorMessage id="phone-error" role="alert" aria-live="polite">
              {phoneError}
            </ErrorMessage>
          )}
          <div id="phone-help" className="sr-only">
            {t('auth.signup.phonePlaceholder')}
          </div>
        </InputGroup>

        <InputGroup>
          <InputLabel htmlFor="signup-address">
            {t('signup.addressLabel')}
            <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
          </InputLabel>
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
            aria-describedby={addressError ? "address-error" : "address-help"}
            aria-invalid={!!addressError}
            aria-required="true"
          />
          {addressError && (
            <ErrorMessage id="address-error" role="alert" aria-live="polite">
              {addressError}
            </ErrorMessage>
          )}
          <div id="address-help" className="sr-only">
            {t('signup.addressPlaceholder')}
          </div>
        </InputGroup>

        {/* Visa Information Section */}
        <InputGroup>
          <InputLabel>
            {t('signup.visaInfoLabel')}
          </InputLabel>
          <VisaRadioGroup role="radiogroup" aria-labelledby="visa-info-label">
            <VisaRadioOption>
              <input
                type="radio"
                name="hasVisa"
                id="has-visa-yes"
                checked={visaInfo.hasVisa === true}
                onChange={() => handleVisaChange('hasVisa', true)}
                disabled={isLoading}
                aria-describedby="visa-help"
              />
              <span>{t('signup.hasVisa')}</span>
            </VisaRadioOption>
            <VisaRadioOption>
              <input
                type="radio"
                name="hasVisa"
                id="has-visa-no"
                checked={visaInfo.hasVisa === false}
                onChange={() => handleVisaChange('hasVisa', false)}
                disabled={isLoading}
                aria-describedby="visa-help"
              />
              <span>{t('signup.noVisa')}</span>
            </VisaRadioOption>
          </VisaRadioGroup>
          <div id="visa-help" className="sr-only">
            비자 보유 여부를 선택하세요
          </div>
        </InputGroup>

        {/* Visa Details (only shown when visa is selected) */}
        {visaInfo.hasVisa && (
          <>
            <InputGroup>
              <InputLabel htmlFor="visa-type">
                {t('signup.visaTypeLabel')}
                <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
              </InputLabel>
              <SelectField
                id="visa-type"
                value={visaInfo.visaType}
                onChange={(e) => handleVisaChange('visaType', e.target.value)}
                $hasError={!!(visaError && !visaInfo.visaType)}
                disabled={isLoading}
                aria-describedby={visaError && !visaInfo.visaType ? "visa-error" : "visa-type-help"}
                aria-invalid={!!(visaError && !visaInfo.visaType)}
                aria-required="true"
              >
                <option value="">{t('signup.selectVisaType')}</option>
                {VISA_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </SelectField>
              <div id="visa-type-help" className="sr-only">
                비자 타입을 선택하세요
              </div>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="issue-date">
                {t('signup.issueDateLabel')}
                <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
              </InputLabel>
              <DateField
                id="issue-date"
                type="date"
                value={visaInfo.issueDate}
                onChange={(e) => handleVisaChange('issueDate', e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                disabled={isLoading}
                aria-describedby={visaError && !visaInfo.issueDate ? "visa-error" : "issue-date-help"}
                aria-invalid={!!(visaError && !visaInfo.issueDate)}
                aria-required="true"
              />
              <div id="issue-date-help" className="sr-only">
                비자 발급일을 선택하세요
              </div>
            </InputGroup>

            <InputGroup>
              <InputLabel htmlFor="expiry-date">
                {t('signup.expiryDateLabel')}
                <span aria-label={t('common.accessibility.requiredField')} className="required">*</span>
              </InputLabel>
              <DateField
                id="expiry-date"
                type="date"
                value={visaInfo.expiryDate}
                onChange={(e) => handleVisaChange('expiryDate', e.target.value)}
                min={visaInfo.issueDate || new Date().toISOString().split('T')[0]}
                disabled={isLoading}
                aria-describedby={visaError && !visaInfo.expiryDate ? "visa-error" : "expiry-date-help"}
                aria-invalid={!!(visaError && !visaInfo.expiryDate)}
                aria-required="true"
              />
              <div id="expiry-date-help" className="sr-only">
                비자 만료일을 선택하세요
              </div>
            </InputGroup>
          </>
        )}

        {visaError && (
          <ErrorMessage id="visa-error" role="alert" aria-live="polite">
            {visaError}
          </ErrorMessage>
        )}

        <AgreementSection>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                id="agreement1"
                checked={agreement1}
                onChange={(e) => setAgreement1(e.target.checked)}
                disabled={isLoading}
                aria-required="true"
                aria-describedby="agreement1-help"
              />
              <CheckboxText>
                {t('auth.signup.privacyRequired')}
                <span aria-label={t('common.accessibility.requiredAgreement')} className="required">*</span>
              </CheckboxText>
            </CheckboxLabel>
            <div id="agreement1-help" className="sr-only">
              개인정보 수집 및 이용에 동의해야 회원가입이 가능합니다
            </div>
          </CheckboxGroup>
          <CheckboxGroup>
            <CheckboxLabel>
              <input
                type="checkbox"
                id="agreement2"
                checked={agreement2}
                onChange={(e) => setAgreement2(e.target.checked)}
                disabled={isLoading}
                aria-describedby="agreement2-help"
              />
              <CheckboxText>
                {t('auth.signup.marketingOptional')}
              </CheckboxText>
            </CheckboxLabel>
            <div id="agreement2-help" className="sr-only">
              마케팅 정보 수신 동의는 선택사항입니다
            </div>
          </CheckboxGroup>
        </AgreementSection>

        <FormActions>
          <Links role="navigation" aria-label={t('common.accessibility.additionalLinks')}>
            <StyledLink 
              as={Link} 
              to="/login"
              aria-label={t('common.accessibility.loginPageNavigation')}
            >
              {t('auth.signup.loginLink')}
            </StyledLink>
          </Links>
          <SignupButton 
            type="submit" 
            $isEnabled={!isLoading && agreement1} 
            disabled={isLoading || !agreement1}
            aria-describedby="signup-button-help"
          >
            {isLoading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccount')}
          </SignupButton>
          <div id="signup-button-help" className="sr-only">
            회원가입 버튼을 클릭하거나 Enter 키를 눌러 회원가입하세요
          </div>
        </FormActions>
      </StyledSignupForm>
    </div>
  );
};

export default SignupForm;
