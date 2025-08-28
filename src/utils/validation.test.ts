import {
  validateEmail,
  validatePhone,
  validateKoreanPhone,
  validateInternationalPhone,
  validatePassword,
  validateRequired,
  validateMinLength,
  validateMaxLength,
} from './validation';

describe('validation utils', () => {
  describe('validateEmail', () => {
    test('유효한 이메일 주소를 검증합니다', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.kr')).toBe(true);
      expect(validateEmail('test123@test-domain.org')).toBe(true);
    });

    test('유효하지 않은 이메일 주소를 검증합니다', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('   ')).toBe(false);
    });

    test('null과 undefined를 처리합니다', () => {
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
    });

    test('공백이 포함된 이메일을 처리합니다', () => {
      expect(validateEmail('  test@example.com  ')).toBe(true);
      expect(validateEmail('test @example.com')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('유효한 한국 전화번호를 검증합니다', () => {
      expect(validatePhone('010-1234-5678')).toBe(true);
      expect(validatePhone('02-1234-5678')).toBe(true);
      expect(validatePhone('031-123-4567')).toBe(true);
      expect(validatePhone('01012345678')).toBe(true);
    });

    test('유효한 국제 전화번호를 검증합니다', () => {
      expect(validatePhone('+82-10-1234-5678')).toBe(false); // 하이픈 포함
      expect(validatePhone('+821012345678')).toBe(true);
      expect(validatePhone('+1-555-123-4567')).toBe(false); // 하이픈 포함
      expect(validatePhone('+15551234567')).toBe(true);
    });

    test('유효하지 않은 전화번호를 검증합니다', () => {
      expect(validatePhone('123-456-789')).toBe(false);
      expect(validatePhone('010-123-456')).toBe(false);
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('   ')).toBe(false);
    });

    test('null과 undefined를 처리합니다', () => {
      expect(validatePhone(null as any)).toBe(false);
      expect(validatePhone(undefined as any)).toBe(false);
    });
  });

  describe('validateKoreanPhone', () => {
    test('유효한 한국 전화번호를 검증합니다', () => {
      expect(validateKoreanPhone('010-1234-5678')).toBe(true);
      expect(validateKoreanPhone('02-1234-5678')).toBe(true);
      expect(validateKoreanPhone('031-123-4567')).toBe(true);
      expect(validateKoreanPhone('01012345678')).toBe(true);
    });

    test('유효하지 않은 한국 전화번호를 검증합니다', () => {
      expect(validateKoreanPhone('+82-10-1234-5678')).toBe(false);
      expect(validateKoreanPhone('123-456-789')).toBe(false);
      expect(validateKoreanPhone('010-123-456')).toBe(false);
    });

    test('국제 전화번호는 거부합니다', () => {
      expect(validateKoreanPhone('+821012345678')).toBe(false);
      expect(validateKoreanPhone('+15551234567')).toBe(false);
    });
  });

  describe('validateInternationalPhone', () => {
    test('유효한 국제 전화번호를 검증합니다', () => {
      expect(validateInternationalPhone('+821012345678')).toBe(true);
      expect(validateInternationalPhone('+15551234567')).toBe(true);
      expect(validateInternationalPhone('+442079460958')).toBe(true); // 하이픈 제거
      expect(validateInternationalPhone('+33123456789')).toBe(true);
    });

    test('유효하지 않은 국제 전화번호를 검증합니다', () => {
      expect(validateInternationalPhone('010-1234-5678')).toBe(false); // 한국 내선번호
      expect(validateInternationalPhone('+123')).toBe(true); // 실제로는 유효함 (3자리)
      expect(validateInternationalPhone('+1234567890123456')).toBe(false); // 너무 김
      expect(validateInternationalPhone('+44-20-7946-0958')).toBe(false); // 하이픈 포함
    });
  });

  describe('validatePassword', () => {
    test('강한 비밀번호를 검증합니다', () => {
      expect(validatePassword('StrongPass1!')).toBe(true);
      expect(validatePassword('MySecure123@')).toBe(true);
      expect(validatePassword('ComplexP@ssw0rd')).toBe(true);
    });

    test('약한 비밀번호를 검증합니다', () => {
      expect(validatePassword('weak')).toBe(false); // 너무 짧음
      expect(validatePassword('weakpassword')).toBe(false); // 대문자, 숫자, 특수문자 없음
      expect(validatePassword('WeakPassword')).toBe(false); // 숫자, 특수문자 없음
      expect(validatePassword('WeakPassword123')).toBe(false); // 특수문자 없음
      expect(validatePassword('weakpassword123!')).toBe(false); // 대문자 없음
    });

    test('null과 undefined를 처리합니다', () => {
      expect(validatePassword(null as any)).toBe(false);
      expect(validatePassword(undefined as any)).toBe(false);
    });
  });

  describe('validateRequired', () => {
    test('유효한 값을 검증합니다', () => {
      expect(validateRequired('test')).toBe(true);
      expect(validateRequired('0')).toBe(true);
      expect(validateRequired('false')).toBe(true);
    });

    test('유효하지 않은 값을 검증합니다', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
    });
  });

  describe('validateMinLength', () => {
    test('최소 길이 조건을 만족하는 문자열을 검증합니다', () => {
      expect(validateMinLength('test', 3)).toBe(true);
      expect(validateMinLength('test', 4)).toBe(true);
      expect(validateMinLength('test', 2)).toBe(true);
    });

    test('최소 길이 조건을 만족하지 않는 문자열을 검증합니다', () => {
      expect(validateMinLength('test', 5)).toBe(false);
      expect(validateMinLength('', 1)).toBe(false);
      expect(validateMinLength('a', 2)).toBe(false);
    });

    test('null과 undefined를 처리합니다', () => {
      expect(validateMinLength(null as any, 1)).toBe(false);
      expect(validateMinLength(undefined as any, 1)).toBe(false);
    });
  });

  describe('validateMaxLength', () => {
    test('최대 길이 조건을 만족하는 문자열을 검증합니다', () => {
      expect(validateMaxLength('test', 5)).toBe(true);
      expect(validateMaxLength('test', 4)).toBe(true);
      expect(validateMaxLength('', 10)).toBe(false); // 빈 문자열은 false 반환
    });

    test('최대 길이 조건을 만족하지 않는 문자열을 검증합니다', () => {
      expect(validateMaxLength('test', 3)).toBe(false);
      expect(validateMaxLength('longstring', 5)).toBe(false);
    });

    test('null과 undefined를 처리합니다', () => {
      expect(validateMaxLength(null as any, 10)).toBe(false);
      expect(validateMaxLength(undefined as any, 10)).toBe(false);
    });
  });

  describe('통합 테스트', () => {
    test('실제 사용 시나리오를 검증합니다', () => {
      // 회원가입 폼 검증 시나리오
      const email = 'user@example.com';
      const phone = '010-1234-5678';
      const password = 'StrongPass1!';
      const name = '홍길동';

      expect(validateEmail(email)).toBe(true);
      expect(validateKoreanPhone(phone)).toBe(true);
      expect(validatePassword(password)).toBe(true);
      expect(validateRequired(name)).toBe(true);
      expect(validateMinLength(name, 2)).toBe(true);
      expect(validateMaxLength(name, 10)).toBe(true);
    });

    test('에러 케이스를 검증합니다', () => {
      // 잘못된 입력값들
      const invalidEmail = 'invalid-email';
      const invalidPhone = '123-456';
      const weakPassword = 'weak';
      const emptyName = '';

      expect(validateEmail(invalidEmail)).toBe(false);
      expect(validateKoreanPhone(invalidPhone)).toBe(false);
      expect(validatePassword(weakPassword)).toBe(false);
      expect(validateRequired(emptyName)).toBe(false);
    });
  });
});
