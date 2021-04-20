import AmountType from './AmountType';

// These constants exist to make sorting by amount.min and amount.max
// possible for unbound scholarships (no range max, full tuition, unknown).

// First, we need to limit the range of possible real values.
export const MIN_REAL_VALUE = 0;
export const MAX_REAL_VALUE = 1000000000;

// Next, we need to set unbound max to be greater than max possible real value:
export const UNBOUND_MAX = MAX_REAL_VALUE + 1;

// Next, we need to set full tuition value to be greater than unbound maxes:
export const FULL_TUITION = UNBOUND_MAX + 1;

// Finally, we need to set unknown min/max values such that:
// - unknown min is greatest of all
// - unknown max is smallest of all
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
        this.min = min ?? UNSET_MIN;
        this.max = max ?? UNSET_MAX;
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
}
