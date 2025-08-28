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
    wrapper: ({ children }: { children: React.ReactNode }) => (
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
    test('provides default language context values', async () => {
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

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('ko');
      });
      await waitFor(() => {
        expect(screen.getByTestId('languages-count')).toHaveTextContent('8');
      });
    });

    test('initializes with saved language from localStorage', async () => {
      localStorageMock.getItem.mockReturnValue('en');

      const TestComponent = () => {
        const { currentLanguage } = useLanguage();
        return <span data-testid="current-language">{currentLanguage}</span>;
      };

      renderWithProvider(<TestComponent />);

      await waitFor(() => {
        expect(localStorageMock.getItem).toHaveBeenCalledWith('i18nextLng');
      });
      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('en');
      });
    });

    test('falls back to Korean when no saved language exists', async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const TestComponent = () => {
        const { currentLanguage } = useLanguage();
        return <span data-testid="current-language">{currentLanguage}</span>;
      };

      renderWithProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('current-language')).toHaveTextContent('ko');
      });
    });

    test('provides all supported languages', async () => {
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

      await waitFor(() => {
        expect(screen.getByTestId('lang-ko')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-en')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-vi')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-km')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-ne')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-id')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-zh')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getByTestId('lang-th')).toBeInTheDocument();
      });
    });
  });

  describe('useLanguage hook', () => {
    test('returns context values when used within provider', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await waitFor(() => {
        expect(result.current.currentLanguage).toBe('ko');
      });
      await waitFor(() => {
        expect(result.current.languages).toHaveLength(8);
      });
      await waitFor(() => {
        expect(typeof result.current.changeLanguage).toBe('function');
      });
    });

    test('calls changeLanguage function correctly', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('en');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en');
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });

    test('calls changeLanguage function for Vietnamese', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('vi');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'vi');
      expect(mockChangeLanguage).toHaveBeenCalledWith('vi');
    });

    test('calls changeLanguage function for Cambodian', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('km');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'km');
      expect(mockChangeLanguage).toHaveBeenCalledWith('km');
    });

    test('calls changeLanguage function for Nepali', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('ne');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'ne');
      expect(mockChangeLanguage).toHaveBeenCalledWith('ne');
    });

    test('calls changeLanguage function for Indonesian', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('id');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'id');
      expect(mockChangeLanguage).toHaveBeenCalledWith('id');
    });

    test('calls changeLanguage function for Chinese', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('zh');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'zh');
      expect(mockChangeLanguage).toHaveBeenCalledWith('zh');
    });

    test('calls changeLanguage function for Thai', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('th');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'th');
      expect(mockChangeLanguage).toHaveBeenCalledWith('th');
    });

    test('multiple language changes call functions correctly', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('en');
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en');
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');

      await act(async () => {
        result.current.changeLanguage('vi');
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'vi');
      expect(mockChangeLanguage).toHaveBeenCalledWith('vi');

      await act(async () => {
        result.current.changeLanguage('ko');
      });
      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'ko');
      expect(mockChangeLanguage).toHaveBeenCalledWith('ko');
    });
  });

  describe('Language data integrity', () => {
    test('all languages have required properties', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await waitFor(() => {
        result.current.languages.forEach((lang: { code: string; name: string; flag: string }) => {
          expect(lang).toHaveProperty('code');
          expect(lang).toHaveProperty('name');
          expect(lang).toHaveProperty('flag');
          expect(typeof lang.code).toBe('string');
          expect(typeof lang.name).toBe('string');
          expect(typeof lang.flag).toBe('string');
        });
      });
    });

    test('language codes are unique', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await waitFor(() => {
        const codes = result.current.languages.map((lang: { code: string; name: string; flag: string }) => lang.code);
        const uniqueCodes = new Set(codes);
        expect(codes.length).toBe(uniqueCodes.size);
      });
    });

    test('all language codes are valid', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await waitFor(() => {
        const validCodes = ['ko', 'en', 'vi', 'km', 'ne', 'id', 'zh', 'th'];
        result.current.languages.forEach((lang: { code: string; name: string; flag: string }) => {
          expect(validCodes).toContain(lang.code);
        });
      });
    });

    test('flag paths are correctly formatted', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await waitFor(() => {
        result.current.languages.forEach((lang: { code: string; name: string; flag: string }) => {
          expect(lang.flag).toMatch(/^\/images\/flags\/.+\.png$/);
        });
      });
    });
  });

  describe('localStorage integration', () => {
    test('saves language to localStorage on change', async () => {
      const { result } = renderHookWithProvider(() => useLanguage());

      await act(async () => {
        result.current.changeLanguage('en');
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith('i18nextLng', 'en');
    });

    test('handles localStorage errors gracefully', async () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const { result } = renderHookWithProvider(() => useLanguage());
      
      // Should not throw error when localStorage fails
      await act(async () => {
        result.current.changeLanguage('en');
      });
      
      // Function should still be called even if localStorage fails
      expect(mockChangeLanguage).toHaveBeenCalledWith('en');
    });

    test('handles localStorage getItem errors gracefully', async () => {
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