import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
    // 채팅 메시지만 정확히 추출하여 복사
    const messageElements = document.querySelectorAll('.message-container');
    let chatContent = '';
    
    messageElements.forEach((element) => {
      const messageText = element.textContent || '';
      if (messageText.trim()) {
        chatContent += messageText + '\n\n';
      }
    });
    
    if (!chatContent.trim()) {
      alert(t('interview.messages.noContentToCopy'));
      return;
    }
    
    navigator.clipboard.writeText(chatContent).then(() => {
      alert(t('interview.messages.copySuccess'));
    }).catch(() => {
      alert(t('interview.messages.copyFailed'));
    });
  };

  // 내보내기 기능
  const handleExport = () => {
    // 채팅 메시지만 정확히 추출하여 내보내기
    const messageElements = document.querySelectorAll('.message-container');
    let chatContent = '';
    
    messageElements.forEach((element) => {
      const messageText = element.textContent || '';
      if (messageText.trim()) {
        chatContent += messageText + '\n\n';
      }
    });
    
    if (!chatContent.trim()) {
      alert(t('interview.messages.noContentToExport'));
      return;
    }
    
    const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t('interview.messages.exportFileName')}${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 채팅 닫기 기능
  const handleCloseChat = () => {
    if (window.confirm(t('interview.messages.closeConfirm'))) {
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
      case 'easy': return t('interview.difficultyLevels.easy');
      case 'medium': return t('interview.difficultyLevels.medium');
      case 'hard': return t('interview.difficultyLevels.hard');
      default: return t('interview.difficultyLevels.selectRequired');
    }
  };

  const getEstimatedTimeText = () => {
    return `${settings.estimatedTime}${t('common.minutes', '분')}`;
  };

  return (
    <div className="interview-page">
      <MainHeader />
      <div className="interview-container">
        <div className="interview-sidebar">
          <div className="sidebar-header">
            <div className="interview-logo">
              <img src="/images/ai.png" alt="AI" className="ai-logo" />
              <h2>{t('interview.aiInterviewer')}</h2>
            </div>
            <div className="interview-status">
              <div className="status-indicator online"></div>
              <span>{t('interview.online')}</span>
            </div>
          </div>
          
          <div className="sidebar-content">
            <div className="interview-info">
              <h3>{t('interview.interviewInfo')}</h3>
              <div className="info-item">
                <span className="info-label">{t('interview.difficulty')}:</span>
                <span className="info-value">{getDifficultyText()}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('interview.questionCount')}:</span>
                <span className="info-value">{settings.questionCount}{t('common.count', '개')}</span>
              </div>
              <div className="info-item">
                <span className="info-label">{t('interview.estimatedTime')}:</span>
                <span className="info-value">{getEstimatedTimeText()}</span>
              </div>
            </div>
            
            <div className="sidebar-actions">
              <button 
                className="sidebar-button primary"
                onClick={handleStartInterview}
              >
                <img src="/images/interview.png" alt="Interview" className="button-icon" />
                {isInterviewStarted ? t('interview.actions.restartInterview') : t('interview.actions.startInterview')}
              </button>
              <button className="sidebar-button secondary">
                <img src="/images/result.png" alt="Result" className="button-icon" />
                {t('interview.actions.viewResult')}
              </button>
              <button 
                className="sidebar-button secondary"
                onClick={() => setShowSettings(true)}
              >
                <img src="/images/setting.png" alt="Settings" className="button-icon" />
                {t('interview.actions.settings')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="interview-main">
          <div className="main-header">
            <div className="header-left">
              <h1>{t('interview.title')}</h1>
              <p>{t('interview.subtitle')}</p>
            </div>
            <div className="header-actions">
              <button className="header-button" onClick={handleCopy}>
                <img src="/images/copy.png" alt="Copy" className="header-icon" />
                {t('interview.actions.copy')}
              </button>
              <button className="header-button" onClick={handleExport}>
                <img src="/images/upload.png" alt="Export" className="header-icon" />
                {t('interview.actions.export')}
              </button>
              <button className="header-button close" onClick={handleCloseChat}>
                <span className="header-icon">×</span>
                {t('interview.actions.closeChat')}
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
