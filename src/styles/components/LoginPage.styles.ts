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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - 200px);

  @media (max-width: 768px) {
    padding: 30px 20px;
    min-height: calc(100vh - 180px);
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
    min-height: calc(100vh - 160px);
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
  text-align: center;
  width: 100%;
  max-width: 450px;

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 28px;
  }
`;
