import React, { useState } from 'react';
import '../../styles/InterviewSettings.css';

interface InterviewConfig {
  difficulty: string;
  questionCount: number;
  estimatedTime: number;
  includeHints: boolean;
  customQuestions: boolean;
}

interface InterviewSettingsProps {
  settings: InterviewConfig;
  onSave: (settings: InterviewConfig) => void;
  onClose: () => void;
}

const InterviewSettings: React.FC<InterviewSettingsProps> = ({ 
  settings, 
  onSave, 
  onClose 
}) => {
  const [localSettings, setLocalSettings] = useState<InterviewConfig>(settings);

  const handleSave = () => {
    onSave(localSettings);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setLocalSettings(prev => ({
      ...prev,
      difficulty,
      estimatedTime: difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20
    }));
  };

  const handleQuestionCountChange = (count: number) => {
    setLocalSettings(prev => ({
      ...prev,
      questionCount: count,
      estimatedTime: Math.ceil(count * (prev.difficulty === 'easy' ? 2 : prev.difficulty === 'medium' ? 3 : 4))
    }));
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="settings-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal">
        <div className="settings-header">
          <h2>면접 설정</h2>
          <button className="close-button" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        <div className="settings-content">
          <div className="setting-section">
            <h3>난이도 설정</h3>
            <div className="difficulty-options">
              <label className="difficulty-option">
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={localSettings.difficulty === 'easy'}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="difficulty-icon">🟢</span>
                    <span className="difficulty-title">초급</span>
                  </div>
                  <p className="difficulty-description">
                    기본적인 면접 질문과 답변 힌트 제공
                  </p>
                </div>
              </label>
              
              <label className="difficulty-option">
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={localSettings.difficulty === 'medium'}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="difficulty-icon">🟡</span>
                    <span className="difficulty-title">중급</span>
                  </div>
                  <p className="difficulty-description">
                    일반적인 면접 질문과 적당한 난이도
                  </p>
                </div>
              </label>
              
              <label className="difficulty-option">
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={localSettings.difficulty === 'hard'}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                />
                <div className="option-content">
                  <div className="option-header">
                    <span className="difficulty-icon">🔴</span>
                    <span className="difficulty-title">고급</span>
                  </div>
                  <p className="difficulty-description">
                    이력서 기반 맞춤형 질문과 높은 난이도
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="setting-section">
            <h3>질문 수 설정</h3>
            <div className="question-count-slider">
              <input
                type="range"
                min="3"
                max="10"
                value={localSettings.questionCount}
                onChange={(e) => handleQuestionCountChange(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>3개</span>
                <span>{localSettings.questionCount}개</span>
                <span>10개</span>
              </div>
            </div>
          </div>
          
          <div className="setting-section">
            <h3>추가 옵션</h3>
            <div className="checkbox-options">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={localSettings.includeHints}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    includeHints: e.target.checked
                  }))}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <span className="checkbox-title">답변 힌트 제공</span>
                  <span className="checkbox-description">답변 시 도움이 되는 힌트를 제공합니다</span>
                </div>
              </label>
              
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  checked={localSettings.customQuestions}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    customQuestions: e.target.checked
                  }))}
                />
                <span className="checkmark"></span>
                <div className="checkbox-content">
                  <span className="checkbox-title">맞춤형 질문</span>
                  <span className="checkbox-description">이력서 기반으로 개인화된 질문을 생성합니다</span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="setting-summary">
            <h4>설정 요약</h4>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">예상 소요 시간:</span>
                <span className="summary-value">{localSettings.estimatedTime}분</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">총 질문 수:</span>
                <span className="summary-value">{localSettings.questionCount}개</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-footer">
          <button className="cancel-button" onClick={onClose}>
            취소
          </button>
          <button 
            className="save-button"
            onClick={handleSave}
            disabled={!localSettings.difficulty}
          >
            면접 시작
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSettings;
