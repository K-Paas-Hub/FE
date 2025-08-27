import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../styles/InterviewInput.css';

interface InterviewInputProps {
  onSendMessage: (message: string) => void;
}

const InterviewInput: React.FC<InterviewInputProps> = ({ onSendMessage }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="interview-input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-wrapper">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('interview.input.placeholder')}
            className="message-input"
            rows={1}
          />
          <div className="input-actions">
            <button type="button" className="action-button mic-button">
              <img src="/images/microphone.png" alt="Microphone" className="mic-icon" />
            </button>
            <button type="submit" className="action-button send-button">
              <img src="/images/send-message.png" alt="Send" className="send-icon" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InterviewInput;
