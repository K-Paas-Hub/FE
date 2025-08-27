import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from './InterviewChat';
import '../../styles/InterviewMessage.css';

interface InterviewMessageProps {
  message: Message;
}

const InterviewMessage: React.FC<InterviewMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const isSystem = message.type === 'system';

  return (
    <div className={`message-container ${isSystem ? 'system' : 'user'}`}>
      <div className="message-content">
        {isSystem && (
          <div className="message-avatar">
            <img src="/images/chatbot.png" alt="Chatbot" className="avatar-icon" />
          </div>
        )}
        
        <div className="message-bubble">
          <div className="message-text">
            {message.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>
          
          {message.recommendedTime && (
            <div className="recommended-time">
              <span className="time-icon">⏱️</span>
              {t('interview.message.recommendedTime')}: {message.recommendedTime}
            </div>
          )}
        </div>
      </div>
      
      <div className="message-timestamp">
        {message.timestamp}
      </div>
    </div>
  );
};

export default InterviewMessage;
