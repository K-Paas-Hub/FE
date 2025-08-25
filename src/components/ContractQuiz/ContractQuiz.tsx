import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

const QuizContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
`;

const QuizContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const QuizTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const QuizSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.6;
`;

const QuizSection = styled.section`
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionIcon = styled.span`
  background: ${COLORS.primary};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const QuizCard = styled.div`
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    box-shadow: 0 4px 12px rgba(5, 150, 105, 0.1);
  }
`;

const QuestionNumber = styled.div`
  background: ${COLORS.primary};
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const QuestionText = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const OptionButton = styled.button<{ $isSelected: boolean; $isCorrect?: boolean; $showResult: boolean }>`
  background: ${props => {
    if (props.$showResult) {
      if (props.$isCorrect) return '#f0fdf4';
      if (props.$isSelected && !props.$isCorrect) return '#fef2f2';
      return '#f8f9fa';
    }
    return props.$isSelected ? '#ecfdf5' : 'white';
  }};
  border: 2px solid ${props => {
    if (props.$showResult) {
      if (props.$isCorrect) return '#10b981';
      if (props.$isSelected && !props.$isCorrect) return '#ef4444';
      return '#e5e7eb';
    }
    return props.$isSelected ? COLORS.primary : '#e5e7eb';
  }};
  color: ${props => {
    if (props.$showResult) {
      if (props.$isCorrect) return '#059669';
      if (props.$isSelected && !props.$isCorrect) return '#dc2626';
      return '#374151';
    }
    return props.$isSelected ? COLORS.primary : '#374151';
  }};
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-align: left;
  cursor: ${props => props.$showResult ? 'default' : 'pointer'};
  transition: all 0.3s ease;
  font-size: 1rem;
  line-height: 1.5;
  
  &:hover {
    ${props => !props.$showResult && `
      border-color: ${COLORS.primary};
      background: #ecfdf5;
    `}
  }
  
  &:disabled {
    cursor: default;
  }
`;

const ResultIcon = styled.span`
  margin-right: 0.5rem;
  font-weight: 700;
`;

const Explanation = styled.div<{ $isCorrect: boolean }>`
  background: ${props => props.$isCorrect ? '#f0fdf4' : '#fef2f2'};
  border: 1px solid ${props => props.$isCorrect ? '#10b981' : '#ef4444'};
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  color: ${props => props.$isCorrect ? '#059669' : '#dc2626'};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const QuizControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ControlButton = styled.button`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #10b981;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
  }
`;

const SecondaryButton = styled.button`
  background: white;
  color: ${COLORS.primary};
  border: 2px solid ${COLORS.primary};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.primary};
    color: white;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 2rem;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${COLORS.primary};
  width: ${props => props.$progress}%;
  transition: width 0.3s ease;
`;

const ScoreDisplay = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const ScoreText = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ScoreSubtext = styled.div`
  color: #6b7280;
  font-size: 1rem;
`;

const QuizData = [
  {
    id: 1,
    question: "근로계약서에서 근로시간을 '회사 내규에 따름'으로 기재하는 것은 적절한가요?",
    options: [
      "네, 적절합니다",
      "아니요, 구체적으로 명시해야 합니다",
      "상황에 따라 다릅니다",
      "법적 요건이 아니므로 생략 가능합니다"
    ],
    correctAnswer: 1,
    explanation: "근로시간은 구체적으로 명시해야 합니다. '회사 내규에 따름'과 같은 모호한 표현은 분쟁의 원인이 될 수 있으므로 피해야 합니다."
  },
  {
    id: 2,
    question: "연봉 3,000만원을 받는 근로자의 월급 구성으로 올바른 것은?",
    options: [
      "월 250만원 (연봉의 1/12)",
      "기본급 200만원 + 수당 50만원",
      "기본급 180만원 + 연장수당 40만원 + 식대 30만원",
      "모든 구성이 명시되어야 합니다"
    ],
    correctAnswer: 3,
    explanation: "연봉의 경우 기본급, 연장수당, 식대 등 월급의 세부 구성을 명시해야 합니다. 단순히 연봉의 1/12만으로는 부족합니다."
  },
  {
    id: 3,
    question: "근로계약서를 작성하지 않으면 어떤 처벌을 받나요?",
    options: [
      "경고만 받습니다",
      "500만원 이하의 벌금",
      "1,000만원 이하의 벌금",
      "처벌이 없습니다"
    ],
    correctAnswer: 1,
    explanation: "근로계약서를 서면으로 체결하지 않거나 근로자에게 교부하지 않은 경우 500만원 이하의 벌금이 부과됩니다."
  },
  {
    id: 4,
    question: "연장근로 시간의 법적 한도는?",
    options: [
      "주 8시간",
      "주 12시간",
      "주 16시간",
      "제한이 없습니다"
    ],
    correctAnswer: 1,
    explanation: "근로기준법 제53조에 따라 1주 간 12시간 초과 근무는 금지됩니다. 이를 초과하면 법 위반에 해당합니다."
  },
  {
    id: 5,
    question: "연차 유급휴가는 언제 부여되나요?",
    options: [
      "입사 즉시",
      "1년간 80% 이상 출근했을 경우",
      "6개월 근무 후",
      "회사 재량에 따라"
    ],
    correctAnswer: 1,
    explanation: "근로자는 1년간 80% 이상 출근했을 경우 15일의 연차 유급휴가를 받을 수 있습니다."
  }
];

const ContractQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(QuizData.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < QuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleShowResults = () => {
    setShowResults(true);
    setQuizCompleted(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(QuizData.length).fill(-1));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === QuizData[index].correctAnswer) {
        correct++;
      }
    });
    return { correct, total: QuizData.length, percentage: Math.round((correct / QuizData.length) * 100) };
  };

  const progress = ((currentQuestion + 1) / QuizData.length) * 100;
  const score = calculateScore();

  return (
    <QuizContainer>
      <MainHeader />
      
      <QuizContent>
        <QuizHeader>
          <QuizTitle>근로계약서 퀴즈</QuizTitle>
          <QuizSubtitle>
            근로계약서 작성에 대한 이해도를 테스트해보세요
          </QuizSubtitle>
        </QuizHeader>

        <QuizSection>
          <SectionTitle>
            <SectionIcon>🧠</SectionIcon>
            퀴즈 진행 상황
          </SectionTitle>
          
          <ProgressBar>
            <ProgressFill $progress={progress} />
          </ProgressBar>
          
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <strong>문제 {currentQuestion + 1} / {QuizData.length}</strong>
          </div>
        </QuizSection>

        <QuizCard>
          <QuestionNumber>{currentQuestion + 1}</QuestionNumber>
          <QuestionText>{QuizData[currentQuestion].question}</QuestionText>
          
          <OptionsList>
            {QuizData[currentQuestion].options.map((option, index) => (
              <OptionButton
                key={index}
                $isSelected={selectedAnswers[currentQuestion] === index}
                $isCorrect={index === QuizData[currentQuestion].correctAnswer}
                $showResult={showResults}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResults}
              >
                {showResults && (
                  <ResultIcon>
                    {index === QuizData[currentQuestion].correctAnswer ? '✅' : 
                     selectedAnswers[currentQuestion] === index ? '❌' : ''}
                  </ResultIcon>
                )}
                {option}
              </OptionButton>
            ))}
          </OptionsList>

          {showResults && (
            <Explanation $isCorrect={selectedAnswers[currentQuestion] === QuizData[currentQuestion].correctAnswer}>
              <strong>설명:</strong> {QuizData[currentQuestion].explanation}
            </Explanation>
          )}
        </QuizCard>

        <QuizControls>
          <SecondaryButton 
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            이전 문제
          </SecondaryButton>

          {currentQuestion < QuizData.length - 1 ? (
            <ControlButton 
              onClick={handleNextQuestion}
              disabled={selectedAnswers[currentQuestion] === -1}
            >
              다음 문제
            </ControlButton>
          ) : (
            <ControlButton 
              onClick={handleShowResults}
              disabled={selectedAnswers[currentQuestion] === -1}
            >
              결과 보기
            </ControlButton>
          )}
        </QuizControls>

        {quizCompleted && (
          <QuizSection>
            <SectionTitle>
              <SectionIcon>🏆</SectionIcon>
              퀴즈 결과
            </SectionTitle>
            
            <ScoreDisplay>
              <ScoreText>
                점수: {score.correct} / {score.total} ({score.percentage}점)
              </ScoreText>
              <ScoreSubtext>
                {score.percentage >= 80 ? '🎉 훌륭합니다! 근로계약서에 대한 이해도가 높습니다.' :
                 score.percentage >= 60 ? '👍 잘했습니다! 조금 더 공부하면 완벽할 것 같습니다.' :
                 '📚 더 공부가 필요합니다. 근로계약서 가이드를 다시 한번 확인해보세요.'}
              </ScoreSubtext>
            </ScoreDisplay>

            <div style={{ textAlign: 'center' }}>
              <SecondaryButton onClick={handleRestartQuiz}>
                퀴즈 다시 풀기
              </SecondaryButton>
            </div>
          </QuizSection>
        )}
      </QuizContent>
      
      <MainFooter />
    </QuizContainer>
  );
};

export default ContractQuiz;
