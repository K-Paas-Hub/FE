import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

const BlogContainer = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const SectionTitle = styled(motion.h2)`
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BlogCard = styled(motion.article)`
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

const BlogImage = styled.div`
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

const BlogContent = styled.div`
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

const BlogHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const BlogCategory = styled.div`
  background: ${COLORS.primary};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogFooter = styled.div`
  
`;

const BlogTitle = styled.h3`
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

const BlogExcerpt = styled.p`
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

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '당신의 권리를 지키는\n첫 번째 걸음',
    excerpt: '한국에서 일할 때 꼭 알아야 할 근로계약서의 핵심 내용과 주의사항을 상세히 안내합니다.',
    image: '/images/employment_contract.png',
    category: 'GUIDE'
  },
  {
    id: 2,
    title: '꿈을 현실로 만드는\n서류 준비 가이드',
    excerpt: '취업 과정에서 필요한 모든 서류들을 정리하고, 비자 신청부터 취업 허가까지 단계별로 안내합니다.',
    image: '/images/visa.png',
    category: 'DOCUMENT'
  },
  {
    id: 3,
    title: 'AI와 함께하는\n스마트 면접 준비',
    excerpt: '최신 AI 기술을 활용한 면접 대비 방법과 LLM 기반 면접 시뮬레이션을 통해 실전 감각을 키워보세요.',
    image: '/images/llm.png',
    category: 'INTERVIEW'
  },
  {
    id: 4,
    title: '당신을 기다리는\n최고의 기회들',
    excerpt: '외국인 노동자를 위한 최신 채용공고와 기업 정보를 실시간으로 업데이트하여 제공합니다.',
    image: '/images/employeer.png',
    category: 'JOB'
  }
];

const BlogSection: React.FC = () => {
  return (
    <BlogContainer id="blog">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        <span className="highlight" style={{ fontSize: '2.0rem', fontWeight: '600' }}>WE ARE</span><br />
        당신의 꿈을 현실로<br />
        <span className="highlight">만드는 동반자</span>
      </SectionTitle>
      <BlogGrid>
        {blogPosts.map((post, index) => (
          <BlogCard
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.1 * (index + 1) }}
            viewport={{ once: true }}
          >
            <BlogImage className="blog-image">
              <img src={post.image} alt={post.title} />
            </BlogImage>
            <BlogContent>
              <BlogHeader>
                <BlogCategory>{post.category}</BlogCategory>
              </BlogHeader>
              <BlogFooter>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              </BlogFooter>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogSection;
