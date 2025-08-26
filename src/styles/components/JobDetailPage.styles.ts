import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS, BREAKPOINTS } from '../../constants';

// 메인 컨테이너
export const JobDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: ${COLORS.background};
  color: ${COLORS.text};
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 1rem;
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 0.5rem;
  }
`;

// 헤더 섹션
export const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${COLORS.border};
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

// 뒤로가기 버튼
export const BackButton = styled(motion.button)`
  background: transparent;
  border: 1px solid ${COLORS.border};
  color: ${COLORS.text};
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all ${ANIMATIONS.duration.fast} ${ANIMATIONS.easing.ease};
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.border};
  }
  
  &:focus {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 2px;
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

// 지원하기 버튼
export const ApplyButton = styled(motion.button)`
  background: ${COLORS.primary};
  border: none;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all ${ANIMATIONS.duration.fast} ${ANIMATIONS.easing.ease};
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primaryHover};
  }
  
  &:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 0.5rem 1.5rem;
    font-size: 0.9rem;
  }
`;

// 회사 정보 섹션
export const CompanySection = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  .company-logo {
    flex-shrink: 0;
    
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      border-radius: 12px;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      
      &.blue { background: #3b82f6; }
      &.red { background: #ef4444; }
      &.green { background: #10b981; }
      &.orange { background: #f97316; }
      &.purple { background: #8b5cf6; }
    }
  }
  
  .company-info {
    flex: 1;
    
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 0 0 0.5rem 0;
      color: ${COLORS.text};
    }
    
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: ${COLORS.textSecondary};
    }
    
    .job-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      
      span {
        background: rgba(255, 255, 255, 0.1);
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.9rem;
      }
    }
    
    .visa-badge {
      display: inline-block;
      background: ${COLORS.primary};
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    
    .company-logo .logo {
      width: 60px;
      height: 60px;
      font-size: 1.5rem;
    }
    
    .company-info h1 {
      font-size: 1.5rem;
    }
    
    .company-info h2 {
      font-size: 1.2rem;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 1rem;
    
    .job-meta {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
`;

// 직무 설명 섹션
export const JobDescription = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: ${COLORS.text};
  }
  
  p {
    line-height: 1.6;
    color: ${COLORS.textSecondary};
  }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 1rem;
    
    h3 {
      font-size: 1.2rem;
    }
  }
`;

// 요구사항 섹션
export const RequirementsSection = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: ${COLORS.text};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 0.5rem 0;
    color: ${COLORS.textSecondary};
    position: relative;
    padding-left: 1.5rem;
    
    &:before {
      content: "•";
      color: ${COLORS.primary};
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 1rem;
    
    h3 {
      font-size: 1.2rem;
    }
  }
`;

// 혜택 섹션
export const BenefitsSection = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: ${COLORS.text};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    padding: 0.5rem 0;
    color: ${COLORS.textSecondary};
    position: relative;
    padding-left: 1.5rem;
    
    &:before {
      content: "✓";
      color: ${COLORS.primary};
      font-weight: bold;
      position: absolute;
      left: 0;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 1rem;
    
    h3 {
      font-size: 1.2rem;
    }
  }
`;

// 연락처 섹션
export const ContactSection = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: ${COLORS.text};
  }
  
  .contact-info {
    p {
      padding: 0.5rem 0;
      color: ${COLORS.textSecondary};
      margin: 0;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    padding: 1.5rem;
    
    h3 {
      font-size: 1.3rem;
    }
  }
  
  @media (max-width: ${BREAKPOINTS.mobile}) {
    padding: 1rem;
    
    h3 {
      font-size: 1.2rem;
    }
  }
`;

// 로딩 스피너
export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  
  &:after {
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid ${COLORS.border};
    border-top: 4px solid ${COLORS.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// 에러 메시지
export const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  
  h2 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: ${COLORS.text};
  }
  
  p {
    color: ${COLORS.textSecondary};
    margin-bottom: 2rem;
  }
`;
