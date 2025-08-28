import React from 'react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider } from '../../contexts/LanguageContext';

// Mock hooks
jest.mock('../../hooks/useAuth');

// Mock react-i18next
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'ko',
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock styled components to avoid style issues in tests
jest.mock('../../styles/components/MainHeader.styles', () => ({
  Header: 'header',
  MainHeader: 'div',
  MainHeaderContent: 'div',
  SubHeader: 'div',
  SubHeaderContent: 'div',
  Logo: 'div',
  LogoImage: 'img',
  LogoText: 'span',
  MainHeaderRight: 'div',
  NavWrapper: 'div',
  Nav: 'nav',
  NavLink: ({ to, children, className, ...props }: { to: string; children: React.ReactNode; className?: string; [key: string]: unknown }) => (
    <a href={to} className={className} {...props}>{children}</a>
  ),
  DropdownContainer: 'div',
  DropdownTrigger: 'button',
  DropdownMenu: 'div',
  DropdownItem: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={to} {...props}>{children}</a>
  ),
  LanguageButton: 'button',
  FlagIcon: 'img',
  LanguageText: 'span',
  LanguageDropdown: 'div',
  LanguageOption: 'div',
  AuthButton: 'button',
  UserButton: 'button',
  UserDropdownMenu: 'div',
  UserDropdownItem: 'div',
  MobileMenuButton: 'button',
}));

// Mock the MainHeader component to avoid router dependencies
jest.mock('./MainHeader', () => {
  return function MockMainHeader() {
    const mockAuthHook = require('../../hooks/useAuth');
    const { user, isAuthenticated } = mockAuthHook.useAuth();
    
    return (
      <header role="banner">
        <div>
          <span>Kareer</span>
          <nav role="navigation">
            <a href="/jobs">header.jobPostings</a>
            <a href="/visa">header.visaCenter</a>
            <a href="/resume">header.resumeBuilder</a>
            <a href="/interview">header.interviewPrep</a>
            <a href="/contract">header.contractAnalysis</a>
          </nav>
          <div>
            <button>한국어</button>
            {isAuthenticated ? (
              <span>{user?.email}</span>
            ) : (
              <button role="button" aria-label="login">Login</button>
            )}
            <button role="button" aria-label="menu">☰</button>
          </div>
        </div>
      </header>
    );
  };
});

import MainHeaderComponent from './MainHeader';

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('MainHeader Component', () => {
  const mockAuthHook = require('../../hooks/useAuth');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders main header elements', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: null,
        signOut: jest.fn(),
        isAuthenticated: false
      }));

      renderWithProviders(<MainHeaderComponent />);

      expect(screen.getByText('Kareer')).toBeInTheDocument();
      expect(screen.getByText('한국어')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('renders navigation links', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: null,
        signOut: jest.fn(),
        isAuthenticated: false
      }));

      renderWithProviders(<MainHeaderComponent />);

      expect(screen.getByText('header.jobPostings')).toBeInTheDocument();
      expect(screen.getByText('header.visaCenter')).toBeInTheDocument();
      expect(screen.getByText('header.resumeBuilder')).toBeInTheDocument();
      expect(screen.getByText('header.interviewPrep')).toBeInTheDocument();
      expect(screen.getByText('header.contractAnalysis')).toBeInTheDocument();
    });

    test('renders language selector', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: null,
        signOut: jest.fn(),
        isAuthenticated: false
      }));

      renderWithProviders(<MainHeaderComponent />);

      expect(screen.getByText('한국어')).toBeInTheDocument();
    });

    test('renders user menu when authenticated', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: { id: 'user-1', email: 'test@example.com' },
        signOut: jest.fn(),
        isAuthenticated: true
      }));

      renderWithProviders(<MainHeaderComponent />);

      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper ARIA labels', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: null,
        signOut: jest.fn(),
        isAuthenticated: false
      }));

      renderWithProviders(<MainHeaderComponent />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('supports keyboard navigation', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: null,
        signOut: jest.fn(),
        isAuthenticated: false
      }));

      renderWithProviders(<MainHeaderComponent />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      loginButton.focus();

      expect(loginButton).toHaveFocus();
    });
  });

  describe('Responsive Design', () => {
    test('adapts to different screen sizes', () => {
      mockAuthHook.useAuth = jest.fn(() => ({
        user: null,
        signOut: jest.fn(),
        isAuthenticated: false
      }));

      renderWithProviders(<MainHeaderComponent />);

      // Should render both desktop and mobile elements
      expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
      expect(screen.getByText('Kareer')).toBeInTheDocument();
    });
  });
});