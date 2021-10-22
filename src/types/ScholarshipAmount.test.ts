import AmountType from './AmountType';
import ScholarshipAmount, {
  FULL_TUITION,
  RANGE_MAX,
  UNKNOWN_MAX,
  UNKNOWN_MIN,
} from './ScholarshipAmount';

test('constructor defaults', () => {
  const amount = ScholarshipAmount.unknown();

  expect(amount.type).toBe(AmountType.Unknown);
  expect(amount.min).toBe(UNKNOWN_MIN);
  expect(amount.max).toBe(UNKNOWN_MAX);
});

test('constructor - fixed', () => {
  const amount = ScholarshipAmount.fixed(20);

  expect(amount.type).toBe(AmountType.Fixed);
  expect(amount.min).toBe(20);
  expect(amount.max).toBe(20);
});

test('constructor - range', () => {
  const amount = ScholarshipAmount.range(2, 20);

  expect(amount.type).toBe(AmountType.Varies);
  expect(amount.min).toBe(2);
  expect(amount.max).toBe(20);
});

test('constructor - range no min', () => {
  const amount = ScholarshipAmount.range(undefined, 20);

  expect(amount.type).toBe(AmountType.Varies);
  expect(amount.min).toBe(0);
  expect(amount.max).toBe(20);
});

test('constructor - range no max', () => {
  const amount = ScholarshipAmount.range(2, undefined);

  expect(amount.type).toBe(AmountType.Varies);
  expect(amount.min).toBe(2);
  expect(amount.max).toBe(RANGE_MAX);
});

test('constructor - range no min, no max', () => {
  const amount = ScholarshipAmount.range(undefined, undefined);

  expect(amount.type).toBe(AmountType.Unknown);
  expect(amount.min).toBe(UNKNOWN_MIN);
  expect(amount.max).toBe(UNKNOWN_MAX);
});

test('constructor - full tuition', () => {
  const amount = ScholarshipAmount.fullTuition();

  expect(amount.type).toBe(AmountType.FullTuition);
  expect(amount.min).toBe(FULL_TUITION);
  expect(amount.max).toBe(FULL_TUITION);
});

test('constructor - unknown', () => {
  const amount = ScholarshipAmount.unknown();

  expect(amount.type).toBe(AmountType.Unknown);
  expect(amount.min).toBe(UNKNOWN_MIN);
  expect(amount.max).toBe(UNKNOWN_MAX);
});

test('constructor exceptions - fixed value not positive', () => {
  expect(() => ScholarshipAmount.fixed(0)).toThrow(/.*not a positive number*/i);
});

test('constructor exceptions - range min negative', () => {
  expect(() => ScholarshipAmount.range(-2, undefined)).toThrow(
    /.*invalid min*/i
  );
});

test('constructor exceptions - range max negative', () => {
  expect(() => ScholarshipAmount.range(undefined, -2)).toThrow(
    /.*invalid max*/i
  );
});

test('constructor exceptions - range max <= min', () => {
  expect(() => ScholarshipAmount.range(20, 2)).toThrow(/.*invalid range*/i);
});

test('toString - Unknown', () => {
  const amount = ScholarshipAmount.unknown();

  const res = ScholarshipAmount.toString(amount);

  expect(res).toBe('(Unknown amount)');
});

test('toString - FullTuition', () => {
  const amount = ScholarshipAmount.fullTuition();

  const res = ScholarshipAmount.toString(amount);

  expect(res).toBe('Full Tuition');
});

test('toString - Fixed', () => {
  const amount = ScholarshipAmount.fixed(1000);

  const res = ScholarshipAmount.toString(amount);

  expect(res).toBe('$1000');
});

test('toString - Range - min only', () => {
  const amount = ScholarshipAmount.range(1000, undefined);

  const res = ScholarshipAmount.toString(amount);

  expect(res).toBe('$1000+');
});

test('toString - Range - max only', () => {
  const amount = ScholarshipAmount.range(undefined, 1000);

  const res = ScholarshipAmount.toString(amount);

  expect(res).toBe('Up to $1000');
});

test('toString - Range - min and max', () => {
  const amount = ScholarshipAmount.range(1000, 2500);

  const res = ScholarshipAmount.toString(amount);

  expect(res).toBe('$1000-$2500');
});
