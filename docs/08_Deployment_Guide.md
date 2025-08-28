# Kareer K-PaaS: 배포 가이드

## 📋 문서 정보

| 항목 | 내용 |
|------|------|
| **문서명** | Kareer K-PaaS 배포 가이드 |
| **버전** | 1.0 |
| **작성일** | 2025년 8월 |
| **작성자** | Kareer Development Team |
| **목적** | 프로덕션 배포 및 운영 가이드 |

---

## 🎯 개요

Kareer 프론트엔드는 다음과 같은 배포 아키텍처를 사용합니다:

- **Multi-Stage Docker 빌드**: 빌드와 런타임 분리로 이미지 크기 최적화
- **Nginx 기반 서빙**: 정적 파일 서빙과 SPA 라우팅 지원
- **Kubernetes 오케스트레이션**: 컨테이너 관리 및 확장
- **코드 난독화**: 프로덕션 보안 강화
- **캐싱 최적화**: 정적 자원 성능 최적화

---

## 🏗️ 배포 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                   Load Balancer                        │
│                 (Ingress/NLB)                          │
└─────────────────┬───────────────────────────────────────┘
                  │
┌─────────────────┴───────────────────────────────────────┐
│               Kubernetes Cluster                       │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │   kareer-fe-1   │  │   kareer-fe-2   │              │
│  │   (Pod)         │  │   (Pod)         │              │
│  │                 │  │                 │              │
│  │  ┌───────────┐  │  │  ┌───────────┐  │              │
│  │  │  Nginx    │  │  │  │  Nginx    │  │              │
│  │  │   :80     │  │  │  │   :80     │  │              │
│  │  └───────────┘  │  │  └───────────┘  │              │
│  │                 │  │                 │              │
│  └─────────────────┘  └─────────────────┘              │
└─────────────────────────────────────────────────────────┘
```

---

## 🐳 Docker 빌드

### Dockerfile 구조

프로젝트는 Multi-Stage 빌드를 사용합니다:

#### Stage 1: Build (node:18-alpine)
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app

# 의존성 설치 (캐싱 최적화)
COPY package*.json ./
RUN npm ci && npm cache clean --force

# 소스 복사 및 빌드
COPY . .
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
RUN npm run build

# 코드 난독화 (보안 강화)
RUN npx --yes javascript-obfuscator build/static/js \
    --output build/static/js \
    --compact true \
    --control-flow-flattening true \
    --dead-code-injection true \
    --disable-console-output true \
    --identifier-names-generator mangled \
    --self-defending true \
    --string-array true \
    --string-array-encoding base64 \
    --string-array-threshold 0.75
```

#### Stage 2: Runtime (nginx:1.27-alpine)
```dockerfile
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# 빌드된 정적 파일 복사
COPY --from=build /app/build ./

# 커스텀 nginx 설정
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 빌드 명령어

#### 로컬 빌드
```bash
# Docker 이미지 빌드
docker build -t kareer-frontend:latest .

# 로컬 실행
docker run -p 8080:80 kareer-frontend:latest
```

#### 프로덕션 빌드
```bash
# 태그된 빌드
docker build -t sudo21/kareer:fe-$(date +%Y%m%d-%H%M%S) .

# Docker Hub 푸시
docker push sudo21/kareer:fe-$(date +%Y%m%d-%H%M%S)
```

### 환경변수 설정

#### 빌드 시 환경변수
```bash
# .env.production
REACT_APP_SUPABASE_URL=https://ucrrijvxknjzxehhpwom.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-production-anon-key
REACT_APP_API_BASE_URL=https://api.kareer.co.kr

# 빌드 시 자동 적용
GENERATE_SOURCEMAP=false
NODE_ENV=production
```

---

## 🌐 Nginx 설정

### nginx.conf 상세

```nginx
server {
  listen 80;
  server_name _;
  
  root /usr/share/nginx/html;
  index index.html;

  # SPA 라우팅 지원
  location / {
    try_files $uri /index.html;
  }

  # 정적 자원 캐싱 (1년)
  location /static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Gzip 압축
  gzip on;
  gzip_types text/plain application/javascript text/css application/json image/svg+xml;
}
```

### 주요 설정 설명

**SPA 라우팅**
- `try_files $uri /index.html;`: React Router 경로를 index.html로 라우팅

**캐싱 최적화**
- 정적 자원: 1년 캐싱 + immutable 헤더
- HTML: 기본 캐싱 없음 (업데이트 즉시 반영)

**성능 최적화**
- Gzip 압축으로 전송 크기 30-50% 감소
- JavaScript, CSS, JSON 파일 압축

---

## ☸️ Kubernetes 배포

### Deployment 명세

```yaml
# k8s/fe-deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kareer-fe
  namespace: frontend
  labels:
    app: kareer-fe
