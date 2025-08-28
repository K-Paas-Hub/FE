# Kareer K-PaaS: 컴포넌트 라이브러리 문서

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | Kareer K-PaaS 컴포넌트 라이브러리 문서 |
| **버전** | 1.0 |
| **작성일** | 2025년 8월 |
| **작성자** | Kareer Development Team |
| **목적** | UI 컴포넌트 사용법 및 명세 |

---

## 🎯 개요

Kareer 프로젝트는 다음과 같은 컴포넌트 아키텍처를 사용합니다:

- **TypeScript**: 완전한 타입 안전성
- **styled-components**: CSS-in-JS 스타일링
- **framer-motion**: 부드러운 애니메이션
- **react-i18next**: 7개 언어 다국어 지원
- **접근성**: WCAG 2.1 AA 준수

---

## 📁 컴포넌트 구조

### 디렉토리 구조
```
src/components/
├── MainHeader/              # 메인 헤더
├── MainFooter/              # 메인 푸터
├── MainPage/                # 메인 페이지
├── LoginPage/               # 로그인 페이지
├── SignupPage/              # 회원가입 페이지
├── ResumePage/              # 이력서 페이지
├── MyPage/                  # 마이페이지
│   ├── ProfileSection/      # 프로필 섹션
│   ├── SettingsSection/     # 설정 섹션
│   └── UserTypeSection/     # 사용자 유형 섹션
├── InterviewPage/           # 면접 페이지
│   ├── InterviewChat.tsx
│   ├── InterviewInput.tsx
│   ├── InterviewMessage.tsx
│   └── InterviewSettings.tsx
├── VisaCenter/              # 비자 센터
│   ├── VisaCenter.tsx
│   ├── VisaDetailPage.tsx
│   └── VisaTypeCard.tsx
├── SpellCheck/              # 맞춤법 검사
│   ├── ForeignWorkerSpellCheck.tsx
│   ├── SpellCheckResult.tsx
│   └── ResumeSpellCheckResults.tsx
└── ...
```

### 스타일 분리 구조
```
src/styles/components/
├── MainHeader.styles.ts
├── VisaTypeCard.styles.ts
├── SpellCheckResult.styles.ts
└── ...
```

---

## 🧩 핵심 컴포넌트

### MainHeader

메인 헤더 컴포넌트로 애플리케이션의 상단 네비게이션을 담당합니다.

#### Props
이 컴포넌트는 Props를 받지 않습니다. (React.FC)

#### 주요 기능
- **다국어 지원**: 7개 언어 (한국어, 베트남어, 캄보디아어, 네팔어, 인도네시아어, 중국어, 태국어)
- **사용자 인증**: 로그인/로그아웃 상태 관리
- **반응형 네비게이션**: 모바일/데스크톱 대응
- **접근성**: 키보드 네비게이션, ARIA 속성

#### 사용 예제
```tsx
import MainHeader from '../components/MainHeader';

function App() {
  return (
    <div>
      <MainHeader />
      {/* 페이지 콘텐츠 */}
    </div>
  );
}
```

#### 주요 메서드
- `handleLanguageClick()`: 언어 드롭다운 토글
- `handleLanguageSelect(language: string)`: 언어 변경
- 외부 클릭 감지로 드롭다운 자동 닫기

#### 의존성
- `useAuth`: 사용자 인증 상태
- `useLanguage`: 언어 설정 관리
- `react-i18next`: 다국어 번역

---

### VisaTypeCard

비자 유형을 카드 형태로 표시하는 컴포넌트입니다.

#### Props
```typescript
interface VisaTypeCardProps {
  visaType: VisaType;
  onClick: () => void;
}
```

#### VisaType 타입
```typescript
interface VisaType {
  id: string;              // 비자 ID (e9, h2, d2 등)
  name: string;            // 비자 이름 (E-9, H-2 등)
  fullName: string;        // 비자 전체 명칭
  description: string;     // 비자 설명
  duration: string;        // 체류기간
  extension: boolean;      // 연장 가능 여부
  documents: Document[];   // 필요 서류 목록
}
```

