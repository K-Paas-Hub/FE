import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';

export const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export const CallbackCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    max-width: 350px;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 300px;
    border-radius: 8px;
  }
`;



export const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const Message = styled.p`
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ErrorMessage = styled.p`
  color: #ef4444;
  margin-bottom: 1rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const SuccessMessage = styled.p`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;
