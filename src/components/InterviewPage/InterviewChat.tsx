import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import InterviewMessage from './InterviewMessage';
import InterviewInput from './InterviewInput';
import '../../styles/InterviewChat.css';

export interface Message {
  id: string;
  type: 'system' | 'user';
  content: string;
  timestamp: string;
  difficulty?: string;
  recommendedTime?: string;
}

interface InterviewConfig {
  difficulty: string;
  questionCount: number;
  estimatedTime: number;
  includeHints: boolean;
  customQuestions: boolean;
}

interface InterviewChatProps {
  settings: InterviewConfig;
  isInterviewStarted: boolean;
  onStartInterview: () => void;
}

const InterviewChat: React.FC<InterviewChatProps> = ({ 
  settings, 
  isInterviewStarted, 
  onStartInterview 
}) => {
  const { t } = useTranslation();
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: t('interviewChat.welcomeMessage'),
      timestamp: '09:14'
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const scrollToBottom = useCallback(() => {
    if (shouldAutoScroll && !isInitialLoad) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldAutoScroll, isInitialLoad]);

  // 사용자가 스크롤을 올렸을 때 자동 스크롤 비활성화
  const handleScroll = () => {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      const { scrollTop, scrollHeight, clientHeight } = chatMessages;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setShouldAutoScroll(isAtBottom);
    }
  };

  useEffect(() => {
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
      chatMessages.addEventListener('scroll', handleScroll);
      return () => chatMessages.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    // 초기 로딩 시에는 스크롤하지 않음
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    // 면접이 시작된 후에만 스크롤
    if (isInterviewStarted) {
      scrollToBottom();
    }
  }, [messages, shouldAutoScroll, isInitialLoad, isInterviewStarted, scrollToBottom]);

  useEffect(() => {
    if (isInterviewStarted && currentQuestionIndex === 0) {
      const startInterview = () => {
        const difficultyText = settings.difficulty === 'easy' ? t('interviewChat.difficultyLevels.easy') : 
                              settings.difficulty === 'medium' ? t('interviewChat.difficultyLevels.medium') : t('interviewChat.difficultyLevels.hard');
        
        const startMessage: Message = {
          id: Date.now().toString(),
          type: 'system',
          content: `${t('interviewChat.startInterview')}\n\n• ${t('interviewChat.interviewInfo.difficulty')}: ${difficultyText}\n• ${t('interviewChat.interviewInfo.totalQuestions')}: ${settings.questionCount}${t('common.count')}\n• ${t('interviewChat.interviewInfo.estimatedTime')}: ${settings.estimatedTime}${t('common.minutes')}\n\n${t('interviewChat.interviewInfo.firstQuestion')}\n\n"${t('interviewChat.questions.strengthsWeaknesses')}"`,
          timestamp: new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          recommendedTime: '2분'
        };
        
        setMessages(prev => [...prev, startMessage]);
        setCurrentQuestionIndex(1);
      };
      
      startInterview();
    }
  }, [isInterviewStarted, currentQuestionIndex, settings.difficulty, settings.questionCount, settings.estimatedTime, t]);



  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, userMessage]);

    // 다음 질문 또는 면접 종료
    setTimeout(() => {
      if (currentQuestionIndex < settings.questionCount) {
        const nextQuestion = getNextQuestion(currentQuestionIndex);
        const systemMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: nextQuestion.content,
          timestamp: new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          recommendedTime: nextQuestion.recommendedTime
        };
        setMessages(prev => [...prev, systemMessage]);
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // 면접 종료
        const endMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'system',
          content: t('interviewChat.completionMessage'),
          timestamp: new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        setMessages(prev => [...prev, endMessage]);
      }
    }, 1000);
  };

  const getNextQuestion = (index: number) => {
    const questions = [
      { content: t('interviewChat.questions.teamwork'), recommendedTime: '2분 30초' },
      { content: t('interviewChat.questions.memorableProject'), recommendedTime: '3분' },
      { content: t('interviewChat.questions.stressManagement'), recommendedTime: '2분' },
      { content: t('interviewChat.questions.futureGoals'), recommendedTime: '2분' },
      { content: t('interviewChat.questions.motivation'), recommendedTime: '2분 30초' },
      { content: t('interviewChat.questions.workLifeBalance'), recommendedTime: '2분' },
      { content: t('interviewChat.questions.learningMethod'), recommendedTime: '2분' },
      { content: t('interviewChat.questions.failureExperience'), recommendedTime: '3분' },
      { content: t('interviewChat.questions.conflictResolution'), recommendedTime: '2분' },
      { content: t('interviewChat.questions.finalWords'), recommendedTime: '1분 30초' }
    ];
    
    return questions[index] || questions[0];
  };

  return (
    <div className="interview-chat">
      <div className="chat-messages">
        {messages.map((message) => (
          <InterviewMessage key={message.id} message={message} />
        ))}
        
        {!isInterviewStarted && (
          <div className="welcome-section">
            <div className="welcome-card">
              <div className="welcome-icon">
                <img src="/images/ai.png" alt="AI" className="welcome-image" />
              </div>
              <h3>{t('interviewChat.welcomeSection.title')}</h3>
              <p>{t('interviewChat.welcomeSection.subtitle')}</p>
              <div className="welcome-features">
                <div className="feature-item">
                  <img src="/images/setting.png" alt="Settings" className="feature-icon" />
                  <span>{t('interviewChat.welcomeSection.features.settings')}</span>
                </div>
                <div className="feature-item">
                  <img src="/images/ai.png" alt="AI" className="feature-icon" />
                  <span>{t('interviewChat.welcomeSection.features.aiInterview')}</span>
                </div>
                <div className="feature-item">
                  <img src="/images/interview.png" alt="Interview" className="feature-icon" />
                  <span>{t('interviewChat.welcomeSection.features.timeGuide')}</span>
                </div>
                <div className="feature-item">
                  <img src="/images/result.png" alt="Result" className="feature-icon" />
                  <span>{t('interviewChat.welcomeSection.features.analysis')}</span>
                </div>
              </div>
              <button className="start-interview-button" onClick={onStartInterview}>
                {t('interviewChat.welcomeSection.startButton')}
              </button>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {isInterviewStarted && (
        <InterviewInput onSendMessage={handleSendMessage} />
      )}
    </div>
  );
};

export default InterviewChat;
