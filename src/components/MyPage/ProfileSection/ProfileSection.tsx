import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserProfile } from '../../../types/myPage';
import { useMyPage } from '../../../hooks/useMyPage';
import {
  Section,
  SectionTitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  PrimaryButton,
  SecondaryButton,
  ButtonGroup,
  ErrorMessage,
  SuccessMessage,
  AvatarContainer,
  Avatar,
  AvatarUploadButton,
  Card,
  InfoRow,
  InfoLabel,
  InfoValue,
} from '../../../styles/components/MyPage.styles';

interface ProfileSectionProps {
  profile: UserProfile | null;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  const { t } = useTranslation();
  const { updateProfile, uploadAvatar, validationErrors } = useMyPage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile?.user_metadata?.full_name || '',
    phoneNumber: profile?.phoneNumber || '',
    nationality: profile?.nationality || '',
    language: profile?.language || 'ko',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const result = await updateProfile(formData);
    if (result.success) {
      setMessage({ type: 'success', text: '프로필이 성공적으로 업데이트되었습니다.' });
      setIsEditing(false);
    } else {
      setMessage({ type: 'error', text: result.error || '프로필 업데이트에 실패했습니다.' });
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile?.user_metadata?.full_name || '',
      phoneNumber: profile?.phoneNumber || '',
      nationality: profile?.nationality || '',
      language: profile?.language || 'ko',
    });
    setIsEditing(false);
    setMessage(null);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const result = await uploadAvatar(file);
      if (result.success) {
        setMessage({ type: 'success', text: '프로필 이미지가 업데이트되었습니다.' });
      } else {
        setMessage({ type: 'error', text: result.error || '이미지 업로드에 실패했습니다.' });
      }
    }
  };

  const nationalityOptions = [
    { value: '', label: '국적을 선택하세요' },
    { value: '베트남', label: '베트남' },
    { value: '캄보디아', label: '캄보디아' },
    { value: '네팔', label: '네팔' },
    { value: '인도네시아', label: '인도네시아' },
    { value: '중국', label: '중국' },
    { value: '태국', label: '태국' },
    { value: '필리핀', label: '필리핀' },
    { value: '미얀마', label: '미얀마' },
    { value: '몽골', label: '몽골' },
    { value: '우즈베키스탄', label: '우즈베키스탄' },
    { value: '카자흐스탄', label: '카자흐스탄' },
    { value: '키르기스스탄', label: '키르기스스탄' },
    { value: '타지키스탄', label: '타지키스탄' },
    { value: '터키', label: '터키' },
    { value: '이란', label: '이란' },
    { value: '파키스탄', label: '파키스탄' },
    { value: '방글라데시', label: '방글라데시' },
    { value: '스리랑카', label: '스리랑카' },
    { value: '인도', label: '인도' },
    { value: '기타', label: '기타' }
  ];

  const languageOptions = [
    { value: 'ko', label: '한국어' },
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'km', label: 'ភាសាខ្មែរ' },
    { value: 'ne', label: 'नेपाली' },
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'zh', label: '中文' },
    { value: 'th', label: 'ไทย' },
  ];

  if (!profile) {
    return null;
  }

  return (
    <Section>
      <SectionTitle>{t('myPage.profile.title', '프로필 관리')}</SectionTitle>
      
      {message && (
        message.type === 'success' ? (
          <SuccessMessage>{message.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{message.text}</ErrorMessage>
        )
      )}

      <Card>
        <AvatarContainer>
          <Avatar 
            src={profile.avatarUrl || '/images/default-avatar.png'} 
            alt="프로필 이미지"
            onError={(e) => {
              e.currentTarget.src = '/images/default-avatar.png';
            }}
          />
          <AvatarUploadButton>
            {t('myPage.profile.changeAvatar', '이미지 변경')}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </AvatarUploadButton>
        </AvatarContainer>

        {isEditing ? (
          <>
            <FormGroup>
              <FormLabel>{t('myPage.profile.fullName', '이름')}</FormLabel>
              <FormInput
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={t('myPage.profile.fullNamePlaceholder', '이름을 입력하세요')}
              />
              {validationErrors.fullName && (
                <ErrorMessage>{validationErrors.fullName}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>{t('myPage.profile.phoneNumber', '전화번호')}</FormLabel>
              <FormInput
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder={t('myPage.profile.phoneNumberPlaceholder', '전화번호를 입력하세요')}
              />
              {validationErrors.phoneNumber && (
                <ErrorMessage>{validationErrors.phoneNumber}</ErrorMessage>
              )}
            </FormGroup>

            <FormGroup>
              <FormLabel>{t('myPage.profile.nationality', '국적')}</FormLabel>
              <FormSelect
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
              >
                {nationalityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>

            <FormGroup>
              <FormLabel>{t('myPage.profile.language', '언어')}</FormLabel>
              <FormSelect
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              >
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </FormSelect>
            </FormGroup>

            <ButtonGroup>
              <PrimaryButton onClick={handleSave}>
                {t('myPage.profile.save', '저장')}
              </PrimaryButton>
              <SecondaryButton onClick={handleCancel}>
                {t('myPage.profile.cancel', '취소')}
              </SecondaryButton>
            </ButtonGroup>
          </>
        ) : (
          <>
            <InfoRow>
              <InfoLabel>{t('myPage.profile.email', '이메일')}</InfoLabel>
              <InfoValue>{profile.email}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{t('myPage.profile.fullName', '이름')}</InfoLabel>
              <InfoValue>{profile.user_metadata?.full_name || '-'}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{t('myPage.profile.phoneNumber', '전화번호')}</InfoLabel>
              <InfoValue>{profile.phoneNumber || '-'}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{t('myPage.profile.nationality', '국적')}</InfoLabel>
              <InfoValue>{profile.nationality || '-'}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{t('myPage.profile.language', '언어')}</InfoLabel>
              <InfoValue>
                {languageOptions.find(option => option.value === profile.language)?.label || '-'}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>{t('myPage.profile.userType', '사용자 유형')}</InfoLabel>
              <InfoValue>
                {profile.userType === 'worker' && t('myPage.profile.userTypeWorker', '근로자')}
                {profile.userType === 'student' && t('myPage.profile.userTypeStudent', '유학생')}
                {profile.userType === 'employer' && t('myPage.profile.userTypeEmployer', '사업자')}
              </InfoValue>
            </InfoRow>

            <ButtonGroup>
              <PrimaryButton onClick={() => setIsEditing(true)}>
                {t('myPage.profile.edit', '수정')}
              </PrimaryButton>
            </ButtonGroup>
          </>
        )}
      </Card>
    </Section>
  );
};

export default ProfileSection;
