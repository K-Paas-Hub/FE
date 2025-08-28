# 테스트 개선 가이드라인

## 🎯 현재 상황

### 테스트 커버리지 현황
- **전체 커버리지**: 7.18% (매우 낮음)
- **테스트된 파일**: 9개
- **테스트 케이스**: 164개

### 우선순위 개선 대상

#### 🔴 높은 우선순위 (즉시 테스트 필요)
1. **App.tsx** (0%) - 메인 애플리케이션 컴포넌트
2. **MainPage.tsx** (0%) - 메인 페이지
3. **ResumePage.tsx** (0%) - 이력서 페이지
4. **LoginPage.tsx** (0%) - 로그인 페이지
5. **SignupPage.tsx** (0%) - 회원가입 페이지

#### 🟡 중간 우선순위
1. **VisaCenter.tsx** (0%) - 비자 센터
2. **InterviewPage.tsx** (0%) - 면접 페이지
3. **MyPage.tsx** (0%) - 마이페이지
4. **JobDetailPage.tsx** (0%) - 채용 상세 페이지

#### 🟢 낮은 우선순위
1. **기타 컴포넌트들** - 기능별 테스트

## 🚀 개선 계획

### 1단계: 기본 테스트 인프라 구축 ✅
- [x] Jest 설정 파일 생성
- [x] 테스트 유틸리티 파일 생성
- [x] 커스텀 렌더 함수 구현
- [x] Mock 데이터 헬퍼 함수 생성

### 2단계: 핵심 컴포넌트 테스트 작성
- [x] App.tsx 테스트 생성
- [ ] MainPage.tsx 테스트 작성
- [ ] ResumePage.tsx 테스트 작성
- [ ] LoginPage.tsx 테스트 작성
- [ ] SignupPage.tsx 테스트 작성

### 3단계: 훅 및 서비스 테스트 확장
- [x] useAuth.ts (100%)
- [x] useResumeForm.ts (86.04%)
- [ ] useJobActions.ts (0%)
- [ ] useMyPage.ts (0%)
- [ ] useSpellCheck.ts (0%)

### 4단계: 통합 테스트 작성
- [ ] 페이지 간 네비게이션 테스트
- [ ] API 통합 테스트
- [ ] 사용자 플로우 테스트

## 📋 테스트 작성 규칙

### 컴포넌트 테스트
```typescript
import React from 'react';
import { render, screen, fireEvent } from '../utils/testUtils';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  test('renders without crashing', () => {
    render(<ComponentName />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('handles user interactions', () => {
    render(<ComponentName />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    // 결과 확인
  });

  test('has proper accessibility attributes', () => {
    render(<ComponentName />);
    // 접근성 속성 확인
  });
});
```

### 훅 테스트
```typescript
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCustomHook } from './useCustomHook';

describe('useCustomHook', () => {
  test('returns initial state', () => {
    const { result } = renderHook(() => useCustomHook());
    expect(result.current.data).toBeNull();
  });

  test('handles async operations', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    await act(async () => {
      await result.current.fetchData();
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });
});
```

### 서비스 테스트
```typescript
import { serviceFunction } from './service';

jest.mock('./api');

describe('service', () => {
  test('handles successful API call', async () => {
    const mockData = { id: 1, name: 'Test' };
    mockApi.get.mockResolvedValue({ data: mockData });

    const result = await serviceFunction();
    expect(result).toEqual(mockData);
  });

  test('handles API error', async () => {
    mockApi.get.mockRejectedValue(new Error('API Error'));

    await expect(serviceFunction()).rejects.toThrow('API Error');
  });
});
```

## 🎯 목표

### 단기 목표 (1-2주)
- [ ] 테스트 커버리지 20% 달성
- [ ] 핵심 컴포넌트 테스트 완료
- [ ] CI/CD 파이프라인에 테스트 통합

### 중기 목표 (1개월)
- [ ] 테스트 커버리지 50% 달성
- [ ] 모든 페이지 컴포넌트 테스트 완료
- [ ] 통합 테스트 작성

### 장기 목표 (3개월)
- [ ] 테스트 커버리지 80% 달성
- [ ] E2E 테스트 추가
- [ ] 성능 테스트 추가

## 🔧 도구 및 설정

### 사용 중인 도구
- **Jest**: 테스트 러너
- **React Testing Library**: 컴포넌트 테스트
- **@testing-library/user-event**: 사용자 이벤트 시뮬레이션

### 새로운 스크립트
```bash
npm run test:coverage    # 커버리지 포함 테스트
npm run test:watch       # 감시 모드 테스트
npm run test:ci          # CI 환경용 테스트
```

### 커버리지 임계값
- **Statements**: 20%
- **Branches**: 20%
- **Functions**: 20%
- **Lines**: 20%

## 📝 체크리스트

### 테스트 작성 시 확인사항
- [ ] 컴포넌트가 렌더링되는지 확인
- [ ] 사용자 상호작용 테스트
- [ ] 접근성 속성 확인
- [ ] 에러 상태 처리 테스트
- [ ] 로딩 상태 처리 테스트
- [ ] 비동기 작업 테스트
- [ ] Mock 데이터 사용
- [ ] act() 래핑 적용

### 커밋 전 확인사항
- [ ] 모든 테스트 통과
- [ ] 커버리지 임계값 충족
- [ ] 새로운 기능에 대한 테스트 작성
- [ ] 테스트 코드 리뷰 완료
