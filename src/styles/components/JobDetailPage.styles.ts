import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme/theme';

// 메인 컨테이너 - 2컬럼 레이아웃
export const JobDetailContainer = styled.div`
  max-width: ${theme.containers.wide};
  margin: 0 auto;
  min-height: 100vh;
  background: ${theme.colors.white} !important;
  color: ${theme.colors.textPrimary};
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  
  ${theme.media.tablet} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.md};
  }
`;

// 좌측 메인 콘텐츠 영역
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

// 우측 사이드바 영역
export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  position: sticky;
  top: ${theme.spacing.xl};
  height: fit-content;
  
  ${theme.media.tablet} {
    position: static;
    order: -1; // 모바일에서는 상단으로 이동
  }
`;

// 상단 헤더 섹션
export const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  ${theme.media.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

// 마감일 카운트다운 배지
export const DeadlineBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.error};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  
  ${theme.media.mobile} {
    font-size: ${theme.typography.fontSize.xs};
    padding: ${theme.spacing.xs};
  }
`;

// 직무 제목과 회사 정보
export const JobTitleSection = styled.div`
  flex: 1;
  
  h1 {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.textPrimary};
    margin: ${theme.spacing.md} 0 ${theme.spacing.sm} 0;
    line-height: ${theme.typography.lineHeight.tight};
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize['2xl']};
    }
    
    ${theme.media.mobile} {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
  
  h2 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.medium};
    color: ${theme.colors.textSecondary};
    margin: 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`;



// 탭 네비게이션
export const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.borderLight};
  margin-bottom: ${theme.spacing.lg};
`;

export const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${props => props.active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? theme.colors.primary : 'transparent'};
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

// 탭 콘텐츠
export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

// 섹션 공통 스타일
const SectionBase = styled.section`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.lg};
  }
  
  ${theme.media.mobile} {
    padding: ${theme.spacing.md};
  }
  
  h3 {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.textPrimary};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.lg};
    }
  }
`;

export const JobDescription = styled(SectionBase)`
  p {
    font-size: ${theme.typography.fontSize.base};
    line-height: ${theme.typography.lineHeight.relaxed};
    color: ${theme.colors.textSecondary};
    margin: 0;
  }
`;

export const RequirementsSection = styled(SectionBase)`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      position: relative;
      padding-left: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.normal};
      color: ${theme.colors.textSecondary};
      
      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: ${theme.colors.primary};
        font-weight: ${theme.typography.fontWeight.bold};
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const BenefitsSection = styled(SectionBase)`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      position: relative;
      padding-left: ${theme.spacing.lg};
      margin-bottom: ${theme.spacing.sm};
      font-size: ${theme.typography.fontSize.base};
      line-height: ${theme.typography.lineHeight.normal};
      color: ${theme.colors.textSecondary};
      
      &:before {
        content: '🎁';
        position: absolute;
        left: 0;
      }
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

// 사이드바 요약 정보 카드
export const SummaryCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.borderLight};
  border-radius: ${theme.radius.xl};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.borderLight};
  
  &:last-child {
    border-bottom: none;
  }
  
  .label {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.textSecondary};
    font-weight: ${theme.typography.fontWeight.medium};
  }
  
  .value {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.textPrimary};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-align: right;
  }
`;

// 주소 복사 버튼
export const CopyAddressButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${theme.colors.backgroundGray};
  color: ${theme.colors.textSecondary};
  border: 1px solid ${theme.colors.borderLight};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.radius.sm};
  font-size: ${theme.typography.fontSize.xs};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  
  &:hover {
    background: ${theme.colors.primaryLight};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primaryDark};
  }
`;

// 액션 버튼들
export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const PrimaryActionButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    background: ${theme.colors.primaryHover};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SecondaryActionButton = styled(motion.button)`
  background: ${theme.colors.white};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.borderLight};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.radius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  
  &:hover {
    background: ${theme.colors.backgroundGray};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

// 뒤로가기 버튼
export const BackButton = styled(motion.button)`
  background: ${theme.colors.backgroundGray};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.borderLight};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.duration.normal} ${theme.animations.easing.ease};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSize.base};
  
  &:hover {
    background: ${theme.colors.primaryLight};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primaryDark};
  }
  
  ${theme.media.tablet} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
  }
`;

// 로딩 및 에러 상태
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.textSecondary};
  
  &:before {
    content: '⏳';
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const WebsiteLink = styled.a`
  color: #4ade80;
  text-decoration: underline;
  
  &:hover {
    color: #22c55e;
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  padding: ${theme.spacing.xl};
  
  h2 {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.error};
    margin: 0 0 ${theme.spacing.md} 0;
    
    ${theme.media.tablet} {
      font-size: ${theme.typography.fontSize.xl};
    }
  }
  
  p {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.textSecondary};
    margin: 0 0 ${theme.spacing.xl} 0;
    line-height: ${theme.typography.lineHeight.normal};
  }
`;
