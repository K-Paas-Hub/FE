import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
      setIdError('아이디를 입력해주세요.');
    } else {
      setIdError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value === '') {
      setPasswordError('새 비밀번호를 입력해주세요.');
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
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (value === '') {
      setNameError('이름을 입력해주세요.');
    } else {
      setNameError('');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (value === '') {
      setPhoneError('휴대폰 번호를 입력해주세요.');
    } else {
      setPhoneError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!id) {
      setIdError('아이디를 입력해주세요.');
      hasError = true;
    }
    if (!password) {
      setPasswordError('새 비밀번호를 입력해주세요.');
      hasError = true;
    }
    if (!name) {
      setNameError('이름을 입력해주세요.');
      hasError = true;
    }
    if (!phone) {
      setPhoneError('휴대폰 번호를 입력해주세요.');
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
        <label className="input-label">아이디</label>
        <input
          type="id"
          value={id}
          onChange={handleIdChange}
          className={`input-field ${idError ? 'error' : ''}`}
          placeholder="아이디를 입력해주세요"
          disabled={isLoading}
        />
        {idError && <div className="error-message">{idError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className={`input-field ${passwordError ? 'error' : ''}`}
          placeholder="새 비밀번호를 입력해주세요"
          disabled={isLoading}
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">비밀번호 확인</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          className={`input-field ${passwordConfirmError ? 'error' : ''}`}
          placeholder="비밀번호를 다시 입력해주세요"
          disabled={isLoading}
        />
        {passwordConfirmError && <div className="error-message">{passwordConfirmError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">이름</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className={`input-field ${nameError ? 'error' : ''}`}
          placeholder="이름을 입력해주세요"
          disabled={isLoading}
        />
        {nameError && <div className="error-message">{nameError}</div>}
      </div>

      <div className="input-group">
        <label className="input-label">휴대폰 번호</label>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          className={`input-field ${phoneError ? 'error' : ''}`}
          placeholder="휴대폰 번호를 입력해주세요"
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
            <span className="checkbox-text">[필수] 개인정보 수집 및 이용동의</span>
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
              [선택] 새로운 기능 출시 안내를 받아보세요. 언제든 취소할 수 있어요. (광고·마케팅 수신
              동의)
            </span>
          </label>
        </div>
      </div>

      <div className="form-actions">
        <div className="links">
          <Link to="/login" className="link">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
        <button type="submit" className="signup-button" disabled={isLoading || !agreement1}>
          {isLoading ? '계정 만들기 중...' : '계정 만들기'}
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
