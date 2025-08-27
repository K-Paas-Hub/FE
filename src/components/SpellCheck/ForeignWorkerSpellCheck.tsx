import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import { SpellCheckError, ResumeSpellCheckResult } from '../../types/spellCheck';
import { COLORS, ANIMATIONS } from '../../constants';
import {
  Container,
  ContentArea,
  LoadingContainer,
  LoadingText,
  InputSection,
  SectionTitle,
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
  LargeCheckIcon,
  CheckIcon,
  Legend,
  LegendDot,
  SuccessMessage,
  SavedResumeMessage,
  ApplyErrorButton,
  CompleteButton,
} from '../../styles/components/ForeignWorkerSpellCheck.styles';
import { storage } from '../../utils';
import { ResumeFormData } from '../../types/resume';

// 컴포넌트 Props 인터페이스 정의
interface ForeignWorkerSpellCheckProps {
  onComplete?: (result: ResumeSpellCheckResult) => void;
  onError?: (error: string) => void;
  initialText?: string;
  autoCheck?: boolean;
}

const ForeignWorkerSpellCheck: React.FC<ForeignWorkerSpellCheckProps> = ({
  onComplete,
  onError,
  initialText,
  autoCheck = false
}) => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [errors, setErrors] = useState<SpellCheckError[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResumeData, setHasResumeData] = useState(false);
  
  const { checkForeignWorkerSpelling } = useSpellCheck();

  // 컴포넌트 마운트 시 저장된 이력서 데이터 불러오기
  useEffect(() => {
    loadResumeData();
  }, []);

  // 자동 검사 옵션
  useEffect(() => {
    if (autoCheck && text.trim() && !isChecking) {
      handleCheck();
    }
  }, [autoCheck, text]);

  // 저장된 이력서 데이터 불러오기
  const loadResumeData = () => {
    try {
      setIsLoading(true);
      
      // 초기 텍스트가 있으면 우선 사용
      if (initialText) {
        setText(initialText);
        setCorrectedText(initialText);
        setHasResumeData(false);
        return;
      }
      
      // localStorage에서 이력서 데이터 가져오기
      const resumeData = storage.get('resume_draft') as ResumeFormData | null;
      
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
      onError?.(t('spellCheck.loadResumeDataError'));
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

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleCheck();
    }
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
        onComplete?.(response.data);
      } else {
        console.error('맞춤법 검사 실패:', response.error);
        onError?.(response.error || '맞춤법 검사에 실패했습니다.');
      }
    } catch (error) {
      console.error('맞춤법 검사 중 오류 발생:', error);
      onError?.('맞춤법 검사 중 오류가 발생했습니다.');
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
  const handleApplyError = (error: SpellCheckError) => {
    const newText = text.replace(error.word, error.suggestion);
    setText(newText);
    setCorrectedText(newText);
    
    // 해당 에러를 목록에서 제거
    setErrors(prev => prev.filter(e => e !== error));
  };

  // 접근성을 위한 키보드 이벤트 핸들러
  const handleApplyErrorKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>, error: SpellCheckError) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleApplyError(error);
    }
  };

  const handleApplyAllKeyPress = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleApplyAll();
    }
  };

  // 전체 복사
  const handleCopyAll = () => {
    navigator.clipboard.writeText(text);
  };

  // 다시쓰기
  const handleRewrite = () => {
    setText('');
    setCorrectedText('');
    setErrors([]);
    setIsComplete(false);
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: ANIMATIONS.duration.normal }}
          >
            <LoadingSpinner />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATIONS.duration.normal, delay: 0.2 }}
          >
            <LoadingText>{t('spellCheck.loadingResumeData')}</LoadingText>
          </motion.div>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <ContentArea>
        <InputSection>
          <SectionTitle>내용 입력</SectionTitle>
          
          <AnimatePresence>
            {hasResumeData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: ANIMATIONS.duration.normal }}
              >
                <SavedResumeMessage>
                  {t('spellCheck.savedResumeMessage')}
                </SavedResumeMessage>
              </motion.div>
            )}
          </AnimatePresence>
          
          <TextArea
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="검사할 텍스트를 입력하세요... (Ctrl+Enter로 검사)"
            rows={10}
            aria-label="맞춤법 검사할 텍스트 입력"
            aria-describedby="text-help"
          />
          <div id="text-help" style={{ fontSize: '0.9rem', color: '#1a1a1a', marginTop: '0.5rem', fontWeight: '500' }}>
            Ctrl+Enter를 눌러 빠르게 검사할 수 있습니다.
          </div>
          
          <ButtonContainer>
            <PrimaryButton
              onClick={handleCheck}
              disabled={isChecking || !text.trim()}
              aria-label="맞춤법 검사 시작"
              aria-describedby={isChecking ? "checking-status" : undefined}
            >
              {isChecking ? (
                <>
                  <LoadingSpinner />
                  <span id="checking-status">검사 중...</span>
                </>
              ) : (
                <>
                  <Icon>✏️</Icon>
                  맞춤법 검사
                </>
              )}
            </PrimaryButton>
            
            <SecondaryButton 
              onClick={handleRewrite}
              aria-label="텍스트 다시쓰기"
            >
              <Icon>🔄</Icon>
              다시쓰기
            </SecondaryButton>
            
            <SecondaryButton 
              onClick={handleCopyAll}
              aria-label="전체 텍스트 복사"
            >
              <Icon>📋</Icon>
              전체 복사
            </SecondaryButton>
          </ButtonContainer>
        </InputSection>

        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: ANIMATIONS.duration.normal }}
            >
              <ResultSection>
                <ResultHeader>
                  <SectionTitle style={{ color: 'white', margin: 0 }}>맞춤법 검사</SectionTitle>
                  {errors.length > 0 && (
                    <ApplyAllButton 
                      onClick={handleApplyAll}
                      onKeyPress={handleApplyAllKeyPress}
                      tabIndex={0}
                      role="button"
                      aria-label="모든 수정사항 적용"
                    >
                      모두수정
                    </ApplyAllButton>
                  )}
                </ResultHeader>
                
                <ResultContent>
                  {errors.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: ANIMATIONS.duration.normal }}
                    >
                      <EmptyState>
                        <LargeCheckIcon>✓</LargeCheckIcon>
                        <SuccessMessage>맞춤법 오류가 없습니다!</SuccessMessage>
                      </EmptyState>
                    </motion.div>
                  ) : (
                    <>
                      <ErrorList>
                        <AnimatePresence>
                          {errors.map((error, index) => (
                            <motion.div
                              key={error.id || index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ 
                                duration: ANIMATIONS.duration.normal,
                                delay: index * 0.1 
                              }}
                            >
                              <ErrorItem>
                                <ErrorText>
                                  <span className="error-text">{error.word}</span>
                                  <span className="arrow">→</span>
                                  <span className="suggestion">{error.suggestion}</span>
                                </ErrorText>
                                <ApplyErrorButton
                                  onClick={() => handleApplyError(error)}
                                  onKeyPress={(e) => handleApplyErrorKeyPress(e, error)}
                                  tabIndex={0}
                                  role="button"
                                  aria-label={`"${error.word}"을 "${error.suggestion}"로 수정`}
                                >
                                  적용
                                </ApplyErrorButton>
                              </ErrorItem>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </ErrorList>
                    </>
                  )}
                  
                  <CompleteButton
                    onClick={() => setIsComplete(false)}
                    aria-label="검사 완료"
                  >
                    <CheckIcon>✓</CheckIcon>
                    검사완료
                  </CompleteButton>
                </ResultContent>
              </ResultSection>
            </motion.div>
          )}
        </AnimatePresence>
      </ContentArea>
    </Container>
  );
};

export default ForeignWorkerSpellCheck;
