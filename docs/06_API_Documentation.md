# Kareer K-PaaS: API 문서

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | Kareer K-PaaS API 문서 |
| **버전** | 1.0 |
| **작성일** | 2025년 8월 |
| **작성자** | Kareer Development Team |
| **목적** | API 서비스 레이어 사용법 및 명세 |

---

## 🎯 개요

Kareer 프로젝트의 API 레이어는 다음과 같이 구성되어 있습니다:

- **API 클라이언트**: 중앙화된 HTTP 요청 처리
- **인증 서비스**: Supabase 기반 사용자 인증
- **비즈니스 서비스**: 채용, 사용자, 회사, 비자, 이력서 관리
- **맞춤법 검사**: 외국인 근로자 특화 맞춤법 검사 시스템

---

## 🏗️ API 아키텍처

### 구조도
```
┌─────────────────────────────────────────────────────────────┐
│                    Kareer API Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ ApiClient   │  │AuthService  │  │   Business  │         │
│  │   Core      │  │ (Supabase)  │  │  Services   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Service Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   jobService│  │ userService │  │visaService  │         │
│  │             │  │             │  │             │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐                          │
│  │resumeService│  │spellCheck   │                          │
│  │             │  │Service      │                          │
│  └─────────────┘  └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 API 클라이언트 (api.ts)

### ApiClient 클래스

중앙화된 HTTP 요청 처리를 담당하는 핵심 클래스입니다.

#### 생성자
```typescript
class ApiClient {
  constructor(baseURL: string = API_ENDPOINTS.base)
}
```

#### 기본 메서드

**GET 요청**
```typescript
async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>>
```

**POST 요청**
```typescript
async post<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>>
```

**PUT 요청**
```typescript
async put<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>>
```

**DELETE 요청**
```typescript
async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>>
```

**PATCH 요청**
```typescript
async patch<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<ApiResponse<T>>
```

#### 특징
- **자동 토큰 관리**: localStorage에서 authToken을 자동으로 헤더에 추가
- **에러 처리**: 통일된 에러 응답 형식
- **JSON 자동 처리**: Content-Type 자동 설정

#### 사용 예제
```typescript
import { apiClient } from '../services/api';

// GET 요청
const response = await apiClient.get<UserData>('/users/profile');
if (response.success) {
  console.log(response.data);
} else {
  console.error(response.error);
}

// POST 요청
const createResponse = await apiClient.post('/users', {
  name: '홍길동',
  email: 'hong@example.com'
});
```

### API 응답 타입

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

---

## 🔐 인증 서비스 (authService.ts)

### Supabase 기반 인증

Supabase를 사용한 사용자 인증 시스템입니다.

#### 설정
```typescript
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
```

#### AuthService 클래스

**로그아웃**
```typescript
async signOut(): Promise<AuthResponse>
```

**현재 사용자 정보 가져오기**
```typescript
async getCurrentUser(): Promise<UserResponse>
```

**인증 상태 변경 감지**
```typescript
onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void): Subscription
```

#### 사용 예제
```typescript
import { authService } from '../services/authService';

// 로그아웃
const { error } = await authService.signOut();
if (error) {
  console.error('로그아웃 실패:', error.message);
}

// 현재 사용자 정보
const { data: { user } } = await authService.getCurrentUser();
console.log('현재 사용자:', user);

// 인증 상태 변경 감지
const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
  console.log('인증 상태 변경:', event, session);
});
```

---

## 👤 사용자 서비스 (userService)

### 사용자 관련 API

**프로필 조회**
```typescript
getProfile(): Promise<ApiResponse<UserData>>
```

**프로필 업데이트**
```typescript
updateProfile(userData: UserData): Promise<ApiResponse<UserData>>
```

**사용자 목록 조회**
```typescript
getUsers(params?: Record<string, string>): Promise<ApiResponse<UserData[]>>
```

#### 사용 예제
```typescript
import { userService } from '../services/api';

