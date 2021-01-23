import AmountType from './AmountType';
import ScholarshipAmount, {
  FULL_TUITION_VALUE,
  UNKNOWN_MAX,
  UNKNOWN_MIN,
} from './ScholarshipAmount';

test('constructor defaults', () => {
  const amount = new ScholarshipAmount();

  expect(amount.type).toBe(AmountType.Unknown);
  expect(amount.min).toBe(UNKNOWN_MIN);
  expect(amount.max).toBe(UNKNOWN_MAX);
});

test('constructor - fixed', () => {
  const amount = new ScholarshipAmount(AmountType.Fixed, {
    min: 20,
    max: 20,
  });

  expect(amount.type).toBe(AmountType.Fixed);
  expect(amount.min).toBe(20);
  expect(amount.max).toBe(20);
});

test('constructor - range', () => {
  const amount = new ScholarshipAmount(AmountType.Range, {
    min: 2,
    max: 20,
  });

  expect(amount.type).toBe(AmountType.Range);
  expect(amount.min).toBe(2);
  expect(amount.max).toBe(20);
});

test('constructor - full tuition', () => {
  const amount = new ScholarshipAmount(AmountType.FullTuition);

  expect(amount.type).toBe(AmountType.FullTuition);
  expect(amount.min).toBe(FULL_TUITION_VALUE);
  expect(amount.max).toBe(FULL_TUITION_VALUE);
});

test('constructor - unknown', () => {
  const amount = new ScholarshipAmount(AmountType.Unknown);

  expect(amount.type).toBe(AmountType.Unknown);
  expect(amount.min).toBe(UNKNOWN_MIN);
  expect(amount.max).toBe(UNKNOWN_MAX);
});

test('constructor exceptions - fixed min != max', () => {
  expect(
    () =>
      new ScholarshipAmount(AmountType.Fixed, {
        min: 2,
        max: 20,
      })
  ).toThrow(/.*min\(2\) != max\(20\).*/);
});

test('constructor exceptions - fixed value not positive', () => {
  expect(
    () =>
      new ScholarshipAmount(AmountType.Fixed, {
        min: 0,
      })
  ).toThrow(/.*not a positive number*/i);
});

test('constructor exceptions - range min negative', () => {
  expect(
    () =>
      new ScholarshipAmount(AmountType.Range, {
        min: -2,
      })
  ).toThrow(/.*invalid min*/i);
});

test('constructor exceptions - range max negative', () => {
  expect(
    () =>
      new ScholarshipAmount(AmountType.Range, {
        max: -2,
      })
  ).toThrow(/.*invalid max*/i);
});

test('constructor exceptions - range no bounds', () => {
  expect(
    () =>
      new ScholarshipAmount(AmountType.Range, {
        min: 20,
        max: 2,
      })
  ).toThrow(/.*invalid range*/i);
});

test('constructor exceptions - range max <= min', () => {
  expect(
    () =>
      new ScholarshipAmount(AmountType.Range, {
        min: 20,
        max: 2,
      })
  ).toThrow(/.*invalid range*/i);
});

test('toString - Unknown', () => {
  const amount = new ScholarshipAmount(AmountType.Unknown);

  const res = amount.toString();

  expect(res).toBe('(Unknown amount)');
});

test('toString - FullTuition', () => {
  const amount = new ScholarshipAmount(AmountType.FullTuition);

  const res = amount.toString();

  expect(res).toBe('Full Tuition');
});

test('toString - Fixed', () => {
  const amount = new ScholarshipAmount(AmountType.Fixed, {
    min: 1000,
    max: 1000,
  });

  const res = amount.toString();

  expect(res).toBe('$1000');
});

test('toString - Range - min only', () => {
  const amount = new ScholarshipAmount(AmountType.Range, { min: 1000 });

  const res = amount.toString();

  expect(res).toBe('$1000+');
});

test('toString - Range - max only', () => {
  const amount = new ScholarshipAmount(AmountType.Range, { max: 1000 });

  const res = amount.toString();

  expect(res).toBe('Up to $1000');
});

test('toString - Range - min and max', () => {
  const amount = new ScholarshipAmount(AmountType.Range, {
    min: 1000,
    max: 2500,
  });

  const res = amount.toString();

  expect(res).toBe('$1000-$2500');
});
