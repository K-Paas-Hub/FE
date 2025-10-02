/**
 * 중앙화된 타입 정의 엔트리 파일
 * 모든 타입을 여기서 export하여 일관된 import 경로 제공
 */

// ============================================================================
// 공통 타입
// ============================================================================
export * from './common';

// ============================================================================
// 도메인 타입
// ============================================================================
export * from './auth';
export * from './job';
export * from './myPage';
export * from './oauth';
export * from './postcode';
export * from './spellCheck';
export * from './visa';
export * from './api';

// Resume 타입은 선택적 export (FileData, UploadProgress 중복 방지)
export type { ResumeFormData, ResumeData } from './resume';

// ============================================================================
// 컴포넌트 Props
// ============================================================================
// PostcodeSearchProps는 이미 postcode.ts에서 export
export type {
  InterviewMessageProps,
  InterviewInputProps,
  InterviewChatProps,
  InterviewSettingsProps,
  VisaTypeCardProps,
  LoginFormProps,
  SignupFormProps,
  PasswordResetFormProps,
  ProfileSectionProps,
  SettingsSectionProps,
  ForeignWorkerSpellCheckProps,
  ButtonProps,
  InputProps,
  ModalProps,
  LoadingSpinnerProps,
} from './components';
