import AmountType from './AmountType';

export const FULL_TUITION_VALUE = 10000000001;

// To make Unknown amounts appear last when sorting by amount we
// purposefully make:
// - min > FULL_TUITION (for low->high sorting)
// - max < 0            (for high->low sorting)
export const UNKNOWN_MIN = FULL_TUITION_VALUE + 1;
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
          throw new Error(`Range amount cannot be undefined.`);
        }
        if (max && min && min >= max) {
          throw new Error(`Invalid range ${min}-${max}`);
        }
        this.min = min ?? 0;
        this.max = max ?? FULL_TUITION_VALUE;
        break;
      case AmountType.FullTuition:
        this.min = FULL_TUITION_VALUE;
        this.max = FULL_TUITION_VALUE;
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
        if (this.min && this.max !== FULL_TUITION_VALUE) {
          return `$${this.min}-$${this.max}`;
        }
        return this.min ? `$${this.min}+` : `Up to $${this.max}`;
      default:
        return '(Unknown amount)';
    }
  }
}
