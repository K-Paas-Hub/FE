import { createGlobalStyle } from 'styled-components';

/**
 * 글로벌 App 스타일
 * App.css를 styled-components로 변환
 */
export const GlobalAppStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

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

  /* App Container */
  .app-container {
    background: linear-gradient(135deg, #1a1a1a 0%, #1b2d1a 50%, #1a1a1a 100%);
    min-height: 100vh;
    color: white;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
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

  /* 반응형 디자인 */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem !important;
    }

    .hero-subtitle {
      font-size: 1.2rem !important;
    }

    .section-title {
      font-size: 2rem !important;
    }

    .features-grid {
      grid-template-columns: 1fr !important;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }

    .partners-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 2rem !important;
    }

    .stats-grid {
      grid-template-columns: 1fr !important;
    }

    .partners-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
