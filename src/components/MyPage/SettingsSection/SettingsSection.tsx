import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserSettings } from '../../../types/myPage';
import { useMyPage } from '../../../hooks/useMyPage';
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  PrimaryButton,
  SecondaryButton,
  DangerButton,
  ButtonGroup,
  ErrorMessage,
  SuccessMessage,
  Card,
  InfoRow,
  InfoLabel,
  InfoValue,
  Switch,
  TabContainer,
  TabButton,
  SettingCard,
  SettingGroup,
  SettingRow,
  SettingLabel,
  SettingTitle,
  SettingDescription,
} from '../../../styles/components/MyPage.styles';

interface SettingsSectionProps {
  settings: UserSettings | null;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ settings }) => {
  const { t } = useTranslation();
  const { updateSettings, changePassword, deleteAccount, validationErrors } = useMyPage();
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'account'>('general');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  

  
  // 알림 설정
  const [notifications, setNotifications] = useState({
    email: settings?.notifications.email || false,
    push: settings?.notifications.push || false,
    sms: settings?.notifications.sms || false,
  });
  
  // 개인정보 설정
  const [privacy, setPrivacy] = useState({
    profileVisibility: settings?.privacy.profileVisibility || 'public',
    dataSharing: settings?.privacy.dataSharing || false,
  });
  
  // 비밀번호 변경
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);



  const handleNotificationChange = async (type: keyof typeof notifications, value: boolean) => {
    const newNotifications = { ...notifications, [type]: value };
    setNotifications(newNotifications);
    if (settings) {
      const result = await updateSettings({
        ...settings,
        notifications: newNotifications,
      });
      if (!result.success) {
        setMessage({ type: 'error', text: result.error || '알림 설정 변경에 실패했습니다.' });
      }
    }
  };

  const handlePrivacyChange = async (type: keyof typeof privacy, value: string | boolean) => {
    const newPrivacy = { ...privacy, [type]: value };
    setPrivacy(newPrivacy);
    if (settings) {
      const result = await updateSettings({
        ...settings,
        privacy: newPrivacy,
      });
      if (result.success) {
        setMessage({ type: 'success', text: '개인정보 설정이 변경되었습니다.' });
      } else {
        setMessage({ type: 'error', text: result.error || '개인정보 설정 변경에 실패했습니다.' });
      }
    }
  };

  const handlePasswordChange = async () => {
    const result = await changePassword(passwordData);
    if (result.success) {
      setMessage({ type: 'success', text: '비밀번호가 성공적으로 변경되었습니다.' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowPasswordForm(false);
    } else {
      setMessage({ type: 'error', text: result.error || '비밀번호 변경에 실패했습니다.' });
    }
  };

  const handleAccountDelete = async () => {
    if (window.confirm('정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      const result = await deleteAccount();
      if (result.success) {
        setMessage({ type: 'success', text: '계정이 삭제되었습니다.' });
        // 로그아웃 처리 또는 홈페이지로 리다이렉트
      } else {
        setMessage({ type: 'error', text: result.error || '계정 삭제에 실패했습니다.' });
      }
    }
  };

  const renderGeneralSettings = () => (
    <SettingCard>
      <SectionSubtitle>{t('myPage.settings.privacy', '개인정보 설정')}</SectionSubtitle>
      <SettingGroup>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>{t('myPage.settings.profileVisibility', '프로필 공개')}</SettingTitle>
            <SettingDescription>다른 사용자가 내 프로필을 볼 수 있는지 설정합니다</SettingDescription>
          </SettingLabel>
          <FormSelect
            value={privacy.profileVisibility}
            onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="public">{t('myPage.settings.public', '공개')}</option>
            <option value="private">{t('myPage.settings.private', '비공개')}</option>
          </FormSelect>
        </SettingRow>
      </SettingGroup>

      <SettingGroup>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>{t('myPage.settings.dataSharing', '데이터 공유')}</SettingTitle>
            <SettingDescription>서비스 개선을 위한 익명 데이터 공유에 동의합니다</SettingDescription>
          </SettingLabel>
          <Switch>
            <input
              type="checkbox"
              checked={privacy.dataSharing}
              onChange={(e) => handlePrivacyChange('dataSharing', e.target.checked)}
            />
            <span></span>
          </Switch>
        </SettingRow>
      </SettingGroup>
    </SettingCard>
  );

  const renderNotificationSettings = () => (
    <SettingCard>
      <SectionSubtitle>{t('myPage.settings.notifications', '알림 설정')}</SectionSubtitle>
      
      <SettingGroup>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>{t('myPage.settings.emailNotifications', '이메일 알림')}</SettingTitle>
            <SettingDescription>중요한 업데이트와 공지사항을 이메일로 받습니다</SettingDescription>
          </SettingLabel>
          <Switch>
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={(e) => handleNotificationChange('email', e.target.checked)}
            />
            <span></span>
          </Switch>
        </SettingRow>
      </SettingGroup>

      <SettingGroup>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>{t('myPage.settings.pushNotifications', '푸시 알림')}</SettingTitle>
            <SettingDescription>실시간 알림을 브라우저에서 받습니다</SettingDescription>
          </SettingLabel>
          <Switch>
            <input
              type="checkbox"
              checked={notifications.push}
              onChange={(e) => handleNotificationChange('push', e.target.checked)}
            />
            <span></span>
          </Switch>
        </SettingRow>
      </SettingGroup>

      <SettingGroup>
        <SettingRow>
          <SettingLabel>
            <SettingTitle>{t('myPage.settings.smsNotifications', 'SMS 알림')}</SettingTitle>
            <SettingDescription>긴급한 알림을 SMS로 받습니다</SettingDescription>
          </SettingLabel>
          <Switch>
            <input
              type="checkbox"
              checked={notifications.sms}
              onChange={(e) => handleNotificationChange('sms', e.target.checked)}
            />
            <span></span>
          </Switch>
        </SettingRow>
      </SettingGroup>
    </SettingCard>
  );

  const renderSecuritySettings = () => (
    <Card>
      <SectionSubtitle>{t('myPage.settings.password', '비밀번호 변경')}</SectionSubtitle>
      
      {!showPasswordForm ? (
        <ButtonGroup>
          <PrimaryButton onClick={() => setShowPasswordForm(true)}>
            {t('myPage.settings.changePassword', '비밀번호 변경')}
          </PrimaryButton>
        </ButtonGroup>
      ) : (
        <>
          <FormGroup>
            <FormLabel>{t('myPage.settings.currentPassword', '현재 비밀번호')}</FormLabel>
            <FormInput
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
              placeholder={t('myPage.settings.currentPasswordPlaceholder', '현재 비밀번호를 입력하세요')}
            />
            {validationErrors.currentPassword && (
              <ErrorMessage>{validationErrors.currentPassword}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel>{t('myPage.settings.newPassword', '새 비밀번호')}</FormLabel>
            <FormInput
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
              placeholder={t('myPage.settings.newPasswordPlaceholder', '새 비밀번호를 입력하세요')}
            />
            {validationErrors.newPassword && (
              <ErrorMessage>{validationErrors.newPassword}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <FormLabel>{t('myPage.settings.confirmPassword', '새 비밀번호 확인')}</FormLabel>
            <FormInput
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder={t('myPage.settings.confirmPasswordPlaceholder', '새 비밀번호를 다시 입력하세요')}
            />
            {validationErrors.confirmPassword && (
              <ErrorMessage>{validationErrors.confirmPassword}</ErrorMessage>
            )}
          </FormGroup>

          <ButtonGroup>
            <PrimaryButton onClick={handlePasswordChange}>
              {t('myPage.settings.savePassword', '비밀번호 변경')}
            </PrimaryButton>
            <SecondaryButton onClick={() => {
              setShowPasswordForm(false);
              setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }}>
              {t('myPage.settings.cancel', '취소')}
            </SecondaryButton>
          </ButtonGroup>
        </>
      )}
    </Card>
  );

  const renderAccountSettings = () => (
    <Card>
      <SectionSubtitle>{t('myPage.settings.account', '계정 관리')}</SectionSubtitle>
      
      <FormGroup>
        <InfoRow>
          <InfoLabel>{t('myPage.settings.accountStatus', '계정 상태')}</InfoLabel>
          <InfoValue>{t('myPage.settings.active', '활성')}</InfoValue>
        </InfoRow>
      </FormGroup>

      <FormGroup>
        <InfoRow>
          <InfoLabel>{t('myPage.settings.memberSince', '가입일')}</InfoLabel>
          <InfoValue>{settings ? new Date().toLocaleDateString() : '-'}</InfoValue>
        </InfoRow>
      </FormGroup>

      <ButtonGroup>
        <DangerButton onClick={handleAccountDelete}>
          {t('myPage.settings.deleteAccount', '계정 삭제')}
        </DangerButton>
      </ButtonGroup>
    </Card>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'account':
        return renderAccountSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <Section>
      <SectionTitle>{t('myPage.settings.title', '설정')}</SectionTitle>
      
      {message && (
        message.type === 'success' ? (
          <SuccessMessage>{message.text}</SuccessMessage>
        ) : (
          <ErrorMessage>{message.text}</ErrorMessage>
        )
      )}

      <TabContainer>
        <TabButton
          $isActive={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
        >
          {t('myPage.settings.general', '일반')}
        </TabButton>
        <TabButton
          $isActive={activeTab === 'notifications'}
          onClick={() => setActiveTab('notifications')}
        >
          {t('myPage.settings.notifications', '알림')}
        </TabButton>
        <TabButton
          $isActive={activeTab === 'security'}
          onClick={() => setActiveTab('security')}
        >
          {t('myPage.settings.security', '보안')}
        </TabButton>
        <TabButton
          $isActive={activeTab === 'account'}
          onClick={() => setActiveTab('account')}
        >
          {t('myPage.settings.account', '계정')}
        </TabButton>
      </TabContainer>

      {renderTabContent()}
    </Section>
  );
};

export default SettingsSection;
