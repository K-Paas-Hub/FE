interface GoogleOAuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface OAuthAdditionalInfo {
  phone: string;
  address: string;
  nationality: string;
  visaType: string;
  hasVisa: boolean;
  visaIssueDate?: string;
  visaExpiryDate?: string;
  userType: 'worker' | 'student' | 'employer';
  language: 'ko' | 'vi' | 'km' | 'ne' | 'id' | 'zh' | 'th';
}

interface OAuthFormData extends OAuthAdditionalInfo {
  googleUser: GoogleOAuthUser;
}

export type { GoogleOAuthUser, OAuthAdditionalInfo, OAuthFormData };
