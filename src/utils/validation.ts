/**
 * 이메일 형식 검증
 * @param email 검증할 이메일 주소
 * @returns 유효한 이메일 형식이면 true, 아니면 false
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * 전화번호 형식 검증 (한국 및 국제 형식)
 * @param phone 검증할 전화번호
 * @returns 유효한 전화번호 형식이면 true, 아니면 false
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  const trimmedPhone = phone.trim();
  
  // 한국 전화번호 형식
  const koreanPhoneRegex = /^(01[016789]|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  
  // 국제 전화번호 형식
  const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
  
  return koreanPhoneRegex.test(trimmedPhone) || internationalPhoneRegex.test(trimmedPhone);
};

/**
 * 한국 전화번호 형식 검증
 * @param phone 검증할 한국 전화번호
 * @returns 유효한 한국 전화번호 형식이면 true, 아니면 false
 */
export const validateKoreanPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  const trimmedPhone = phone.trim();
  const koreanPhoneRegex = /^(01[016789]|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
  
  return koreanPhoneRegex.test(trimmedPhone);
};

/**
 * 국제 전화번호 형식 검증
 * @param phone 검증할 국제 전화번호
 * @returns 유효한 국제 전화번호 형식이면 true, 아니면 false
 */
export const validateInternationalPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== 'string') return false;
  
  const trimmedPhone = phone.trim();
  const internationalPhoneRegex = /^\+[1-9]\d{1,14}$/;
  
  return internationalPhoneRegex.test(trimmedPhone);
};

/**
 * 비밀번호 강도 검증
 * @param password 검증할 비밀번호
 * @returns 강한 비밀번호이면 true, 아니면 false
 */
export const validatePassword = (password: string): boolean => {
  if (!password || typeof password !== 'string') return false;
  
  // 최소 8자, 대문자, 소문자, 숫자, 특수문자 포함
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  return passwordRegex.test(password);
};

/**
 * 필수 필드 검증
 * @param value 검증할 값
 * @returns 값이 존재하면 true, 아니면 false
 */
export const validateRequired = (value: string | null | undefined): boolean => {
  return value !== null && value !== undefined && value !== '';
};

/**
 * 최소 길이 검증
 * @param value 검증할 문자열
 * @param minLength 최소 길이
 * @returns 최소 길이 이상이면 true, 아니면 false
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  if (!value || typeof value !== 'string') return false;
  return value.length >= minLength;
};

/**
 * 최대 길이 검증
 * @param value 검증할 문자열
 * @param maxLength 최대 길이
 * @returns 최대 길이 이하면 true, 아니면 false
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  if (!value || typeof value !== 'string') return false;
  return value.length <= maxLength;
};

/**
 * URL 형식 검증
 * @param url 검증할 URL
 * @returns 유효한 URL 형식이면 true, 아니면 false
 */
export const validateUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * 날짜 형식 검증 (YYYY-MM-DD)
 * @param date 검증할 날짜
 * @returns 유효한 날짜 형식이면 true, 아니면 false
 */
export const validateDate = (date: string): boolean => {
  if (!date || typeof date !== 'string') return false;
  
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) return false;
  
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return false;
  
  // 입력된 날짜와 파싱된 날짜가 일치하는지 확인
  const [year, month, day] = date.split('-').map(Number);
  return dateObj.getFullYear() === year && 
         dateObj.getMonth() === month - 1 && 
         dateObj.getDate() === day;
};

/**
 * 숫자 형식 검증
 * @param value 검증할 값
 * @returns 숫자이면 true, 아니면 false
 */
export const validateNumber = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return !isNaN(Number(value)) && isFinite(Number(value));
};

/**
 * 정수 형식 검증
 * @param value 검증할 값
 * @returns 정수이면 true, 아니면 false
 */
export const validateInteger = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const num = Number(value);
  return Number.isInteger(num);
};

/**
 * 양수 검증
 * @param value 검증할 값
 * @returns 양수이면 true, 아니면 false
 */
export const validatePositive = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const num = Number(value);
  return !isNaN(num) && num > 0;
};

/**
 * 범위 검증
 * @param value 검증할 값
 * @param min 최소값
 * @param max 최대값
 * @returns 범위 내에 있으면 true, 아니면 false
 */
export const validateRange = (value: string, min: number, max: number): boolean => {
  if (!value || typeof value !== 'string') return false;
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * 한글 형식 검증
 * @param value 검증할 값
 * @returns 한글이면 true, 아니면 false
 */
export const validateKorean = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const koreanRegex = /^[가-힣]+$/;
  return koreanRegex.test(value);
};

/**
 * 영문 형식 검증
 * @param value 검증할 값
 * @returns 영문이면 true, 아니면 false
 */
export const validateEnglish = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const englishRegex = /^[a-zA-Z]+$/;
  return englishRegex.test(value);
};

/**
 * 영문과 숫자 조합 검증
 * @param value 검증할 값
 * @returns 영문과 숫자 조합이면 true, 아니면 false
 */
export const validateAlphanumeric = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(value);
};

/**
 * 특수문자 포함 여부 검증
 * @param value 검증할 값
 * @returns 특수문자가 포함되어 있으면 true, 아니면 false
 */
export const validateHasSpecialChar = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  return specialCharRegex.test(value);
};

/**
 * 공백 포함 여부 검증
 * @param value 검증할 값
 * @returns 공백이 포함되어 있으면 true, 아니면 false
 */
export const validateHasWhitespace = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  return /\s/.test(value);
};

/**
 * 연속된 문자 검증 (예: aaa, 111)
 * @param value 검증할 값
 * @param maxConsecutive 최대 연속 허용 개수
 * @returns 연속된 문자가 maxConsecutive 이하면 true, 아니면 false
 */
export const validateConsecutiveChars = (value: string, maxConsecutive: number = 3): boolean => {
  if (!value || typeof value !== 'string') return false;
  
  for (let i = 0; i <= value.length - maxConsecutive; i++) {
    const consecutive = value.slice(i, i + maxConsecutive);
    if (new Set(consecutive).size === 1) {
      return false;
    }
  }
  
  return true;
};

/**
 * 키보드 순서 검증 (예: qwe, 123)
 * @param value 검증할 값
 * @param maxSequential 최대 순서 허용 개수
 * @returns 키보드 순서가 maxSequential 이하면 true, 아니면 false
 */
export const validateKeyboardSequence = (value: string, maxSequential: number = 3): boolean => {
  if (!value || typeof value !== 'string') return false;
  
  const sequences = [
    'qwertyuiop', 'asdfghjkl', 'zxcvbnm',
    '1234567890', 'abcdefghijklmnopqrstuvwxyz'
  ];
  
  for (const sequence of sequences) {
    for (let i = 0; i <= sequence.length - maxSequential; i++) {
      const seq = sequence.slice(i, i + maxSequential);
      if (value.toLowerCase().includes(seq)) {
        return false;
      }
    }
  }
  
  return true;
};