#### 주요 기능
- **애니메이션**: framer-motion으로 호버/클릭 효과
- **접근성**: 키보드 네비게이션 지원 (Enter, Space)
- **다국어**: 모든 텍스트 번역 지원
- **아이콘 매핑**: 비자 유형별 고유 아이콘

#### 사용 예제
```tsx
import VisaTypeCard from '../components/VisaCenter/VisaTypeCard';

const visaData: VisaType = {
  id: 'e9',
  name: 'E-9',
  fullName: '비전문취업(E-9)',
  description: '제조업, 농업, 어업 등 단순기능직종 근로자',
  duration: '3년',
  extension: true,
  documents: [
    { name: '여권', required: true },
    { name: '비자신청서', required: true }
  ]
};

function VisaList() {
  const handleCardClick = () => {
    console.log('카드 클릭됨');
  };

  return (
    <VisaTypeCard 
      visaType={visaData} 
      onClick={handleCardClick}
    />
  );
}
```

#### 아이콘 매핑
```typescript
const getVisaIcon = (visaId: string) => {
  switch (visaId) {
    case 'e9': return '/images/visa/conveyor.png';      // 제조업
    case 'h2': return '/images/visa/labourer.png';      // 방문취업
    case 'd2': return '/images/visa/graduation-hat.png'; // 유학
    case 'e7': return '/images/visa/portfolio.png';     // 전문인력
    case 'e8': return '/images/visa/settings.png';      // 투자
    case 'e6': return '/images/visa/paint-palette.png'; // 예술흥행
    case 'c4': return '/images/visa/alarm-clock.png';   // 단기취업
    case 'f4': return '/images/earth.png';              // 재외동포
    default: return '/images/visa/portfolio.png';
  }
};
```

---

### SpellCheckResult

맞춤법 검사 결과를 표시하는 컴포넌트입니다.

#### Props
```typescript
interface SpellCheckResultProps {
  result: ResumeCheckResult;
  onApplyCorrection: (section: string, corrections: SpellCheckError[]) => void;
}
```

#### ResumeCheckResult 타입
```typescript
interface ResumeCheckResult {
  sections: {
    sectionName: string;
    errors: SpellCheckError[];
  }[];
  overallStatistics: {
    totalWords: number;
    totalErrors: number;
    overallAccuracy: number;
  };
}
```

#### 주요 기능
- **통계 표시**: 총 단어 수, 발견된 오류, 정확도
- **섹션별 오류**: 이름, 이메일, 경력 등 섹션별 오류 분류
- **수정 제안**: 각 오류에 대한 수정 제안 제공
- **일괄 적용**: 섹션별로 모든 수정 사항 일괄 적용

#### 사용 예제
```tsx
import SpellCheckResult from '../components/SpellCheck/SpellCheckResult';

const checkResult: ResumeCheckResult = {
  sections: [
    {
      sectionName: 'introduction',
      errors: [
        {
          id: '1',
          word: '잇습니다',
          suggestion: '있습니다',
          description: '받침 오류',
          position: { start: 10, end: 14 }
        }
      ]
    }
  ],
  overallStatistics: {
    totalWords: 150,
    totalErrors: 3,
    overallAccuracy: 98.0
  }
};

function SpellCheckPage() {
  const handleApplyCorrection = (section: string, corrections: SpellCheckError[]) => {
    console.log(`${section} 섹션의 ${corrections.length}개 오류 수정 적용`);
  };

  return (
    <SpellCheckResult 
      result={checkResult}
      onApplyCorrection={handleApplyCorrection}
    />
  );
}
```

#### 섹션 이름 매핑
```typescript
const getSectionDisplayName = (section: string): string => {
  const sectionNames: Record<string, string> = {
    name: '이름',
    email: '이메일', 
    phone: '전화번호',
    nationality: '국적',
    visaType: '비자 유형',
    education: '학력',
    experience: '경력',
    skills: '기술 및 자격증',
    languages: '언어 능력',
    introduction: '자기소개'
  };
  
  return sectionNames[section] || section;
};
```

