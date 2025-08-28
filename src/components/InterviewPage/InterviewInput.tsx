import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  InterviewInputContainer,
  InputForm,
  InputWrapper,
  MessageInput,
  InputActions,
  ActionButton,
  MicIcon,
  SendIcon
} from '../../styles/components/InterviewInput.styles';

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
    <InterviewInputContainer>
      <InputForm onSubmit={handleSubmit}>
        <InputWrapper>
          <MessageInput
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('interview.input.placeholder')}
            rows={1}
          />
          <InputActions>
            <ActionButton type="button" $variant="mic">
              <MicIcon src="/images/microphone.png" alt="Microphone" />
            </ActionButton>
            <ActionButton type="submit" $variant="send">
              <SendIcon src="/images/send-message.png" alt="Send" />
            </ActionButton>
          </InputActions>
        </InputWrapper>
      </InputForm>
    </InterviewInputContainer>
  );
};

export default InterviewInput;
