import React from 'react';
import { motion } from 'framer-motion';
import { ANIMATIONS } from '../../constants';
import {
  BlogContainer,
  BlogGrid,
  BlogImage,
  BlogContent,
  BlogHeader,
  BlogCategory,
  BlogFooter,
  BlogTitle,
  BlogExcerpt,
  SectionTitle,
  BlogCard
} from '../../styles/components/BlogSection.styles';

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
    <BlogContainer id="page">
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
