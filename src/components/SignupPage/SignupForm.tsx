import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VisaInfo, VISA_TYPE_OPTIONS } from '../../types/visa';
import AddressSearch from '../AddressSearch';
import { AddressData } from '../../services/kakaoAddressService';
import '../../styles/SignupForm.css';

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
  const [selectedAddress, setSelectedAddress] = useState<AddressData | null>(null);
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

  const handleAddressSelect = (addressData: AddressData) => {
    setSelectedAddress(addressData);
    setAddress(addressData.address_name);
    setAddressError('');
  };

  const handleVisaChange = (field: keyof VisaInfo, value: string | boolean) => {
    const newVisaInfo = { ...visaInfo, [field]: value };
    
    // 비자 없음으로 변경 시 기존 정보 초기화
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
        setVisaError('비자 유형을 선택해주세요.');
        return false;
      }
      if (!visaInfo.issueDate) {
        setVisaError('발급일을 입력해주세요.');
        return false;
      }
      if (!visaInfo.expiryDate) {
        setVisaError('만료일을 입력해주세요.');
        return false;
      }
      if (visaInfo.expiryDate <= visaInfo.issueDate) {
        setVisaError('만료일은 발급일보다 늦어야 합니다.');
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
      setAddressError('주소를 입력해주세요.');
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

      <div className="input-group">
        <label className="input-label">주소</label>
        <AddressSearch
          onAddressSelect={handleAddressSelect}
          placeholder="주소를 검색하세요"
          disabled={isLoading}
        />
        {addressError && <div className="error-message">{addressError}</div>}
        {selectedAddress && (
          <div className="selected-address">
            <span>선택된 주소: {selectedAddress.address_name}</span>
          </div>
        )}
      </div>

      {/* 비자 정보 섹션 */}
      <div className="input-group">
        <label className="input-label">비자 정보</label>
        <div className="visa-radio-group">
          <label className="visa-radio-option">
            <input
              type="radio"
              name="hasVisa"
              checked={visaInfo.hasVisa === true}
              onChange={() => handleVisaChange('hasVisa', true)}
              disabled={isLoading}
            />
            <span>비자 있음</span>
          </label>
          <label className="visa-radio-option">
            <input
              type="radio"
              name="hasVisa"
              checked={visaInfo.hasVisa === false}
              onChange={() => handleVisaChange('hasVisa', false)}
              disabled={isLoading}
            />
            <span>비자 없음</span>
          </label>
        </div>
      </div>

      {/* 비자 상세 정보 (비자 있음 선택 시에만 표시) */}
      {visaInfo.hasVisa && (
        <>
          <div className="input-group">
            <label className="input-label">비자 유형</label>
            <select
              value={visaInfo.visaType}
              onChange={(e) => handleVisaChange('visaType', e.target.value)}
              className={`input-field ${visaError && !visaInfo.visaType ? 'error' : ''}`}
              disabled={isLoading}
            >
              {VISA_TYPE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">발급일</label>
            <input
              type="date"
              value={visaInfo.issueDate}
              onChange={(e) => handleVisaChange('issueDate', e.target.value)}
              className={`input-field ${visaError && !visaInfo.issueDate ? 'error' : ''}`}
              max={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <label className="input-label">만료일</label>
            <input
              type="date"
              value={visaInfo.expiryDate}
              onChange={(e) => handleVisaChange('expiryDate', e.target.value)}
              className={`input-field ${visaError && !visaInfo.expiryDate ? 'error' : ''}`}
              min={visaInfo.issueDate || new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </div>
        </>
      )}

      {visaError && <div className="error-message">{visaError}</div>}

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
