import styled from 'styled-components';

export const InterviewChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  min-height: 0;
`;

export const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 0;

  @media (max-width: 768px) {
    padding: 16px 20px;
    gap: 16px;
  }
`;

export const WelcomeSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  flex: 1;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

export const WelcomeCard = styled.div`
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 24px 20px;
    margin: 0 16px;
  }
`;

export const WelcomeIcon = styled.div`
  margin-bottom: 16px;
`;

export const WelcomeImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }
`;

export const WelcomeTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const WelcomeDescription = styled.p`
  margin: 0 0 32px 0;
  font-size: 16px;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 24px;
  }
`;

export const WelcomeFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
  color: #374151;

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 13px;
  }
`;

export const FeatureIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
`;

export const StartInterviewButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
  }
`;
