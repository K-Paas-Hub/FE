import styled from 'styled-components';

export const InterviewInputContainer = styled.div`
  border-top: 1px solid #e2e8f0;
  background: white;
  padding: 20px 32px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const InputForm = styled.form`
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px 20px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 8px;
  }
`;

export const MessageInput = styled.textarea`
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  outline: none;
  font-size: 15px;
  line-height: 1.5;
  color: #374151;
  font-family: inherit;
  min-height: 24px;
  max-height: 120px;
  padding: 0;

  &::placeholder {
    color: #94a3b8;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const InputActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const ActionButton = styled.button<{ $variant?: 'mic' | 'send' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  ${props => props.$variant === 'mic' && `
    color: #64748b;
    background: #f1f5f9;

    &:hover {
      background: #e2e8f0;
      color: #374151;
    }
  `}

  ${props => props.$variant === 'send' && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover:not(:disabled) {
      transform: scale(1.05);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
      background: #cbd5e1;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `}

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const MicIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

export const SendIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: brightness(0) invert(1);

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;
