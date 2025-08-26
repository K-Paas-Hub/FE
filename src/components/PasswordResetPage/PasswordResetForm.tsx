import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/PasswordResetForm.css';

interface PasswordResetFormProps {
  onSubmit: (id: string) => void;
  isLoading?: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit, isLoading = false }) => {
  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    if (value === '') {
      setIdError('아이디를 입력해주세요.');
    } else {
      setIdError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!id) {
      setIdError('아이디를 입력해주세요.');
      hasError = true;
    }

    if (!hasError) {
      onSubmit(id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-reset-form">
      <div className="input-group">
        <p className="input-description">임시 비밀번호를 받을 이메일 계정을 입력해주세요.</p>
        <input
          type="text"
          value={id}
          onChange={handleIdChange}
          className={`input-field ${idError ? 'error' : ''}`}
          placeholder="이메일을 입력해주세요"
          disabled={isLoading}
        />
        {idError && <div className="error-message">{idError}</div>}
      </div>

      <div className="form-actions">
        <div className="links">
          <Link to="/login" className="link">
            로그인으로 돌아가기
          </Link>
        </div>
        <button type="submit" className="reset-button" disabled={isLoading || !id}>
          {isLoading ? '처리 중...' : '다음'}
        </button>
      </div>
    </form>
  );
};

export default PasswordResetForm;
