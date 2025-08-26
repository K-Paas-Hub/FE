import React from 'react';
import '../../styles/MainFooter.css';

const MainFooter: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="top-nav">
          <a href="#company" className="top-nav-link">회사소개</a>
          <a href="#recruitment" className="top-nav-link">인재채용</a>
          <a href="#terms" className="top-nav-link">회원약관</a>
          <a href="#privacy" className="top-nav-link">개인정보처리방침</a>
          <a href="#email-reject" className="top-nav-link">이메일무단수집거부</a>
          <a href="#api" className="top-nav-link">채용정보 API</a>
          <a href="#partnership" className="top-nav-link">제휴문의</a>
          <a href="#customer-center" className="top-nav-link">고객센터</a>
        </div>
        
        <div className="main-section">
          <div className="left-section">
            <div className="footer-logo">FairWork</div>
            <div className="customer-service">
              <br/>
              FairWork 고객센터 02-3354-1256 (평일 09:00~19:00, 주말·공휴일 휴무)
            </div>
            <div className="contact-info">
              이메일 : contact@fairwork.co.kr, Fax : 02-1234-5679(대표), 02-1234-5680(세금계산서)
            </div>
          </div>
          
          <div className="right-section">
            <button className="email-button">이메일 문의</button>
            <div className="social-icons">
              <a href="#blog">B</a>
              <a href="#facebook">f</a>
            </div>
          </div>
        </div>
        
        <div className="company-info">
          (주)FairWork, 우: 03921, 서울 마포구 월드컵북로 60길 17, 상암 IT 타워 6층, 대표 : 최홍석, 김미르, 임성혁, 홍윤기, 허완
        </div>
        
        <div className="business-info">
          사업자등록: 123-45-67890, 직업정보제공사업 : 서울 강남 제 2024-1호, 통신판매업 : 제 2024-서울강남-1234호
          <button className="business-button">사업자정보확인</button>
        </div>
        
        <div className="certification">
          <div className="isms-logo">ISMS-P</div>
        </div>
        
        <div className="copyright">
          Copyright (c) (주)FairWork. All rights reserved.
        </div>
        
        <div className="mobile-link-container">
          <a href="#mobile" className="mobile-link">모바일 버전 보기</a>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
