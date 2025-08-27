import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  PasswordResetForm as StyledPasswordResetForm,
  InputGroup,
  InputDescription,
  InputField,
  ErrorMessage,
  FormActions,
  Links,
  Link as StyledLink,
  ResetButton,
} from '../../styles/components/PasswordResetForm.styles';

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
    <StyledPasswordResetForm onSubmit={handleSubmit}>
      <InputGroup>
        <InputDescription>{t('passwordReset.description')}</InputDescription>
        <InputField
          type="text"
          value={id}
          onChange={handleIdChange}
          hasError={!!idError}
          placeholder={t('passwordReset.form.emailPlaceholder')}
          disabled={isLoading}
        />
        {idError && <ErrorMessage>{idError}</ErrorMessage>}
      </InputGroup>

      <FormActions>
        <Links>
          <StyledLink as={Link} to="/login">
            {t('passwordReset.actions.backToLogin')}
          </StyledLink>
        </Links>
        <ResetButton type="submit" isEnabled={!isLoading && !!id} disabled={isLoading || !id}>
          {isLoading ? t('passwordReset.form.loadingButton') : t('passwordReset.form.submitButton')}
        </ResetButton>
      </FormActions>
    </StyledPasswordResetForm>
  );
};

export default PasswordResetForm;
