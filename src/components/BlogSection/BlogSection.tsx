import React from 'react';
import { useTranslation } from 'react-i18next';
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

const BlogSection: React.FC = () => {
  const { t } = useTranslation();
  
  const blogPosts: BlogPost[] = t('blogSection.posts', { returnObjects: true }) as BlogPost[];

  return (
    <BlogContainer id="page">
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATIONS.duration.slow }}
        viewport={{ once: true }}
      >
        <span className="highlight" style={{ fontSize: '2.0rem', fontWeight: '600' }}>{t('blogSection.title.weAre')}</span><br />
        {t('blogSection.title.dreamReality')}<br />
        <span className="highlight">{t('blogSection.title.partner')}</span>
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
