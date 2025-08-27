import React from 'react';
import { render, screen } from '@testing-library/react';
import SpellCheckResult from './SpellCheckResult';
import { SpellCheckError, ResumeCheckResult, SectionCheckResult } from '../../types/spellCheck';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('SpellCheckResult', () => {
  const mockOnApplyCorrection = jest.fn();

  const createMockError = (overrides?: Partial<SpellCheckError>): SpellCheckError => ({
    id: 'error-1',
    word: '틀린단어',
    suggestion: '올바른단어',
    description: '맞춤법 오류',
    position: { start: 0, end: 4 },
    errorType: 'spelling',
    severity: 'medium',
    confidence: 0.8,
    ...overrides,
  });

  const createMockResult = (overrides?: Partial<ResumeCheckResult>): ResumeCheckResult => ({
    sections: [
      {
        section: 'name',
        errors: [],
        wordCount: 1,
        accuracy: 100,
      },
    ],
    overallStatistics: {
      totalWords: 10,
      totalErrors: 0,
      overallAccuracy: 100,
      processingTime: 1500,
    },
    ...overrides,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Overall Statistics Display', () => {
    it('displays overall statistics correctly', () => {
      const result = createMockResult({
        overallStatistics: {
          totalWords: 150,
          totalErrors: 5,
          overallAccuracy: 96.7,
          processingTime: 2000,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('96.7%')).toBeInTheDocument();
    });

    it('displays zero errors correctly', () => {
      const result = createMockResult({
        overallStatistics: {
          totalWords: 100,
          totalErrors: 0,
          overallAccuracy: 100,
          processingTime: 1000,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('displays processing time correctly', () => {
      const result = createMockResult({
        overallStatistics: {
          totalWords: 50,
          totalErrors: 2,
          overallAccuracy: 96,
          processingTime: 1500,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('1.5초')).toBeInTheDocument();
    });
  });

  describe('Section Display', () => {
    it('displays sections with errors correctly', () => {
      const error = createMockError();
      const result = createMockResult({
        sections: [
          {
            section: 'introduction',
            errors: [error],
            wordCount: 10,
            accuracy: 90,
          },
        ],
        overallStatistics: {
          totalWords: 10,
          totalErrors: 1,
          overallAccuracy: 90,
          processingTime: 1200,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('introduction')).toBeInTheDocument();
      expect(screen.getByText('틀린단어')).toBeInTheDocument();
      expect(screen.getByText('올바른단어')).toBeInTheDocument();
    });

    it('displays multiple errors in a section correctly', () => {
      const error1 = createMockError({ id: 'error-1', word: '첫번째' });
      const error2 = createMockError({ id: 'error-2', word: '두번째' });
      const result = createMockResult({
        sections: [
          {
            section: 'introduction',
            errors: [error1, error2],
            wordCount: 10,
            accuracy: 80,
          },
        ],
        overallStatistics: {
          totalWords: 10,
          totalErrors: 2,
          overallAccuracy: 80,
          processingTime: 1800,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('첫번째')).toBeInTheDocument();
      expect(screen.getByText('두번째')).toBeInTheDocument();
    });

    it('displays sections without errors correctly', () => {
      const result = createMockResult({
        sections: [
          {
            section: 'name',
            errors: [],
            wordCount: 1,
            accuracy: 100,
          },
        ],
        overallStatistics: {
          totalWords: 1,
          totalErrors: 0,
          overallAccuracy: 100,
          processingTime: 500,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('오류 없음')).toBeInTheDocument();
    });
  });

  describe('Error Details Display', () => {
    it('displays error details correctly', () => {
      const error = createMockError({
        id: 'error-1',
        word: '틀린말',
        suggestion: '올바른말',
        description: '맞춤법 오류입니다',
        errorType: 'spelling',
        severity: 'high',
        confidence: 0.9,
      });

      const result = createMockResult({
        sections: [
          {
            section: 'introduction',
            errors: [error],
            wordCount: 1,
            accuracy: 0,
          },
        ],
        overallStatistics: {
          totalWords: 1,
          totalErrors: 1,
          overallAccuracy: 0,
          processingTime: 800,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('틀린말')).toBeInTheDocument();
      expect(screen.getByText('올바른말')).toBeInTheDocument();
      expect(screen.getByText('맞춤법 오류입니다')).toBeInTheDocument();
    });

    it('displays different error types correctly', () => {
      const spellingError = createMockError({
        id: 'spelling-1',
        errorType: 'spelling',
        description: '맞춤법 오류',
      });
      const grammarError = createMockError({
        id: 'grammar-1',
        errorType: 'grammar',
        description: '문법 오류',
      });

      const result = createMockResult({
        sections: [
          {
            section: 'experience',
            errors: [spellingError, grammarError],
            wordCount: 1,
            accuracy: 0,
          },
        ],
        overallStatistics: {
          totalWords: 1,
          totalErrors: 2,
          overallAccuracy: 0,
          processingTime: 1200,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('맞춤법 오류')).toBeInTheDocument();
      expect(screen.getByText('문법 오류')).toBeInTheDocument();
    });
  });

  describe('Mixed Sections Display', () => {
    it('displays sections with and without errors correctly', () => {
      const errorSection: SectionCheckResult = {
        section: 'introduction',
        errors: [createMockError()],
        wordCount: 5,
        accuracy: 80,
      };

      const noErrorSection: SectionCheckResult = {
        section: 'experience',
        errors: [],
        wordCount: 1,
        accuracy: 100,
      };

      const result = createMockResult({
        sections: [errorSection, noErrorSection],
        overallStatistics: {
          totalWords: 6,
          totalErrors: 1,
          overallAccuracy: 83.3,
          processingTime: 1500,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('introduction')).toBeInTheDocument();
      expect(screen.getByText('experience')).toBeInTheDocument();
      expect(screen.getByText('틀린단어')).toBeInTheDocument();
      expect(screen.getByText('오류 없음')).toBeInTheDocument();
    });
  });

  describe('Section Navigation', () => {
    it('displays all resume sections correctly', () => {
      const resumeSections = ['name', 'introduction', 'experience', 'education', 'skills'] as const;
      
      const sections: SectionCheckResult[] = resumeSections.map(key => ({
        section: key,
        errors: [createMockError()],
        wordCount: 1,
        accuracy: 0,
      }));

      const result = createMockResult({
        sections,
        overallStatistics: {
          totalWords: 5,
          totalErrors: 5,
          overallAccuracy: 0,
          processingTime: 2500,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      resumeSections.forEach(section => {
        expect(screen.getByText(section)).toBeInTheDocument();
      });
    });

    it('handles unknown sections gracefully', () => {
      const result = createMockResult({
        sections: [
          {
            section: 'unknownSection' as any,
            errors: [createMockError()],
            wordCount: 1,
            accuracy: 0,
          },
        ],
        overallStatistics: {
          totalWords: 1,
          totalErrors: 1,
          overallAccuracy: 0,
          processingTime: 800,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('unknownSection')).toBeInTheDocument();
    });
  });

  describe('Error Severity Display', () => {
    it('displays high severity errors with appropriate styling', () => {
      const highSeverityError = createMockError({
        errorType: 'spelling',
        severity: 'high',
        description: '심각한 맞춤법 오류',
      });

      const result = createMockResult({
        sections: [
          {
            section: 'introduction',
            errors: [highSeverityError],
            wordCount: 1,
            accuracy: 0,
          },
        ],
        overallStatistics: {
          totalWords: 1,
          totalErrors: 1,
          overallAccuracy: 0,
          processingTime: 1000,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('심각한 맞춤법 오류')).toBeInTheDocument();
    });

    it('displays low severity errors correctly', () => {
      const lowSeverityError = createMockError({
        errorType: 'spacing',
        severity: 'low',
        description: '간격 오류',
      });

      const result = createMockResult({
        sections: [
          {
            section: 'experience',
            errors: [lowSeverityError],
            wordCount: 1,
            accuracy: 0,
          },
        ],
        overallStatistics: {
          totalWords: 1,
          totalErrors: 1,
          overallAccuracy: 0,
          processingTime: 600,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('간격 오류')).toBeInTheDocument();
    });
  });

  describe('Complex Error Scenarios', () => {
    it('handles multiple sections with mixed error types', () => {
      const result = createMockResult({
        sections: [
          {
            section: 'name',
            errors: [],
            wordCount: 1,
            accuracy: 100,
          },
          {
            section: 'introduction',
            errors: [
              createMockError({
                id: 'error-1',
                word: '안녕하세요.',
                suggestion: '안녕하세요',
                errorType: 'punctuation',
                description: '불필요한 마침표',
              }),
            ],
            wordCount: 3,
            accuracy: 66.7,
          },
          {
            section: 'experience',
            errors: [],
            wordCount: 2,
            accuracy: 100,
          },
        ],
        overallStatistics: {
          totalWords: 7,
          totalErrors: 1,
          overallAccuracy: 85.7,
          processingTime: 1800,
        },
      });

      render(<SpellCheckResult result={result} onApplyCorrection={mockOnApplyCorrection} />);

      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('introduction')).toBeInTheDocument();
      expect(screen.getByText('experience')).toBeInTheDocument();
      expect(screen.getByText('안녕하세요.')).toBeInTheDocument();
      expect(screen.getByText('안녕하세요')).toBeInTheDocument();
      expect(screen.getByText('불필요한 마침표')).toBeInTheDocument();
    });
  });
});