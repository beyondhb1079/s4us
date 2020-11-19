import AmountType from '../types/AmountType';
/* eslint-disable import/prefer-default-export */
// returns string for helper text if amount is invalid
export function invalidAmountFields(amountType, min, max) {
  // 0 is not a valid input
  const err1 = min === 0;
  const err2 = max === 0;

  if (
    amountType === AmountType.Unknown ||
    amountType === AmountType.FullTuition
  )
    return '';
  if (amountType === AmountType.Fixed) {
    return err1 ? 'Amount field must contain a valid amount' : '';
  }
  if (amountType === AmountType.Range) {
    if (err1 && err2)
      return 'Amount range must have a minimum and/or a maximum';
    if (!err1 && !err2)
      return min >= max ? 'Minimum must be less than the maximum' : '';
    return '';
  }
  return 'Please choose an option above';
}