// 프로필 조회
const response = await userService.getProfile();
if (response.success) {
  const profile = response.data;
  console.log('사용자 프로필:', profile);
}

// 프로필 업데이트
const updateResponse = await userService.updateProfile({
  name: '김철수',
  email: 'kim@example.com'
});
```

---

## 💼 채용 서비스 (jobService)

### 채용 공고 관련 API

**채용 공고 목록**
```typescript
getJobs(params?: Record<string, string>): Promise<ApiResponse<JobData[]>>
```

**채용 공고 상세**
```typescript
getJob(id: string): Promise<ApiResponse<JobData>>
```

**채용 공고 생성**
```typescript
createJob(jobData: JobData): Promise<ApiResponse<JobData>>
```

**채용 공고 수정**
```typescript
updateJob(id: string, jobData: JobData): Promise<ApiResponse<JobData>>
```

**채용 공고 삭제**
```typescript
deleteJob(id: string): Promise<ApiResponse<void>>
```

#### 사용 예제
```typescript
import { jobService } from '../services/api';

// 채용 공고 검색
const jobs = await jobService.getJobs({
  category: 'manufacturing',
  location: 'seoul',
  page: '1',
  limit: '10'
});

// 채용 공고 상세
const jobDetail = await jobService.getJob('job-123');
```

---

## 🏢 회사 서비스 (companyService)

### 회사 정보 관련 API

**회사 목록**
```typescript
getCompanies(params?: Record<string, string>): Promise<ApiResponse<CompanyData[]>>
```

**회사 상세**
```typescript
getCompany(id: string): Promise<ApiResponse<CompanyData>>
```

**회사 정보 생성**
```typescript
createCompany(companyData: CompanyData): Promise<ApiResponse<CompanyData>>
```

**회사 정보 수정**
```typescript
updateCompany(id: string, companyData: CompanyData): Promise<ApiResponse<CompanyData>>
```

---

## 🛂 비자 서비스 (visaService)

### 비자 관련 API

**비자 유형 목록**
```typescript
getVisaTypes(): Promise<ApiResponse<VisaType[]>>
```

**특정 비자 유형 정보**
```typescript
getVisaType(type: string): Promise<ApiResponse<VisaType>>
```

**비자별 필요 서류**
```typescript
getVisaDocuments(type: string): Promise<ApiResponse<Document[]>>
```

**비자 FAQ**
```typescript
getVisaFAQ(): Promise<ApiResponse<FAQ[]>>
```

**비자 신청**
```typescript
submitVisaApplication(data: VisaApplicationData): Promise<ApiResponse<Application>>
```

**비자 신청 상태 확인**
```typescript
checkVisaStatus(applicationId: string): Promise<ApiResponse<ApplicationStatus>>
```

#### 사용 예제
```typescript
import { visaService } from '../services/api';

// E-9 비자 정보 조회
const e9Visa = await visaService.getVisaType('E-9');

// E-9 비자 필요 서류
const documents = await visaService.getVisaDocuments('E-9');

// 비자 신청
const application = await visaService.submitVisaApplication({
  visaType: 'E-9',
  applicantInfo: {
    name: '홍길동',
    nationality: 'Vietnam',
    // ... 기타 정보
  }
});
```

---

## 📄 이력서 서비스 (resumeService)

### 이력서 관련 API

**임시저장**
```typescript
saveResume(data: ResumeData): Promise<ApiResponse<ResumeData>>
```
- 5MB 제한
- localStorage 사용
- 자동 생성 ID와 타임스탬프

**이력서 제출**
```typescript
submitResume(data: ResumeData): Promise<ApiResponse<ResumeData>>
```
- 1초 지연 시뮬레이션
- 제출 상태로 변경

**이력서 조회**
```typescript
getResume(id: string): Promise<ApiResponse<ResumeData>>
```

**파일 업로드**
```typescript
uploadFile(file: File, onProgress?: (progress: number) => void): Promise<ApiResponse<FileData>>
```
- 진행률 콜백 지원
- 1.5초 시뮬레이션
- Object URL 생성

**파일 삭제**
```typescript
deleteFile(fileId: string): Promise<ApiResponse<void>>
```

#### 사용 예제
```typescript
import { resumeService } from '../services/api';

