import AmountType from './AmountType';
import ScholarshipAmount, {
  FULL_TUITION,
  RANGE_MAX,
  UNKNOWN_MAX,
  UNKNOWN_MIN,
} from './ScholarshipAmount';

const {
  range,
  fixed,
  unknown,
  validate,
  fullTuition,
  toString,
  toStorage,
  fromStorage,
} = ScholarshipAmount;

test('fixed()', () => {
  const amount = fixed(20);

  expect(amount).toEqual({ type: AmountType.Fixed, min: 20, max: 20 });
});

test('range() - bounded', () => {
  const amount = range(2, 20);

  expect(amount).toEqual({ type: AmountType.Varies, min: 2, max: 20 });
});

test('range() - no min', () => {
  const amount = range(undefined, 20);

  expect(amount).toEqual({ type: AmountType.Varies, min: 0, max: 20 });
});

test('range() - no max', () => {
  const amount = range(2, undefined);

  expect(amount).toEqual({ type: AmountType.Varies, min: 2, max: RANGE_MAX });
});

test('range() - unbounded', () => {
  const amount = range(undefined, undefined);

  expect(amount).toEqual({
    type: AmountType.Unknown,
    min: UNKNOWN_MIN,
    max: UNKNOWN_MAX,
  });
});

test('fullTuition()', () => {
  const amount = fullTuition();

  expect(amount).toEqual({
    type: AmountType.FullTuition,
    min: FULL_TUITION,
    max: FULL_TUITION,
  });
});

test('unknown()', () => {
  const amount = unknown();

  expect(amount).toEqual({
    type: AmountType.Unknown,
    min: UNKNOWN_MIN,
    max: UNKNOWN_MAX,
  });
});

test('validate() - fixed value not positive', () => {
  expect(() => validate(fixed(0))).toThrow(/.*not a positive number*/i);
});

test('validate() - range min negative', () => {
  expect(() => validate(range(-2, undefined))).toThrow(/.*invalid min*/i);
});

test('validate() - range max negative', () => {
  expect(() => validate(range(undefined, -2))).toThrow(/.*invalid max*/i);
});

test('validate() - range max <= min', () => {
  expect(() => validate(range(20, 2))).toThrow(/.*invalid range*/i);
});

test('toString() - Unknown', () => {
  const amount = unknown();

  const res = toString(amount);

  expect(res).toBe('Varies');
});

test('toString() - FullTuition', () => {
  const amount = fullTuition();

  const res = toString(amount);

  expect(res).toBe('Full Tuition');
});

test('toString() - Fixed', () => {
  const amount = fixed(1000);

  const res = toString(amount);

  expect(res).toBe('1000');
});

test('toString() - Range - min only', () => {
  const amount = range(1000, undefined);

  const res = toString(amount);

  expect(res).toBe('1000+');
});

test('toString() - Range - min set with max 0', () => {
  const amount = range(1000, 0);

  const res = toString(amount);

  expect(res).toBe('1000+');
});

test('toString() - Range - max only', () => {
  const amount = range(undefined, 1000);

  const res = toString(amount);

  expect(res).toBe('Up to 1000');
});

test('toString() - Range - bounded', () => {
  const amount = range(1000, 2500);

  const res = toString(amount);

  expect(res).toBe('1000-2500');
});

test('toString() - Range - unbounded', () => {
  const amount = range(undefined, undefined);

  const res = toString(amount);

  expect(res).toBe('Varies');
});

test('toStorage() - Fixed', () => {
  const amount = fixed(1000);
  const res = toStorage(amount);

  expect(res).toEqual({ type: AmountType.Fixed, min: 1000, max: 1000 });
});

test('toStorage() - Range - bounded', () => {
  const amount = range(2, 20);
  const res = toStorage(amount);

  expect(res).toEqual({ type: AmountType.Varies, min: 2, max: 20 });
});

test('toStorage() - Range - no min', () => {
  const amount = range(undefined, 20);
  const res = toStorage(amount);

  expect(res).toEqual({ type: AmountType.Varies, min: 0, max: 20 });
});

test('toStorage() - Range - no max', () => {
  const amount = range(2, undefined);
  const res = toStorage(amount);

  expect(res).toEqual({ type: AmountType.Varies, min: 2, max: RANGE_MAX });
});

test('toStorage() - Range - unbounded', () => {
  const amount = range(undefined, undefined);
  const res = toStorage(amount);

  expect(res).toEqual({
    type: AmountType.Unknown,
    min: UNKNOWN_MIN,
    max: UNKNOWN_MAX,
  });
});

test('toStorage() - FullTuition', () => {
  const amount = fullTuition();
  const res = toStorage(amount);

  expect(res).toEqual({
    type: AmountType.FullTuition,
    min: FULL_TUITION,
    max: FULL_TUITION,
  });
});

test('toStorage() - Unknown', () => {
  const amount = unknown();
  const res = toStorage(amount);

  expect(res).toEqual({
    type: AmountType.Unknown,
    min: UNKNOWN_MIN,
    max: UNKNOWN_MAX,
  });
});

test('fromStorage() - Fixed', () => {
  const amount = fixed(1000);
  const res = fromStorage(toStorage(amount));

  expect(res).toEqual({ type: AmountType.Fixed, min: 1000, max: 1000 });
});

test('fromStorage() - Range - bounded', () => {
  const amount = range(2, 20);
  const res = fromStorage(toStorage(amount));

  expect(res).toEqual({ type: AmountType.Varies, min: 2, max: 20 });
});

test('fromStorage() - Range - min 0', () => {
  const amount = range(0, 1000);
  const res = fromStorage(toStorage(amount));

  expect(res).toEqual({ type: AmountType.Varies, min: 0, max: 1000 });
});

test('fromStorage() - Range - range max', () => {
  const amount = range(1000, RANGE_MAX);
  const res = fromStorage(toStorage(amount));

  expect(res).toEqual({ type: AmountType.Varies, min: 1000, max: 0 });
});

test('fromStorage() - FullTuition', () => {
  const amount = fullTuition();
  const res = fromStorage(toStorage(amount));

  expect(res).toEqual({
    type: AmountType.FullTuition,
    min: FULL_TUITION,
    max: FULL_TUITION,
  });
});

test('fromStorage() - Unknown', () => {
  const amount = unknown();
  const res = fromStorage(toStorage(amount));

  expect(res).toEqual({ type: AmountType.Varies, min: 0, max: 0 });
});
