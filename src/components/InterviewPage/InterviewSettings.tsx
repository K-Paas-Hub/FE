import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          <h2>{t('interviewSettings.title')}</h2>
          <button className="close-button" onClick={onClose}>
            <span>×</span>
          </button>
        </div>
        
        <div className="settings-content">
          <div className="setting-section">
            <h3>{t('interviewSettings.difficultySettings')}</h3>
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
                    <span className="difficulty-title">{t('interviewSettings.difficultyLevels.easy')}</span>
                  </div>
                  <p className="difficulty-description">
                    {t('interviewSettings.difficultyDescriptions.easy')}
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
                    <span className="difficulty-title">{t('interviewSettings.difficultyLevels.medium')}</span>
                  </div>
                  <p className="difficulty-description">
                    {t('interviewSettings.difficultyDescriptions.medium')}
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
                    <span className="difficulty-title">{t('interviewSettings.difficultyLevels.hard')}</span>
                  </div>
                  <p className="difficulty-description">
                    {t('interviewSettings.difficultyDescriptions.hard')}
                  </p>
                </div>
              </label>
            </div>
          </div>
          
          <div className="setting-section">
            <h3>{t('interviewSettings.questionCountSettings')}</h3>
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
                <span>3{t('common.count')}</span>
                <span>{localSettings.questionCount}{t('common.count')}</span>
                <span>10{t('common.count')}</span>
              </div>
            </div>
          </div>
          
          <div className="setting-section">
            <h3>{t('interviewSettings.additionalOptions')}</h3>
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
                  <span className="checkbox-title">{t('interviewSettings.options.hints')}</span>
                  <span className="checkbox-description">{t('interviewSettings.options.hintsDescription')}</span>
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
                  <span className="checkbox-title">{t('interviewSettings.options.customQuestions')}</span>
                  <span className="checkbox-description">{t('interviewSettings.options.customQuestionsDescription')}</span>
                </div>
              </label>
            </div>
          </div>
          
          <div className="setting-summary">
            <h4>{t('interviewSettings.summary.title')}</h4>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">{t('interviewSettings.summary.estimatedTime')}:</span>
                <span className="summary-value">{localSettings.estimatedTime}{t('common.minutes')}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">{t('interviewSettings.summary.totalQuestions')}:</span>
                <span className="summary-value">{localSettings.questionCount}{t('common.count')}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="settings-footer">
          <button className="cancel-button" onClick={onClose}>
            {t('interviewSettings.actions.cancel')}
          </button>
          <button 
            className="save-button"
            onClick={handleSave}
            disabled={!localSettings.difficulty}
          >
            {t('interviewSettings.actions.startInterview')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSettings;
