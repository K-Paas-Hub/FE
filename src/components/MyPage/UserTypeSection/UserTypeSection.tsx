import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../../../types/myPage';
import {
  Section,
  SectionTitle,
  Card,
  InfoRow,
  InfoLabel,
  InfoValue,
  PrimaryButton,
  SecondaryButton,
  ButtonGroup,
} from '../../../styles/components/MyPage.styles';

interface UserTypeSectionProps {
  profile: UserProfile | null;
}

const UserTypeSection: React.FC<UserTypeSectionProps> = ({ profile }) => {
  const { t } = useTranslation();

  if (!profile) {
    return null;
  }

  const renderWorkerSection = () => (
    <Card>
      <SectionTitle>{t('myPage.userType.worker.title', '근로자 정보')}</SectionTitle>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.worker.visaType', '비자 유형')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'worker' && (profile as any).visaType ? 
            (profile as any).visaType : t('myPage.userType.worker.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.worker.workPermit', '근로허가번호')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'worker' && (profile as any).workPermitNumber ? 
            (profile as any).workPermitNumber : t('myPage.userType.worker.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.worker.employer', '고용주')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'worker' && (profile as any).employerName ? 
            (profile as any).employerName : t('myPage.userType.worker.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.worker.contractExpiry', '계약 만료일')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'worker' && (profile as any).contractExpiryDate ? 
            new Date((profile as any).contractExpiryDate).toLocaleDateString() : 
            t('myPage.userType.worker.notSet', '미설정')}
        </InfoValue>
      </InfoRow>

      <ButtonGroup>
        <PrimaryButton onClick={() => window.location.href = '/resume'}>
          {t('myPage.userType.worker.manageResume', '이력서 관리')}
        </PrimaryButton>
        <SecondaryButton onClick={() => window.location.href = '/contract-analysis'}>
          {t('myPage.userType.worker.contractAnalysis', '계약서 분석')}
        </SecondaryButton>
        <SecondaryButton onClick={() => window.location.href = '/visa'}>
          {t('myPage.userType.worker.visaInfo', '비자 정보')}
        </SecondaryButton>
      </ButtonGroup>
    </Card>
  );

  const renderStudentSection = () => (
    <Card>
      <SectionTitle>{t('myPage.userType.student.title', '유학생 정보')}</SectionTitle>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.student.studentId', '학번')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'student' && (profile as any).studentId ? 
            (profile as any).studentId : t('myPage.userType.student.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.student.university', '대학교')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'student' && (profile as any).university ? 
            (profile as any).university : t('myPage.userType.student.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.student.major', '전공')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'student' && (profile as any).major ? 
            (profile as any).major : t('myPage.userType.student.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.student.enrollmentDate', '입학일')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'student' && (profile as any).enrollmentDate ? 
            new Date((profile as any).enrollmentDate).toLocaleDateString() : 
            t('myPage.userType.student.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.student.graduationDate', '졸업 예정일')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'student' && (profile as any).graduationDate ? 
            new Date((profile as any).graduationDate).toLocaleDateString() : 
            t('myPage.userType.student.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.student.d2VisaExpiry', 'D-2 비자 만료일')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'student' && (profile as any).d2VisaExpiry ? 
            new Date((profile as any).d2VisaExpiry).toLocaleDateString() : 
            t('myPage.userType.student.notSet', '미설정')}
        </InfoValue>
      </InfoRow>

      <ButtonGroup>
        <PrimaryButton onClick={() => window.location.href = '/resume'}>
          {t('myPage.userType.student.manageResume', '이력서 관리')}
        </PrimaryButton>
        <SecondaryButton onClick={() => window.location.href = '/interview'}>
          {t('myPage.userType.student.interviewPrep', '면접 준비')}
        </SecondaryButton>
        <SecondaryButton onClick={() => window.location.href = '/visa'}>
          {t('myPage.userType.student.visaInfo', '비자 정보')}
        </SecondaryButton>
      </ButtonGroup>
    </Card>
  );

  const renderEmployerSection = () => (
    <Card>
      <SectionTitle>{t('myPage.userType.employer.title', '사업자 정보')}</SectionTitle>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.employer.companyName', '회사명')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'employer' && (profile as any).companyName ? 
            (profile as any).companyName : t('myPage.userType.employer.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.employer.businessNumber', '사업자등록번호')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'employer' && (profile as any).businessNumber ? 
            (profile as any).businessNumber : t('myPage.userType.employer.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.employer.companySize', '회사 규모')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'employer' && (profile as any).companySize ? 
            (profile as any).companySize === 'small' ? t('myPage.userType.employer.small', '소규모') :
            (profile as any).companySize === 'medium' ? t('myPage.userType.employer.medium', '중규모') :
            t('myPage.userType.employer.large', '대규모') : 
            t('myPage.userType.employer.notSet', '미설정')}
        </InfoValue>
      </InfoRow>
      
      <InfoRow>
        <InfoLabel>{t('myPage.userType.employer.industry', '업종')}</InfoLabel>
        <InfoValue>
          {profile.userType === 'employer' && (profile as any).industry ? 
            (profile as any).industry : t('myPage.userType.employer.notSet', '미설정')}
        </InfoValue>
      </InfoRow>

      <ButtonGroup>
        <PrimaryButton onClick={() => window.location.href = '/main'}>
          {t('myPage.userType.employer.manageJobs', '채용 관리')}
        </PrimaryButton>
        <SecondaryButton onClick={() => window.location.href = '/contract-tutorial'}>
          {t('myPage.userType.employer.contractGuide', '계약서 작성 가이드')}
        </SecondaryButton>
        <SecondaryButton onClick={() => window.location.href = '/visa'}>
          {t('myPage.userType.employer.visaInfo', '비자 정보')}
        </SecondaryButton>
      </ButtonGroup>
    </Card>
  );

  const renderUserTypeContent = () => {
    switch (profile.userType) {
      case 'worker':
        return renderWorkerSection();
      case 'student':
        return renderStudentSection();
      case 'employer':
        return renderEmployerSection();
      default:
        return (
          <Card>
            <SectionTitle>{t('myPage.userType.unknown', '사용자 유형 미설정')}</SectionTitle>
            <p>{t('myPage.userType.unknown.description', '사용자 유형이 설정되지 않았습니다. 프로필에서 사용자 유형을 설정해주세요.')}</p>
          </Card>
        );
    }
  };

  return (
    <Section>
      <SectionTitle>{t('myPage.userType.title', '사용자별 맞춤 기능')}</SectionTitle>
      {renderUserTypeContent()}
    </Section>
  );
};

export default UserTypeSection;
