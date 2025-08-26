import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

export const BlogContainer = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  
  .highlight {
    color: ${COLORS.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const BlogCard = styled(motion.article)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 300px;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  &:hover .blog-image::after {
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
  }
  
  @media (max-width: 768px) {
    height: 250px;
  }
  
  @media (max-width: 480px) {
    height: 200px;
  }
`;

export const BlogImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      135deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.8) 100%
    );
    transition: background 0.3s ease;
  }
`;

export const BlogContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

export const BlogHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const BlogCategory = styled.div`
  background: ${COLORS.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const BlogFooter = styled.div`
  
`;

export const BlogTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  line-height: 1.3;
  margin-bottom: 0.8rem;
  white-space: pre-line;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
`;

export const BlogExcerpt = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.8rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.6rem;
  }
`;

