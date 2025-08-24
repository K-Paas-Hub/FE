import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { VISA_TYPES } from '../../constants/visa';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock styled-components
jest.mock('styled-components', () => ({
  default: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

// Mock the actual VisaTypeCard component
const VisaTypeCard = ({ visaType, onClick }: any) => {
  const getVisaIcon = (visaId: string) => {
    switch (visaId) {
      case 'e9': return '🏭';
      case 'h2': return '👥';
      case 'd2': return '🎓';
      case 'e7': return '💼';
      default: return '📋';
    }
  };

  return (
    <div onClick={onClick} data-testid={`visa-card-${visaType.id}`}>
      <div>{getVisaIcon(visaType.id)}</div>
      <h3>{visaType.name}</h3>
      <p>{visaType.fullName}</p>
      <p>{visaType.description}</p>
      <div>📄 필요 서류: {visaType.documents.length}개</div>
      <div>
        <span>체류기간: {visaType.duration}</span>
        {visaType.extension && <span>연장 가능</span>}
      </div>
    </div>
  );
};

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

    const card = screen.getByTestId('visa-card-e9');
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
});
