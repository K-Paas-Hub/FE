import styled from 'styled-components';
import { COLORS } from '../../constants';

export const AnalysisContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

export const AnalysisContent = styled.main`
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

export const AnalysisHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const AnalysisTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const AnalysisSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const AnalysisSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 8px;
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
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }
`;

export const FileUploadArea = styled.div`
  border: 3px dashed #d1d5db;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    border-color: ${COLORS.primary};
    background: #f0fdf4;
  }
  
  &.dragover {
    border-color: ${COLORS.primary};
    background: #ecfdf5;
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 8px;
  }
`;

export const UploadIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #9ca3af;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const UploadTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const UploadText = styled.p`
  color: #6b7280;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const UploadSubtext = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const AnalysisButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.95rem;
  }
`;

export const FileInfo = styled.div`
  background: #f8f9fa;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 480px) {
    padding: 0.8rem;
    gap: 0.8rem;
  }
`;

export const FileIcon = styled.div`
  font-size: 1.5rem;
  color: ${COLORS.primary};
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const FileDetails = styled.div`
  flex: 1;
`;

export const FileName = styled.div`
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const FileSize = styled.div`
  font-size: 0.9rem;
  color: #6b7280;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const RemoveButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: #dc2626;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem;
    font-size: 0.8rem;
  }
`;

export const AnalysisResults = styled.div`
  margin-top: 2rem;
`;

export const ResultCard = styled.div<{ $type: 'success' | 'warning' | 'error' }>`
  background: ${props => {
    switch (props.$type) {
      case 'success': return '#f0fdf4';
      case 'warning': return '#fffbeb';
      case 'error': return '#fef2f2';
      default: return '#f8f9fa';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$type) {
      case 'success': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#e5e7eb';
    }
  }};
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    padding: 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    border-radius: 6px;
  }
`;

export const ResultTitle = styled.h4<{ $type: 'success' | 'warning' | 'error' }>`
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#059669';
      case 'warning': return '#d97706';
      case 'error': return '#dc2626';
      default: return '#374151';
    }
  }};
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    gap: 0.4rem;
  }
`;

export const ResultContent = styled.div`
  color: #374151;
  line-height: 1.6;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${COLORS.primary};
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;


