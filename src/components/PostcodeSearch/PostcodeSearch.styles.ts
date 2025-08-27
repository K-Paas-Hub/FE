import styled, { keyframes } from 'styled-components';

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Main container
export const PostcodeSearchContainer = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #191f28;
`;

// Input group
export const PostcodeSearchInputGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

// Search input
export const PostcodeSearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #1f2937;
  transition: all 0.6s ease;
  cursor: pointer;
  min-height: 44px;
  width: 100%;

  &:hover {
    border-color: #4ade80;
    background-color: #f8fafc;
  }

  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
  }

  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
`;

// Search button
export const PostcodeSearchButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.6s ease;
  white-space: nowrap;
  background-color: #4ade80;
  color: white;
  min-width: 120px;
  min-height: 44px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  position: relative;

  &:hover:not(:disabled) {
    background-color: #22c55e;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #9ca3af;
    color: #6b7280;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 16px;
      margin: -8px 0 0 -8px;
      border: 2px solid transparent;
      border-top: 2px solid currentColor;
      border-radius: 50%;
      animation: ${spin} 1s linear infinite;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
    font-size: 1rem;
  }
`;

// Address details
export const PostcodeAddressDetails = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  animation: ${slideDown} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: 8px;
  }
`;

// Zone code
export const PostcodeZonecode = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #4ade80;
  margin-bottom: 12px;
  padding: 10px 12px;
  background-color: #f8fafc;
  border-radius: 6px;
  border-left: 3px solid #4ade80;

  @media (max-width: 480px) {
    font-size: 13px;
    padding: 8px 12px;
  }
`;

// Address lines
export const PostcodeRoadAddress = styled.div`
  margin-bottom: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  color: #191f28;
  font-size: 15px;
  line-height: 1.5;

  strong {
    color: #475569;
    font-weight: 600;
    margin-right: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
    font-size: 14px;
  }
`;

export const PostcodeJibunAddress = styled.div`
  margin-bottom: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  color: #191f28;
  font-size: 15px;
  line-height: 1.5;

  strong {
    color: #475569;
    font-weight: 600;
    margin-right: 8px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
    font-size: 14px;
  }
`;

// Detail address section
export const PostcodeDetailAddress = styled.div`
  margin: 20px 0;

  label {
    display: block;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
    font-size: 15px;
  }
`;

export const PostcodeDetailInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #1f2937;
  transition: all 0.6s ease;
  min-height: 44px;

  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

// Building name
export const PostcodeBuildingName = styled.div`
  margin-top: 16px;
  padding: 12px 16px;
  background-color: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: 8px;
  color: #92400e;
  font-size: 14px;

  strong {
    color: #92400e;
    font-weight: 600;
    margin-right: 8px;
  }
`;

// Complete address
export const PostcodeCompleteAddress = styled.div`
  margin-top: 16px;
  padding: 10px 14px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #191f28;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.4;
`;

// Layer (modal) styles
export const PostcodeLayerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

export const PostcodeLayerContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease-out;

  @media (max-width: 768px) {
    margin: 10px;
    max-height: 90vh;
    border-radius: 12px;
  }
`;

export const PostcodeLayerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #191f28;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const PostcodeLayerClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e2e8f0;
    color: #191f28;
  }
`;

export const PostcodeLayerContent = styled.div`
  flex: 1;
  min-height: 400px;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

// Legacy exports for backwards compatibility
export const DetailAddressContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

export const DetailAddressInput = styled.input`
  flex: 1;
`;

export const ConfirmButton = styled.button`
  padding: 8px 16px;
  background-color: #4ade80;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background-color: #22c55e;
  }
`;
