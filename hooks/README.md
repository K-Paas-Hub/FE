# 🚀 Git Hooks - 개발 가이드라인 자동 체크

이 프로젝트는 커밋 시 자동으로 개발 가이드라인을 확인하는 Git hooks를 포함하고 있습니다.

## 📋 포함된 Hooks

### 1. pre-commit
커밋 전에 실행되며 다음 사항들을 체크합니다:

- ✅ 커밋 메시지 형식 검증
- ✅ 커밋 타입 확인 (feat, fix, docs, style, refactor, test, chore)
- ✅ 이슈 번호 포함 여부 확인
- ✅ 변경된 파일 목록 표시
- ✅ 개발 가이드라인 요약 표시
- ✅ 추가 체크사항 (README, 테스트 파일, 환경 변수)

### 2. commit-msg
커밋 메시지 작성 시 실행되며 다음 사항들을 검증합니다:

- ✅ 커밋 메시지 형식 강제
- ✅ 타입 유효성 검사
- ✅ 설명 길이 체크 (최소 10자)
- ✅ 이슈 번호 권장사항

## 🎯 사용법

### 일반적인 커밋
```bash
git add .
git commit -m "feat: 새로운 기능 추가 #123"
```

### 올바른 커밋 메시지 예시
```bash
# 새로운 기능
git commit -m "feat: 사용자 로그인 기능 구현 #45"

# 버그 수정
git commit -m "fix: 로그인 버튼 클릭 이슈 해결 #67"

# 문서 업데이트
git commit -m "docs: README 파일 업데이트 #89"

# 코드 스타일
git commit -m "style: 코드 포맷팅 수정 #12"

# 리팩토링
git commit -m "refactor: 컴포넌트 구조 개선 #34"

# 테스트
git commit -m "test: 로그인 기능 테스트 추가 #56"

# 환경 설정
git commit -m "chore: 의존성 패키지 업데이트 #78"
```

## ⚠️ 주의사항

### 커밋이 거부되는 경우
1. **잘못된 타입 사용**: 허용되지 않은 타입 사용 시
2. **설명이 너무 짧음**: 10자 미만인 경우
3. **형식 오류**: 올바른 형식을 따르지 않은 경우

### 권장사항 (경고만 표시)
1. **이슈 번호 누락**: `#123` 형식으로 이슈 번호 포함 권장
2. **README 변경 시 docs 타입 사용**: 문서 변경 시 적절한 타입 사용
3. **새 기능 시 테스트 파일 포함**: 새로운 기능에 대한 테스트 작성 권장

## 🔧 설정

### Hooks 설치 (필수)
```bash
# 프로젝트 루트에서 실행
cp hooks/pre-commit .git/hooks/
cp hooks/commit-msg .git/hooks/
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
```

### Hooks 활성화
```bash
# 실행 권한 부여
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
```

### Hooks 비활성화 (필요시)
```bash
# 임시로 비활성화
mv .git/hooks/pre-commit .git/hooks/pre-commit.disabled
mv .git/hooks/commit-msg .git/hooks/commit-msg.disabled

# 다시 활성화
mv .git/hooks/pre-commit.disabled .git/hooks/pre-commit
mv .git/hooks/commit-msg.disabled .git/hooks/commit-msg
```

## 📚 관련 문서

- [개발 가이드라인](../.cursor/rules/fe-development-guidelines.mdc)
- [Git Hooks 공식 문서](https://git-scm.com/docs/githooks)

## 🆘 문제 해결

### Hooks가 실행되지 않는 경우
1. 실행 권한 확인: `ls -la .git/hooks/`
2. Git 버전 확인: `git --version`
3. Hooks 파일 존재 확인: `ls .git/hooks/`

### 커밋이 계속 실패하는 경우
1. 커밋 메시지 형식 확인
2. 타입이 올바른지 확인
3. 설명이 충분한지 확인
4. 필요시 hooks를 임시로 비활성화
