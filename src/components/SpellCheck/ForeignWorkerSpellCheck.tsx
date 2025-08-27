import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
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
  DropdownIcon,
  EmptyState,
  CompleteButton,
  CheckIcon,
  Legend,
  LegendDot,
} from '../../styles/components/ForeignWorkerSpellCheck.styles';

import { storage } from '../../utils';

const ForeignWorkerSpellCheck: React.FC = () => {
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
        setText('안녕하세요. 저는 외국인 근로자입니다. 한국에서 일하고 싶습니다.');
        setCorrectedText('안녕하세요. 저는 외국인 근로자입니다. 한국에서 일하고 싶습니다.');
        setHasResumeData(false);
      }
    } catch (error) {
      console.error('이력서 데이터 불러오기 실패:', error);
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
        
        // 수정된 텍스트 생성
        let newText = text;
        allErrors.forEach((error: any) => {
          const { word } = error;
          newText = newText.replace(new RegExp(word, 'g'), error.suggestion);
        });
        setCorrectedText(newText);
        setIsComplete(true);
      }
    } catch (error) {
      console.error('맞춤법 검사 오류:', error);
    } finally {
      setIsChecking(false);
    }
  };

  // 자기소개서 불러오기
  const handleLoadResume = () => {
    try {
      const resumeData = storage.get('resume_draft');
      
      if (resumeData && resumeData.introduction && resumeData.introduction.trim()) {
        setText(resumeData.introduction);
        setCorrectedText(resumeData.introduction);
        setHasResumeData(true);
      }
    } catch (error) {
      console.error('자기소개서 불러오기 실패:', error);
    }
  };

  // handleReload 함수 제거 - 사용되지 않음

  // 전체 복사
  const handleCopyAll = () => {
    navigator.clipboard.writeText(correctedText);
    // 사용자에게 복사 완료 알림
    alert('수정된 내용이 클립보드에 복사되었습니다. 이력서에 붙여넣기 하세요.');
  };

  // 모두 수정 (텍스트 영역에만 적용, 저장하지 않음)
  const handleApplyAll = () => {
    setText(correctedText);
  };

  // 검사완료 상태가 변경될 때 자동 사라짐 타이머 설정
  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setIsComplete(false);
      }, 2000); // 2초 후 자동 사라짐

      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>이력서 데이터를 불러오는 중...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <TopBar>
        <TopBarTitle>내용 입력</TopBarTitle>
        <TopBarTitle>맞춤법 검사</TopBarTitle>
      </TopBar>
      
      <ContentArea>
        {/* 왼쪽: 내용 입력 */}
        <InputSection>
          <TextArea
            value={text}
            onChange={handleTextChange}
            placeholder={
              hasResumeData 
                ? "저장된 자기소개서 내용입니다. 수정 후 검사하세요."
                : "자기소개서 내용을 입력하거나 수정하세요."
            }
          />
          <ButtonContainer>
            <SecondaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoadResume}
            >
              <Icon>📁</Icon>
              불러오기
            </SecondaryButton>

            <SecondaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyAll}
              disabled={!correctedText.trim()}
            >
              <Icon>📄</Icon>
              전체 복사
            </SecondaryButton>
            <PrimaryButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
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
                  <Icon>🔍</Icon>
                  맞춤법 검사
                </>
              )}
            </PrimaryButton>
          </ButtonContainer>
        </InputSection>

        {/* 오른쪽: 맞춤법 검사 */}
        <ResultSection>
        {errors.length > 0 && (
          <ResultHeader>
            <ApplyAllButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApplyAll}
            >
              모두 수정
            </ApplyAllButton>
          </ResultHeader>
        )}
        
        <ResultContent>
          {errors.length > 0 ? (
            <ErrorList>
              {errors.map((error: any, index: number) => (
                <ErrorItem
                  key={index}
                  as={motion.div}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ErrorText>
                    <span className="error-text">{error.word}</span>
                    <span className="arrow">→</span>
                    <span className="suggestion">{error.suggestion}</span>
                  </ErrorText>
                  <DropdownIcon>▼</DropdownIcon>
                </ErrorItem>
              ))}
            </ErrorList>
          ) : (
            <EmptyState>
              {isChecking ? (
                <LoadingContainer>
                  <LoadingSpinner />
                  검사 중...
                </LoadingContainer>
              ) : isComplete && errors.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  color: '#10b981', 
                  fontWeight: '500',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%'
                }}>
                  ✓ 맞춤법 검사 완료 - 오류가 발견되지 않았습니다
                </div>
              ) : null}
            </EmptyState>
          )}
          
          {isComplete && errors.length > 0 && (
            <CompleteButton
              as={motion.button}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CheckIcon>✓</CheckIcon>
              검사완료
            </CompleteButton>
          )}
        </ResultContent>
        

        
        <Legend>
          <LegendDot />
          맞춤법
        </Legend>
      </ResultSection>
      </ContentArea>
    </Container>
  );
};

export default ForeignWorkerSpellCheck;
