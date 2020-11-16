import AmountType from './AmountType';
import ScholarshipAmount from './ScholarshipAmount';

test('constructor defaults', () => {
  const amount = new ScholarshipAmount();

  expect(amount.type).toBe(AmountType.Unknown);
  expect(amount.min).toBe(0);
  expect(amount.max).toBe(0);
});

test('constructor with values', () => {
  const amount = new ScholarshipAmount({
    type: AmountType.Range,
    min: 2,
    max: 20,
  });

  expect(amount.type).toBe(AmountType.Range);
  expect(amount.min).toBe(2);
  expect(amount.max).toBe(20);
});

test('constructor exceptions - fixed min != max', () => {
  expect(
    () =>
      new ScholarshipAmount({
        type: AmountType.Fixed,
        min: 2,
        max: 20,
      })
  ).toThrow(/.*min\(2\) != max\(20\).*/);
});

test('constructor exceptions - fixed value not positive', () => {
  expect(
    () =>
      new ScholarshipAmount({
        type: AmountType.Fixed,
        min: 0,
      })
  ).toThrow(/.*invalid fixed amount*/i);
});

test('constructor exceptions - range min negative', () => {
  expect(
    () =>
      new ScholarshipAmount({
        type: AmountType.Range,
        min: -2,
      })
  ).toThrow(/.*invalid min*/i);
});
test('constructor exceptions - range max negative', () => {
  expect(
    () =>
      new ScholarshipAmount({
        type: AmountType.Range,
        max: -2,
      })
  ).toThrow(/.*invalid max*/i);
});
test('constructor exceptions - range max <= min', () => {
  expect(
    () =>
      new ScholarshipAmount({
        type: AmountType.Range,
        min: 20,
        max: 2,
      })
  ).toThrow(/.*invalid range*/i);
});

test('toString - Unknown', () => {
  const amount = new ScholarshipAmount({ type: AmountType.Unknown });

  const res = amount.toString();

  expect(res).toBe('(Unknown amount)');
});

test('toString - FullRide', () => {
  const amount = new ScholarshipAmount({ type: AmountType.FullRide });

  const res = amount.toString();

  expect(res).toBe('Full Tuition');
});

test('toString - Fixed', () => {
  const amount = new ScholarshipAmount({
    type: AmountType.Fixed,
    min: 1000,
    max: 1000,
  });

  const res = amount.toString();

  expect(res).toBe('$1000');
});

test('toString - Range - min only', () => {
  const amount = new ScholarshipAmount({ type: AmountType.Range, min: 1000 });

  const res = amount.toString();

  expect(res).toBe('$1000+');
});

test('toString - Range - max only', () => {
  const amount = new ScholarshipAmount({ type: AmountType.Range, max: 1000 });

  const res = amount.toString();

  expect(res).toBe('Up to $1000');
});

test('toString - Range - min and max', () => {
  const amount = new ScholarshipAmount({
    type: AmountType.Range,
    min: 1000,
    max: 2500,
  });

  const res = amount.toString();

  expect(res).toBe('$1000-$2500');
});
