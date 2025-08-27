# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm ci && npm cache clean --force

# 소스 복사
COPY . .

# 환경변수 (CRA 기준, Vite도 유사)
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

# React 빌드
RUN npm run build

# 빌드 산출물 난독화
RUN npx --yes javascript-obfuscator build/static/js \
    --output build/static/js \
    --compact true \
    --control-flow-flattening true \
    --dead-code-injection true \
    --dead-code-injection-threshold 0.4 \
    --disable-console-output true \
    --identifier-names-generator mangled \
    --self-defending true \
    --string-array true \
    --string-array-encoding base64 \
    --string-array-threshold 0.75

# ---------- Stage 2: Runtime ----------
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# 정적 파일 복사
COPY --from=build /app/build ./

# 커스텀 nginx.conf (SPA 라우팅 + 캐싱) 복사
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]