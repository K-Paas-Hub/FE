import React from 'react';
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
  Sidebar
} from './components';

const AppContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #1b2d1a 50%, #1a1a1a 100%);
  min-height: 100vh;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

function App() {
  return (
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
}

export default App;
