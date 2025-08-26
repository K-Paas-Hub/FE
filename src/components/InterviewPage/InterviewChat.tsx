import React, { useState, useRef, useEffect } from 'react';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: '안녕하세요! AI 면접관입니다. 면접을 시작하기 전에 설정을 확인해 주세요.\n\n왼쪽 사이드바에서 "설정" 버튼을 클릭하여 난이도와 질문 수를 설정하거나, "면접 시작" 버튼을 클릭하여 바로 시작할 수 있습니다.',
      timestamp: '09:14'
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isInterviewStarted && currentQuestionIndex === 0) {
      startInterview();
    }
  }, [isInterviewStarted]);

  const startInterview = () => {
    const difficultyText = settings.difficulty === 'easy' ? '초급' : 
                          settings.difficulty === 'medium' ? '중급' : '고급';
    
    const startMessage: Message = {
      id: Date.now().toString(),
      type: 'system',
      content: `면접을 시작하겠습니다!\n\n• 난이도: ${difficultyText}\n• 총 질문 수: ${settings.questionCount}개\n• 예상 소요 시간: ${settings.estimatedTime}분\n\n첫 번째 질문입니다:\n\n"자신의 강점과 약점에 대해 말씀해 주세요."`,
      timestamp: new Date().toLocaleTimeString('ko-KR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      recommendedTime: '2분'
    };
    
    setMessages(prev => [...prev, startMessage]);
    setCurrentQuestionIndex(1);
  };

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
          content: '면접이 완료되었습니다! 수고하셨습니다.\n\n면접 결과를 확인하려면 사이드바의 "결과 보기" 버튼을 클릭하세요.',
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
      { content: '팀워크가 중요한 이유와 본인이 팀에서 어떤 역할을 하는지 설명해 주세요.', recommendedTime: '2분 30초' },
      { content: '가장 기억에 남는 프로젝트나 성과에 대해 말씀해 주세요.', recommendedTime: '3분' },
      { content: '스트레스 상황에서 어떻게 대처하시나요?', recommendedTime: '2분' },
      { content: '앞으로 5년 후 본인의 모습은 어떨 것 같나요?', recommendedTime: '2분' },
      { content: '우리 회사에 지원한 이유는 무엇인가요?', recommendedTime: '2분 30초' },
      { content: '업무와 개인생활의 균형을 어떻게 맞추시나요?', recommendedTime: '2분' },
      { content: '새로운 기술이나 도구를 배우는 데 있어서 어떤 방법을 사용하시나요?', recommendedTime: '2분' },
      { content: '실패했던 경험과 그로부터 배운 점에 대해 말씀해 주세요.', recommendedTime: '3분' },
      { content: '동료와 의견이 다를 때 어떻게 해결하시나요?', recommendedTime: '2분' },
      { content: '마지막으로 하고 싶은 말이 있으시다면 말씀해 주세요.', recommendedTime: '1분 30초' }
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
              <h3>면접 준비 완료</h3>
              <p>설정을 확인하고 면접을 시작하세요</p>
              <div className="welcome-features">
                <div className="feature-item">
                  <img src="/images/setting.png" alt="Settings" className="feature-icon" />
                  <span>난이도 및 질문 수 설정</span>
                </div>
                <div className="feature-item">
                  <img src="/images/ai.png" alt="AI" className="feature-icon" />
                  <span>AI 면접관과 실시간 대화</span>
                </div>
                <div className="feature-item">
                  <img src="/images/interview.png" alt="Interview" className="feature-icon" />
                  <span>권장 답변 시간 제공</span>
                </div>
                <div className="feature-item">
                  <img src="/images/result.png" alt="Result" className="feature-icon" />
                  <span>면접 결과 분석</span>
                </div>
              </div>
              <button className="start-interview-button" onClick={onStartInterview}>
                면접 시작하기
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
