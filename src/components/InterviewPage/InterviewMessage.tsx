import React from 'react';
import { useTranslation } from 'react-i18next';
import { Message } from './InterviewChat';
import {
  MessageContainer,
  MessageContent,
  MessageAvatar,
  AvatarIcon,
  MessageBubble,
  MessageText,
  RecommendedTime,
  TimeIcon,
  MessageTimestamp
} from '../../styles/components/InterviewMessage.styles';

interface InterviewMessageProps {
  message: Message;
}

const InterviewMessage: React.FC<InterviewMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  const isSystem = message.type === 'system';

  return (
    <MessageContainer $messageType={isSystem ? 'system' : 'user'}>
      <MessageContent>
        {isSystem && (
          <MessageAvatar>
            <AvatarIcon src="/images/chatbot.png" alt="Chatbot" />
          </MessageAvatar>
        )}
        
        <MessageBubble $messageType={isSystem ? 'system' : 'user'}>
          <MessageText $messageType={isSystem ? 'system' : 'user'}>
            {message.content.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < message.content.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </MessageText>
          
          {message.recommendedTime && (
            <RecommendedTime $messageType={isSystem ? 'system' : 'user'}>
              <TimeIcon>⏱️</TimeIcon>
              {t('interview.message.recommendedTime')}: {message.recommendedTime}
            </RecommendedTime>
          )}
        </MessageBubble>
      </MessageContent>
      
      <MessageTimestamp $messageType={isSystem ? 'system' : 'user'}>
        {message.timestamp}
      </MessageTimestamp>
    </MessageContainer>
  );
};

export default InterviewMessage;
