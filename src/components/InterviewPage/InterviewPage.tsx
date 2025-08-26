import React, { useState } from 'react';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import InterviewChat from './InterviewChat';
import InterviewSettings from './InterviewSettings';
import '../../styles/InterviewPage.css';

interface InterviewConfig {
  difficulty: string;
  questionCount: number;
  estimatedTime: number;
  includeHints: boolean;
  customQuestions: boolean;
}

const InterviewPage: React.FC = () => {
  const [settings, setSettings] = useState<InterviewConfig>({
    difficulty: '',
    questionCount: 5,
    estimatedTime: 15,
    includeHints: false,
    customQuestions: false
  });
  const [showSettings, setShowSettings] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  const handleStartInterview = () => {
    if (!settings.difficulty) {
      setShowSettings(true);
      return;
    }
    setIsInterviewStarted(true);
  };

  const handleSettingsSave = (newSettings: InterviewConfig) => {
    setSettings(newSettings);
    setShowSettings(false);
    if (newSettings.difficulty) {
      setIsInterviewStarted(true);
    }
  };

  const getDifficultyText = () => {
    switch (settings.difficulty) {
      case 'easy': return '초급';
      case 'medium': return '중급';
      case 'hard': return '고급';
      default: return '선택 필요';
    }
  };

  const getEstimatedTimeText = () => {
    return `${settings.estimatedTime}분`;
  };

  return (
    <div className="interview-page">
      <MainHeader />
      <div className="interview-container">
        <div className="interview-sidebar">
          <div className="sidebar-header">
            <div className="interview-logo">
              <img src="/images/ai.png" alt="AI" className="ai-logo" />
              <h2>AI 면접관</h2>
            </div>
            <div className="interview-status">
              <div className="status-indicator online"></div>
              <span>온라인</span>
            </div>
          </div>
          
          <div className="sidebar-content">
            <div className="interview-info">
              <h3>면접 정보</h3>
              <div className="info-item">
                <span className="info-label">난이도:</span>
                <span className="info-value">{getDifficultyText()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">질문 수:</span>
                <span className="info-value">{settings.questionCount}개</span>
              </div>
              <div className="info-item">
                <span className="info-label">소요 시간:</span>
                <span className="info-value">{getEstimatedTimeText()}</span>
              </div>
            </div>
            
            <div className="sidebar-actions">
              <button 
                className="sidebar-button primary"
                onClick={handleStartInterview}
              >
                <img src="/images/interview.png" alt="Interview" className="button-icon" />
                {isInterviewStarted ? '면접 재시작' : '면접 시작'}
              </button>
              <button className="sidebar-button secondary">
                <img src="/images/result.png" alt="Result" className="button-icon" />
                결과 보기
              </button>
              <button 
                className="sidebar-button secondary"
                onClick={() => setShowSettings(true)}
              >
                <img src="/images/setting.png" alt="Settings" className="button-icon" />
                설정
              </button>
            </div>
          </div>
        </div>
        
        <div className="interview-main">
          <div className="main-header">
            <div className="header-left">
              <h1>AI 모의 면접</h1>
              <p>실제 면접과 유사한 환경에서 연습해보세요</p>
            </div>
            <div className="header-actions">
              <button className="header-button">
                <img src="/images/copy.png" alt="Copy" className="header-icon" />
                복사
              </button>
              <button className="header-button">
                <img src="/images/upload.png" alt="Export" className="header-icon" />
                내보내기
              </button>
              <button className="header-button close">
                <span className="header-icon">×</span>
                채팅 닫기
              </button>
            </div>
          </div>
          
          <InterviewChat 
            settings={settings}
            isInterviewStarted={isInterviewStarted}
            onStartInterview={handleStartInterview}
          />
        </div>
      </div>

      {showSettings && (
        <InterviewSettings
          settings={settings}
          onSave={handleSettingsSave}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      <MainFooter />
    </div>
  );
};

export default InterviewPage;
