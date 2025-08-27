import styled from 'styled-components';

export const MessageContainer = styled.div<{ messageType: 'system' | 'user' }>`
  display: flex;
  flex-direction: column;
  max-width: 80%;

  ${props => props.messageType === 'system' && `
    align-self: flex-start;
  `}

  ${props => props.messageType === 'user' && `
    align-self: flex-end;
  `}

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const MessageContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const MessageAvatar = styled.div`
  flex-shrink: 0;
`;

export const AvatarIcon = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: contain;
  background: #f8f9fa;
  padding: 6px;
  border: 2px solid #e5e7eb;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    padding: 4px;
  }
`;

export const MessageBubble = styled.div<{ messageType: 'system' | 'user' }>`
  background: #f3f4f6;
  border-radius: 18px;
  padding: 12px 16px;
  position: relative;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  word-break: keep-all;

  ${props => props.messageType === 'user' && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  `}

  @media (max-width: 768px) {
    padding: 10px 14px;
  }
`;

export const MessageText = styled.div<{ messageType: 'system' | 'user' }>`
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  white-space: pre-line;

  ${props => props.messageType === 'user' && `
    color: white;
  `}

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const RecommendedTime = styled.div<{ messageType: 'system' | 'user' }>`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e5e7eb;
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;

  ${props => props.messageType === 'user' && `
    border-top-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 0.8);
  `}
`;

export const TimeIcon = styled.span`
  font-size: 14px;
`;

export const MessageTimestamp = styled.div<{ messageType: 'system' | 'user' }>`
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
  padding-left: 56px;

  ${props => props.messageType === 'user' && `
    text-align: right;
    padding-left: 0;
    padding-right: 0;
  `}

  @media (max-width: 768px) {
    font-size: 10px;
    padding-left: 44px;
  }
`;
