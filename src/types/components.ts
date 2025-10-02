/**
 * 컴포넌트 Props 타입 정의
 */

import { ReactNode } from 'react';
import { Message } from '../components/InterviewPage/InterviewChat';
import { VisaType } from './visa';
import { AddressData, PostcodeTheme } from './postcode';
import { UserProfile, UserSettings } from './myPage';

// ============================================================================
// 인터뷰 관련 Props
// ============================================================================

export interface InterviewMessageProps {
  message: Message;
}

export interface InterviewInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export interface InterviewChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export interface InterviewSettingsProps {
  jobPosition: string;
  interviewType: string;
  difficulty: string;
  onSettingsChange: (settings: {
    jobPosition: string;
    interviewType: string;
    difficulty: string;
  }) => void;
}

// ============================================================================
// 비자 관련 Props
// ============================================================================

export interface VisaTypeCardProps {
  visaType: VisaType;
  onClick: () => void;
}

// ============================================================================
// 주소 검색 Props
// ============================================================================

export interface PostcodeSearchProps {
  onAddressSelect: (address: AddressData) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  showDetailAddress?: boolean;
  showRoadAddress?: boolean;
  showJibunAddress?: boolean;
  theme?: PostcodeTheme;
}

// ============================================================================
// 인증 관련 Props
// ============================================================================

export interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface SignupFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface PasswordResetFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

// ============================================================================
// 마이페이지 관련 Props
// ============================================================================

export interface ProfileSectionProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => Promise<void>;
  isLoading?: boolean;
}

export interface SettingsSectionProps {
  settings: UserSettings;
  onUpdate: (settings: Partial<UserSettings>) => Promise<void>;
  isLoading?: boolean;
}

// ============================================================================
// 맞춤법 검사 Props
// ============================================================================

export interface ForeignWorkerSpellCheckProps {
  initialText?: string;
  onCheckComplete?: (result: unknown) => void;
}

// ============================================================================
// 공통 컴포넌트 Props
// ============================================================================

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  error?: string;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}
