import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../../constants';
import { useSpellCheck } from '../../hooks/useSpellCheck';

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
        setText('');
        setCorrectedText('');
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

  // 다시 불러오기 (저장된 이력서 데이터로)
  const handleReload = () => {
    loadResumeData();
    setErrors([]);
    setIsComplete(false);
  };

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
      {/* 왼쪽: 내용 입력 */}
      <InputSection>
        <InputTitle>
          자기소개서 내용
          {hasResumeData && (
            <DataStatus>
              <StatusDot />
              저장된 이력서에서 불러옴
            </DataStatus>
          )}
        </InputTitle>
        <TextArea
          value={text}
          onChange={handleTextChange}
          placeholder={
            hasResumeData 
              ? "저장된 자기소개서 내용입니다. 수정 후 검사하세요."
              : "저장된 이력서가 없습니다. 직접 입력하거나 이력서를 먼저 작성해주세요."
          }
          disabled={!hasResumeData && !text.trim()}
        />
        <ButtonContainer>
          <SecondaryButton
            as={motion.button}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReload}
          >
            <Icon>↻</Icon>
            다시 불러오기
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
              '맞춤법 검사'
            )}
          </PrimaryButton>
        </ButtonContainer>
      </InputSection>

      {/* 오른쪽: 맞춤법 검사 */}
      <ResultSection>
        <ResultHeader>
          <ResultTitle>맞춤법 검사</ResultTitle>
          {errors.length > 0 && (
            <ApplyAllButton
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApplyAll}
            >
              모두 수정
            </ApplyAllButton>
          )}
        </ResultHeader>
        
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
              ) : null}
            </EmptyState>
          )}
          
          {isComplete && (
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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 600px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 1rem;
`;

const InputSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLORS.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DataStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${COLORS.primary};
  font-weight: 400;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${COLORS.primary};
  border-radius: 50%;
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 400px;
  padding: 1rem;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.6;
  resize: vertical;
  background: white;
  color: ${COLORS.background};
  
  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
  
  &:disabled {
    background: ${COLORS.background};
    color: ${COLORS.textSecondary};
    cursor: not-allowed;
  }
  
  &::placeholder {
    color: ${COLORS.textSecondary};
  }
  
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 프로젝트 일관성을 위한 버튼 스타일
const buttonBase = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;
  min-width: 44px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
  }
`;

const PrimaryButton = styled.button`
  ${buttonBase}
  background: ${COLORS.primary};
  color: white;
  box-shadow: 0 2px 4px rgba(74, 222, 128, 0.2);
  
  &:hover:not(:disabled) {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(74, 222, 128, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  ${buttonBase}
  background: white;
  color: ${COLORS.background};
  border: 1px solid ${COLORS.border};
  
  &:hover:not(:disabled) {
    background: ${COLORS.background};
    border-color: ${COLORS.primary};
    color: ${COLORS.primary};
  }
`;

const Icon = styled.span`
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid ${COLORS.border};
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${COLORS.background};
  color: white;
`;

const ResultTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const ApplyAllButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${COLORS.primary};
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
  }
`;

const ResultContent = styled.div`
  flex: 1;
  padding: 1rem;
  background: white;
  position: relative;
  color: ${COLORS.background};
`;

const ErrorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ErrorItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border: 1px solid ${COLORS.border};
  border-radius: 6px;
  background: rgba(74, 222, 128, 0.05);
  border-left: 3px solid ${COLORS.primary};
`;

const ErrorText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  
  .error-text {
    color: ${COLORS.error};
    font-weight: 500;
    background: rgba(239, 68, 68, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
  
  .arrow {
    color: ${COLORS.textSecondary};
    font-weight: bold;
  }
  
  .suggestion {
    color: ${COLORS.primary};
    font-weight: 500;
    background: rgba(74, 222, 128, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const DropdownIcon = styled.span`
  color: ${COLORS.textSecondary};
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: ${COLORS.textSecondary};
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5;
`;

const CompleteButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: ${COLORS.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(74, 222, 128, 0.3);
  
  &:hover {
    background: ${COLORS.primaryHover};
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.4);
  }
`;

const CheckIcon = styled.span`
  font-size: 1rem;
`;



const Legend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: ${COLORS.background};
  font-size: 0.8rem;
  color: ${COLORS.textSecondary};
`;

const LegendDot = styled.div`
  width: 8px;
  height: 8px;
  background: ${COLORS.primary};
  border-radius: 50%;
`;

export default ForeignWorkerSpellCheck;
