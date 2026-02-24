import validationSchema from './ValidationSchema';
import AmountType from '../types/AmountType';

describe('ValidationSchema', () => {
  // Mock translation function simply returns the key
  const mockT = (key: string) => key;
  const schema = validationSchema(mockT);

  describe('name', () => {
    it('requires a name', async () => {
      await expect(schema.validateAt('name', {})).rejects.toThrow(
        'nameRequired',
      );
      await expect(schema.validateAt('name', { name: '' })).rejects.toThrow(
        'nameRequired',
      );
    });

    it('accepts a valid name', async () => {
      await expect(
        schema.validateAt('name', { name: 'My Scholarship' }),
      ).resolves.toBe('My Scholarship');
    });
  });

  describe('deadline', () => {
    it('requires a deadline', async () => {
      await expect(schema.validateAt('deadline', {})).rejects.toThrow(
        'deadlineRequired',
      );
      await expect(
        schema.validateAt('deadline', { deadline: 'invalid' }),
      ).rejects.toThrow('dateValid');
    });

    it('accepts a valid date', async () => {
      const date = new Date();
      await expect(
        schema.validateAt('deadline', { deadline: date }),
      ).resolves.toEqual(date);
    });
  });

  describe('website', () => {
    it('requires a valid url', async () => {
      await expect(schema.validateAt('website', {})).rejects.toThrow(
        'websiteRequired',
      );
      await expect(
        schema.validateAt('website', { website: 'not-a-url' }),
      ).rejects.toThrow('websiteValid');
    });

    it('accepts a valid url', async () => {
      await expect(
        schema.validateAt('website', { website: 'https://example.com' }),
      ).resolves.toBe('https://example.com');
    });
  });

  describe('amount', () => {
    it('requires an amount option type', async () => {
      await expect(schema.validateAt('amount', { amount: {} })).rejects.toThrow(
        'amountOptionRequired',
      );
    });

    it('validates fixed amount correctly', async () => {
      const data = { amount: { type: AmountType.Fixed, min: 0 } };
      await expect(schema.validateAt('amount', data)).rejects.toThrow(
        'fixedAmountValid',
      );

      const validData = { amount: { type: AmountType.Fixed, min: 1000 } };
      await expect(schema.validateAt('amount', validData)).resolves.toEqual(
        validData.amount,
      );
    });

    it('validates varying amount correctly', async () => {
      const data = { amount: { type: AmountType.Varies, min: -10 } };
      await expect(schema.validateAt('amount', data)).rejects.toThrow(
        'amountValid',
      );

      const maxLessData = {
        amount: { type: AmountType.Varies, min: 1000, max: 500 },
      };
      await expect(schema.validateAt('amount', maxLessData)).rejects.toThrow(
        'minLessMax',
      );

      const validData = {
        amount: { type: AmountType.Varies, min: 500, max: 1000 },
      };
      await expect(schema.validateAt('amount', validData)).resolves.toEqual(
        validData.amount,
      );

      const noMaxData = { amount: { type: AmountType.Varies, min: 500 } };
      await expect(schema.validateAt('amount', noMaxData)).resolves.toEqual(
        noMaxData.amount,
      );
    });
  });

  describe('requirements.gpa', () => {
    it('accepts valid gpas', async () => {
      await expect(
        schema.validateAt('requirements.gpa', { requirements: { gpa: 4.0 } }),
      ).resolves.toBe(4.0);
      await expect(
        schema.validateAt('requirements.gpa', { requirements: { gpa: 3.5 } }),
      ).resolves.toBe(3.5);
      await expect(
        schema.validateAt('requirements.gpa', { requirements: { gpa: 2 } }),
      ).resolves.toBe(2);
      await expect(
        schema.validateAt('requirements.gpa', { requirements: {} }),
      ).resolves.toBeUndefined();
    });

    it('rejects invalid gpas', async () => {
      await expect(
        schema.validateAt('requirements.gpa', { requirements: { gpa: 5.0 } }),
      ).rejects.toThrow('GpaValid');
      await expect(
        schema.validateAt('requirements.gpa', { requirements: { gpa: -1 } }),
      ).rejects.toThrow('GpaValid');
      // Format / regexp test
      await expect(
        schema.validateAt('requirements.gpa', {
          requirements: { gpa: 3.14159 },
        }),
      ).rejects.toThrow('GpaValid');
    });
  });
});
