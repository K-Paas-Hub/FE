import { createGlobalStyle } from 'styled-components';

/**
 * 글로벌 인덱스 스타일
 * index.css를 styled-components로 변환
 */
export const GlobalIndexStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

  body {
    margin: 0;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #1a1a1a;
    color: white;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  /* 스크롤바 스타일링 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  ::-webkit-scrollbar-thumb {
    background: #4ade80;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #22c55e;
  }

  /* 선택 텍스트 스타일 */
  ::selection {
    background: #4ade80;
    color: #1a1a1a;
  }

  /* 포커스 스타일 */
  *:focus {
    outline: 2px solid #4ade80;
    outline-offset: 2px;
  }

  /* 부드러운 스크롤 */
  html {
    scroll-behavior: smooth;
  }

  /* 글로벌 텍스트 줄바꿈 설정 */
  * {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    word-break: keep-all;
  }

  /* 긴 텍스트 컨테이너 */
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  span {
    word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    word-break: keep-all;
  }

  /* 접근성 관련 스타일 */
  
  /* 스크린 리더 전용 클래스 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* 스크린 리더에서만 보이는 클래스 */
  .sr-only-focusable:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  /* 접근성 개선을 위한 포커스 스타일 */
  button:focus,
  input:focus,
  select:focus,
  textarea:focus,
  a:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* 포커스 표시 숨김 (마우스 사용자) */
  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* 키보드 포커스 표시 */
  *:focus-visible {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* 터치 타겟 최소 크기 */
  button,
  input[type="button"],
  input[type="submit"],
  input[type="reset"],
  a {
    min-height: 44px;
    min-width: 44px;
  }

  /* 모바일에서 터치 타겟 크기 증가 */
  @media (max-width: 768px) {
    button,
    input[type="button"],
    input[type="submit"],
    input[type="reset"],
    a {
      min-height: 48px;
      min-width: 48px;
    }
  }

  /* 색상 대비 개선 */
  .text-high-contrast {
    color: #1f2937;
  }

  .bg-high-contrast {
    background-color: #ffffff;
  }

  /* 에러 상태 스타일 */
  .error-text {
    color: #ef4444;
  }

  .error-border {
    border-color: #ef4444 !important;
  }

  /* 성공 상태 스타일 */
  .success-text {
    color: #10b981;
  }

  .success-border {
    border-color: #10b981 !important;
  }

  /* 로딩 상태 스타일 */
  .loading {
    opacity: 0.6;
    pointer-events: none;
  }

  /* 애니메이션 감소 설정 */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* 고대비 모드 지원 */
  @media (prefers-contrast: high) {
    * {
      border-color: currentColor !important;
    }
    
    button,
    input,
    select,
    textarea {
      border: 2px solid currentColor !important;
    }
  }

  /* 다크 모드 지원 */
  @media (prefers-color-scheme: dark) {
    body {
      background: #1a1a1a;
      color: #ffffff;
    }
    
    .text-high-contrast {
      color: #ffffff;
    }
    
    .bg-high-contrast {
      background-color: #1f2937;
    }
  }
`;