spec:
  replicas: 2                    # 고가용성을 위한 2개 인스턴스
  selector:
    matchLabels:
      app: kareer-fe
  template:
    metadata:
      labels:
        app: kareer-fe
    spec:
      containers:
        - name: kareer-fe
          image: sudo21/kareer:fe-{BUILD_DATE_TIME}
          ports:
            - containerPort: 80
          resources:
            requests:            # 최소 리소스 요구량
              cpu: "100m"
              memory: "128Mi"
            limits:              # 최대 리소스 제한
              cpu: "500m"
              memory: "256Mi"
          imagePullPolicy: IfNotPresent
      restartPolicy: Always
```

### Service 명세

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kareer-fe
  namespace: frontend
spec:
  selector:
    app: kareer-fe
  ports:
    - name: http
      protocol: TCP
      port: 3000      # 클러스터 내부 포트
      targetPort: 80  # 컨테이너 nginx 포트
  type: ClusterIP
```

### 배포 명령어

#### 초기 배포
```bash
# 네임스페이스 생성
kubectl create namespace frontend

# 배포 실행
kubectl apply -f k8s/fe-deploy.yaml

# 상태 확인
kubectl get pods -n frontend
kubectl get services -n frontend
```

#### 업데이트 배포
```bash
# 새 이미지 태그로 업데이트
kubectl set image deployment/kareer-fe kareer-fe=sudo21/kareer:fe-20250828-1400 -n frontend

# 롤아웃 상태 확인
kubectl rollout status deployment/kareer-fe -n frontend

# 롤아웃 히스토리
kubectl rollout history deployment/kareer-fe -n frontend
```

#### 롤백
```bash
# 이전 버전으로 롤백
kubectl rollout undo deployment/kareer-fe -n frontend

# 특정 버전으로 롤백
kubectl rollout undo deployment/kareer-fe --to-revision=2 -n frontend
```

---

## 🚀 CI/CD 파이프라인

### GitLab CI 예제

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: ""
  IMAGE_TAG: $CI_REGISTRY_IMAGE:fe-$CI_COMMIT_SHORT_SHA

# 테스트 단계
test:
  stage: test
  image: node:18-alpine
  script:
    - npm ci
    - npm run test:ci
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml

# 빌드 단계
build:
  stage: build
  image: docker:20.10.16
  services:
    - docker:20.10.16-dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $IMAGE_TAG .
    - docker push $IMAGE_TAG
  only:
    - main
    - develop

# 프로덕션 배포
deploy:production:
  stage: deploy
  image: kubectl:latest
  script:
    - kubectl set image deployment/kareer-fe kareer-fe=$IMAGE_TAG -n frontend
    - kubectl rollout status deployment/kareer-fe -n frontend
  environment:
    name: production
    url: https://kareer.co.kr
  only:
    - main
  when: manual
```

### GitHub Actions 예제

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build-and-deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: |
          docker build -t sudo21/kareer:fe-$(date +%Y%m%d-%H%M%S) .
          docker push sudo21/kareer:fe-$(date +%Y%m%d-%H%M%S)
      
      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v1
        with:
          manifests: |
            k8s/fe-deploy.yaml
```

---

## 📊 모니터링 및 로깅

### Kubernetes 모니터링

#### 기본 모니터링 명령어
```bash
# Pod 상태 확인
kubectl get pods -n frontend -w

# 리소스 사용량
kubectl top pods -n frontend
kubectl top nodes

# 로그 확인
kubectl logs -f deployment/kareer-fe -n frontend

# 이벤트 확인
kubectl get events -n frontend --sort-by='.lastTimestamp'
```

#### Prometheus + Grafana 연동

```yaml
# monitoring/service-monitor.yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: kareer-fe
  namespace: frontend
spec:
  selector:
    matchLabels:
      app: kareer-fe
  endpoints:
    - port: http
      path: /metrics
      interval: 30s
```

### 로깅 설정

