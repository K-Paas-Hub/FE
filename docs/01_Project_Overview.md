# Kareer K-PaaS: 프론트엔드 프로젝트 개요

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | Kareer K-PaaS 프론트엔드 프로젝트 개요 |
| **버전** | 2.0 |
| **작성일** | 2025년 1월 |
| **수정일** | 2025년 8월 |
| **작성자** | Kareer Development Team |

## 📋 프로젝트 개요

### **프로젝트명**
Kareer K-PaaS - 공공부문 외국인 근로자 생애주기 관리 플랫폼

### **프로젝트 유형**
React 기반 프론트엔드 서비스 개발

---

## 🎯 프로젝트 목적

### **핵심 가치**
**Simple, Visual, Fast, Trustworthy**
- **Simple**: 외국인 근로자들이 쉽게 사용할 수 있는 인터페이스
- **Visual**: 시각적으로 직관적인 디자인
- **Fast**: 3초 내 응답하는 빠른 서비스
- **Trustworthy**: 정부 인프라 기반의 신뢰할 수 있는 플랫폼

---

## 👥 타겟 사용자

### **1. 외국인 노동자 (Primary Users)**
- **나이**: 20-50대
- **한국어 수준**: TOPIK 2-3급 (기초 수준)
- **스마트폰 보유율**: 95% 이상
- **주요 고민**: 취업 과정, 서류 이해, 면접 준비
- **비자 유형**: E-9 (제조업, 농업, 어업), H-2 (조선족)

### **2. 외국인 유학생 (Secondary Users)**
- **나이**: 20-30대
- **한국어 수준**: TOPIK 4-6급 (중급 이상)
- **주요 고민**: 졸업 후 취업, 비자 연장, 면접 준비
- **비자 유형**: D-2 (유학생)

### **3. 한국인 사업자 (Tertiary Users)**
- **중소기업** 고용주 (50-300명 규모)
- **인력 중개업체**
- **주요 고민**: 외국인 근로자 관리, 서류 처리

### **지원 언어**
- 한국어 (기본)
- 베트남어
- 캄보디아어
- 네팔어
- 인도네시아어
- 중국어
- 태국어

---

## 🚀 핵심 기능 (3개)

### **현재 구현 기능**
1. **문서 파일 업로드**: 근로계약서 불리한 조항 검토 및 분석 (AI 활용)
2. **필요 서류 안내**: 근로계약서, 비자 등 필요 서류 정리 및 안내
3. **면접 안내**: 면접 준비 및 팁 제공

---

## 🏗️ 프론트엔드 기술 스택

### **핵심 기술**
- **React 18**: 사용자 인터페이스 구축
- **JavaScript**: 간단한 개발을 위한 동적 타입
- **CSS**: 기본 스타일링

### **상태 관리**
- **useState, useEffect**: React 기본 훅
- **Context API**: 간단한 전역 상태 관리

### **라우팅**
- **React Router**: 기본 라우팅

### **UI 컴포넌트**
- **기본 HTML/CSS**: 간단한 컴포넌트
- **CSS Framework**: Bootstrap 또는 간단한 CSS 라이브러리

### **다국어 지원**
- **다국어**: 한국어, 베트남어, 캄보디아어, 네팔어, 인도네시아어, 중국어, 태국어 (7개 언어)

---

## 📚 관련 문서

- [🏠 프로젝트 홈](../README.md) - 프로젝트 개요 및 팀 정보
- [📝 요구사항 명세](./02_Requirements_Specification.md) - 상세 기능 요구사항
- [🏗️ 기술 아키텍처](./03_Technical_Architecture.md) - 시스템 설계 및 기술 스택
- [🚀 구현 계획](./04_Implementation_Plan.md) - 개발 단계별 계획
- [💻 개발 가이드라인](../.cursor/rules/fe-development-guidelines.mdc) - 코드 작성 규칙

# Kareer K-PaaS 프론트엔드 개발 가이드라인

## 🎯 프로젝트 개요
- **프로젝트명**: Kareer K-PaaS - 공공부문 외국인 근로자 생애주기 관리 플랫폼
- **기술 스택**: React 19 + TypeScript + styled-components + framer-motion
- **타겟 사용자**: 외국인 근로자, 유학생, 한국인 사업자
- **지원 언어**: 한국어, 베트남어, 캄보디아어, 네팔어, 인도네시아어, 중국어, 태국어

## 🚨 절대 지켜야 할 핵심 원칙

### 1. Git 작업 규칙
- **사용자 허락 없이 커밋 후 푸시 금지**
- 모든 Git 작업 전 사용자 승인 필수
- 커밋 메시지는 명확하고 설명적으로 작성
- 브랜치 작업 시 사용자와 협의 후 진행

### 2. 타입 안정성 (TypeScript)
- `any` 타입 사용 금지
- 모든 컴포넌트에 Props 인터페이스 정의 필수
- API 응답 타입 정의 필수

### 3. 기존 구조 유지
- styled-components + framer-motion 조합 유지
- constants 폴더의 상수 사용 필수
- services 폴더의 API 레이어 활용

