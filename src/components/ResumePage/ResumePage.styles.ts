import styled from 'styled-components';

// 미리보기 모달 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  backdrop-filter: blur(4px);
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  padding: 0.5rem;
  border-radius: 4px;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: #f3f4f6;
    color: #374151;
  }
`;

export const PreviewSection = styled.div`
  margin-bottom: 2rem;
`;

export const PreviewSectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PreviewContent = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4ade80;
`;

export const PreviewText = styled.p`
  margin: 0;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
`;

export const EmptyText = styled.p`
  color: #9ca3af;
  font-style: italic;
  margin: 0;
`;

export const LanguageLevelSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

// 학교 관련 스타일
export const SchoolTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SchoolTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  border-radius: 6px;
  background-color: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: ${props => props.$active ? '#22c55e' : '#f9fafb'};
    border-color: ${props => props.$active ? '#22c55e' : '#9ca3af'};
  }
`;

export const SmartSearchContainer = styled.div`
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
`;

export const SchoolCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SchoolCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const SchoolCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const SchoolIcon = styled.span`
  font-size: 1.5rem;
  color: #4ade80;
`;

export const SchoolName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const SchoolCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const SchoolCardBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const NoResultsCard = styled.div`
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
  font-style: italic;
`;

export const EducationTimeline = styled.div`
  margin-top: 2rem;
`;

export const TimelineTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
`;

export const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
`;

export const TimelineContent = styled.div`
  flex: 1;
`;

export const TimelineSchoolCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9fafb;
`;

export const TimelineSchoolHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const TimelineSchoolIcon = styled.span`
  font-size: 1.25rem;
  color: #4ade80;
`;

export const TimelineSchoolInfo = styled.div`
  flex: 1;
`;

export const TimelineSchoolName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineSchoolCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineRemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: #fef2f2;
  }
`;

export const TimelineSchoolBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const StatusSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

// 언어 관련 스타일
export const LanguageTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const LanguageTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  border-radius: 6px;
  background-color: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: ${props => props.$active ? '#22c55e' : '#f9fafb'};
    border-color: ${props => props.$active ? '#22c55e' : '#9ca3af'};
  }
`;

export const LanguageCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const LanguageCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const LanguageCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const LanguageIcon = styled.span`
  font-size: 1.5rem;
  color: #4ade80;
`;

export const LanguageName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const LanguageCardBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const LanguageCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export const LanguageDescription = styled.div`
  margin-bottom: 1rem;
`;

export const LanguageCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LanguageTimeline = styled.div`
  margin-top: 2rem;
`;

export const TimelineLanguageCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9fafb;
`;

export const TimelineLanguageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const TimelineLanguageIcon = styled.span`
  font-size: 1.25rem;
  color: #4ade80;
`;

export const TimelineLanguageInfo = styled.div`
  flex: 1;
`;

export const TimelineLanguageName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineLanguageCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineLanguageBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

// 자격증 관련 스타일
export const CertificationTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const CertificationTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  border-radius: 6px;
  background-color: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: ${props => props.$active ? '#22c55e' : '#f9fafb'};
    border-color: ${props => props.$active ? '#22c55e' : '#9ca3af'};
  }
`;

export const CertificationCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const CertificationCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const CertificationCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const CertificationIcon = styled.span`
  font-size: 1.5rem;
  color: #4ade80;
`;

export const CertificationCardName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const CertificationCardCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const CertificationCardBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const CertificationDescription = styled.div`
  margin-bottom: 1rem;
`;

export const CertificationCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CertificationTimeline = styled.div`
  margin-top: 2rem;
`;

export const TimelineCertificationCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9fafb;
`;

export const TimelineCertificationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const TimelineCertificationIcon = styled.span`
  font-size: 1.25rem;
  color: #4ade80;
`;

export const TimelineCertificationInfo = styled.div`
  flex: 1;
`;

export const TimelineCertificationName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineCertificationCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineCertificationBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const CertificationGradeSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;

// 스킬 관련 스타일
export const SkillTypeFilter = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const SkillTypeButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.$active ? '#4ade80' : '#d1d5db'};
  border-radius: 6px;
  background-color: ${props => props.$active ? '#4ade80' : 'white'};
  color: ${props => props.$active ? 'white' : '#374151'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 44px;
  min-height: 44px;
  
  &:hover {
    background-color: ${props => props.$active ? '#22c55e' : '#f9fafb'};
    border-color: ${props => props.$active ? '#22c55e' : '#9ca3af'};
  }
`;

export const SkillCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const SkillCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #4ade80;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;

export const SkillCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const SkillIcon = styled.span`
  font-size: 1.5rem;
  color: #4ade80;
`;

export const SkillCardName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const SkillCardCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  background-color: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const SkillCardBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const SkillDescription = styled.div`
  margin-bottom: 1rem;
`;

export const SkillCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SkillTimeline = styled.div`
  margin-top: 2rem;
`;

export const TimelineSkillCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f9fafb;
`;

export const TimelineSkillHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const TimelineSkillIcon = styled.span`
  font-size: 1.25rem;
  color: #4ade80;
`;

export const TimelineSkillInfo = styled.div`
  flex: 1;
`;

export const TimelineSkillName = styled.div`
  font-weight: 600;
  color: #1f2937;
`;

export const TimelineSkillCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const TimelineSkillBody = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
`;

export const SkillLevelSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #4ade80;
    box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.1);
  }
`;
