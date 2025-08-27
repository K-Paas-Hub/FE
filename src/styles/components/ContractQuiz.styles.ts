import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

// 컨테이너
export const QuizContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

export const QuizContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: ${COLORS.primary};
  border-radius: 16px;
  color: white;
  box-shadow: 0 4px 20px rgba(74, 222, 128, 0.2);
  
  @media (max-width: 768px) {
    padding: 2rem 0;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 0;
    border-radius: 12px;
  }
`;

export const QuizTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const QuizSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// 섹션
export const QuizSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
    gap: 0.6rem;
  }
`;

export const SectionIcon = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;

// 퀴즈 정보
export const QuizInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const InfoText = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

// 진행률
export const QuizProgress = styled.div`
  margin-bottom: 2rem;
`;

export const ProgressText = styled.p`
  color: #6b7280;
  margin-bottom: 0.75rem;
  font-weight: 500;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  width: ${props => props.$progress}%;
`;

// 문제 카드
export const QuestionCard = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const QuestionNumber = styled.div`
  background: ${COLORS.primary};
  color: white;
  width: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
`;

export const QuestionText = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// 선택지
export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OptionButton = styled(motion.button)<{ $selected: boolean }>`
  background: ${props => props.$selected ? COLORS.primary : 'white'};
  color: ${props => props.$selected ? 'white' : '#1f2937'};
  border: 2px solid ${props => props.$selected ? COLORS.primary : '#e5e7eb'};
  border-radius: 12px;
  padding: 1rem 1.5rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  font-size: 1rem;
  
  &:hover {
    background: ${props => props.$selected ? COLORS.primaryHover : '#f8f9fa'};
    border-color: ${props => props.$selected ? COLORS.primaryHover : COLORS.primary};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
`;

export const OptionText = styled.span`
  font-weight: 500;
  line-height: 1.5;
`;

// 네비게이션 버튼
export const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const NavButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: ${COLORS.primaryHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`;

// 결과 섹션
export const ResultSection = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 10px;
  }
`;

export const ResultCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const ResultTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const ResultScore = styled.div<{ $score: number }>`
  font-size: 4rem;
  font-weight: 700;
  color: ${props => {
    if (props.$score >= 80) return '#10b981';
    if (props.$score >= 60) return '#f59e0b';
    if (props.$score >= 40) return '#f97316';
    return '#ef4444';
  }};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export const ResultMessage = styled.p<{ $score: number }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => {
    if (props.$score >= 80) return '#10b981';
    if (props.$score >= 60) return '#f59e0b';
    if (props.$score >= 40) return '#f97316';
    return '#ef4444';
  }};
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const ResultDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

export const DetailLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const DetailValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const RestartButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.2);
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.7rem 1.2rem;
  }
`;

// 타이머 (향후 확장용)
export const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const TimerText = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

export const TimerBar = styled.div`
  flex: 1;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
`;

// 시작 버튼 컨테이너
export const StartButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
