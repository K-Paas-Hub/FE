import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const InterviewPage = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  display: flex;
  flex-direction: column;
`;

export const InterviewContainer = styled.div`
  flex: 1;
  display: flex;
  height: calc(100vh - 80px);

  @media (max-width: 768px) {
    flex-direction: column;
    height: calc(100vh - 70px);
  }
`;

export const InterviewSidebar = styled.div`
  width: 320px;
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 280px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
`;

export const SidebarHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const InterviewLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const AiLogo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: brightness(0) invert(1);
`;

export const InterviewLogoTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`;

export const InterviewStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  opacity: 0.9;
`;

export const StatusIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: ${pulse} 2s infinite;
`;

export const SidebarContent = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 1024px) {
    padding: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
    gap: 20px;
  }
`;

export const InterviewInfo = styled.div`
  h3 {
    margin: 0 0 16px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  color: #64748b;
`;

export const InfoValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
`;

export const SidebarActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SidebarButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  ${props => props.variant === 'primary' && `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
  `}

  ${props => props.variant === 'secondary' && `
    background: #f8fafc;
    color: #374151;
    border: 1px solid #e2e8f0;

    &:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }
  `}
`;

export const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

export const InterviewMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
`;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 32px;
  border-bottom: 1px solid #e2e8f0;
  background: white;
  flex-shrink: 0;

  @media (max-width: 1024px) {
    padding: 20px 24px;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
`;

export const HeaderLeft = styled.div`
  h1 {
    margin: 0 0 8px 0;
    font-size: 28px;
    font-weight: 700;
    color: #1f2937;

    @media (max-width: 1024px) {
      font-size: 24px;
    }

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #64748b;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const HeaderButton = styled.button<{ variant?: 'close' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }

  ${props => props.variant === 'close' && `
    color: #ef4444;
    border-color: #fecaca;

    &:hover {
      background: #fef2f2;
      border-color: #fca5a5;
    }
  `}
`;

export const HeaderIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;
