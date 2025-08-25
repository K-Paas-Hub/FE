import React, { useState } from 'react';
import styled from 'styled-components';

const TopBanner = styled.div`
  background: #1e293b;
  color: white;
  padding: 0.8rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
`;

const BannerText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const BannerClose = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  min-width: 44px;
`;

interface CommunityBannerProps {
  onClose?: () => void;
}

const CommunityBanner: React.FC<CommunityBannerProps> = ({ onClose }) => {
  const [showBanner, setShowBanner] = useState(true);

  const handleClose = () => {
    setShowBanner(false);
    if (onClose) {
      onClose();
    }
  };

  if (!showBanner) return null;

  return (
    <TopBanner>
      <BannerText>
        Community Open! 💬 한국 취업을 준비하는 모든 외국인을 위한 공간이 생겼어요 →
      </BannerText>
      <BannerClose onClick={handleClose} aria-label="배너 닫기">×</BannerClose>
    </TopBanner>
  );
};

export default CommunityBanner;
