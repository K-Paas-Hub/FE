import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MainHeader from '../MainHeader';
import MainFooter from '../MainFooter';
import InterviewChat from './InterviewChat';
import InterviewSettings from './InterviewSettings';
import {
  InterviewPage as StyledInterviewPage,
  InterviewContainer,
  InterviewSidebar,
  SidebarHeader,
  InterviewLogo,
  AiLogo,
  InterviewLogoTitle,
  InterviewStatus,
  StatusIndicator,
  SidebarContent,
  InterviewInfo,
  InfoItem,
  InfoLabel,
  InfoValue,
  SidebarActions,
  SidebarButton,
  ButtonIcon,
  InterviewMain,
  MainHeader as StyledMainHeader,
  HeaderLeft,
  HeaderActions,
  HeaderButton,
  HeaderIcon
} from '../../styles/components/InterviewPage.styles';

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
    <StyledInterviewPage>
      <MainHeader />
      <InterviewContainer>
        <InterviewSidebar>
          <SidebarHeader>
            <InterviewLogo>
              <AiLogo src="/images/ai.png" alt="AI" />
              <InterviewLogoTitle>{t('interview.aiInterviewer')}</InterviewLogoTitle>
            </InterviewLogo>
            <InterviewStatus>
              <StatusIndicator />
              <span>{t('interview.online')}</span>
            </InterviewStatus>
          </SidebarHeader>
          
          <SidebarContent>
            <InterviewInfo>
              <h3>{t('interview.interviewInfo')}</h3>
              <InfoItem>
                <InfoLabel>{t('interview.difficulty')}:</InfoLabel>
                <InfoValue>{getDifficultyText()}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('interview.questionCount')}:</InfoLabel>
                <InfoValue>{settings.questionCount}{t('common.count', '개')}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>{t('interview.estimatedTime')}:</InfoLabel>
                <InfoValue>{getEstimatedTimeText()}</InfoValue>
              </InfoItem>
            </InterviewInfo>
            
            <SidebarActions>
              <SidebarButton 
                variant="primary"
                onClick={handleStartInterview}
              >
                <ButtonIcon src="/images/interview.png" alt="Interview" />
                {isInterviewStarted ? t('interview.actions.restartInterview') : t('interview.actions.startInterview')}
              </SidebarButton>
              <SidebarButton variant="secondary">
                <ButtonIcon src="/images/result.png" alt="Result" />
                {t('interview.actions.viewResult')}
              </SidebarButton>
              <SidebarButton 
                variant="secondary"
                onClick={() => setShowSettings(true)}
              >
                <ButtonIcon src="/images/setting.png" alt="Settings" />
                {t('interview.actions.settings')}
              </SidebarButton>
            </SidebarActions>
          </SidebarContent>
        </InterviewSidebar>
        
        <InterviewMain>
          <StyledMainHeader>
            <HeaderLeft>
              <h1>{t('interview.title')}</h1>
              <p>{t('interview.subtitle')}</p>
            </HeaderLeft>
            <HeaderActions>
              <HeaderButton onClick={handleCopy}>
                <HeaderIcon src="/images/copy.png" alt="Copy" />
                {t('interview.actions.copy')}
              </HeaderButton>
              <HeaderButton onClick={handleExport}>
                <HeaderIcon src="/images/upload.png" alt="Export" />
                {t('interview.actions.export')}
              </HeaderButton>
              <HeaderButton variant="close" onClick={handleCloseChat}>
                <span>×</span>
                {t('interview.actions.closeChat')}
              </HeaderButton>
            </HeaderActions>
          </StyledMainHeader>
          
          <InterviewChat 
            settings={settings}
            isInterviewStarted={isInterviewStarted}
            onStartInterview={handleStartInterview}
          />
        </InterviewMain>
      </InterviewContainer>

      {showSettings && (
        <InterviewSettings
          settings={settings}
          onSave={handleSettingsSave}
          onClose={() => setShowSettings(false)}
        />
      )}
      
      <MainFooter />
    </StyledInterviewPage>
  );
};

export default InterviewPage;
