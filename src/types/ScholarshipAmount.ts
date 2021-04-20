import AmountType from './AmountType';

// These constants exist to make sorting by amount.min and amount.max
// possible for unbound scholarships (no range max, full tuition, unknown). 

// If sorting by max, then the scholarship sorting order should be:
//   1. FULL_TUITION scholarships
//   2. RANGE scholarships with no amount.max defined
//   3. FIXED/RANGE scholarships sorted by amount.max
//   4. UNKNOWN scholarships
//
// To accomplish this we can:

// Set the UNKNOWN max value to lower than the lowest max value so it appears last:
export const UNKNOWN_MAX = -1;
// Cap the max FIXED/RANGE value to a high number that won't be reached soon:
export const FIXED_MAX = 1000000000;
// Set the (unset/empty) RANGE max value to be slightly greater so it appears before
// any FIXED/RANGE scholarships that have a max value set:
export const RANGE_MAX = FIXED_MAX + 1;
// And set the FULL_TUITION max value to be the greatest max value so it appears first:
export const FULL_TUITION_MAX = RANGE_MAX + 1;

// If sorting by min, then the scholarship sorting order should be:
//   1. FIXED/RANGE scholarships sorted by amount.min
//   2. FULL_TUITION scholarships
//   3. UNKNOWN scholarships
//
// To accomplish this we can:

// Set the FULL_TUITION min value to be greater than any possible FIXED/RANGE value:
export const FULL_TUITION_MIN = FULL_TUITION_MAX;
// And set the UNKNOWN min value to be slightly greater so it appears last.
export const UNKNOWN_MIN = FULL_TUITION_MIN + 1;

// Set the UNKNOWN min value to 
// This means we need FULL_TUITION min values > possible FIXED/RANGE min values.
//we want FIXED/RANGE scholarships to appear
// before
// To make sorting by amount.max make sense for range amounts
// with no upper bound.
export const RANGE_MAX = 1000000001;

// To make sorting by amount.min/max make sense for full tuition amounts.
export const FULL_TUITION = RANGE_MAX + 1;

// To make sorting by amount.min/max make sense for unknown amounts.
// In order to make unknown amounts appear last we purposefully make:
// - min > FULL_TUITION (for low->high amount.min sorting)
// - max < 0            (for high->low amount.max sorting)
export const UNKNOWN_MIN = FULL_TUITION + 1;
export const UNKNOWN_MAX = -1;

export default class ScholarshipAmount {
  readonly type: AmountType;
  readonly min: number;
  readonly max: number;

  constructor(
    type: AmountType = AmountType.Unknown,
    data?: { min?: number; max?: number }
  ) {
    this.type = type;
    const [min, max] = [data?.min, data?.max];

    switch (this.type) {
      case AmountType.Fixed:
        if (!min || min <= 0) {
          throw new Error(`Fixed amount min(${min}) is not a positive number.`);
        }
        if (min !== max) {
          throw new Error(`Fixed amount min(${min}) != max(${max}).`);
        }
        this.min = min;
        this.max = max;
        break;
      case AmountType.Range:
        if (min && min < 0) {
          throw new Error(`Invalid min amount: ${min}.`);
        }
        if (max && max < 0) {
          throw new Error(`Invalid max amount: ${max}.`);
        }
        if (!max && !min) {
          throw new Error(`No bounds given. At least one bound is required.`);
        }
        if (max && min && min >= max) {
          throw new Error(`Invalid range ${min}-${max}`);
        }
        this.min = min ?? 0;
        this.max = max || RANGE_MAX;
        break;
      case AmountType.FullTuition:
        this.min = FULL_TUITION;
        this.max = FULL_TUITION;
        break;
      default:
        // amount unknown
        this.min = UNKNOWN_MIN;
        this.max = UNKNOWN_MAX;
    }
  }

  toString(): string {
    switch (this.type) {
      case AmountType.FullTuition:
        return 'Full Tuition';
      case AmountType.Fixed:
        return `$${this.min}`;
      case AmountType.Range:
        if (this.min && this.max !== RANGE_MAX) {
          return `$${this.min}-$${this.max}`;
        }
        return this.min ? `$${this.min}+` : `Up to $${this.max}`;
      default:
        return '(Unknown amount)';
    }
  }

  intersectsRange(min: number, max: number): boolean {
    return (
      this.type === AmountType.Unknown ||
      ((!min || this.max >= min) && (!max || this.min <= max))
    );
  }
}
