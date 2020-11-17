import AmountType from '../types/AmountType';
/* eslint-disable import/prefer-default-export */
// returns true if amount is invalid
export function invalidAmountFields(amountType, min, max, setHelperText) {
  // true if amount less than 0 or not an integer
  const err1 = min <= 0 || Number(min) % 1 !== 0;
  const err2 = max <= 0 || Number(max) % 1 !== 0;

  if (amountType === AmountType.Fixed) {
    setHelperText(err1 ? 'Please input a valid number' : '');
    return { minAmountError: err1, maxAmountError: false };
  }

  if (amountType === AmountType.Range) {
    // both fields are filled
    if (min && max) {
      // either is not an integer > 0
      if (err1 || err2) {
        setHelperText('Please input a valid number or leave blank');
        return { minAmountError: err1, maxAmountError: err2 };
      }
      // both are valid numbers
      if (!err1 && !err2) {
        const minError = Number(min) >= Number(max);
        setHelperText(
          minError ? 'Minimum amount must be less than the maximum amount' : ''
        );
        return { minAmountError: minError, maxAmountError: err2 };
      }
    }

    // either field is filled
    if (min || max) {
      setHelperText(min || max ? 'Please input a valid number' : '');
      if (min && !max) return { minAmountError: err1, maxAmountError: false };
      return { minAmountError: false, maxAmountError: err2 };
    }
    setHelperText('Please input a valid number in at least one of the fields');
    return { minAmountError: err1, maxAmountError: err2 };
  }

  return { minAmountError: false, maxAmountError: false };
}
