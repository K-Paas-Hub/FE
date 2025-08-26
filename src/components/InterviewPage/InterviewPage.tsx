import React, { useState, useEffect } from 'react';
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

  // 페이지 로드 시 스크롤을 맨 위로 올림
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 복사 기능
  const handleCopy = () => {
    // 채팅 내용을 클립보드에 복사
    const chatContent = document.querySelector('.chat-messages')?.textContent || '';
    navigator.clipboard.writeText(chatContent).then(() => {
      alert('채팅 내용이 클립보드에 복사되었습니다.');
    }).catch(() => {
      alert('복사에 실패했습니다.');
    });
  };

  // 내보내기 기능
  const handleExport = () => {
    // 채팅 메시지만 정확히 추출하여 내보내기
    const messageElements = document.querySelectorAll('.chat-message');
    let chatContent = '';
    
    messageElements.forEach((element) => {
      const messageText = element.textContent || '';
      if (messageText.trim()) {
        chatContent += messageText + '\n\n';
      }
    });
    
    if (!chatContent.trim()) {
      alert('내보낼 채팅 내용이 없습니다.');
      return;
    }
    
    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `면접_대화_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 채팅 닫기 기능
  const handleCloseChat = () => {
    if (window.confirm('정말로 채팅을 닫으시겠습니까? 현재 진행 중인 면접이 종료됩니다.')) {
      setIsInterviewStarted(false);
      // 채팅 내용 초기화
      window.location.reload();
    }
  };

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
              <button className="header-button" onClick={handleCopy}>
                <img src="/images/copy.png" alt="Copy" className="header-icon" />
                복사
              </button>
              <button className="header-button" onClick={handleExport}>
                <img src="/images/upload.png" alt="Export" className="header-icon" />
                내보내기
              </button>
              <button className="header-button close" onClick={handleCloseChat}>
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
