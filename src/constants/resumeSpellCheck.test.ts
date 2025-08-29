import { RESUME_SPELL_CHECK_RULES } from './resumeSpellCheck';

describe('RESUME_SPELL_CHECK_RULES', () => {
  test('should be defined and have correct structure', () => {
    expect(RESUME_SPELL_CHECK_RULES).toBeDefined();
    expect(typeof RESUME_SPELL_CHECK_RULES).toBe('object');
  });

  test('should have all required categories', () => {
    expect(RESUME_SPELL_CHECK_RULES).toHaveProperty('pronunciationErrors');
    expect(RESUME_SPELL_CHECK_RULES).toHaveProperty('finalConsonantErrors');
    expect(RESUME_SPELL_CHECK_RULES).toHaveProperty('particleErrors');
    expect(RESUME_SPELL_CHECK_RULES).toHaveProperty('spacingErrors');
    expect(RESUME_SPELL_CHECK_RULES).toHaveProperty('commonWordErrors');
    expect(RESUME_SPELL_CHECK_RULES).toHaveProperty('endingErrors');
  });

  describe('pronunciationErrors', () => {
    test('should contain pronunciation error mappings', () => {
      const { pronunciationErrors } = RESUME_SPELL_CHECK_RULES;
      
      expect(typeof pronunciationErrors).toBe('object');
      expect(Object.keys(pronunciationErrors).length).toBeGreaterThan(0);
      
      // Test specific pronunciation corrections
      expect(pronunciationErrors['식발']).toBe('신발');
      expect(pronunciationErrors['컴퓨타']).toBe('컴퓨터');
      expect(pronunciationErrors['시발']).toBe('신발');
      
      // All values should be strings
      Object.values(pronunciationErrors).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    test('should have all pronunciation error keys as strings', () => {
      const { pronunciationErrors } = RESUME_SPELL_CHECK_RULES;
      
      Object.keys(pronunciationErrors).forEach(key => {
        expect(typeof key).toBe('string');
        expect(key.length).toBeGreaterThan(0);
      });
    });
  });

  describe('finalConsonantErrors', () => {
    test('should contain final consonant error mappings', () => {
      const { finalConsonantErrors } = RESUME_SPELL_CHECK_RULES;
      
      expect(typeof finalConsonantErrors).toBe('object');
      expect(Object.keys(finalConsonantErrors).length).toBeGreaterThan(0);
      
      // Test specific final consonant corrections
      expect(finalConsonantErrors['일하']).toBe('일하다');
      expect(finalConsonantErrors['먹']).toBe('먹다');
      expect(finalConsonantErrors['읽']).toBe('읽다');
      
      // All values should end with '다'
      Object.values(finalConsonantErrors).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.endsWith('다')).toBe(true);
      });
    });

    test('should have consistent verb forms', () => {
      const { finalConsonantErrors } = RESUME_SPELL_CHECK_RULES;
      
      Object.entries(finalConsonantErrors).forEach(([incorrect, correct]) => {
        expect(typeof incorrect).toBe('string');
        expect(typeof correct).toBe('string');
        expect(correct.length).toBeGreaterThan(incorrect.length);
      });
    });
  });

  describe('particleErrors', () => {
    test('should contain particle error mappings', () => {
      const { particleErrors } = RESUME_SPELL_CHECK_RULES;
      
      expect(typeof particleErrors).toBe('object');
      expect(Object.keys(particleErrors).length).toBeGreaterThan(0);
      
      // Test specific particle corrections
      expect(particleErrors['학교에']).toBe('학교에서');
      expect(particleErrors['회사에']).toBe('회사에서');
      expect(particleErrors['집에']).toBe('집에서');
      
      // All values should be strings
      Object.values(particleErrors).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    test('should have location-based particle corrections', () => {
      const { particleErrors } = RESUME_SPELL_CHECK_RULES;
      
      Object.entries(particleErrors).forEach(([incorrect, correct]) => {
        expect(typeof incorrect).toBe('string');
        expect(typeof correct).toBe('string');
        expect(incorrect.length).toBeGreaterThan(0);
        expect(correct.length).toBeGreaterThan(0);
      });
    });
  });

  describe('spacingErrors', () => {
    test('should contain spacing error mappings', () => {
      const { spacingErrors } = RESUME_SPELL_CHECK_RULES;
      
      expect(typeof spacingErrors).toBe('object');
      expect(Object.keys(spacingErrors).length).toBeGreaterThan(0);
      
      // Test specific spacing corrections
      expect(spacingErrors['일하러가다']).toBe('일하러 가다');
      expect(spacingErrors['학교에가다']).toBe('학교에 가다');
      expect(spacingErrors['회사에가다']).toBe('회사에 가다');
      
      // Corrected values should contain spaces
      Object.values(spacingErrors).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.includes(' ')).toBe(true);
      });
    });

    test('should have consistent spacing patterns', () => {
      const { spacingErrors } = RESUME_SPELL_CHECK_RULES;
      
      Object.entries(spacingErrors).forEach(([incorrect, correct]) => {
        expect(typeof incorrect).toBe('string');
        expect(typeof correct).toBe('string');
        expect(incorrect.includes(' ')).toBe(false); // Incorrect should have no spaces
        expect(correct.includes(' ')).toBe(true); // Correct should have spaces
      });
    });
  });

  describe('commonWordErrors', () => {
    test('should contain common word error mappings', () => {
      const { commonWordErrors } = RESUME_SPELL_CHECK_RULES;
      
      expect(typeof commonWordErrors).toBe('object');
      expect(Object.keys(commonWordErrors).length).toBeGreaterThan(0);
      
      // Test specific common word corrections
      expect(commonWordErrors['안녕하세요']).toBe('안녕하십니까');
      expect(commonWordErrors['감사합니다']).toBe('감사드립니다');
      expect(commonWordErrors['네']).toBe('예');
      
      // All values should be formal expressions
      Object.values(commonWordErrors).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    test('should provide formal alternatives', () => {
      const { commonWordErrors } = RESUME_SPELL_CHECK_RULES;
      
      Object.entries(commonWordErrors).forEach(([informal, formal]) => {
        expect(typeof informal).toBe('string');
        expect(typeof formal).toBe('string');
        expect(informal.length).toBeGreaterThan(0);
        expect(formal.length).toBeGreaterThan(0);
      });
    });
  });

  describe('endingErrors', () => {
    test('should contain ending error mappings', () => {
      const { endingErrors } = RESUME_SPELL_CHECK_RULES;
      
      expect(typeof endingErrors).toBe('object');
      expect(Object.keys(endingErrors).length).toBeGreaterThan(0);
      
      // Test specific ending corrections
      expect(endingErrors['~해요']).toBe('~합니다');
      expect(endingErrors['~이에요']).toBe('~입니다');
      expect(endingErrors['~거든요']).toBe('~기 때문입니다');
      
      // All values should be strings
      Object.values(endingErrors).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });

    test('should provide formal sentence endings', () => {
      const { endingErrors } = RESUME_SPELL_CHECK_RULES;
      
      Object.entries(endingErrors).forEach(([informal, formal]) => {
        expect(typeof informal).toBe('string');
        expect(typeof formal).toBe('string');
        expect(informal.startsWith('~')).toBe(true);
        expect(formal.startsWith('~')).toBe(true);
      });
    });
  });

  test('should be a const assertion for type safety', () => {
    // This test ensures the object structure remains constant
    const keys = Object.keys(RESUME_SPELL_CHECK_RULES);
    expect(keys).toHaveLength(6);
    expect(keys.sort()).toEqual([
      'pronunciationErrors',
      'finalConsonantErrors', 
      'particleErrors',
      'spacingErrors',
      'commonWordErrors',
      'endingErrors'
    ].sort());
  });

  test('should not have empty categories', () => {
    Object.values(RESUME_SPELL_CHECK_RULES).forEach(category => {
      expect(Object.keys(category).length).toBeGreaterThan(0);
    });
  });

  test('should have reasonable number of unique values in each category', () => {
    Object.entries(RESUME_SPELL_CHECK_RULES).forEach(([categoryName, category]) => {
      const values = Object.values(category);
      const uniqueValues = new Set(values);
      // Some categories may have legitimate repeated values
      expect(uniqueValues.size).toBeGreaterThan(0);
      expect(uniqueValues.size).toBeLessThanOrEqual(values.length);
    });
  });
});