import { validateFile, formatFileSize, getFileExtension } from './fileUtils';
import { FILE_CONSTANTS } from '../constants';

// Mock FILE_CONSTANTS to avoid external dependency issues
jest.mock('../constants', () => ({
  FILE_CONSTANTS: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    extensions: ['.pdf', '.doc', '.docx']
  }
}));

// Helper function to create mock File objects
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size, writable: false });
  return file;
};

describe('fileUtils', () => {
  describe('validateFile', () => {
    describe('File size validation', () => {
      test('accepts files within size limit', () => {
        const file = createMockFile('test.pdf', 5 * 1024 * 1024, 'application/pdf'); // 5MB
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      test('accepts files at exact size limit', () => {
        const file = createMockFile('test.pdf', FILE_CONSTANTS.maxSize, 'application/pdf'); // Exactly 10MB
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      test('rejects files exceeding size limit', () => {
        const file = createMockFile('test.pdf', 15 * 1024 * 1024, 'application/pdf'); // 15MB
        const result = validateFile(file);

        expect(result.valid).toBe(false);
        expect(result.error).toBe('파일 크기가 10MB를 초과합니다.');
      });

      test('rejects files just over size limit', () => {
        const file = createMockFile('test.pdf', FILE_CONSTANTS.maxSize + 1, 'application/pdf'); // 10MB + 1 byte
        const result = validateFile(file);

        expect(result.valid).toBe(false);
        expect(result.error).toBe('파일 크기가 10MB를 초과합니다.');
      });

      test('accepts empty files', () => {
        const file = createMockFile('test.pdf', 0, 'application/pdf'); // 0 bytes
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      test('accepts very small files', () => {
        const file = createMockFile('test.pdf', 1, 'application/pdf'); // 1 byte
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });
    });

    describe('File type validation', () => {
      test('accepts PDF files', () => {
        const file = createMockFile('document.pdf', 1024, 'application/pdf');
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      test('accepts DOC files', () => {
        const file = createMockFile('document.doc', 1024, 'application/msword');
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      test('accepts DOCX files', () => {
        const file = createMockFile('document.docx', 1024, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        const result = validateFile(file);

        expect(result.valid).toBe(true);
        expect(result.error).toBeUndefined();
      });

      test('rejects unsupported file types', () => {
        const unsupportedTypes = [
          { name: 'image.jpg', type: 'image/jpeg' },
          { name: 'image.png', type: 'image/png' },
          { name: 'text.txt', type: 'text/plain' },
          { name: 'script.js', type: 'application/javascript' },
          { name: 'data.json', type: 'application/json' },
          { name: 'spreadsheet.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
          { name: 'video.mp4', type: 'video/mp4' },
          { name: 'audio.mp3', type: 'audio/mpeg' },
        ];

        unsupportedTypes.forEach(({ name, type }) => {
          const file = createMockFile(name, 1024, type);
          const result = validateFile(file);

          expect(result.valid).toBe(false);
          expect(result.error).toBe('지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX만 가능)');
        });
      });

      test('rejects files with empty MIME type', () => {
        const file = createMockFile('document', 1024, '');
        const result = validateFile(file);

        expect(result.valid).toBe(false);
        expect(result.error).toBe('지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX만 가능)');
      });

      test('rejects files with null MIME type', () => {
        // @ts-ignore - Testing edge case
        const file = createMockFile('document', 1024, null);
        const result = validateFile(file);

        expect(result.valid).toBe(false);
        expect(result.error).toBe('지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX만 가능)');
      });
    });

    describe('Combined validation', () => {
      test('rejects large unsupported files', () => {
        const file = createMockFile('large.jpg', 15 * 1024 * 1024, 'image/jpeg'); // 15MB JPEG
        const result = validateFile(file);

        expect(result.valid).toBe(false);
        // Should fail on file size first (based on the implementation order)
        expect(result.error).toBe('파일 크기가 10MB를 초과합니다.');
      });

      test('rejects small unsupported files', () => {
        const file = createMockFile('small.txt', 1024, 'text/plain'); // 1KB text file
        const result = validateFile(file);

        expect(result.valid).toBe(false);
        expect(result.error).toBe('지원하지 않는 파일 형식입니다. (PDF, DOC, DOCX만 가능)');
      });

      test('accepts valid files with various names', () => {
        const validFiles = [
          { name: 'resume.pdf', type: 'application/pdf' },
          { name: 'CV-2024.doc', type: 'application/msword' },
          { name: '履历书.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
          { name: 'My Resume (Updated).pdf', type: 'application/pdf' },
          { name: '123.pdf', type: 'application/pdf' },
          { name: 'document-with-dashes.doc', type: 'application/msword' },
          { name: 'file_with_underscores.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
        ];

        validFiles.forEach(({ name, type }) => {
          const file = createMockFile(name, 1024, type);
          const result = validateFile(file);

          expect(result.valid).toBe(true);
          expect(result.error).toBeUndefined();
        });
      });
    });

    describe('Edge cases', () => {
      test('handles files with unusual names', () => {
        const unusualNames = [
          '',
          '.',
          '..',
          'no-extension',
          'multiple.dots.in.name.pdf',
          'very-long-filename-that-exceeds-normal-expectations-but-is-still-valid.pdf',
          '特殊字符文档.pdf',
          '파일이름.pdf',
          'file with spaces.pdf',
        ];

        unusualNames.forEach(name => {
          const file = createMockFile(name, 1024, 'application/pdf');
          const result = validateFile(file);

          expect(result.valid).toBe(true);
          expect(result.error).toBeUndefined();
        });
      });

      test('handles boundary conditions', () => {
        // Test at exact boundary
        const boundaryFile = createMockFile('test.pdf', FILE_CONSTANTS.maxSize, 'application/pdf');
        const boundaryResult = validateFile(boundaryFile);
        expect(boundaryResult.valid).toBe(true);

        // Test just over boundary
        const overBoundaryFile = createMockFile('test.pdf', FILE_CONSTANTS.maxSize + 1, 'application/pdf');
        const overBoundaryResult = validateFile(overBoundaryFile);
        expect(overBoundaryResult.valid).toBe(false);
      });
    });
  });

  describe('formatFileSize', () => {
    test('formats zero bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
    });

    test('formats bytes correctly', () => {
      expect(formatFileSize(1)).toBe('1 Bytes');
      expect(formatFileSize(512)).toBe('512 Bytes');
      expect(formatFileSize(1023)).toBe('1023 Bytes');
    });

    test('formats kilobytes correctly', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB'); // 1.5 * 1024
      expect(formatFileSize(2048)).toBe('2 KB');
      expect(formatFileSize(1024 * 1023)).toBe('1023 KB');
    });

    test('formats megabytes correctly', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1.5 * 1024 * 1024)).toBe('1.5 MB');
      expect(formatFileSize(5 * 1024 * 1024)).toBe('5 MB');
      expect(formatFileSize(10.5 * 1024 * 1024)).toBe('10.5 MB');
    });

    test('formats gigabytes correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
      expect(formatFileSize(1.5 * 1024 * 1024 * 1024)).toBe('1.5 GB');
      expect(formatFileSize(2.75 * 1024 * 1024 * 1024)).toBe('2.75 GB');
    });

    test('handles decimal precision correctly', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB'); // Exact 1.5
      expect(formatFileSize(1500)).toBe('1.46 KB'); // Should round to 2 decimal places
      expect(formatFileSize(1025)).toBe('1 KB'); // Should round down
      expect(formatFileSize(1075)).toBe('1.05 KB'); // Should show 2 decimal places
    });

    test('handles large numbers correctly', () => {
      const veryLarge = 1024 * 1024 * 1024 * 1024; // 1 TB
      const result = formatFileSize(veryLarge);
      expect(result).toBe('1024 GB'); // Should cap at GB
    });

    test('handles fractional bytes', () => {
      expect(formatFileSize(0.5)).toBe('0.5 Bytes');
      expect(formatFileSize(512.7)).toBe('512.7 Bytes');
    });

    test('handles negative numbers', () => {
      // Note: This is an edge case that might not be expected in real usage
      expect(formatFileSize(-1024)).toBe('-1 KB');
      expect(formatFileSize(-2048)).toBe('-2 KB');
      expect(formatFileSize(-1)).toBe('-1 Bytes');
    });

    test('handles very small decimals', () => {
      expect(formatFileSize(0.001)).toBe('0 Bytes');
      expect(formatFileSize(0.1)).toBe('0.1 Bytes');
    });
  });

  describe('getFileExtension', () => {
    test('extracts simple extensions correctly', () => {
      expect(getFileExtension('document.pdf')).toBe('pdf');
      expect(getFileExtension('resume.doc')).toBe('doc');
      expect(getFileExtension('cv.docx')).toBe('docx');
      expect(getFileExtension('image.jpg')).toBe('jpg');
      expect(getFileExtension('script.js')).toBe('js');
    });

    test('handles multiple dots in filename', () => {
      expect(getFileExtension('my.document.pdf')).toBe('pdf');
      expect(getFileExtension('file.name.with.dots.docx')).toBe('docx');
      expect(getFileExtension('version.1.0.2.txt')).toBe('txt');
      expect(getFileExtension('archive.tar.gz')).toBe('gz');
    });

    test('handles files without extensions', () => {
      expect(getFileExtension('README')).toBe('');
      expect(getFileExtension('Makefile')).toBe('');
      expect(getFileExtension('no-extension')).toBe('');
      expect(getFileExtension('filename')).toBe('');
    });

    test('handles files with dots but no extension', () => {
      expect(getFileExtension('filename.')).toBe('');
      expect(getFileExtension('file.with.dots.')).toBe('');
    });

    test('handles empty and special strings', () => {
      expect(getFileExtension('')).toBe('');
      expect(getFileExtension('.')).toBe('');
      expect(getFileExtension('..')).toBe('');
      expect(getFileExtension('...')).toBe('');
    });

    test('handles hidden files (starting with dot)', () => {
      expect(getFileExtension('.gitignore')).toBe('');
      expect(getFileExtension('.env')).toBe('');
      expect(getFileExtension('.hidden')).toBe('');
      expect(getFileExtension('.config.json')).toBe('json');
    });

    test('converts extensions to lowercase', () => {
      expect(getFileExtension('document.PDF')).toBe('pdf');
      expect(getFileExtension('resume.DOC')).toBe('doc');
      expect(getFileExtension('cv.DOCX')).toBe('docx');
      expect(getFileExtension('IMAGE.JPG')).toBe('jpg');
      expect(getFileExtension('Mixed.CaSe.TxT')).toBe('txt');
    });

    test('handles paths with directories', () => {
      // Note: This function is designed for filenames, not full paths
      // But testing edge cases where paths might be passed
      expect(getFileExtension('folder/document.pdf')).toBe('pdf');
      expect(getFileExtension('path/to/file.doc')).toBe('doc');
      expect(getFileExtension('/absolute/path/file.docx')).toBe('docx');
    });

    test('handles special characters in filenames', () => {
      expect(getFileExtension('문서.pdf')).toBe('pdf');
      expect(getFileExtension('档案.doc')).toBe('doc');
      expect(getFileExtension('файл.docx')).toBe('docx');
      expect(getFileExtension('file-with-dashes.pdf')).toBe('pdf');
      expect(getFileExtension('file_with_underscores.doc')).toBe('doc');
      expect(getFileExtension('file with spaces.docx')).toBe('docx');
      expect(getFileExtension('file(1).pdf')).toBe('pdf');
      expect(getFileExtension('file[copy].doc')).toBe('doc');
    });

    test('handles very long extensions', () => {
      expect(getFileExtension('file.verylongextension')).toBe('verylongextension');
      expect(getFileExtension('file.extension123456')).toBe('extension123456');
    });

    test('handles extensions with numbers', () => {
      expect(getFileExtension('backup.bak1')).toBe('bak1');
      expect(getFileExtension('document.v2')).toBe('v2');
      expect(getFileExtension('file.123')).toBe('123');
    });
  });

  describe('Integration tests', () => {
    test('validateFile and formatFileSize work together', () => {
      const file = createMockFile('document.pdf', 5 * 1024 * 1024, 'application/pdf'); // 5MB PDF
      const validation = validateFile(file);
      const sizeString = formatFileSize(file.size);

      expect(validation.valid).toBe(true);
      expect(sizeString).toBe('5 MB');
    });

    test('getFileExtension works with various valid file types', () => {
      const filenames = ['doc.pdf', 'resume.doc', 'cv.docx'];
      
      filenames.forEach(filename => {
        const extension = getFileExtension(filename);
        const mockType = extension === 'pdf' ? 'application/pdf' : 
                         extension === 'doc' ? 'application/msword' :
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        
        const file = createMockFile(filename, 1024, mockType);
        const validation = validateFile(file);
        
        expect(validation.valid).toBe(true);
        expect(['pdf', 'doc', 'docx']).toContain(extension);
      });
    });

    test('all utility functions handle edge cases consistently', () => {
      const edgeCases = [
        { filename: '', size: 0, type: 'application/pdf' },
        { filename: '.pdf', size: 1, type: 'application/pdf' },
        { filename: 'no-extension', size: 1024, type: 'application/pdf' }
      ];

      edgeCases.forEach(({ filename, size, type }) => {
        const file = createMockFile(filename, size, type);
        const validation = validateFile(file);
        const sizeString = formatFileSize(size);
        const extension = getFileExtension(filename);

        // All functions should execute without throwing errors
        expect(typeof validation.valid).toBe('boolean');
        expect(typeof sizeString).toBe('string');
        expect(typeof extension).toBe('string');
      });
    });
  });
});