### 4. 접근성 고려
- 모든 인터랙티브 요소에 최소 44px 터치 타겟
- 키보드 네비게이션 지원
- 색상 대비 WCAG 2.1 AA 준수

### 5. 반응형 디자인
- 모바일 우선 디자인
- 모든 컴포넌트에 반응형 미디어 쿼리 적용
- 고정 크기 사용 금지

### 6. 스타일 분리 규칙
- **컴포넌트와 스타일 분리 필수**
- styled-components는 `src/styles/components/` 폴더에 별도 파일로 분리
- 스타일 파일 네이밍: `ComponentName.styles.ts`
- 컴포넌트에서 스타일 파일 import하여 사용

## 📁 폴더 구조 규칙
```
src/
├── components/     # 재사용 가능한 컴포넌트
├── services/       # API 관련 로직
├── hooks/          # 커스텀 훅
├── utils/          # 유틸리티 함수
├── constants/      # 상수 정의
├── types/          # TypeScript 타입
└── styles/         # 글로벌 스타일
    ├── components/ # 컴포넌트별 스타일 파일
    ├── common/     # 공통 스타일
    └── theme/      # 테마 설정
```

## 🎨 스타일링 규칙
- styled-components 사용 필수
- COLORS, ANIMATIONS 상수 활용
- CSS-in-JS 패턴 유지
- 인라인 스타일 사용 금지
- **스타일 파일 분리 필수**: 컴포넌트와 스타일을 별도 파일로 관리

## 🔧 컴포넌트 작성 패턴
```typescript
// ✅ 올바른 패턴 - 스타일 분리
// src/components/Button/Button.tsx
import React from 'react';
import { StyledButton } from '../../styles/components/Button.styles';

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      {title}
    </StyledButton>
  );
};

export default Button;

// src/styles/components/Button.styles.ts
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, ANIMATIONS } from '../../constants';

export const StyledButton = styled(motion.button)`
  background: ${COLORS.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  min-height: 44px;
  min-width: 44px;
  
  &:hover {
    background: ${COLORS.primaryHover};
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;
```

## 🌐 다국어 지원 준비
- 모든 텍스트는 번역 키로 관리
- 하드코딩된 한글 텍스트 사용 금지
- 향후 7개 언어 지원 고려

## 🔒 보안 고려사항
- 입력 검증 필수
- XSS 방지
- API 토큰 안전한 관리
- 민감한 정보 로컬 스토리지 저장 금지

## 📱 성능 요구사항
- 3초 내 응답 목표
- React.memo, useMemo, useCallback 활용
- 이미지 최적화
- 번들 크기 최적화

## 🧪 테스트 작성
- 모든 컴포넌트에 단위 테스트 작성
- API 통합 테스트 작성
- 접근성 테스트 포함

## 📝 문서화
- 모든 컴포넌트에 JSDoc 주석
- 복잡한 로직에 인라인 주석
- README 파일 업데이트

## ⚠️ 금지사항
- any 타입 사용
- 직접 DOM 조작
- 전역 변수 사용
- console.log 프로덕션 코드에 남기기
- 하드코딩된 값 사용
- **사용자 허락 없이 Git 커밋 및 푸시**
- **자동으로 브랜치 생성 및 병합**
- **사용자 승인 없이 코드 변경사항 적용**
- **컴포넌트 파일에 스타일 코드 직접 작성**

## 🏗️ 프로젝트 빌드 검증

### 1. 전체 프로젝트 빌드 검증
```bash
# 의존성 설치 확인
npm install

# TypeScript 타입 체크
npx tsc --noEmit

# 프로덕션 빌드
npm run build

# 빌드 성공 확인
# - build 폴더 생성
# - 에러 메시지 없음
# - 번들 크기 적절함
```

### 2. 프로젝트 구조 검증
```bash
# 폴더 구조 확인
# - components/ 폴더 구조
# - services/ API 레이어
# - constants/ 상수 정의
# - types/ 타입 정의
# - styles/ 스타일 파일 분리

# 파일 네이밍 규칙 확인
# - PascalCase 컴포넌트 파일
# - camelCase 유틸리티 파일
# - ComponentName.styles.ts 스타일 파일
```

### 3. 기술 스택 검증
```bash
# React + TypeScript 호환성
# styled-components 설정
# framer-motion 애니메이션
# 반응형 디자인 적용
# 스타일 파일 분리 확인
```

### 4. 프로젝트 빌드 검증 체크리스트
- [ ] TypeScript 컴파일 에러 없음
- [ ] React 컴포넌트 렌더링 오류 없음
- [ ] styled-components 문법 오류 없음
- [ ] framer-motion 애니메이션 오류 없음
- [ ] API 서비스 레이어 정상 작동
- [ ] 상수 및 타입 정의 완료
- [ ] 접근성 요구사항 충족
- [ ] 반응형 디자인 적용
- [ ] 번들 크기 최적화
- [ ] 빌드 폴더 정상 생성
- [ ] 프로덕션 배포 준비 완료
- [ ] **사용자 승인 후 Git 작업 진행**
- [ ] **스타일 파일 분리 완료**




