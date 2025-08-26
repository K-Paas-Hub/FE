import { VISA_TYPES, VISA_STEPS, VISA_CATEGORIES, VISA_CATEGORY_LABELS } from './visa';

describe('Visa Constants', () => {
  describe('VISA_TYPES', () => {
    test('contains all required visa types', () => {
      expect(VISA_TYPES).toHaveProperty('E9');
      expect(VISA_TYPES).toHaveProperty('H2');
      expect(VISA_TYPES).toHaveProperty('E7');
      expect(VISA_TYPES).toHaveProperty('E8');
      expect(VISA_TYPES).toHaveProperty('E3');
      expect(VISA_TYPES).toHaveProperty('E4');
      expect(VISA_TYPES).toHaveProperty('E5');
      expect(VISA_TYPES).toHaveProperty('E10');
      expect(VISA_TYPES).toHaveProperty('D10');
      expect(VISA_TYPES).toHaveProperty('F2');
      expect(VISA_TYPES).toHaveProperty('F4');
      expect(VISA_TYPES).toHaveProperty('F6');
      expect(VISA_TYPES).toHaveProperty('C4');
      expect(VISA_TYPES).toHaveProperty('H1');
      expect(VISA_TYPES).toHaveProperty('G1');
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
      expect(VISA_TYPES.E7.id).toBe('e7');
      expect(VISA_TYPES.E8.id).toBe('e8');
      expect(VISA_TYPES.E3.id).toBe('e3');
      expect(VISA_TYPES.E4.id).toBe('e4');
      expect(VISA_TYPES.E5.id).toBe('e5');
      expect(VISA_TYPES.E10.id).toBe('e10');
      expect(VISA_TYPES.D10.id).toBe('d10');
      expect(VISA_TYPES.F2.id).toBe('f2');
      expect(VISA_TYPES.F4.id).toBe('f4');
      expect(VISA_TYPES.F6.id).toBe('f6');
      expect(VISA_TYPES.C4.id).toBe('c4');
      expect(VISA_TYPES.H1.id).toBe('h1');
      expect(VISA_TYPES.G1.id).toBe('g1');
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

    test('E3 visa has correct properties', () => {
      const e3Visa = VISA_TYPES.E3;
      expect(e3Visa.name).toBe('E-3 비자');
      expect(e3Visa.fullName).toBe('연구비자');
      expect(e3Visa.description).toBe('연구기관에서 연구활동을 하는 외국인');
      expect(e3Visa.duration).toBe('3년');
      expect(e3Visa.extension).toBe(true);
      expect(e3Visa.documents).toContain('연구기관 초빙장');
      expect(e3Visa.documents).toContain('연구계획서');
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

    test('D10 visa has correct properties', () => {
      const d10Visa = VISA_TYPES.D10;
      expect(d10Visa.name).toBe('D-10 비자');
      expect(d10Visa.fullName).toBe('구직비자');
      expect(d10Visa.description).toBe('한국에서 취업을 준비하는 외국인');
      expect(d10Visa.duration).toBe('1년');
      expect(d10Visa.extension).toBe(true);
      expect(d10Visa.documents).toContain('학력증명서');
      expect(d10Visa.documents).toContain('재정증명서');
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
      Object.keys(VISA_TYPES).forEach(visaType => {
        expect(VISA_STEPS).toHaveProperty(visaType);
      });
    });

    test('each visa type has at least 3 steps', () => {
      Object.values(VISA_STEPS).forEach(steps => {
        expect(steps.length).toBeGreaterThanOrEqual(3);
      });
    });

    test('E9 visa steps are correct', () => {
      const e9Steps = VISA_STEPS.E9;
      expect(e9Steps).toHaveLength(4);
      expect(e9Steps[0].name).toBe('고용계약 체결');
      expect(e9Steps[1].name).toBe('고용허가 신청');
      expect(e9Steps[2].name).toBe('비자 신청');
      expect(e9Steps[3].name).toBe('입국');
    });

    test('E3 visa steps are correct', () => {
      const e3Steps = VISA_STEPS.E3;
      expect(e3Steps).toHaveLength(4);
      expect(e3Steps[0].name).toBe('연구기관 초빙');
      expect(e3Steps[1].name).toBe('연구계획 수립');
      expect(e3Steps[2].name).toBe('비자 신청');
      expect(e3Steps[3].name).toBe('입국');
    });

    test('D10 visa steps are correct', () => {
      const d10Steps = VISA_STEPS.D10;
      expect(d10Steps).toHaveLength(4);
      expect(d10Steps[0].name).toBe('학력 확인');
      expect(d10Steps[1].name).toBe('재정 증명');
      expect(d10Steps[2].name).toBe('비자 신청');
      expect(d10Steps[3].name).toBe('입국');
    });
  });

  describe('VISA_CATEGORIES', () => {
    test('contains all required categories', () => {
      expect(VISA_CATEGORIES).toHaveProperty('EMPLOYMENT');
      expect(VISA_CATEGORIES).toHaveProperty('RESIDENCE');
      expect(VISA_CATEGORIES).toHaveProperty('PREPARATION');
    });

    test('EMPLOYMENT category contains correct visa types', () => {
      const employmentVisas = VISA_CATEGORIES.EMPLOYMENT;
      expect(employmentVisas).toContain('E9');
      expect(employmentVisas).toContain('H2');
      expect(employmentVisas).toContain('E7');
      expect(employmentVisas).toContain('E8');
      expect(employmentVisas).toContain('E3');
      expect(employmentVisas).toContain('E4');
      expect(employmentVisas).toContain('E5');
      expect(employmentVisas).toContain('E10');
      expect(employmentVisas).toContain('C4');
    });

    test('RESIDENCE category contains correct visa types', () => {
      const residenceVisas = VISA_CATEGORIES.RESIDENCE;
      expect(residenceVisas).toContain('F2');
      expect(residenceVisas).toContain('F4');
      expect(residenceVisas).toContain('F6');
    });

    test('PREPARATION category contains correct visa types', () => {
      const preparationVisas = VISA_CATEGORIES.PREPARATION;
      expect(preparationVisas).toContain('D10');
      expect(preparationVisas).toContain('H1');
      expect(preparationVisas).toContain('G1');
    });
  });

  describe('VISA_CATEGORY_LABELS', () => {
    test('contains all required labels', () => {
      expect(VISA_CATEGORY_LABELS).toHaveProperty('EMPLOYMENT');
      expect(VISA_CATEGORY_LABELS).toHaveProperty('RESIDENCE');
      expect(VISA_CATEGORY_LABELS).toHaveProperty('PREPARATION');
    });

    test('labels are in Korean', () => {
      expect(VISA_CATEGORY_LABELS.EMPLOYMENT).toBe('취업 비자');
      expect(VISA_CATEGORY_LABELS.RESIDENCE).toBe('거주 비자');
      expect(VISA_CATEGORY_LABELS.PREPARATION).toBe('준비 비자');
    });
  });
});