// 이력서 임시저장
const saveResponse = await resumeService.saveResume({
  personalInfo: {
    name: '이민수',
    email: 'min@example.com'
  },
  experience: [],
  education: []
});

// 파일 업로드 (진행률 표시)
const fileResponse = await resumeService.uploadFile(
  selectedFile,
  (progress) => {
    console.log(`업로드 진행률: ${progress}%`);
  }
);
```

---

## 📝 맞춤법 검사 서비스 (spellCheckService)

### 외국인 근로자 특화 맞춤법 검사

가장 복잡하고 특화된 서비스입니다.

#### 주요 기능

**단일 텍스트 검사**
```typescript
checkText(text: string, options?: Partial<SpellCheckOptions>): Promise<ApiResponse<SpellCheckResult>>
```

**배치 검사**
```typescript
checkBatch(texts: string[], options?: Partial<SpellCheckOptions>): Promise<ApiResponse<SpellCheckResult[]>>
```

**파일 업로드 검사**
```typescript
uploadAndCheck(file: File, options?: Partial<SpellCheckOptions>): Promise<ApiResponse<SpellCheckResult>>
```

**외국인 근로자 특화 검사**
```typescript
checkForeignWorkerSpelling(text: string, options?: Partial<SpellCheckOptions>): Promise<ApiResponse<ResumeSpellCheckResult>>
```

#### 검사 옵션

```typescript
interface SpellCheckOptions {
  checkSpelling: boolean;      // 맞춤법 검사
  checkGrammar: boolean;       // 문법 검사
  checkPunctuation: boolean;   // 구두점 검사
  checkSpacing: boolean;       // 띄어쓰기 검사
  language: string;            // 언어 ('ko')
  severity: 'low' | 'medium' | 'high';  // 심각도
  includeSuggestions: boolean; // 제안 포함
}
```

#### 외국인 근로자 특화 검사 카테고리

1. **발음 오류** (pronunciationErrors)
   - 한국어 발음의 어려움으로 인한 오타
   - 예: "감사합니다" ← "감사함니다"

2. **받침 오류** (finalConsonantErrors) 
   - 받침 처리 오류
   - 예: "있습니다" ← "잇습니다"

3. **조사 오류** (particleErrors)
   - 조사 사용 오류
   - 예: "회사에서" ← "회사에서는"

4. **띄어쓰기 오류** (spacingErrors)
   - 띄어쓰기 규칙 위반
   - 예: "할 수 있습니다" ← "할수있습니다"

5. **자주 틀리는 단어** (commonWordErrors)
   - 외국인이 자주 틀리는 단어들

6. **문장 끝 표현** (endingErrors)
   - 존댓말 표현 오류

#### 점수 계산 시스템

**카테고리별 점수**
```typescript
interface CategoryScores {
  honorific: number;           // 존댓말 (100 - 오류수 * 10)
  tabooWords: number;          // 금기어 (100 - 오류수 * 8)  
  sentenceLength: number;      // 문장길이 (100 - 오류수 * 5)
  paragraphStructure: number;  // 문단구조 (100 - 오류수 * 15)
  experienceDescription: number; // 경력기술 (100 - 오류수 * 8)
}
```

#### 사용 예제

```typescript
import { spellCheckService } from '../services/spellCheckService';

// 기본 맞춤법 검사
const basicResult = await spellCheckService.checkText(
  "안녕하세요. 저는 베트남에서 온 응웬입니다.",
  {
    language: 'ko',
    severity: 'medium',
    includeSuggestions: true
  }
);

