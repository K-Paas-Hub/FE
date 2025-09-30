# Kareer K-PaaS: 트러블슈팅 가이드

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | Kareer K-PaaS 트러블슈팅 가이드 |
| **버전** | 1.0 |
| **작성일** | 2025년 8월 |
| **작성자** | Kareer Development Team |
| **목적** | 일반적인 문제 해결 및 디버깅 가이드 |

---

## 🎯 개요

이 문서는 Kareer 프로젝트 개발 및 운영 중 발생할 수 있는 일반적인 문제들과 해결 방법을 정리합니다.

**문제 분류**:
- 🚀 **개발 환경**: 로컬 개발 및 빌드 문제
- 🔧 **런타임**: 실행 중 발생하는 문제
- ☸️ **배포 및 인프라**: Docker, Kubernetes 관련 문제
- 🌐 **네트워크 및 API**: 통신 관련 문제
- 🧪 **테스팅**: 테스트 실행 관련 문제

---

## 🚀 개발 환경 문제

### 1. npm install 실패

#### 증상
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

#### 원인
- 의존성 충돌 (React 19와 기타 라이브러리 호환성 문제)
- Node.js 버전 불일치

#### 해결방법

**1단계: Node.js 버전 확인**
```bash
# 현재 버전 확인
node --version
npm --version

# 권장 버전: Node.js 18.x 이상
# nvm 사용 시
nvm install 18
nvm use 18
```

**2단계: 의존성 해결**
```bash
# 의존성 충돌 무시하고 설치
npm install --legacy-peer-deps

# 또는 npm 캐시 클리어 후 재설치
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**3단계: package-lock.json 이슈**
```bash
# package-lock.json 재생성
rm package-lock.json
npm install

# 의존성 강제 해결
npm install --force
```

### 2. TypeScript 컴파일 오류

#### 증상
```typescript
// 타입 오류 예제
Property 'data' does not exist on type 'ApiResponse<unknown>'
Cannot find module '@types/styled-components'
```

#### 해결방법

**타입 정의 설치**
```bash
# 누락된 타입 정의 설치
npm install --save-dev @types/styled-components
npm install --save-dev @types/react-router-dom
npm install --save-dev @types/jest
```

**tsconfig.json 설정 확인**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": [
    "src",
    "src/**/*"
  ]
}
```

### 3. styled-components 스타일 적용 안됨

#### 증상
- 스타일이 적용되지 않음
- CSS-in-JS 속성이 DOM에 나타나지 않음

#### 원인
- styled-components 버전 충돌
- TypeScript Props 타입 불일치
- SSR/Client 불일치

#### 해결방법

**Props 타입 수정**
```typescript
// ❌ 잘못된 방법
interface StyledProps {
  active: boolean;
}

// ✅ 올바른 방법 ($ 접두사)
interface StyledProps {
  $active: boolean;
}

export const StyledButton = styled.button<StyledProps>`
  background: ${props => props.$active ? 'blue' : 'gray'};
`;
```

**바벨 플러그인 확인**
```json
// .babelrc 또는 babel.config.js
{
  "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "displayName": true,
        "ssr": false
      }
    ]
  ]
}
```

### 4. framer-motion 애니메이션 오류

#### 증상
```typescript
// 애니메이션이 작동하지 않음
Property 'animate' does not exist on type 'DetailedHTMLProps'
```

#### 해결방법

**올바른 사용법**
```typescript
import { motion } from 'framer-motion';
import styled from 'styled-components';

// ✅ 올바른 방법
export const AnimatedDiv = styled(motion.div)`
  /* 스타일 */
`;

// 컴포넌트에서 사용
<AnimatedDiv
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</AnimatedDiv>
```

---

## 🔧 런타임 문제

### 1. Supabase 연결 오류

#### 증상
```typescript
Error: Invalid API key
Auth session missing
```

#### 원인
- 환경변수 설정 오류
- Supabase URL/Key 불일치
- CORS 정책 위반

#### 해결방법

**환경변수 확인**
```bash
# .env 파일 확인
REACT_APP_SUPABASE_URL=https://ucrrijvxknjzxehhpwom.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

# 환경변수 로드 확인
console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
```

**Supabase 클라이언트 초기화 확인**
```typescript
// authService.ts 디버깅
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 환경변수가 설정되지 않았습니다.');
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
```

### 2. React Router 404 오류

#### 증상
- 직접 URL 접근 시 404 오류
- 새로고침 시 페이지 없음

#### 원인
- SPA 라우팅 설정 오류
- Nginx 설정 누락

#### 해결방법