---

## 🎨 스타일링 시스템

### styled-components 사용법

모든 스타일은 별도 파일로 분리되어 있습니다.

#### 기본 패턴
```typescript
// styles/components/ComponentName.styles.ts
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

export const StyledComponent = styled(motion.div)`
  background: ${COLORS.background};
  border-radius: 8px;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
```

#### Props 기반 스타일링
```typescript
interface StyledProps {
  $variant?: 'primary' | 'secondary';
  $active?: boolean;
}

export const StyledButton = styled.button<StyledProps>`
  background: ${props => 
    props.$variant === 'primary' ? COLORS.primary : COLORS.secondary
  };
  opacity: ${props => props.$active ? 1 : 0.7};
`;
```

### 애니메이션 시스템

framer-motion을 사용한 일관된 애니메이션입니다.

#### 기본 애니메이션
```typescript
// 호버 효과
whileHover={{ 
  scale: 1.02,
  y: -4,
  transition: { duration: 0.2, ease: "easeOut" }
}}

// 클릭 효과
whileTap={{ 
  scale: 0.98,
  transition: { duration: 0.1 }
}}

// 페이드 인
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

---

## 🌐 다국어 지원

### 사용법

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{t('page.description')}</p>
    </div>
  );
}
```

### 번역 키 네이밍 규칙

```typescript
// 공통 용어
'common.save'
'common.cancel'
'common.loading'

// 페이지별
'header.jobPostings'
'visaCenter.title'
'resume.introduction'

// 컴포넌트별
'spellCheck.errorCount'
'interview.startSession'
```

### 지원 언어

| 코드 | 언어 | 플래그 |
|------|------|--------|
| ko | 한국어 | 🇰🇷 |
| vi | 베트남어 | 🇻🇳 |
| km | 캄보디아어 | 🇰🇭 |
| ne | 네팔어 | 🇳🇵 |
| id | 인도네시아어 | 🇮🇩 |
| zh | 중국어 | 🇨🇳 |
| th | 태국어 | 🇹🇭 |

---

## ♿ 접근성 (Accessibility)

### 키보드 네비게이션

모든 인터랙티브 요소는 키보드로 접근 가능합니다.

```typescript
// 키보드 이벤트 처리 예제
onKeyPress={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    onClick();
  }
}}
```

### ARIA 속성

```typescript
// 버튼 역할과 라벨
role="button"
aria-label={`${visaType.name} ${t('visaCenter.card.viewInfo')}`}
tabIndex={0}

// 상태 표시
aria-expanded={isOpen}
aria-selected={isSelected}
```

### 최소 터치 타겟

모든 클릭 가능한 요소는 최소 44px 크기를 보장합니다.

```typescript
export const TouchTarget = styled.button`
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.5rem;
`;
```

---

## 📱 반응형 디자인

### 브레이크포인트

```typescript
// theme/breakpoints.ts
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  largeDesktop: '1440px'
};
```

### 반응형 스타일

```typescript
export const ResponsiveComponent = styled.div`
  // 데스크톱 기본
  padding: 2rem;
  font-size: 1rem;
  
  // 태블릿
  @media (max-width: 1024px) {
    padding: 1.5rem;
    font-size: 0.95rem;
  }
  
  // 모바일
  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
  }
  
  // 작은 모바일
  @media (max-width: 480px) {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
`;
```

---

## 🧪 테스트

### 컴포넌트 테스트 예제

```typescript
// MainHeader.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import MainHeader from './MainHeader';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('MainHeader Component', () => {
  test('renders main header elements', () => {
    renderWithProviders(<MainHeader />);
    
    expect(screen.getByText('Kareer')).toBeInTheDocument();
    expect(screen.getByText('한국어')).toBeInTheDocument();
  });

  test('supports keyboard navigation', () => {
    renderWithProviders(<MainHeader />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    loginButton.focus();
    
    expect(loginButton).toHaveFocus();
  });
});
```

### 접근성 테스트

```typescript
test('has proper ARIA labels', () => {
  renderWithProviders(<MainHeader />);
  
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
```

---

## 🔧 컴포넌트 개발 가이드라인

### 새 컴포넌트 생성 체크리스트

- [ ] **TypeScript 인터페이스**: Props와 상태에 대한 타입 정의
- [ ] **스타일 분리**: 별도 `.styles.ts` 파일 생성
- [ ] **다국어 지원**: 모든 텍스트 번역 키 사용
- [ ] **접근성**: ARIA 속성, 키보드 네비게이션 지원
- [ ] **반응형**: 모바일/태블릿/데스크톱 대응
- [ ] **애니메이션**: framer-motion 일관된 사용
- [ ] **테스트 작성**: 단위 테스트 및 접근성 테스트
- [ ] **문서화**: JSDoc 주석과 사용 예제

### Props 인터페이스 패턴

```typescript
// 기본 패턴
interface ComponentNameProps {
  // 필수 props
  title: string;
  onClick: () => void;
  
  // 선택적 props
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  
  // 이벤트 핸들러
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
}
```

### 에러 경계 처리

```typescript
// ErrorBoundary 컴포넌트 사용
function MyPage() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <ComplexComponent />
    </ErrorBoundary>
  );
}
```

---

## 📊 성능 최적화

### React.memo 사용

```typescript
import React, { memo } from 'react';

