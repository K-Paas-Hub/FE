import styled from 'styled-components';

/**
 * LoginPage 컴포넌트 스타일
 * LoginPage.css를 styled-components로 변환
 */

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const LoginContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`;

export const LoginLogo = styled.img`
  height: 60px;
  margin-bottom: 32px;
  align-self: flex-start;
  margin-left: calc((100% - 400px) / 2);
`;

export const LoginTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 32px;
  text-align: left;
  width: 100%;
  max-width: 400px;
  margin-left: calc((100% - 400px) / 2);
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 28px;
  }
`;