**nginx.conf 설정 확인**
```nginx
server {
  listen 80;
  server_name _;
  
  root /usr/share/nginx/html;
  index index.html;

  # SPA 라우팅 지원 - 중요!
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

**React Router 설정 확인**
```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="/">  {/* basename 확인 */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />  {/* 404 처리 */}
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. 맞춤법 검사 서비스 오류

#### 증상
```typescript
Error: 맞춤법 검사 중 오류가 발생했습니다.
spellCheckService.checkText is not a function
```

#### 원인
- API 응답 형식 불일치
- 서비스 메서드 호출 오류
- 비동기 처리 문제

#### 해결방법

**서비스 호출 확인**
```typescript
import { spellCheckService } from '../services/spellCheckService';

const handleSpellCheck = async (text: string) => {
  try {
    // 기본 맞춤법 검사
    const result = await spellCheckService.checkText(text, {
      language: 'ko',
      severity: 'medium',
      includeSuggestions: true
    });

    if (result.success) {
      console.log('검사 결과:', result.data);
    } else {
      console.error('검사 실패:', result.error);
    }
  } catch (error) {
    console.error('서비스 호출 오류:', error);
  }
};
```

**외국인 근로자 특화 검사**
```typescript
const handleForeignWorkerCheck = async (text: string) => {
  try {
    const result = await spellCheckService.checkForeignWorkerSpelling(text);
    
    if (result.success && result.data) {
      const { categoryScores, overallResumeScore, suggestions } = result.data;
      console.log('카테고리 점수:', categoryScores);
      console.log('전체 점수:', overallResumeScore);
      console.log('개선 제안:', suggestions);
    }
  } catch (error) {
    console.error('외국인 근로자 검사 오류:', error);
  }
};
```

### 4. 다국어(i18n) 오류

#### 증상
```typescript
Warning: Failed to load resource
i18next: language 'undefined' not found
Translation key 'some.key' not found
```

#### 해결방법

**언어 파일 확인**
```typescript
// locales/ko.json 확인
{
  "common": {
    "save": "저장",
    "cancel": "취소",
    "loading": "로딩 중..."
  },
  "header": {
    "jobPostings": "채용공고",
    "visaCenter": "비자센터"
  }
}
```

**i18n 초기화 확인**
```typescript
// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 번역 파일 import
import ko from './locales/ko.json';
import vi from './locales/vi.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: ko },
      vi: { translation: vi }
    },
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

---

## ☸️ 배포 및 인프라 문제

### 1. Docker 빌드 실패

#### 증상
```bash
ERROR [build 2/5] COPY package*.json ./
COPY failed: file not found in build context
```

#### 원인
- .dockerignore 설정 문제
- 빌드 컨텍스트 경로 오류
- 파일 권한 문제

#### 해결방법

**.dockerignore 확인**
```dockerfile
# .dockerignore
node_modules
npm-debug.log
.env.local
.env.development.local
.env.test.local
.env.production.local
build
coverage
.git
.gitignore
README.md
Dockerfile
.dockerignore
```

**빌드 컨텍스트 확인**
```bash
# 현재 디렉토리에서 빌드
docker build -t kareer-frontend:latest .

# 특정 Dockerfile 사용
docker build -f Dockerfile.prod -t kareer-frontend:prod .
```

### 2. Kubernetes Pod 시작 실패

#### 증상
```bash
kubectl get pods -n frontend
NAME                         READY   STATUS             RESTARTS   AGE
kareer-fe-5d4b8f6c8d-xyz12   0/1     CrashLoopBackOff   5          5m
```

#### 진단 방법

**Pod 상태 확인**
```bash
# Pod 상세 정보
kubectl describe pod kareer-fe-xxx -n frontend

# 로그 확인
kubectl logs kareer-fe-xxx -n frontend

# 이전 컨테이너 로그 (재시작된 경우)
kubectl logs kareer-fe-xxx -n frontend --previous
```

**일반적인 해결방법**

**1. 이미지 Pull 문제**
```bash
# ImagePullBackOff 해결
kubectl describe pod kareer-fe-xxx -n frontend | grep Events

# 이미지 태그 확인
kubectl get deployment kareer-fe -n frontend -o yaml | grep image
```

**2. 리소스 부족**
```yaml
# deployment.yaml 리소스 조정
resources:
  requests:
    cpu: "100m"
    memory: "128Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"  # 메모리 증가
```

**3. ConfigMap/Secret 문제**
```bash
# ConfigMap 존재 확인
kubectl get configmap -n frontend

# Secret 존재 확인  
kubectl get secret -n frontend
```

### 3. 서비스 연결 문제

#### 증상
- 외부에서 서비스 접근 불가
- Pod 간 통신 불가
- 로드 밸런서 502 오류

#### 해결방법

**Service 설정 확인**
```yaml
# 포트 매핑 확인
apiVersion: v1
kind: Service
metadata:
  name: kareer-fe
spec:
  ports:
    - port: 3000        # 외부 접근 포트
      targetPort: 80    # 컨테이너 포트
      protocol: TCP
```

**Endpoint 확인**
```bash
# Endpoint 상태 확인
kubectl get endpoints kareer-fe -n frontend

# Service와 Pod 매핑 확인
kubectl get pod -n frontend --show-labels
```

---

## 🌐 네트워크 및 API 문제

### 1. CORS 오류

#### 증상
```javascript
Access to fetch at 'https://www.kareer.cloud/api/recruit' from origin 'http://localhost:3000' 
has been blocked by CORS policy
```

#### 해결방법

**✅ 백엔드 CORS 설정 완료 (2025-09-30)**
- `Access-Control-Allow-Origin: http://localhost:3000`
- `Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS`
- `Access-Control-Allow-Headers: Content-Type`
- `Access-Control-Allow-Credentials: true`

**개발 환경에서 정상 동작 확인**
```bash
# CORS 헤더 확인
curl -I "https://www.kareer.cloud/api/recruit/jobs" -H "Origin: http://localhost:3000"

# 응답 헤더 확인
< access-control-allow-origin: http://localhost:3000
< access-control-allow-methods: GET,POST,PUT,DELETE,OPTIONS
< access-control-allow-headers: Content-Type
< access-control-allow-credentials: true
```

**⚠️ 이전 임시 해결책 (더 이상 필요 없음)**
```bash
# Chrome CORS 비활성화 (개발용 - 현재 불필요)
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security --disable-features=VizDisplayCompositor
```

### 2. API 타임아웃

#### 증상
```typescript
Error: Request timeout of 5000ms exceeded
Network Error: fetch timeout
```

#### 해결방법

**API 클라이언트 타임아웃 설정**
```typescript
// api.ts
class ApiClient {
  private async request<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }
}
```

### 3. 인증 토큰 만료

#### 증상
```typescript
Error: 401 Unauthorized
Token has expired
```

#### 해결방법

**토큰 갱신 로직**
```typescript
// authService.ts
class AuthService {
  async refreshToken(): Promise<void> {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      
      if (error) {
        // 갱신 실패 시 로그아웃
        await this.signOut();
        window.location.href = '/login';
        throw error;
      }
      
      // 새 토큰 저장
      if (data.session) {
        localStorage.setItem('authToken', data.session.access_token);
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
    }
  }
}
```

**Axios Interceptor 예제**
```typescript
// api.ts
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000
});

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      
      try {
        await authService.refreshToken();
        // 새 토큰으로 재시도
        const token = localStorage.getItem('authToken');
        original.headers.Authorization = `Bearer ${token}`;
        return apiClient(original);
      } catch (refreshError) {
        // 갱신 실패 시 로그인 페이지로 이동
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
```

---

## 🧪 테스팅 문제

### 1. Jest 테스트 실패

#### 증상
```bash
FAIL src/components/MainHeader/MainHeader.test.tsx
Module not found: Can't resolve '../../styles/components/MainHeader.styles'
```

#### 해결방법

**모듈 모킹**
```typescript
// MainHeader.test.tsx
// styled-components 모킹
jest.mock('../../styles/components/MainHeader.styles', () => ({
  Header: 'header',
  MainHeader: 'div',
  Logo: 'div',
  // ... 기타 스타일 컴포넌트 모킹
}));
```

**setupTests.js 설정**
```javascript
// src/setupTests.js
import '@testing-library/jest-dom';

// matchMedia 모킹 (반응형 테스트)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// IntersectionObserver 모킹
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
};
```

### 2. 비동기 테스트 타임아웃

#### 증상
```bash
Timeout - Async callback was not invoked within the 5000ms timeout
```

#### 해결방법

**waitFor 사용**
```typescript
import { render, screen, waitFor } from '@testing-library/react';

test('API 호출 테스트', async () => {
  render(<MyComponent />);
  
  // 비동기 작업 완료 대기
  await waitFor(() => {
    expect(screen.getByText('로딩 완료')).toBeInTheDocument();
  }, { timeout: 10000 }); // 타임아웃 증가
});
```

**Mock 응답 지연 처리**
```typescript
// API 모킹
jest.mock('../services/api', () => ({
  apiClient: {
    get: jest.fn().mockImplementation(() => 
      Promise.resolve({
        success: true,
        data: { message: 'test' }
      })
    )
  }
}));
```

### 3. 테스트 커버리지 낮음

#### 현재 상황
- 전체 커버리지: 7.18%
- 테스트된 파일: 9개
- 테스트 케이스: 164개

#### 개선 방법

**우선순위 테스트 작성**
```typescript
// 1. 핵심 컴포넌트 테스트
describe('MainPage', () => {
  test('renders without crashing', () => {
    render(<MainPage />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});

// 2. API 서비스 테스트
describe('spellCheckService', () => {
  test('checkText returns success result', async () => {
    const result = await spellCheckService.checkText('테스트 텍스트');
    expect(result.success).toBe(true);
  });
});

// 3. 훅 테스트
describe('useAuth', () => {
  test('returns user when authenticated', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBeDefined();
  });
});
```

---

## 🔍 디버깅 도구

### 1. 브라우저 개발자 도구

#### React Developer Tools
```bash
# 설치
# Chrome 웹스토어에서 React Developer Tools 설치

# 사용법
# 1. Components 탭: 컴포넌트 계층구조 확인
# 2. Profiler 탭: 성능 분석
# 3. Props/State 실시간 수정
```

#### Network 탭 분석
```javascript
// API 호출 디버깅
fetch('/api/users')
  .then(response => {
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    return response.json();
  })
  .then(data => console.log('Data:', data));
```

### 2. 로깅 시스템

#### 개발 환경 로깅
```typescript
// utils/logger.ts
export const devLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🐛 ${message}`);
    if (data) {
      console.log(data);
    }
    console.trace();
    console.groupEnd();
  }
};

