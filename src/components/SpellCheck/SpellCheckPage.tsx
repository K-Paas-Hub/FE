import React from 'react';
import { useResumeForm } from '../../hooks/useResumeForm';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import { MainHeader, MainFooter } from '../';
import TextSection from './TextSection';
import { COLORS } from '../../constants';
import {
  SpellCheckContainer,
  SpellCheckContent,
  SpellCheckSection,
  SectionTitle,
  SectionIcon,
  NoDataMessage,
  NoDataTitle,
  NoDataText
} from '../../styles/components/SpellCheckPage.styles';



const SpellCheckPage: React.FC = () => {
  const { formData } = useResumeForm();
  const { hasResumeData } = useSpellCheck();

  return (
    <SpellCheckContainer>
      <MainHeader />
      
      <SpellCheckContent>
        {!hasResumeData(formData) ? (
          <NoDataMessage>
            <NoDataTitle>이력서 데이터가 없습니다</NoDataTitle>
            <NoDataText>
              맞춤법 검사를 하려면 먼저 이력서를 작성해주세요.
              <br />
              <a 
                href="/resume" 
                style={{ 
                  color: COLORS.primary, 
                  textDecoration: 'underline',
                  fontWeight: '600'
                }}
              >
                이력서 작성하기 →
              </a>
            </NoDataText>
          </NoDataMessage>
        ) : (
          <>
            <SpellCheckSection>
              <SectionTitle>
                <SectionIcon>📝</SectionIcon>
                이력서 내용
              </SectionTitle>
              
              <TextSection formData={formData} />
            </SpellCheckSection>


          </>
        )}
      </SpellCheckContent>
      
      <MainFooter />
    </SpellCheckContainer>
  );
};

export default SpellCheckPage;
