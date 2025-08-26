import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';

import {
  QuizContainer,
  QuizContent,
  QuizHeader,
  QuizTitle,
  QuizSection,
  QuizProgress,
  ProgressBar,
  ProgressFill,
  ProgressText,
  QuestionCard,
  QuestionNumber,
  QuestionText,
  OptionsContainer,
  OptionButton,
  OptionText,
  NavigationButtons,
  NavButton,
  ResultSection,
  ResultCard,
  ResultTitle,
  ResultScore,
  ResultMessage,
  ResultDetails,
  DetailItem,
  DetailLabel,
  DetailValue,
  RestartButton,
  QuizInfo,
  InfoText
} from '../../styles/components/ContractQuiz.styles';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  timeSpent: number;
  categoryScores: Record<string, { correct: number; total: number }>;
}

const ContractQuiz: React.FC = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);

  // 퀴즈 문제 데이터
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: t('contractQuiz.questions.q1.question'),
      options: t('contractQuiz.questions.q1.options', { returnObjects: true }) as string[],
      correctAnswer: 0,
      explanation: t('contractQuiz.questions.q1.explanation'),
      category: 'workConditions'
    },
    {
      id: 2,
      question: t('contractQuiz.questions.q2.question'),
      options: t('contractQuiz.questions.q2.options', { returnObjects: true }) as string[],
      correctAnswer: 2,
      explanation: t('contractQuiz.questions.q2.explanation'),
      category: 'salary'
    },
    {
      id: 3,
      question: t('contractQuiz.questions.q3.question'),
      options: t('contractQuiz.questions.q3.options', { returnObjects: true }) as string[],
      correctAnswer: 1,
      explanation: t('contractQuiz.questions.q3.explanation'),
      category: 'workHours'
    },
    {
      id: 4,
      question: t('contractQuiz.questions.q4.question'),
      options: t('contractQuiz.questions.q4.options', { returnObjects: true }) as string[],
      correctAnswer: 3,
      explanation: t('contractQuiz.questions.q4.explanation'),
      category: 'laborLaw'
    },
    {
      id: 5,
      question: t('contractQuiz.questions.q5.question'),
      options: t('contractQuiz.questions.q5.options', { returnObjects: true }) as string[],
      correctAnswer: 1,
      explanation: t('contractQuiz.questions.q5.explanation'),
      category: 'contractPeriod'
    },
    {
      id: 6,
      question: t('contractQuiz.questions.q6.question'),
      options: t('contractQuiz.questions.q6.options', { returnObjects: true }) as string[],
      correctAnswer: 0,
      explanation: t('contractQuiz.questions.q6.explanation'),
      category: 'annualLeave'
    },
    {
      id: 7,
      question: t('contractQuiz.questions.q7.question'),
      options: t('contractQuiz.questions.q7.options', { returnObjects: true }) as string[],
      correctAnswer: 2,
      explanation: t('contractQuiz.questions.q7.explanation'),
      category: 'overtime'
    }
  ];

  // 퀴즈 시작
  const startQuiz = () => {
    setStartTime(new Date());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setTimeSpent(0);
  };

  // 답변 선택
  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  // 다음 문제로
  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // 이전 문제로
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // 퀴즈 완료
  const finishQuiz = () => {
    if (startTime) {
      const endTime = new Date();
      const timeDiff = endTime.getTime() - startTime.getTime();
      setTimeSpent(Math.round(timeDiff / 1000));
    }
    setShowResult(true);
  };

  // 결과 계산
  const calculateResult = (): QuizResult => {
    let correctAnswers = 0;
    const categoryScores: Record<string, { correct: number; total: number }> = {};

    quizQuestions.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correctAnswers++;
      }

      // 카테고리별 점수 계산
      if (!categoryScores[question.category]) {
        categoryScores[question.category] = { correct: 0, total: 0 };
      }
      categoryScores[question.category].total++;
      if (isCorrect) {
        categoryScores[question.category].correct++;
      }
    });

    const score = Math.round((correctAnswers / quizQuestions.length) * 100);

    return {
      totalQuestions: quizQuestions.length,
      correctAnswers,
      score,
      timeSpent,
      categoryScores
    };
  };

  // 진행률 계산
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  // 현재 문제
  const currentQ = quizQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  // 결과 데이터
  const result = showResult ? calculateResult() : null;

  // 퀴즈 시작 전 화면
  if (!startTime && !showResult) {
    return (
      <QuizContainer>
        <MainHeader />
        <QuizContent>
          <QuizSection>
            <QuizInfo>
              <InfoText>{t('contractQuiz.instructions')}</InfoText>
              <InfoText>{t('contractQuiz.totalQuestions', { count: quizQuestions.length })}</InfoText>
            </QuizInfo>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <NavButton onClick={startQuiz}>
                {t('contractQuiz.startButton')}
              </NavButton>
            </div>
          </QuizSection>
        </QuizContent>
        <MainFooter />
      </QuizContainer>
    );
  }

  // 결과 화면
  if (showResult && result) {
    return (
      <QuizContainer>
        <MainHeader />
        <QuizContent>
                  <QuizHeader>
          <QuizTitle>{t('contractQuiz.results.title')}</QuizTitle>
        </QuizHeader>

          <ResultSection>
            <ResultCard>
              <ResultTitle>{t('contractQuiz.results.score')}</ResultTitle>
              <ResultScore $score={result.score}>
                {result.score}점
              </ResultScore>
              <ResultMessage $score={result.score}>
                {result.score >= 80 && t('contractQuiz.results.excellent')}
                {result.score >= 60 && result.score < 80 && t('contractQuiz.results.good')}
                {result.score >= 40 && result.score < 60 && t('contractQuiz.results.fair')}
                {result.score < 40 && t('contractQuiz.results.needsImprovement')}
              </ResultMessage>

              <ResultDetails>
                <DetailItem>
                  <DetailLabel>{t('contractQuiz.results.correctAnswers')}</DetailLabel>
                  <DetailValue>{result.correctAnswers} / {result.totalQuestions}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>{t('contractQuiz.results.timeSpent')}</DetailLabel>
                  <DetailValue>{Math.floor(result.timeSpent / 60)}분 {result.timeSpent % 60}초</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>{t('contractQuiz.results.accuracy')}</DetailLabel>
                  <DetailValue>{Math.round((result.correctAnswers / result.totalQuestions) * 100)}%</DetailValue>
                </DetailItem>
              </ResultDetails>

              <RestartButton onClick={startQuiz}>
                {t('contractQuiz.results.restartButton')}
              </RestartButton>
            </ResultCard>
          </ResultSection>
        </QuizContent>
        <MainFooter />
      </QuizContainer>
    );
  }

  // 퀴즈 진행 화면
  return (
    <QuizContainer>
      <MainHeader />
      <QuizContent>
        <QuizHeader>
          <QuizTitle>{t('contractQuiz.title')}</QuizTitle>
        </QuizHeader>

        <QuizSection>
          <QuizProgress>
            <ProgressText>
              {t('contractQuiz.progress', { current: currentQuestion + 1, total: quizQuestions.length })}
            </ProgressText>
            <ProgressBar>
              <ProgressFill $progress={progress} />
            </ProgressBar>
          </QuizProgress>

          <QuestionCard>
            <QuestionNumber>
              {t('contractQuiz.questionNumber', { number: currentQuestion + 1 })}
            </QuestionNumber>
            <QuestionText>{currentQ.question}</QuestionText>

            <OptionsContainer>
              {currentQ.options.map((option, index) => (
                <OptionButton
                  key={index}
                  $selected={selectedAnswer === index}
                  onClick={() => selectAnswer(index)}
                >
                  <OptionText>{option}</OptionText>
                </OptionButton>
              ))}
            </OptionsContainer>
          </QuestionCard>

          <NavigationButtons>
            <NavButton 
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              {t('contractQuiz.previousButton')}
            </NavButton>

            {currentQuestion === quizQuestions.length - 1 ? (
              <NavButton 
                onClick={finishQuiz}
                disabled={selectedAnswer === undefined}
              >
                {t('contractQuiz.finishButton')}
              </NavButton>
            ) : (
              <NavButton 
                onClick={nextQuestion}
                disabled={selectedAnswer === undefined}
              >
                {t('contractQuiz.nextButton')}
              </NavButton>
            )}
          </NavigationButtons>
        </QuizSection>
      </QuizContent>
      <MainFooter />
    </QuizContainer>
  );
};

export default ContractQuiz;