// 사용 예제
devLog('API 호출 시작', { endpoint: '/api/users', method: 'GET' });
```

#### 프로덕션 에러 추적
```typescript
// 글로벌 에러 핸들러
window.addEventListener('error', (event) => {
  console.error('Global Error:', {
    message: event.error.message,
    stack: event.error.stack,
    filename: event.filename,
    lineno: event.lineno,
    timestamp: new Date().toISOString()
  });
  
  // 외부 에러 추적 서비스에 전송
  // sendErrorToService(event.error);
});

// Promise rejection 핸들러
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', {
    reason: event.reason,
    timestamp: new Date().toISOString()
  });
});
```

### 3. 성능 모니터링

#### Core Web Vitals
```typescript
// reportWebVitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: any) => {
  console.log('Web Vital:', metric);
  // 분석 서비스로 전송
};

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### 번들 분석
```bash
# 번들 크기 분석
npx webpack-bundle-analyzer build/static/js/*.js

# 의존성 분석
npm ls --depth=0
npm audit
```

---

## 📞 지원 및 문의

### 개발팀 연락처

| 역할 | 담당자 | 연락처 |
|------|--------|--------|
| **프론트엔드** | 김미르 | github.com/kimmireu0220 |
| **백엔드** | 임성혁, 홍윤기, 허완 | 팀 슬랙 채널 |
| **PM** | 최홍석 | github.com/ChatHongPT |

