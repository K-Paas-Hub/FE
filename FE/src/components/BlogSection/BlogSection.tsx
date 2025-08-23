import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

const BlogContainer = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 3rem;
  
  .highlight {
    color: ${COLORS.primary};
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BlogCard = styled(motion.article)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, ${COLORS.primary}20, ${COLORS.primaryHover}20);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogDate = styled.div`
  color: ${COLORS.primary};
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.4;
`;

const BlogExcerpt = styled.p`
  color: #cccccc;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReadMoreButton = styled.button`
  background: transparent;
  color: ${COLORS.primary};
  border: 1px solid ${COLORS.primary};
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.primary};
    color: #1a1a1a;
  }
`;

interface BlogPost {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  icon: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    date: '2024.01.15',
    title: '2024년 채용 트렌드 분석',
    excerpt: 'AI 기술의 발전과 함께 변화하는 채용 시장의 새로운 트렌드를 분석해보겠습니다.',
    icon: '📊'
  },
  {
    id: 2,
    date: '2024.01.10',
    title: '성공적인 이력서 작성법',
    excerpt: '기업에서 주목하는 이력서 작성 팁과 주의사항을 알아보세요.',
    icon: '📝'
  },
  {
    id: 3,
    date: '2024.01.05',
    title: '원격 근무 시대의 채용',
    excerpt: '코로나 이후 변화된 근무 환경에 맞는 새로운 채용 전략을 소개합니다.',
    icon: '🏠'
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
        최신 <span className="highlight">블로그</span>
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
            <BlogImage>{post.icon}</BlogImage>
            <BlogContent>
              <BlogDate>{post.date}</BlogDate>
              <BlogTitle>{post.title}</BlogTitle>
              <BlogExcerpt>{post.excerpt}</BlogExcerpt>
              <ReadMoreButton>더 보기 →</ReadMoreButton>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogContainer>
  );
};

export default BlogSection;
