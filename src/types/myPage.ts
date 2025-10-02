import { AuthUser } from './auth';
import { ApiResponse, UserType, Language } from './common';

// 기존 AuthUser 확장
export interface UserProfile extends AuthUser {
  userType: UserType;
  language: Language;
  phoneNumber?: string;
  nationality?: string;
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 사용자 타입별 확장 인터페이스
export interface WorkerProfile extends UserProfile {
  userType: 'worker';
  visaType: 'E9' | 'H2' | 'E7' | 'D2';
  workPermitNumber?: string;
  employerName?: string;
  contractExpiryDate?: Date;
  documents: {
    passport?: string;
    visa?: string;
    contract?: string;
  };
}

export interface StudentProfile extends UserProfile {
  userType: 'student';
  studentId: string;
  university: string;
  major: string;
  enrollmentDate: Date;
  graduationDate?: Date;
  d2VisaExpiry?: Date;
}

export interface EmployerProfile extends UserProfile {
  userType: 'employer';
  companyName: string;
  businessNumber: string;
  companySize: 'small' | 'medium' | 'large';
  industry: string;
  hiringNeeds: string[];
}

// 설정 타입
export interface UserSettings {
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    dataSharing: boolean;
  };
}

// API 응답 타입 (기존 ApiResponse 패턴 사용)
export interface ProfileResponse extends ApiResponse<UserProfile> {}
export interface SettingsResponse extends ApiResponse<UserSettings> {}

// 비밀번호 변경 타입
export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 프로필 업데이트 타입
export interface ProfileUpdateData {
  fullName?: string;
  phoneNumber?: string;
  nationality?: string;
  language?: string;
}
