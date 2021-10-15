import AmountType from './AmountType';

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
    const [min, max] = [data?.min, data?.max];

    this.type =
      type === AmountType.Varies && !min && !max ? AmountType.Unknown : type;

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
      case AmountType.Varies:
        if (min && min < 0) {
          throw new Error(`Invalid min amount: ${min}.`);
        }
        if (max && max < 0) {
          throw new Error(`Invalid max amount: ${max}.`);
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

  static toString(amount: {
    type: AmountType;
    min: number;
    max: number;
  }): string {
    switch (amount?.type) {
      case AmountType.FullTuition:
        return 'Full Tuition';
      case AmountType.Fixed:
        return `$${amount.min}`;
      case AmountType.Varies:
        if (!amount.min && !amount.max) return '(Unknown amount)';
        if (amount.min && amount.max !== RANGE_MAX) {
          return `$${amount.min}-$${amount.max}`;
        }
        return amount.min ? `$${amount.min}+` : `Up to $${amount.max}`;
      default:
        return '(Unknown amount)';
    }
  }

  intersectsRange(min?: number, max?: number): boolean {
    return (
      this.type === AmountType.Unknown ||
      ((!min || this.max >= min) && (!max || this.min <= max))
    );
  }
}
