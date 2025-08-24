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

    const card = screen.getByText('E-9 비자').closest('div');
    fireEvent.click(card!);

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
});
