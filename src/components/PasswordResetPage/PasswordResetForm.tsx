import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../styles/PasswordResetForm.css';

interface PasswordResetFormProps {
  onSubmit: (id: string) => void;
  isLoading?: boolean;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({ onSubmit, isLoading = false }) => {
  const { t } = useTranslation();
  const [id, setId] = useState('');
  const [idError, setIdError] = useState('');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    if (value === '') {
      setIdError(t('passwordReset.form.emailRequired'));
    } else {
      setIdError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!id) {
      setIdError(t('passwordReset.form.emailRequired'));
      hasError = true;
    }

    if (!hasError) {
      onSubmit(id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-reset-form">
      <div className="input-group">
        <p className="input-description">{t('passwordReset.description')}</p>
        <input
          type="text"
          value={id}
          onChange={handleIdChange}
          className={`input-field ${idError ? 'error' : ''}`}
          placeholder={t('passwordReset.form.emailPlaceholder')}
          disabled={isLoading}
        />
        {idError && <div className="error-message">{idError}</div>}
      </div>

      <div className="form-actions">
        <div className="links">
          <Link to="/login" className="link">
            {t('passwordReset.actions.backToLogin')}
          </Link>
        </div>
        <button type="submit" className="reset-button" disabled={isLoading || !id}>
          {isLoading ? t('passwordReset.form.loadingButton') : t('passwordReset.form.submitButton')}
        </button>
      </div>
    </form>
  );
};

export default PasswordResetForm;
