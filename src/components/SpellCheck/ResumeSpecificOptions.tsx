import React from 'react';
import { SpellCheckOptions } from '../../types/spellCheck';
import {
  ResumeOptionsContainer,
  ResumeOptionsTitle,
  ResumeOptionsGrid,
  ResumeOption,
  ResumeOptionLabel,
  ResumeOptionDescription
} from '../../styles/components/ResumeSpecificOptions.styles';

interface ResumeSpecificOptionsProps {
  options: SpellCheckOptions['resumeOptions'];
  onChange: (options: SpellCheckOptions['resumeOptions']) => void;
}

const ResumeSpecificOptions: React.FC<ResumeSpecificOptionsProps> = ({ 
  options, 
  onChange 
}) => {

  if (!options) return null;

  return (
    <ResumeOptionsContainer>
      <ResumeOptionsTitle>
        🌍 외국인 근로자 맞춤법 검사
      </ResumeOptionsTitle>
      
      <ResumeOptionsGrid>
        <ResumeOption>
          <ResumeOptionLabel>
            존댓말 검사
          </ResumeOptionLabel>
          <ResumeOptionDescription>
            자기소개서에 적합한 존댓말 사용을 검사합니다
          </ResumeOptionDescription>
        </ResumeOption>

        <ResumeOption>
          <ResumeOptionLabel>
            금기어 검사
          </ResumeOptionLabel>
          <ResumeOptionDescription>
            자기소개서에서 피해야 할 진부한 표현을 검사합니다
          </ResumeOptionDescription>
        </ResumeOption>

        <ResumeOption>
          <ResumeOptionLabel>
            문장 길이 검사
          </ResumeOptionLabel>
          <ResumeOptionDescription>
            적절한 문장 길이를 검사합니다
          </ResumeOptionDescription>
        </ResumeOption>

        <ResumeOption>
          <ResumeOptionLabel>
            단락 구조 검사
          </ResumeOptionLabel>
          <ResumeOptionDescription>
            적절한 단락 구조를 검사합니다
          </ResumeOptionDescription>
        </ResumeOption>


      </ResumeOptionsGrid>
    </ResumeOptionsContainer>
  );
};

export default ResumeSpecificOptions;
