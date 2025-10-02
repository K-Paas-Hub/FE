// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Suppress framer-motion console errors in tests
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    // framer-motion 관련 경고 무시
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('whileHover') || 
       args[0].includes('whileTap') || 
       args[0].includes('React does not recognize'))
    ) {
      return;
    }
    
    // act() 관련 경고 무시 (테스트에서 적절히 처리됨)
    if (
      typeof args[0] === 'string' &&
      ((args[0].includes('An update to') && args[0].includes('was not wrapped in act')) ||
       args[0].includes('You called act(async () => ...) without await'))
    ) {
      return;
    }
    
    originalError.call(console, ...args);
  };

  // React 테스트 관련 경고 무시
  console.warn = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('act') || 
       args[0].includes('ReactDOM.render') ||
       args[0].includes('componentWillReceiveProps'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// 전역 테스트 설정은 필요할 때만 개별 테스트에서 설정
