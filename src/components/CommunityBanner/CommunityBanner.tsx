import React, { useState } from 'react';
import {
  TopBanner,
  BannerText,
  BannerClose
} from '../../styles/components/CommunityBanner.styles';



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
