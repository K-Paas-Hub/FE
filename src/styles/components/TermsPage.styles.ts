import styled from 'styled-components';

/**
 * TermsPage 컴포넌트 스타일
 * TermsPage.css를 styled-components로 변환
 */

export const TermsContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const TermsContent = styled.div`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
  line-height: 1.6;
  color: #333333;

  @media (max-width: 768px) {
    padding: 30px 16px;
  }

  @media (max-width: 480px) {
    padding: 24px 12px;
  }
`;

export const TermsTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 40px;
  text-align: center;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 28px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

export const TermsSection = styled.section`
  margin-bottom: 30px;

  &:first-of-type {
    margin-top: 0;
  }

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 15px;
    margin-top: 30px;

    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 12px;
    }

    @media (max-width: 480px) {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  p {
    font-size: 15px;
    color: #4b5563;
    margin-bottom: 10px;
    line-height: 1.7;

    @media (max-width: 768px) {
      font-size: 14px;
    }

    @media (max-width: 480px) {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
  }
`;

export const LoginButtonSection = styled.div`
  text-align: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const LoginButton = styled.a`
  display: inline-block;
  padding: 12px 32px;
  background: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background: #0052a3;
  }

  @media (max-width: 768px) {
    padding: 10px 24px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 13px;
  }
`;
