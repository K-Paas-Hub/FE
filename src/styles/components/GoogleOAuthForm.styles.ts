import styled from 'styled-components';
import { motion } from 'framer-motion';

// 통일된 입력 요소 스타일
export const UnifiedInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #374151;
  min-height: 36px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 16px; /* iOS에서 줌 방지 */
    padding: 0.6rem;
    min-height: 40px;
  }
`;

export const UnifiedSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #374151;
  min-height: 44px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    font-size: 16px; /* iOS에서 줌 방지 */
  }
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

// 체크박스 컨테이너
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  accent-color: #4ade80;
`;

// 비자 정보 섹션 스타일
export const VisaSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const VisaLabel = styled.label`
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
  margin: 0;
`;

export const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
  user-select: none;
`;

// Google 사용자 정보 컨테이너
export const GoogleUserContainer = styled.div`
  background: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// 프로필 이미지
export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

// 사용자 이름
export const UserName = styled.div`
  font-weight: 600;
  color: #374151;
`;

// 사용자 이메일
export const UserEmail = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

// 버튼 컨테이너
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

// PrimaryButton 추가
export const PrimaryButton = styled(motion.button)`
  background: #4ade80;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: #22c55e;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(74, 222, 128, 0.3);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;
