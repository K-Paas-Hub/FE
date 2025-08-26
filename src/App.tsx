import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import './i18n';
import { LanguageProvider } from './contexts/LanguageContext';

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
  ContractAnalysis,
  ContractQuiz
} from './components';
import ForeignWorkerSpellCheckPage from './components/SpellCheck/ForeignWorkerSpellCheckPage';

import MyPage from './components/MyPage';
import VisaDetailPage from './components/VisaCenter/VisaDetailPage';
import JobDetailPage from './components/JobDetailPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PasswordResetPage from './components/PasswordResetPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';
import InterviewPage from './components/InterviewPage';
import { GoogleOAuthForm, OAuthSuccess } from './components/OAuth';

const LandingPage = () => (
  <div className="app-container">
    <Header />
    <Sidebar />
    <HeroSection />
    <FeaturesSection />
    <StatsSection />
    <BlogSection />
    <PartnersSection />
    <Footer />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/job/:id" element={<JobDetailPage />} />
          <Route path="/visa" element={<VisaCenter />} />
          <Route path="/visa/:type" element={<VisaDetailPage />} />
          <Route path="/contract-tutorial" element={<ContractTutorial />} />
          <Route path="/contract-quiz" element={<ContractQuiz />} />
          <Route path="/resume" element={<ResumePage />} />

          <Route path="/foreign-worker-spell-check" element={<ForeignWorkerSpellCheckPage />} />

          <Route path="/contract-analysis" element={<ContractAnalysis />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/find-password" element={<PasswordResetPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/oauth/additional-info" element={<GoogleOAuthForm />} />
          <Route path="/oauth/success" element={<OAuthSuccess />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