// 외국인 근로자 특화 검사
const foreignWorkerResult = await spellCheckService.checkForeignWorkerSpelling(
  "저는 공장에서 일한 경험이 잇습니다. 성실히 일하겠슴니다."
);

if (foreignWorkerResult.success) {
  const result = foreignWorkerResult.data;
  console.log('전체 점수:', result.overallResumeScore);
  console.log('카테고리별 점수:', result.categoryScores);
  console.log('개선 제안:', result.suggestions);
}

// 오류 필터링
const highSeverityErrors = spellCheckService.filterErrors(
  result.generalErrors,
  'high'
);

// 통계 생성
const stats = spellCheckService.generateErrorStatistics(result.generalErrors);
console.log('오류 통계:', stats);
```

---

## 📊 에러 처리 및 응답 형식

### 표준 응답 형식

```typescript
// 성공 응답
{
  "success": true,
  "data": { /* 실제 데이터 */ },
  "message": "작업이 성공적으로 완료되었습니다."
}

// 실패 응답  
{
  "success": false,
  "error": "오류 메시지",
  "message": "사용자에게 표시할 메시지"
}
```

### 에러 코드 및 처리

**네트워크 에러**
```typescript
{
  "success": false,
  "error": "Network Error: Failed to fetch"
}
```

**인증 에러**
```typescript
{
  "success": false,  
  "error": "Unauthorized: Invalid token"
}
```

**유효성 검사 에러**
```typescript
{
  "success": false,
  "error": "Validation Error: Invalid email format"
}
```

### 에러 처리 패턴

```typescript
// 표준 에러 처리 패턴
const handleApiCall = async () => {
  try {
    const response = await apiService.someMethod();
    
    if (response.success) {
      // 성공 처리
      console.log('데이터:', response.data);
      if (response.message) {
        showSuccessMessage(response.message);
      }
    } else {
      // 실패 처리
      console.error('API 오류:', response.error);
      showErrorMessage(response.error || '알 수 없는 오류가 발생했습니다.');
    }
  } catch (error) {
    // 예외 처리
    console.error('네트워크 오류:', error);
    showErrorMessage('네트워크 연결을 확인해주세요.');
  }
};
```

---

## 🔧 설정 및 환경변수

### 필수 환경변수

```bash
# Supabase 설정
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# API 엔드포인트 (선택사항)
REACT_APP_API_BASE_URL=https://api.kareer.co.kr
```

### API 엔드포인트 상수

```typescript
// constants/index.ts
export const API_ENDPOINTS = {
  base: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  auth: '/api/auth',
  users: '/api/users', 
  jobs: '/api/jobs',
  companies: '/api/companies',
  visa: '/api/visa'
};
```

---

## 🧪 테스트

### API 서비스 테스트

현재 구현된 테스트들:

**api.test.ts**
- ApiClient 클래스 테스트
- HTTP 메서드 테스트
- 에러 처리 테스트

**authService.test.ts**  
- Supabase 인증 테스트
- 사용자 상태 관리 테스트

#### 테스트 실행

```bash
# API 서비스 테스트만 실행
npm test -- --testPathPattern=services

# 특정 서비스 테스트
npm test -- api.test.ts
npm test -- authService.test.ts
```

---

## 📚 관련 문서

- [🏠 프로젝트 홈](../README.md) - 프로젝트 개요
- [📝 요구사항 명세](./02_Requirements_Specification.md) - 기능 요구사항
- [🏗️ 기술 아키텍처](./03_Technical_Architecture.md) - 시스템 설계
- [🧩 컴포넌트 라이브러리](./07_Component_Library.md) - UI 컴포넌트 문서
- [🚀 배포 가이드](./08_Deployment_Guide.md) - 배포 매뉴얼

---

## 📝 업데이트 로그

| 버전 | 날짜 | 변경사항 |
|------|------|----------|
| 1.0 | 2025-08-28 | 초기 API 문서 작성 |

---

**문서 작성자**: Kareer Development Team  
**최종 수정일**: 2025년 8월 28일