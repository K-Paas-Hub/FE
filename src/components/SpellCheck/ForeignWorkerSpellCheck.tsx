import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import {
  Container,
  TopBar,
  TopBarTitle,
  ContentArea,
  LoadingContainer,
  LoadingText,
  InputSection,
  TextArea,
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
  Icon,
  LoadingSpinner,
  ResultSection,
  ResultHeader,
  ApplyAllButton,
  ResultContent,
  ErrorList,
  ErrorItem,
  ErrorText,
  EmptyState,
  CheckIcon,
  Legend,
  LegendDot,
  SuccessMessage,
} from '../../styles/components/ForeignWorkerSpellCheck.styles';

import { storage } from '../../utils';

const ForeignWorkerSpellCheck: React.FC = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [errors, setErrors] = useState<any[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResumeData, setHasResumeData] = useState(false);
  
  const { checkForeignWorkerSpelling } = useSpellCheck();

  // 컴포넌트 마운트 시 저장된 이력서 데이터 불러오기
  useEffect(() => {
    loadResumeData();
  }, []);

  // 저장된 이력서 데이터 불러오기
  const loadResumeData = () => {
    try {
      setIsLoading(true);
      
      // localStorage에서 이력서 데이터 가져오기
      const resumeData = storage.get('resume_draft');
      
      if (resumeData && resumeData.introduction && resumeData.introduction.trim()) {
        setText(resumeData.introduction);
        setCorrectedText(resumeData.introduction);
        setHasResumeData(true);
      } else {
        // 이력서가 없으면 기본 텍스트 설정
        setText(t('spellCheck.defaultIntroduction'));
        setCorrectedText(t('spellCheck.defaultIntroduction'));
        setHasResumeData(false);
      }
    } catch (error) {
      console.error(t('spellCheck.loadResumeDataError'), error);
      setHasResumeData(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 텍스트 변경 핸들러 (수동 편집용)
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCorrectedText(newText);
    setErrors([]);
    setIsComplete(false);
  };



  // 맞춤법 검사 실행
  const handleCheck = async () => {
    if (!text.trim()) return;
    
    setIsChecking(true);
    try {
      const response = await checkForeignWorkerSpelling(text);
      if (response.success && response.data) {
        const allErrors = response.data.generalErrors || [];
        setErrors(allErrors);
        
        // 수정된 텍스트 설정
        if (response.data.correctedText) {
          setCorrectedText(response.data.correctedText);
        }
        
        setIsComplete(true);
      } else {
        console.error('맞춤법 검사 실패:', response.error);
      }
    } catch (error) {
      console.error('맞춤법 검사 중 오류 발생:', error);
    } finally {
      setIsChecking(false);
    }
  };

  // 모든 수정사항 적용
  const handleApplyAll = () => {
    setText(correctedText);
    setErrors([]);
    setIsComplete(false);
  };

  // 개별 수정사항 적용
  const handleApplyError = (error: any) => {
    const newText = text.replace(error.word, error.suggestion);
    setText(newText);
    setCorrectedText(newText);
    
    // 해당 에러를 목록에서 제거
    setErrors(prev => prev.filter(e => e !== error));
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>{t('spellCheck.loadingResumeData')}</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <TopBar>
        <TopBarTitle>외국인 근로자 맞춤법 검사</TopBarTitle>
      </TopBar>
      
      <ContentArea>
        <InputSection>
          {hasResumeData && (
            <div style={{ 
              background: '#e8f5e8', 
              padding: '10px', 
              borderRadius: '8px', 
              marginBottom: '15px',
              fontSize: '14px',
              color: '#2d5a2d'
            }}>
              {t('spellCheck.savedResumeMessage')}
            </div>
          )}
          
          <TextArea
            value={text}
            onChange={handleTextChange}
            placeholder="검사할 텍스트를 입력하세요..."
            rows={10}
          />
          
          <ButtonContainer>
            <PrimaryButton
              onClick={handleCheck}
              disabled={isChecking || !text.trim()}
            >
              {isChecking ? (
                <>
                  <LoadingSpinner />
                  검사 중...
                </>
              ) : (
                <>
                  <Icon>✏️</Icon>
                  맞춤법 검사
                </>
              )}
            </PrimaryButton>
            
            <SecondaryButton onClick={loadResumeData}>
              <Icon>🔄</Icon>
              새로고침
            </SecondaryButton>
          </ButtonContainer>
        </InputSection>

        {isComplete && (
          <ResultSection>
            <ResultHeader>
              <h3>검사 결과</h3>
              {errors.length > 0 && (
                <ApplyAllButton onClick={handleApplyAll}>
                  <CheckIcon>✓</CheckIcon>
                  모든 수정사항 적용
                </ApplyAllButton>
              )}
            </ResultHeader>
            
            <ResultContent>
              {errors.length === 0 ? (
                <EmptyState>
                  <CheckIcon>✓</CheckIcon>
                  <p>맞춤법 오류가 없습니다!</p>
                </EmptyState>
              ) : (
                <>
                  <Legend>
                    <LegendDot style={{ background: '#ff6b6b' }} />
                    <span>맞춤법 오류</span>
                    <LegendDot style={{ background: '#4ecdc4' }} />
                    <span>문법 오류</span>
                  </Legend>
                  
                  <ErrorList>
                    {errors.map((error, index) => (
                      <ErrorItem key={index}>
                        <ErrorText>
                          <strong>"{error.word}"</strong> → <strong>"{error.suggestion}"</strong>
                          <br />
                          <small>{error.description}</small>
                        </ErrorText>
                        <button 
                          onClick={() => handleApplyError(error)}
                          style={{
                            background: '#4ecdc4',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          적용
                        </button>
                      </ErrorItem>
                    ))}
                  </ErrorList>
                  
                  <SuccessMessage>
                    <CheckIcon>✓</CheckIcon>
                    <p>검사가 완료되었습니다!</p>
                  </SuccessMessage>
                </>
              )}
            </ResultContent>
          </ResultSection>
        )}
      </ContentArea>
    </Container>
  );
};

export default ForeignWorkerSpellCheck;
