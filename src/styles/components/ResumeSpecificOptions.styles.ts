import styled from 'styled-components';
import { COLORS } from '../../constants';

export const ResumeOptionsContainer = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
`;

export const ResumeOptionsTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin-bottom: 1rem;
`;

export const ResumeOptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ResumeOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
`;

export const ResumeOptionLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${COLORS.text};
  cursor: pointer;
`;

export const ResumeOptionDescription = styled.p`
  font-size: 0.8rem;
  color: ${COLORS.textSecondary};
  line-height: 1.4;
  margin: 0;
`;