### 이슈 보고

#### GitHub Issues
1. 버그 리포트: `.github/ISSUE_TEMPLATE/bug_report.md` 사용
2. 기능 요청: `.github/ISSUE_TEMPLATE/feature_request.md` 사용
3. 라벨 사용: `bug`, `enhancement`, `question`, `documentation`

#### 급한 장애 대응
1. 슬랙 #kareer-urgent 채널 알림
2. 장애 로그 및 스크린샷 첨부
3. 재현 단계 상세 기록

---

## 📝 문제 해결 체크리스트

### 일반적인 디버깅 순서

#### 1단계: 기본 확인
- [ ] 브라우저 콘솔 에러 확인
- [ ] 네트워크 탭에서 API 응답 확인
- [ ] React Developer Tools로 컴포넌트 상태 확인

#### 2단계: 환경 확인
- [ ] Node.js 및 npm 버전 확인
- [ ] 환경변수 설정 확인
- [ ] 의존성 설치 상태 확인

#### 3단계: 코드 확인
- [ ] TypeScript 컴파일 오류 없음
- [ ] 린트 규칙 준수
- [ ] 테스트 통과 여부

#### 4단계: 인프라 확인
- [ ] Docker 컨테이너 정상 실행
- [ ] Kubernetes Pod 상태 확인
- [ ] 서비스 및 네트워크 연결 확인

### 성능 최적화 체크리스트

- [ ] 번들 크기 < 2MB
- [ ] 초기 로딩 시간 < 3초
- [ ] Lighthouse 성능 점수 > 90점
- [ ] 메모리 사용량 < 256MB
- [ ] API 응답 시간 < 500ms

---

## 📚 관련 문서

- [🏠 프로젝트 홈](../README.md) - 프로젝트 개요
- [📝 API 문서](./06_API_Documentation.md) - API 서비스 레이어
- [🧩 컴포넌트 라이브러리](./07_Component_Library.md) - UI 컴포넌트
- [🚀 배포 가이드](./08_Deployment_Guide.md) - 배포 및 운영
- [🧪 테스트 가이드](./TESTING_GUIDELINES.md) - 테스트 작성 방법

---

## 📝 업데이트 로그

| 버전 | 날짜 | 변경사항 |
|------|------|----------|
| 1.0 | 2025-08-28 | 초기 트러블슈팅 가이드 작성 |

---

**문서 작성자**: Kareer Development Team  
**최종 수정일**: 2025년 8월 28일