import { getDir, getField, AMOUNT_ASC, AMOUNT_DESC } from './sortOptions';

test('getDir', () => {
  expect(getDir('field.dir')).toBe('dir');
});

test('getField - default', () => {
  expect(getField('field.dir')).toBe('field');
});

test('getField - amount asc', () => {
  expect(getField(AMOUNT_ASC)).toBe('amoiunt.min');
});

test('getField - amount desc', () => {
  expect(getField(AMOUNT_DESC)).toBe('amount.max');
});
