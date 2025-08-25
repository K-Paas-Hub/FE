import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './styles/App.css';

// 컴포넌트 imports
import {
  Header,
  HeroSection,
  FeaturesSection,
  StatsSection,
  BlogSection,
  PartnersSection,
  Footer,
  Sidebar,
  MainPage,
  VisaCenter,
  ContractTutorial,
  ResumePage,
  SpellCheckPage,
  ContractAnalysis,
  ContractQuiz
} from './components';
import VisaDetailPage from './components/VisaCenter/VisaDetailPage';

const AppContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #1b2d1a 50%, #1a1a1a 100%);
  min-height: 100vh;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const LandingPage = () => (
  <AppContainer>
    <Header />
    <Sidebar />
    <HeroSection />
    <FeaturesSection />
    <StatsSection />
    <BlogSection />
    <PartnersSection />
    <Footer />
  </AppContainer>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/visa" element={<VisaCenter />} />
        <Route path="/visa/:type" element={<VisaDetailPage />} />
        <Route path="/contract-tutorial" element={<ContractTutorial />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/spell-check" element={<SpellCheckPage />} />
        <Route path="/contract-analysis" element={<ContractAnalysis />} />
        <Route path="/contract-quiz" element={<ContractQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
