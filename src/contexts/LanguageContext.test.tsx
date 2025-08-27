import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { LanguageProvider, useLanguage } from './LanguageContext';

// Mock console.warn to suppress warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock react-i18next
const mockChangeLanguage = jest.fn();
jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: mockChangeLanguage,
      language: 'ko',
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const renderWithProvider = (children: React.ReactNode) => {
  return render(
    <LanguageProvider>
      {children}
    </LanguageProvider>
  );
};

const renderHookWithProvider = (hook: () => any) => {
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <LanguageProvider>
        {children}
      </LanguageProvider>
    ),
  });
};

describe('LanguageContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    mockChangeLanguage.mockClear();
    jest.clearAllMocks();
  });

  describe('LanguageProvider', () => {
    test('provides default language context values', () => {
      const TestComponent = () => {
        const { currentLanguage, languages } = useLanguage();
        return (
          <div>
            <span data-testid="current-language">{currentLanguage}</span>
            <span data-testid="languages-count">{languages.length}</span>
          </div>
        );
      };

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('current-language')).toHaveTextContent('ko');
      expect(screen.getByTestId('languages-count')).toHaveTextContent('8');
    });

    test('initializes with saved language from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('en');

      const TestComponent = () => {
        const { currentLanguage } = useLanguage();
        return <span data-testid="current-language">{currentLanguage}</span>;
      };

      renderWithProvider(<TestComponent />);

      expect(localStorageMock.getItem).toHaveBeenCalledWith('i18nextLng');
      expect(screen.getByTestId('current-language')).toHaveTextContent('en');
    });

    test('falls back to Korean when no saved language exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const TestComponent = () => {
        const { currentLanguage } = useLanguage();
        return <span data-testid="current-language">{currentLanguage}</span>;
      };

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('current-language')).toHaveTextContent('ko');
    });

    test('provides all supported languages', () => {
      const TestComponent = () => {
        const { languages } = useLanguage();
        return (
          <div>
            {languages.map(lang => (
              <span key={lang.code} data-testid={`lang-${lang.code}`}>
                {lang.name}
              </span>
            ))}
          </div>
        );
      };

      renderWithProvider(<TestComponent />);

      expect(screen.getByTestId('lang-ko')).toBeInTheDocument();
      expect(screen.getByTestId('lang-en')).toBeInTheDocument();
      expect(screen.getByTestId('lang-vi')).toBeInTheDocument();
      expect(screen.getByTestId('lang-km')).toBeInTheDocument();
      expect(screen.getByTestId('lang-ne')).toBeInTheDocument();
      expect(screen.getByTestId('lang-id')).toBeInTheDocument();
      expect(screen.getByTestId('lang-zh')).toBeInTheDocument();
      expect(screen.getByTestId('lang-th')).toBeInTheDocument();
    });
  });

  describe('useLanguage hook', () => {
    test('returns context values when used within provider', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      expect(result.current.currentLanguage).toBe('ko');
      expect(result.current.languages).toHaveLength(8);
      expect(typeof result.current.changeLanguage).toBe('function');
    });

    test('calls changeLanguage function correctly', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('en');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en');
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });

    test('calls changeLanguage function for Vietnamese', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('vi');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'vi');
      expect(mockChangeLanguage).toHaveBeenCalledWith('vi');
    });

    test('calls changeLanguage function for Cambodian', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('km');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'km');
      expect(mockChangeLanguage).toHaveBeenCalledWith('km');
    });

    test('calls changeLanguage function for Nepali', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('ne');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'ne');
      expect(mockChangeLanguage).toHaveBeenCalledWith('ne');
    });

    test('calls changeLanguage function for Indonesian', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('id');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'id');
      expect(mockChangeLanguage).toHaveBeenCalledWith('id');
    });

    test('calls changeLanguage function for Chinese', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('zh');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'zh');
      expect(mockChangeLanguage).toHaveBeenCalledWith('zh');
    });

    test('calls changeLanguage function for Thai', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('th');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'th');
      expect(mockChangeLanguage).toHaveBeenCalledWith('th');
    });

    test('multiple language changes call functions correctly', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('en');
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en');
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');

      act(() => {
        result.current.changeLanguage('vi');
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'vi');
      expect(mockChangeLanguage).toHaveBeenCalledWith('vi');

      act(() => {
        result.current.changeLanguage('ko');
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'ko');
      expect(mockChangeLanguage).toHaveBeenCalledWith('ko');
    });
  });

  describe('Language data integrity', () => {
    test('all languages have required properties', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      result.current.languages.forEach((lang: { code: string; name: string; flag: string }) => {
        expect(lang).toHaveProperty('code');
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('flag');
        expect(typeof lang.code).toBe('string');
        expect(typeof lang.name).toBe('string');
        expect(typeof lang.flag).toBe('string');
      });
    });

    test('language codes are unique', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      const codes = result.current.languages.map((lang: { code: string; name: string; flag: string }) => lang.code);
      const uniqueCodes = new Set(codes);
      expect(codes.length).toBe(uniqueCodes.size);
    });

    test('all language codes are valid', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      const validCodes = ['ko', 'en', 'vi', 'km', 'ne', 'id', 'zh', 'th'];
      result.current.languages.forEach((lang: { code: string; name: string; flag: string }) => {
        expect(validCodes).toContain(lang.code);
      });
    });

    test('flag paths are correctly formatted', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      result.current.languages.forEach((lang: { code: string; name: string; flag: string }) => {
        expect(lang.flag).toMatch(/^\/images\/flags\/.+\.png$/);
      });
    });
  });

  describe('localStorage integration', () => {
    test('saves language to localStorage on change', () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      act(() => {
        result.current.changeLanguage('en');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en');
    });

    test('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const { result } = renderHookWithProvider(() => useLanguage());
      
      // Should not throw error when localStorage fails
      expect(() => {
        act(() => {
          result.current.changeLanguage('en');
        });
      }).not.toThrow();
      
      // Function should still be called even if localStorage fails
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });

    test('handles localStorage getItem errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage getItem error');
      });

      // Should not throw error when localStorage.getItem fails
      expect(() => {
        renderHookWithProvider(() => useLanguage());
      }).not.toThrow();
    });
  });
});