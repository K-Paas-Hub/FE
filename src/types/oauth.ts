import { UserType, Language } from './common';

export interface GoogleOAuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface OAuthAdditionalInfo {
  phone: string;
  address: string;
  nationality: string;
  visaType: string;
  hasVisa: boolean;
  visaIssueDate?: string;
  visaExpiryDate?: string;
  userType: UserType;
  language: Language;
}

export interface OAuthFormData extends OAuthAdditionalInfo {
  googleUser: GoogleOAuthUser;
}
