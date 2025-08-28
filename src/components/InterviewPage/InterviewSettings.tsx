import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  SettingsOverlay,
  SettingsModal,
  SettingsHeader,
  CloseButton,
  SettingsContent,
  SettingSection,
  DifficultyOptions,
  DifficultyOption,
  OptionContent,
  OptionHeader,
  DifficultyIcon,
  DifficultyTitle,
  DifficultyDescription,
  QuestionCountSlider,
  Slider,
  SliderLabels,
  CheckboxOptions,
  CheckboxOption,
  CheckboxContent,
  CheckboxTitle,
  CheckboxDescription,
  SettingSummary,
  SummaryItems,
  SummaryItem,
  SummaryLabel,
  SummaryValue,
  SettingsFooter,
  CancelButton,
  SaveButton
} from '../../styles/components/InterviewSettings.styles';

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
    <SettingsOverlay onClick={handleOverlayClick}>
      <SettingsModal>
        <SettingsHeader>
          <h2>{t('interviewSettings.title')}</h2>
          <CloseButton onClick={onClose}>
            <span>×</span>
          </CloseButton>
        </SettingsHeader>
        
        <SettingsContent>
          <SettingSection>
            <h3>{t('interviewSettings.difficultySettings')}</h3>
            <DifficultyOptions>
              <DifficultyOption>
                <input
                  type="radio"
                  name="difficulty"
                  value="easy"
                  checked={localSettings.difficulty === 'easy'}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                />
                <OptionContent>
                  <OptionHeader>
                    <DifficultyIcon>🟢</DifficultyIcon>
                    <DifficultyTitle>{t('interviewSettings.difficultyLevels.easy')}</DifficultyTitle>
                  </OptionHeader>
                  <DifficultyDescription>
                    {t('interviewSettings.difficultyDescriptions.easy')}
                  </DifficultyDescription>
                </OptionContent>
              </DifficultyOption>
              
              <DifficultyOption>
                <input
                  type="radio"
                  name="difficulty"
                  value="medium"
                  checked={localSettings.difficulty === 'medium'}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                />
                <OptionContent>
                  <OptionHeader>
                    <DifficultyIcon>🟡</DifficultyIcon>
                    <DifficultyTitle>{t('interviewSettings.difficultyLevels.medium')}</DifficultyTitle>
                  </OptionHeader>
                  <DifficultyDescription>
                    {t('interviewSettings.difficultyDescriptions.medium')}
                  </DifficultyDescription>
                </OptionContent>
              </DifficultyOption>
              
              <DifficultyOption>
                <input
                  type="radio"
                  name="difficulty"
                  value="hard"
                  checked={localSettings.difficulty === 'hard'}
                  onChange={(e) => handleDifficultyChange(e.target.value)}
                />
                <OptionContent>
                  <OptionHeader>
                    <DifficultyIcon>🔴</DifficultyIcon>
                    <DifficultyTitle>{t('interviewSettings.difficultyLevels.hard')}</DifficultyTitle>
                  </OptionHeader>
                  <DifficultyDescription>
                    {t('interviewSettings.difficultyDescriptions.hard')}
                  </DifficultyDescription>
                </OptionContent>
              </DifficultyOption>
            </DifficultyOptions>
          </SettingSection>
          
          <SettingSection>
            <h3>{t('interviewSettings.questionCountSettings')}</h3>
            <QuestionCountSlider>
              <Slider
                type="range"
                min="3"
                max="10"
                value={localSettings.questionCount}
                onChange={(e) => handleQuestionCountChange(parseInt(e.target.value))}
              />
              <SliderLabels>
                <span>3{t('common.count')}</span>
                <span>{localSettings.questionCount}{t('common.count')}</span>
                <span>10{t('common.count')}</span>
              </SliderLabels>
            </QuestionCountSlider>
          </SettingSection>
          
          <SettingSection>
            <h3>{t('interviewSettings.additionalOptions')}</h3>
            <CheckboxOptions>
              <CheckboxOption>
                <input
                  type="checkbox"
                  checked={localSettings.includeHints}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    includeHints: e.target.checked
                  }))}
                />
                <CheckboxContent>
                  <CheckboxTitle>{t('interviewSettings.options.hints')}</CheckboxTitle>
                  <CheckboxDescription>{t('interviewSettings.options.hintsDescription')}</CheckboxDescription>
                </CheckboxContent>
              </CheckboxOption>
              
              <CheckboxOption>
                <input
                  type="checkbox"
                  checked={localSettings.customQuestions}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    customQuestions: e.target.checked
                  }))}
                />
                <CheckboxContent>
                  <CheckboxTitle>{t('interviewSettings.options.customQuestions')}</CheckboxTitle>
                  <CheckboxDescription>{t('interviewSettings.options.customQuestionsDescription')}</CheckboxDescription>
                </CheckboxContent>
              </CheckboxOption>
            </CheckboxOptions>
          </SettingSection>
          
          <SettingSummary>
            <h4>{t('interviewSettings.summary.title')}</h4>
            <SummaryItems>
              <SummaryItem>
                <SummaryLabel>{t('interviewSettings.summary.estimatedTime')}:</SummaryLabel>
                <SummaryValue>{localSettings.estimatedTime}{t('common.minutes')}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>{t('interviewSettings.summary.totalQuestions')}:</SummaryLabel>
                <SummaryValue>{localSettings.questionCount}{t('common.count')}</SummaryValue>
              </SummaryItem>
            </SummaryItems>
          </SettingSummary>
        </SettingsContent>
        
        <SettingsFooter>
          <CancelButton onClick={onClose}>
            {t('interviewSettings.actions.cancel')}
          </CancelButton>
          <SaveButton 
            onClick={handleSave}
            $isEnabled={!!localSettings.difficulty}
            disabled={!localSettings.difficulty}
          >
            {t('interviewSettings.actions.startInterview')}
          </SaveButton>
        </SettingsFooter>
      </SettingsModal>
    </SettingsOverlay>
  );
};

export default InterviewSettings;