#### ELK Stack 연동
```yaml
# logging/filebeat-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: filebeat-config
data:
  filebeat.yml: |
    filebeat.inputs:
    - type: container
      paths:
        - /var/log/containers/kareer-fe-*.log
      processors:
      - add_kubernetes_metadata:
          host: ${NODE_NAME}
          matchers:
          - logs_path:
              logs_path: "/var/log/containers/"
    
    output.elasticsearch:
      hosts: ["elasticsearch:9200"]
      
    logging.level: info
```

---

## 🔒 보안 설정

### 코드 난독화

빌드 과정에서 자동으로 적용되는 보안 설정들:

```javascript
// javascript-obfuscator 설정
{
  compact: true,                    // 코드 압축
  controlFlowFlattening: true,      // 제어 흐름 평탄화
  deadCodeInjection: true,          // 데드 코드 삽입
  disableConsoleOutput: true,       // 콘솔 출력 비활성화
  identifierNamesGenerator: 'mangled', // 식별자 이름 변경
  selfDefending: true,              // 자기 방어 코드
  stringArray: true,                // 문자열 배열화
  stringArrayEncoding: 'base64',    // 문자열 인코딩
  stringArrayThreshold: 0.75        // 문자열 배열 임계값
}
```

### 환경변수 보안

#### Kubernetes Secrets
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: kareer-fe-secrets
  namespace: frontend
type: Opaque
stringData:
  REACT_APP_SUPABASE_URL: "https://ucrrijvxknjzxehhpwom.supabase.co"
  REACT_APP_SUPABASE_ANON_KEY: "your-secret-anon-key"
```

#### Deployment에서 Secrets 사용
```yaml
spec:
  template:
    spec:
      containers:
        - name: kareer-fe
          envFrom:
            - secretRef:
                name: kareer-fe-secrets
```

### 네트워크 보안

#### Network Policy
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: kareer-fe-policy
  namespace: frontend
spec:
  podSelector:
    matchLabels:
      app: kareer-fe
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: backend
```

---

## 🎯 성능 최적화

### 빌드 최적화

#### 번들 분석
```bash
# 번들 크기 분석
npm install -g webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js

# 성능 감사
npm audit
npm audit fix
```

#### 환경변수 최적화
```bash
# 프로덕션 최적화
GENERATE_SOURCEMAP=false
INLINE_RUNTIME_CHUNK=false
IMAGE_INLINE_SIZE_LIMIT=0

# React 컴파일러 최적화 (React 19)
REACT_APP_ENABLE_COMPILER=true
```

### 런타임 최적화

#### Nginx 성능 튜닝
```nginx
# nginx.conf 추가 설정
worker_processes auto;
worker_connections 1024;

http {
  # 압축 최적화
  gzip on;
  gzip_vary on;
  gzip_min_length 1024;
  gzip_comp_level 6;
  gzip_types
    text/plain
    text/css
    text/xml
    text/javascript
    application/javascript
    application/xml+rss
    application/json;

  # 브라우저 캐싱
  location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Vary "Accept-Encoding";
  }

  # 보안 헤더
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;
}
```

### 자동 스케일링

#### Horizontal Pod Autoscaler
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: kareer-fe-hpa
  namespace: frontend
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: kareer-fe
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

---

## 🛠️ 배포 체크리스트

### 배포 전 체크리스트

#### 코드 품질 검증
- [ ] **테스트**: 모든 테스트 통과 (`npm run test:ci`)
- [ ] **타입 체크**: TypeScript 컴파일 오류 없음 (`npx tsc --noEmit`)
- [ ] **린트**: ESLint 규칙 준수 (`npm run lint`)
- [ ] **빌드**: 프로덕션 빌드 성공 (`npm run build`)
- [ ] **번들 크기**: 번들 크기 임계값 확인 (< 2MB)

#### 환경 설정 검증
- [ ] **환경변수**: 프로덕션 환경변수 설정 확인
- [ ] **API 엔드포인트**: API 연결 테스트
- [ ] **Supabase 연결**: 인증 시스템 연결 확인
- [ ] **다국어**: 7개 언어 번역 완성도 확인

#### 보안 검증
- [ ] **의존성 취약점**: `npm audit` 통과
- [ ] **코드 난독화**: 빌드 결과 난독화 확인
- [ ] **Secrets 관리**: 중요 정보 Secrets로 관리
- [ ] **HTTPS**: SSL/TLS 인증서 유효성 확인

### 배포 후 검증

#### 기능 검증
- [ ] **페이지 로딩**: 모든 주요 페이지 정상 로딩
- [ ] **라우팅**: SPA 라우팅 정상 동작
- [ ] **다국어**: 언어 변경 기능 정상 동작
- [ ] **인증**: 로그인/로그아웃 기능 정상 동작
- [ ] **API 연동**: 백엔드 API 통신 정상

