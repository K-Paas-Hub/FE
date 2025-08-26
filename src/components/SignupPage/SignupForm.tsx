import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../../styles/SignupForm.css';

interface SignupFormProps {
  onSubmit: (
    id: string,
    password: string,
    passwordConfirm: string,
    name: string,
    phone: string
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
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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
    if (!agreement1) {
      hasError = true;
    }

    if (!hasError) {
      onSubmit(id, password, passwordConfirm, name, phone);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="input-group">
        <label className="input-label">{t('auth.signup.idLabel')}</label>
        <input
          type="id"
          value={id}
          onChange={handleIdChange}
          className={`input-field ${idError ? 'error' : ''}`}
          placeholder={t('auth.signup.idPlaceholder')}
          disabled={isLoading}
        />
        {idError && <div className="error-message">{idError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">{t('auth.signup.passwordLabel')}</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={`input-field ${passwordError ? 'error' : ''}`}
          placeholder={t('auth.signup.passwordPlaceholder')}
          disabled={isLoading}
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">{t('auth.signup.passwordConfirmLabel')}</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          className={`input-field ${passwordConfirmError ? 'error' : ''}`}
          placeholder={t('auth.signup.passwordConfirmPlaceholder')}
          disabled={isLoading}
        />
        {passwordConfirmError && <div className="error-message">{passwordConfirmError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">{t('auth.signup.nameLabel')}</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className={`input-field ${nameError ? 'error' : ''}`}
          placeholder={t('auth.signup.namePlaceholder')}
          disabled={isLoading}
        />
        {nameError && <div className="error-message">{nameError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">{t('auth.signup.phoneLabel')}</label>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          className={`input-field ${phoneError ? 'error' : ''}`}
          placeholder={t('auth.signup.phonePlaceholder')}
          disabled={isLoading}
        />
        {phoneError && <div className="error-message">{phoneError}</div>}
      </div>



      <div className="agreement-section">
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreement1}
              onChange={(e) => setAgreement1(e.target.checked)}
              disabled={isLoading}
            />
            <span className="checkbox-text">{t('auth.signup.privacyRequired')}</span>
          </label>
        </div>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={agreement2}
              onChange={(e) => setAgreement2(e.target.checked)}
              disabled={isLoading}
            />
            <span className="checkbox-text">
              {t('auth.signup.marketingOptional')}
            </span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <div className="links">
          <Link to="/login" className="link">
            {t('auth.signup.loginLink')}
          </Link>
        </div>
        <button type="submit" className="signup-button" disabled={isLoading || !agreement1}>
          {isLoading ? t('auth.signup.creatingAccount') : t('auth.signup.createAccount')}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
