import styled from 'styled-components';

export const SettingsOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(4px);

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const SettingsModal = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-height: 95vh;
  }
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 20px 24px;
  }

  h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #1f2937;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #64748b;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #374151;
  }
`;

export const SettingsContent = styled.div`
  padding: 32px;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const SettingSection = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 24px;
  }

  h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
    color: #1f2937;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

export const DifficultyOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DifficultyOption = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;

  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }

  input[type="radio"] {
    margin: 0;
    margin-top: 2px;
    accent-color: #667eea;
  }

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const OptionContent = styled.div`
  flex: 1;
`;

export const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

export const DifficultyIcon = styled.span`
  font-size: 16px;
`;

export const DifficultyTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const DifficultyDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const QuestionCountSlider = styled.div`
  padding: 20px 0;
`;

export const Slider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
  margin-bottom: 16px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #667eea;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
  }
`;

export const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #64748b;

  span:nth-child(2) {
    font-weight: 600;
    color: #667eea;
    font-size: 16px;
  }
`;

export const CheckboxOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CheckboxOption = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: #f8fafc;
  }

  input[type="checkbox"] {
    margin: 0;
    margin-top: 2px;
    accent-color: #667eea;
  }
`;

export const CheckboxContent = styled.div`
  flex: 1;
`;

export const CheckboxTitle = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 2px;
`;

export const CheckboxDescription = styled.span`
  font-size: 12px;
  color: #64748b;
  line-height: 1.4;
`;

export const SettingSummary = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;

  h4 {
    margin: 0 0 12px 0;
    font-size: 16px;
    font-weight: 600;
    color: #1f2937;
  }
`;

export const SummaryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryLabel = styled.span`
  font-size: 14px;
  color: #64748b;
`;

export const SummaryValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
`;

export const SettingsFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px 32px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0 0 16px 16px;

  @media (max-width: 768px) {
    padding: 20px 24px;
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
  }
`;

export const SaveButton = styled.button<{ $isEnabled?: boolean }>`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$isEnabled 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : '#cbd5e1'
  };
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: ${props => props.$isEnabled ? 'pointer' : 'not-allowed'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 20px;
  }
`;
