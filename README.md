# FairWork K-PaaS

**공공부문 외국인 근로자 생애주기 관리 플랫폼**

K-PaaS 활용 디지털 사회혁신 서비스 개발 공모전 - FairWork 프로젝트

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | FairWork K-PaaS 프로젝트 README |
| **버전** | 2.0 |
| **작성일** | 2025년 1월 |
| **수정일** | 2025년 8월 |
| **작성자** | FairWork Development Team |

## 🎯 프로젝트 소개

FairWork는 외국인 근로자들이 한국에서 안전하고 공정하게 일할 수 있도록 돕는 디지털 플랫폼입니다. AI 기술을 활용하여 근로계약서 검토, 필요 서류 안내, 면접 준비를 지원합니다.

### 핵심 가치
- **Simple**: 외국인 근로자들이 쉽게 사용할 수 있는 인터페이스
- **Visual**: 시각적으로 직관적인 디자인
- **Fast**: 3초 내 응답하는 빠른 서비스
- **Trustworthy**: 정부 인프라 기반의 신뢰할 수 있는 플랫폼

## 🚀 주요 기능

### 1. 문서 파일 업로드
- 근로계약서 불리한 조항 검토 및 분석 (AI 활용)
- PDF, Word, HWP 파일 지원
- 10MB 이하 파일, 5초 내 분석, 85% 이상 정확도

### 2. 필요 서류 안내
- 근로계약서, 비자 등 취업 과정에서 필요한 서류 정리 및 안내
- 10개 이상 비자 유형 지원
- 체크리스트 및 진행 상황 추적

### 3. 면접 안내
- 면접 준비 및 팁 제공
- 5개 이상 면접 유형 지원
- 면접 시뮬레이션 및 실시간 피드백

## 👥 타겟 사용자

### 주요 사용자
- **외국인 노동자**: E-9, H-2 비자 소지자 (20-50대)
- **외국인 유학생**: D-2 비자 소지자 (20-30대)
- **한국인 사업자**: 중소기업 고용주 (50-300명 규모)

### 지원 언어
한국어, 베트남어, 캄보디아어, 네팔어, 인도네시아어, 중국어, 태국어 (7개 언어)

## 🛠️ 기술 스택

- **Frontend**: React 18, JavaScript
- **UI**: CSS, Bootstrap
- **상태 관리**: React Hooks, Context API
- **라우팅**: React Router
- **다국어**: i18n 지원

## 📁 프로젝트 구조

```
FE/
├── docs/                          # 프로젝트 문서
│   ├── 01_Project_Overview.md     # 프로젝트 개요
│   ├── 02_Requirements_Specification.md  # 요구사항 명세
│   ├── 03_Technical_Architecture.md      # 기술 아키텍처
│   └── 04_Implementation_Plan.md         # 구현 계획
├── .cursor/                       # Cursor 개발 가이드라인
│   └── rules/
│       ├── fe-development-guidelines.mdc # 메인 가이드라인
│       ├── github-workflow.mdc           # GitHub 워크플로우
│       ├── code-quality.mdc              # 코드 품질
│       ├── testing-documentation.mdc     # 테스트 & 문서화
│       └── development-environment.mdc   # 개발 환경
├── .github/                       # GitHub 설정
│   ├── ISSUE_TEMPLATE/            # 이슈 템플릿
│   └── pull_request_template.md   # PR 템플릿
├── .git/hooks/                    # Git Hooks
│   ├── pre-commit                 # 커밋 전 체크
│   ├── commit-msg                 # 커밋 메시지 검증
│   └── README.md                  # Hooks 사용법
├── src/                           # 소스 코드
├── public/                        # 정적 파일
└── README.md                      # 프로젝트 설명서
```

## 📚 관련 문서

- [📋 프로젝트 개요](./docs/01_Project_Overview.md) - 프로젝트 목적 및 타겟 사용자
- [📝 요구사항 명세](./docs/02_Requirements_Specification.md) - 상세 기능 요구사항
- [🏗️ 기술 아키텍처](./docs/03_Technical_Architecture.md) - 시스템 설계 및 기술 스택
- [🚀 구현 계획](./docs/04_Implementation_Plan.md) - 개발 단계별 계획
- [💻 개발 가이드라인](./.cursor/rules/fe-development-guidelines.mdc) - 코드 작성 규칙

## 👥 팀원

| 역할 | 이름 | GitHub |
|------|------|--------|
| PM | 최홍석 | [@SMJ426](https://github.com/SMJ426) |
| FE | 김미르 | [@kimmireu0220](https://github.com/kimmireu0220) |
| BE | 임성혁 | [@highcastle01](https://github.com/highcastle01) |
| BE | 홍윤기 | [@yunkihong-dev](https://github.com/yunkihong-dev) |
| BE | 허완 | [@hodu26](https://github.com/hodu26) |

## 🚀 개발 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 빌드
npm run build
```

### 개발 가이드라인
- [GitHub 워크플로우](./.cursor/rules/github-workflow.mdc) - PR, 이슈, 커밋 규칙
- [코드 품질](./.cursor/rules/code-quality.mdc) - React/JavaScript 개발 규칙
- [테스트 & 문서화](./.cursor/rules/testing-documentation.mdc) - 테스트 작성 가이드
- [개발 환경](./.cursor/rules/development-environment.mdc) - 환경 설정

---

**K-PaaS 활용 디지털 사회혁신 서비스 개발 공모전**  
FairWork Team © 2025
