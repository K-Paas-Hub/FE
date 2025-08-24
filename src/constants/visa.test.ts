import { VISA_TYPES, VISA_STEPS } from './visa';

describe('Visa Constants', () => {
  describe('VISA_TYPES', () => {
    test('contains all required visa types', () => {
      expect(VISA_TYPES).toHaveProperty('E9');
      expect(VISA_TYPES).toHaveProperty('H2');
      expect(VISA_TYPES).toHaveProperty('D2');
      expect(VISA_TYPES).toHaveProperty('E7');
    });

    test('each visa type has required properties', () => {
      Object.values(VISA_TYPES).forEach(visaType => {
        expect(visaType).toHaveProperty('id');
        expect(visaType).toHaveProperty('name');
        expect(visaType).toHaveProperty('fullName');
        expect(visaType).toHaveProperty('description');
        expect(visaType).toHaveProperty('duration');
        expect(visaType).toHaveProperty('extension');
        expect(visaType).toHaveProperty('documents');
      });
    });

    test('visa type IDs are correct', () => {
      expect(VISA_TYPES.E9.id).toBe('e9');
      expect(VISA_TYPES.H2.id).toBe('h2');
      expect(VISA_TYPES.D2.id).toBe('d2');
      expect(VISA_TYPES.E7.id).toBe('e7');
    });

    test('all visa types have documents array', () => {
      Object.values(VISA_TYPES).forEach(visaType => {
        expect(Array.isArray(visaType.documents)).toBe(true);
        expect(visaType.documents.length).toBeGreaterThan(0);
      });
    });

    test('all visa types have extension property', () => {
      Object.values(VISA_TYPES).forEach(visaType => {
        expect(typeof visaType.extension).toBe('boolean');
      });
    });

    test('E9 visa has correct properties', () => {
      const e9Visa = VISA_TYPES.E9;
      expect(e9Visa.name).toBe('E-9 비자');
      expect(e9Visa.fullName).toBe('비전문취업비자');
      expect(e9Visa.description).toBe('제조업, 농업, 어업 등 단순노무 종사자');
      expect(e9Visa.duration).toBe('3년');
      expect(e9Visa.extension).toBe(true);
      expect(e9Visa.documents).toContain('여권 사본');
      expect(e9Visa.documents).toContain('고용계약서');
    });

    test('D2 visa has correct properties', () => {
      const d2Visa = VISA_TYPES.D2;
      expect(d2Visa.name).toBe('D-2 비자');
      expect(d2Visa.fullName).toBe('유학비자');
      expect(d2Visa.description).toBe('대학, 대학원 등에서 학업하는 학생');
      expect(d2Visa.duration).toBe('학업기간');
      expect(d2Visa.extension).toBe(true);
      expect(d2Visa.documents).toContain('입학허가서');
      expect(d2Visa.documents).toContain('재정증명서');
    });
  });

  describe('VISA_STEPS', () => {
    test('contains steps for all visa types', () => {
      expect(VISA_STEPS).toHaveProperty('E9');
      expect(VISA_STEPS).toHaveProperty('H2');
      expect(VISA_STEPS).toHaveProperty('D2');
      expect(VISA_STEPS).toHaveProperty('E7');
    });

    test('each visa type has steps array', () => {
      Object.values(VISA_STEPS).forEach(steps => {
        expect(Array.isArray(steps)).toBe(true);
        expect(steps.length).toBeGreaterThan(0);
      });
    });

    test('each step has required properties', () => {
      Object.values(VISA_STEPS).forEach(steps => {
        steps.forEach(step => {
          expect(step).toHaveProperty('id');
          expect(step).toHaveProperty('name');
          expect(step).toHaveProperty('description');
          expect(typeof step.id).toBe('number');
          expect(typeof step.name).toBe('string');
          expect(typeof step.description).toBe('string');
        });
      });
    });

    test('step IDs are sequential', () => {
      Object.values(VISA_STEPS).forEach(steps => {
        steps.forEach((step, index) => {
          expect(step.id).toBe(index + 1);
        });
      });
    });

    test('E9 visa has correct steps', () => {
      const e9Steps = VISA_STEPS.E9;
      expect(e9Steps).toHaveLength(4);
      expect(e9Steps[0].name).toBe('고용계약 체결');
      expect(e9Steps[1].name).toBe('고용허가 신청');
      expect(e9Steps[2].name).toBe('비자 신청');
      expect(e9Steps[3].name).toBe('입국');
    });

    test('D2 visa has correct steps', () => {
      const d2Steps = VISA_STEPS.D2;
      expect(d2Steps).toHaveLength(4);
      expect(d2Steps[0].name).toBe('학교 지원');
      expect(d2Steps[1].name).toBe('입학허가');
      expect(d2Steps[2].name).toBe('비자 신청');
      expect(d2Steps[3].name).toBe('입국');
    });

    test('all visa types end with entry step', () => {
      Object.values(VISA_STEPS).forEach(steps => {
        const lastStep = steps[steps.length - 1];
        expect(lastStep.name).toBe('입국');
        expect(lastStep.description).toContain('입국');
      });
    });
  });

  describe('Data Consistency', () => {
    test('visa types and steps have matching keys', () => {
      const visaTypeKeys = Object.keys(VISA_TYPES);
      const stepKeys = Object.keys(VISA_STEPS);
      expect(visaTypeKeys).toEqual(stepKeys);
    });

    test('all visa types have unique IDs', () => {
      const ids = Object.values(VISA_TYPES).map(visa => visa.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('all visa types have unique names', () => {
      const names = Object.values(VISA_TYPES).map(visa => visa.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });
});
