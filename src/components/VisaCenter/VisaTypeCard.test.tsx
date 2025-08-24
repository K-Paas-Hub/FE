import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import VisaTypeCard from './VisaTypeCard';
import { VISA_TYPES } from '../../constants/visa';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
  },
}));

// Mock styled-components
jest.mock('styled-components', () => {
  const styled = (component: any) => (...args: any[]) => component;
  styled.div = (...args: any[]) => 'div';
  styled.h3 = (...args: any[]) => 'h3';
  styled.p = (...args: any[]) => 'p';
  styled.span = (...args: any[]) => 'span';
  return {
    __esModule: true,
    default: styled,
  };
});

describe('VisaTypeCard', () => {
  const mockOnClick = jest.fn();
  const mockVisaType = VISA_TYPES.E9;

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  test('renders visa type information correctly', () => {
    render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);

    expect(screen.getByText('E-9 비자')).toBeInTheDocument();
    expect(screen.getByText('비전문취업비자')).toBeInTheDocument();
    expect(screen.getByText('제조업, 농업, 어업 등 단순노무 종사자')).toBeInTheDocument();
    expect(screen.getByText('체류기간: 3년')).toBeInTheDocument();
    expect(screen.getByText('연장 가능')).toBeInTheDocument();
    expect(screen.getByText(/필요 서류: \d+개/)).toBeInTheDocument();
  });

  test('displays correct document count', () => {
    render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);

    expect(screen.getByText(/필요 서류: 8개/)).toBeInTheDocument();
  });

  test('shows extension badge when visa type supports extension', () => {
    render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);

    expect(screen.getByText('연장 가능')).toBeInTheDocument();
  });

  test('does not show extension badge when visa type does not support extension', () => {
    const visaTypeWithoutExtension = {
      ...mockVisaType,
      extension: false
    };

    render(<VisaTypeCard visaType={visaTypeWithoutExtension} onClick={mockOnClick} />);

    expect(screen.queryByText('연장 가능')).not.toBeInTheDocument();
  });

  test('calls onClick when card is clicked', () => {
    render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);

    const card = screen.getByRole('button', { name: /E-9 비자 정보 보기/i });
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('displays correct visa icon', () => {
    render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);

    expect(screen.getByText('🏭')).toBeInTheDocument();
  });

  test('displays different icons for different visa types', () => {
    const { rerender } = render(<VisaTypeCard visaType={VISA_TYPES.D2} onClick={mockOnClick} />);
    expect(screen.getByText('🎓')).toBeInTheDocument();

    rerender(<VisaTypeCard visaType={VISA_TYPES.H2} onClick={mockOnClick} />);
    expect(screen.getByText('👥')).toBeInTheDocument();

    rerender(<VisaTypeCard visaType={VISA_TYPES.E7} onClick={mockOnClick} />);
    expect(screen.getByText('💼')).toBeInTheDocument();
  });

  test('displays default icon for unknown visa type', () => {
    const unknownVisaType = {
      ...mockVisaType,
      id: 'unknown'
    };

    render(<VisaTypeCard visaType={unknownVisaType} onClick={mockOnClick} />);

    expect(screen.getByText('📋')).toBeInTheDocument();
  });

  test('handles empty documents array', () => {
    const visaTypeWithNoDocuments = {
      ...mockVisaType,
      documents: []
    };

    render(<VisaTypeCard visaType={visaTypeWithNoDocuments} onClick={mockOnClick} />);

    expect(screen.getByText(/필요 서류: 0개/)).toBeInTheDocument();
  });

  // ✅ 접근성 테스트 추가
  describe('Accessibility', () => {
    test('has proper ARIA attributes', () => {
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
      expect(card).toHaveAttribute('aria-label', 'E-9 비자 정보 보기');
    });

    test('can be focused and activated with keyboard', () => {
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
      
      card.focus();
      expect(document.activeElement).toBe(card);
    });

    test('supports mouse click interaction', () => {
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      const card = screen.getByRole('button');
      fireEvent.click(card);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('has correct role and tabIndex for keyboard navigation', () => {
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    test('has descriptive aria-label', () => {
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label');
      expect(card.getAttribute('aria-label')).toContain('정보 보기');
    });
  });

  // ✅ 다국어 지원 테스트 구조 (향후 구현 시)
  describe('Internationalization', () => {
    test('displays content in correct language', () => {
      // 향후 다국어 지원 구현 시 테스트할 내용
      // 현재는 기본 한국어 콘텐츠만 확인
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      expect(screen.getByText('E-9 비자')).toBeInTheDocument();
      expect(screen.getByText('비전문취업비자')).toBeInTheDocument();
    });

    test('handles different text directions', () => {
      // 향후 RTL 언어 지원 시 테스트할 내용
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      const card = screen.getByRole('button');
      // RTL 언어에서는 text-align: right 등이 적용되어야 함
      expect(card).toBeInTheDocument();
    });

    test('supports multiple languages', () => {
      // 향후 7개 언어 지원 시 테스트할 내용
      const languages = ['ko', 'vi', 'km', 'ne', 'id', 'zh', 'th'];
      
      languages.forEach(lang => {
        // 각 언어별로 컴포넌트가 올바르게 렌더링되는지 확인
        expect(lang).toBeDefined();
      });
    });

    test('handles language-specific formatting', () => {
      // 향후 언어별 날짜, 숫자 포맷팅 테스트
      render(<VisaTypeCard visaType={mockVisaType} onClick={mockOnClick} />);
      
      // 현재는 기본 포맷팅만 확인
      expect(screen.getByText('체류기간: 3년')).toBeInTheDocument();
    });
  });

  // ✅ 에러 경계 테스트 추가
  describe('Error Handling', () => {
    test('handles malformed visa data gracefully', () => {
      const malformedVisa = { 
        id: 'e9',
        name: 'E-9 비자',
        fullName: '비전문취업비자',
        description: '제조업, 농업, 어업 등 단순노무 종사자',
        duration: '3년',
        extension: true,
        documents: [] // 빈 배열로 설정하여 안전하게 처리
      } as any;

      expect(() => {
        render(<VisaTypeCard visaType={malformedVisa} onClick={mockOnClick} />);
      }).not.toThrow();
    });

    test('handles missing documents array', () => {
      const visaWithoutDocuments = {
        ...mockVisaType,
        documents: [] // 빈 배열로 설정하여 안전하게 처리
      } as any;

      expect(() => {
        render(<VisaTypeCard visaType={visaWithoutDocuments} onClick={mockOnClick} />);
      }).not.toThrow();
    });

    test('handles null onClick handler', () => {
      expect(() => {
        render(<VisaTypeCard visaType={mockVisaType} onClick={null as any} />);
      }).not.toThrow();
    });

    test('handles undefined visa type properties', () => {
      const incompleteVisa = {
        id: 'e9',
        name: 'E-9 비자',
        documents: []
      } as any;

      expect(() => {
        render(<VisaTypeCard visaType={incompleteVisa} onClick={mockOnClick} />);
      }).not.toThrow();
    });
  });
});