#### 성능 검증
- [ ] **응답 시간**: 초기 로딩 < 3초
- [ ] **Lighthouse 점수**: Performance > 90점
- [ ] **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **메모리 사용량**: 컨테이너 메모리 사용량 < 200MB

#### 모니터링 확인
- [ ] **Pod 상태**: 모든 Pod 정상 Running 상태
- [ ] **서비스 연결**: Service Discovery 정상 동작
- [ ] **로그**: 에러 로그 없음 확인
- [ ] **메트릭**: Prometheus 메트릭 수집 확인

---

## 🚨 장애 대응

### 일반적인 배포 이슈

#### 1. 이미지 Pull 실패
```bash
# 문제 진단
kubectl describe pod kareer-fe-xxx -n frontend

# 해결방법
# 1. 이미지 태그 확인
# 2. Docker registry 접근 권한 확인
# 3. ImagePullSecrets 설정 확인
```

#### 2. Pod OOMKilled
```bash
# 메모리 사용량 확인
kubectl top pod kareer-fe-xxx -n frontend

# 해결방법: 리소스 한계 증가
kubectl patch deployment kareer-fe -n frontend -p '{"spec":{"template":{"spec":{"containers":[{"name":"kareer-fe","resources":{"limits":{"memory":"512Mi"}}}]}}}}'
```

#### 3. 502 Bad Gateway
```bash
# Nginx 로그 확인
kubectl logs kareer-fe-xxx -n frontend

# 일반적 원인과 해결방법:
# 1. upstream 서버 연결 실패 - Service 설정 확인
# 2. nginx.conf 문법 오류 - 설정 파일 검증
# 3. 컨테이너 포트 불일치 - 포트 매핑 확인
```

### 롤백 절차

#### 긴급 롤백
```bash
# 즉시 이전 버전으로 롤백
kubectl rollout undo deployment/kareer-fe -n frontend

# 롤백 상태 확인
kubectl rollout status deployment/kareer-fe -n frontend
```

#### 계획된 롤백
```bash
# 롤아웃 히스토리 확인
kubectl rollout history deployment/kareer-fe -n frontend

# 특정 버전으로 롤백
kubectl rollout undo deployment/kareer-fe --to-revision=3 -n frontend
```

---

## 📞 운영 지원

### 로그 수집

#### 실시간 로그 모니터링
```bash
# 특정 Pod 로그
kubectl logs -f kareer-fe-xxx -n frontend

# 전체 Deployment 로그
kubectl logs -f deployment/kareer-fe -n frontend

# 이전 컨테이너 로그
kubectl logs kareer-fe-xxx -n frontend --previous
```

#### 로그 분석
```bash
# 에러 로그 필터링
kubectl logs deployment/kareer-fe -n frontend | grep -i error

# 최근 1시간 로그
kubectl logs deployment/kareer-fe -n frontend --since=1h
```

### 디버깅 도구

#### 컨테이너 내부 접근
```bash
# 실행 중인 컨테이너 접근
kubectl exec -it kareer-fe-xxx -n frontend -- /bin/sh

# 임시 디버그 Pod 생성
kubectl run debug-pod --image=alpine:latest --rm -it --restart=Never -- sh
```

### 백업 및 복구

#### 설정 백업
```bash
# 현재 배포 설정 백업
kubectl get deployment kareer-fe -n frontend -o yaml > backup/kareer-fe-deployment-$(date +%Y%m%d).yaml

# ConfigMap 백업
kubectl get configmap -n frontend -o yaml > backup/configmaps-$(date +%Y%m%d).yaml
```

---

## 📚 관련 문서

- [🏠 프로젝트 홈](../README.md) - 프로젝트 개요
- [🏗️ 기술 아키텍처](./03_Technical_Architecture.md) - 시스템 설계
- [📝 API 문서](./06_API_Documentation.md) - API 서비스 레이어
- [🧩 컴포넌트 라이브러리](./07_Component_Library.md) - UI 컴포넌트
- [🔧 트러블슈팅](./09_Troubleshooting.md) - 문제 해결 가이드

---

## 📝 업데이트 로그

| 버전 | 날짜 | 변경사항 |
|------|------|----------|
| 1.0 | 2025-08-28 | 초기 배포 가이드 작성 |

---

**문서 작성자**: Kareer Development Team  
**최종 수정일**: 2025년 8월 28일