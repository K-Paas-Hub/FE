import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { formData } = useResumeForm();
  const { hasResumeData } = useSpellCheck();

  return (
    <SpellCheckContainer>
      <MainHeader />
      
      <SpellCheckContent>
        {!hasResumeData(formData) ? (
          <NoDataMessage>
            <NoDataTitle>{t('spellCheck.noDataTitle')}</NoDataTitle>
            <NoDataText>
              {t('spellCheck.noDataText')}
              <br />
              <a 
                href="/resume" 
                style={{ 
                  color: COLORS.primary, 
                  textDecoration: 'underline',
                  fontWeight: '600'
                }}
              >
                {t('spellCheck.createResumeLink')}
              </a>
            </NoDataText>
          </NoDataMessage>
        ) : (
          <>
            <SpellCheckSection>
              <SectionTitle>
                <SectionIcon>📝</SectionIcon>
                {t('spellCheck.resumeContent')}
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
