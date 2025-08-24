import { VISA_TYPES, VISA_STEPS, VISA_CATEGORIES, VISA_CATEGORY_LABELS } from './visa';

describe('Visa Constants', () => {
  describe('VISA_TYPES', () => {
    test('contains all required visa types', () => {
      expect(VISA_TYPES).toHaveProperty('E9');
      expect(VISA_TYPES).toHaveProperty('H2');
      expect(VISA_TYPES).toHaveProperty('D2');
      expect(VISA_TYPES).toHaveProperty('E7');
      expect(VISA_TYPES).toHaveProperty('E8');
      expect(VISA_TYPES).toHaveProperty('E6');
      expect(VISA_TYPES).toHaveProperty('C4');
      expect(VISA_TYPES).toHaveProperty('F4');
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
      expect(VISA_TYPES.E8.id).toBe('e8');
      expect(VISA_TYPES.E6.id).toBe('e6');
      expect(VISA_TYPES.C4.id).toBe('c4');
      expect(VISA_TYPES.F4.id).toBe('f4');
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

    test('E8 visa has correct properties', () => {
      const e8Visa = VISA_TYPES.E8;
      expect(e8Visa.name).toBe('E-8 비자');
      expect(e8Visa.fullName).toBe('연수취업비자');
      expect(e8Visa.description).toBe('기술연수를 받은 후 한국에서 취업하는 외국인');
      expect(e8Visa.duration).toBe('3년');
      expect(e8Visa.extension).toBe(true);
      expect(e8Visa.documents).toContain('기술연수 수료증');
    });

    test('C4 visa has correct properties', () => {
      const c4Visa = VISA_TYPES.C4;
      expect(c4Visa.name).toBe('C-4 비자');
      expect(c4Visa.fullName).toBe('단기상용비자');
      expect(c4Visa.description).toBe('90일 이하 단기 취업');
      expect(c4Visa.duration).toBe('90일 이하');
      expect(c4Visa.extension).toBe(false);
    });

    test('E6 visa has correct properties', () => {
      const e6Visa = VISA_TYPES.E6;
      expect(e6Visa.name).toBe('E-6 비자');
      expect(e6Visa.fullName).toBe('예술흥행비자');
      expect(e6Visa.description).toBe('연예인, 운동선수, 모델, 예술가 등');
      expect(e6Visa.duration).toBe('3년');
      expect(e6Visa.extension).toBe(true);
      expect(e6Visa.documents).toContain('예술활동 증명서');
    });

    test('F4 visa has correct properties', () => {
      const f4Visa = VISA_TYPES.F4;
      expect(f4Visa.name).toBe('F-4 비자');
      expect(f4Visa.fullName).toBe('재외동포비자');
      expect(f4Visa.description).toBe('조선족, 재외동포를 위한 특별 비자');
      expect(f4Visa.duration).toBe('3년');
      expect(f4Visa.extension).toBe(true);
      expect(f4Visa.documents).toContain('혈통증명서');
    });
  });

  describe('VISA_STEPS', () => {
    test('contains steps for all visa types', () => {
      expect(VISA_STEPS).toHaveProperty('E9');
      expect(VISA_STEPS).toHaveProperty('H2');
      expect(VISA_STEPS).toHaveProperty('D2');
      expect(VISA_STEPS).toHaveProperty('E7');
      expect(VISA_STEPS).toHaveProperty('E8');
      expect(VISA_STEPS).toHaveProperty('E6');
      expect(VISA_STEPS).toHaveProperty('C4');
      expect(VISA_STEPS).toHaveProperty('F4');
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

    test('E8 visa has correct steps', () => {
      const e8Steps = VISA_STEPS.E8;
      expect(e8Steps).toHaveLength(5);
      expect(e8Steps[0].name).toBe('기술연수 참여');
      expect(e8Steps[1].name).toBe('연수 수료');
      expect(e8Steps[4].name).toBe('입국');
    });

    test('C4 visa has correct steps', () => {
      const c4Steps = VISA_STEPS.C4;
      expect(c4Steps).toHaveLength(4);
      expect(c4Steps[0].name).toBe('단기 프로젝트 계획');
      expect(c4Steps[3].name).toBe('입국');
    });

    test('all visa types end with entry step', () => {
      Object.values(VISA_STEPS).forEach(steps => {
        const lastStep = steps[steps.length - 1];
        expect(lastStep.name).toBe('입국');
        expect(lastStep.description).toContain('입국');
      });
    });
  });

  describe('VISA_CATEGORIES', () => {
    test('contains all required categories', () => {
      expect(VISA_CATEGORIES).toHaveProperty('EMPLOYMENT');
      expect(VISA_CATEGORIES).toHaveProperty('PROFESSIONAL');
      expect(VISA_CATEGORIES).toHaveProperty('STUDY');
    });

    test('each category has visa types array', () => {
      Object.values(VISA_CATEGORIES).forEach(visaTypes => {
        expect(Array.isArray(visaTypes)).toBe(true);
        expect(visaTypes.length).toBeGreaterThan(0);
      });
    });

    test('employment category contains correct visa types', () => {
      const employmentVisas = VISA_CATEGORIES.EMPLOYMENT;
      expect(employmentVisas).toContain('E9');
      expect(employmentVisas).toContain('H2');
      expect(employmentVisas).toContain('E7');
      expect(employmentVisas).toContain('E8');
      expect(employmentVisas).toContain('C4');
      expect(employmentVisas).toContain('F4');
    });

    test('professional category contains correct visa types', () => {
      const professionalVisas = VISA_CATEGORIES.PROFESSIONAL;
      expect(professionalVisas).toContain('E6');
    });

    test('study category contains correct visa types', () => {
      const studyVisas = VISA_CATEGORIES.STUDY;
      expect(studyVisas).toContain('D2');
    });

    test('all visa types are included in categories', () => {
      const allCategoryVisas = Object.values(VISA_CATEGORIES).flat();
      const allVisaTypes = Object.keys(VISA_TYPES);
      
      allVisaTypes.forEach(visaType => {
        expect(allCategoryVisas).toContain(visaType);
      });
    });
  });

  describe('VISA_CATEGORY_LABELS', () => {
    test('contains all required category labels', () => {
      expect(VISA_CATEGORY_LABELS).toHaveProperty('ALL');
      expect(VISA_CATEGORY_LABELS).toHaveProperty('EMPLOYMENT');
      expect(VISA_CATEGORY_LABELS).toHaveProperty('PROFESSIONAL');
      expect(VISA_CATEGORY_LABELS).toHaveProperty('STUDY');
    });

    test('category labels are in Korean', () => {
      expect(VISA_CATEGORY_LABELS.ALL).toBe('전체');
      expect(VISA_CATEGORY_LABELS.EMPLOYMENT).toBe('취업 비자');
      expect(VISA_CATEGORY_LABELS.PROFESSIONAL).toBe('전문직 비자');
      expect(VISA_CATEGORY_LABELS.STUDY).toBe('학업 비자');
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
