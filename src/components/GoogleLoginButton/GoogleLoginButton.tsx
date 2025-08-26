import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ANIMATIONS } from '../../constants';
import '../../styles/GoogleLoginButton.css';

interface GoogleLoginButtonProps {
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ 
  className, 
  onClick, 
  disabled = false,
  loading = false 
}) => {
  const { t } = useTranslation();

  const handleClick = () => {
    if (onClick && !disabled && !loading) {
      onClick();
    }
  };

  return (
    <motion.button
      className={`google-button ${className || ''}`}
      onClick={handleClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: ANIMATIONS.duration.normal }}
    >
      {loading ? (
        <div className="loading-spinner" />
      ) : (
        <div className="google-icon" />
      )}
      {loading ? t('auth.loginLoading') : t('auth.googleLogin')}
    </motion.button>
  );
};

export default GoogleLoginButton;
