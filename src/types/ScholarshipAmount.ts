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
    type: AmountType = AmountType.Varies,
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
      case AmountType.Varies:
        if (!min && !max) {
          this.min = UNKNOWN_MIN;
          this.max = UNKNOWN_MAX;
          break;
        }
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
      default:
        // full tuition
        this.min = FULL_TUITION;
        this.max = FULL_TUITION;
    }
  }

  toString(): string {
    switch (this.type) {
      case AmountType.FullTuition:
        return 'Full Tuition';
      case AmountType.Fixed:
        return `$${this.min}`;
      default:
        if (this.min === UNKNOWN_MIN && this.max === UNKNOWN_MAX) {
          return '(Unknown amount)';
        }
        if (this.min && this.max !== RANGE_MAX) {
          return `$${this.min}-$${this.max}`;
        }
        return this.min ? `$${this.min}+` : `Up to $${this.max}`;
    }
  }

  intersectsRange(min?: number, max?: number): boolean {
    return (
      (min === UNKNOWN_MIN && max === UNKNOWN_MAX) ||
      ((!min || this.max >= min) && (!max || this.min <= max))
    );
  }
}