interface ExpensiveComponentProps {
  data: ComplexData;
  onUpdate: (id: string) => void;
}

const ExpensiveComponent = memo<ExpensiveComponentProps>(({ data, onUpdate }) => {
  // 복잡한 렌더링 로직
  return <div>{/* 컴포넌트 내용 */}</div>;
});
```

### useMemo와 useCallback

```typescript
function OptimizedComponent({ data, filter }: Props) {
  // 계산 비용이 높은 작업 메모화
  const filteredData = useMemo(() => {
    return data.filter(item => item.category === filter);
  }, [data, filter]);
  
  // 콜백 함수 메모화
  const handleClick = useCallback((id: string) => {
    console.log('클릭된 아이템:', id);
  }, []);
  
  return (
    <div>
      {filteredData.map(item => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  );
}
```

---

## 🛠️ 개발 도구

### VSCode 확장

추천 VSCode 확장 프로그램:

- **ES7+ React/Redux/React-Native snippets**: React 코드 스니펫
- **Auto Rename Tag**: JSX 태그 자동 리네임
- **Prettier**: 코드 포맷팅
- **ESLint**: 코드 품질 검사
- **styled-components**: styled-components 문법 지원

### 코드 스니펫

#### React 함수형 컴포넌트 스니펫

```typescript
// rfc
import React from 'react';

interface ${1:ComponentName}Props {
  ${2:prop}: ${3:type};
}

const ${1:ComponentName}: React.FC<${1:ComponentName}Props> = ({ ${2:prop} }) => {
  return (
    <div>
      ${4:// Component content}
    </div>
  );
};

export default ${1:ComponentName};
```

#### styled-components 스니펫

```typescript
// sc
import styled from 'styled-components';

export const Styled${1:Component} = styled.${2:div}`
  ${3:// Styles}
`;
```

---

## 📚 관련 문서

- [🏠 프로젝트 홈](../README.md) - 프로젝트 개요
- [📝 API 문서](./06_API_Documentation.md) - API 서비스 레이어
- [🎨 스타일 분리 가이드](./05_Style_Separation_Guidelines.md) - 스타일링 규칙
- [🧪 테스트 가이드](./TESTING_GUIDELINES.md) - 테스트 작성 방법
- [🚀 배포 가이드](./08_Deployment_Guide.md) - 배포 매뉴얼

---

## 📝 업데이트 로그

| 버전 | 날짜 | 변경사항 |
|------|------|----------|
| 1.0 | 2025-08-28 | 초기 컴포넌트 라이브러리 문서 작성 |

---

**문서 작성자**: Kareer Development Team  
**최종 수정일**: 2025년 8월 28일