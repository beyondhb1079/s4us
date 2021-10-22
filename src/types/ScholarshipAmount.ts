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

interface ScholarshipAmount {
  readonly type: AmountType;
  readonly min: number;
  readonly max: number;
}

namespace ScholarshipAmount {
  export const fixed = (val: number): ScholarshipAmount => ({
    min: val,
    max: val,
    type: AmountType.Fixed,
  });

  export const range = (
    min: number | undefined,
    max: number | undefined
  ): ScholarshipAmount => ({
    min: min || 0,
    max: max || RANGE_MAX,
    type: AmountType.Varies,
  });

  export const fullTuition = (): ScholarshipAmount => ({
    min: FULL_TUITION,
    max: FULL_TUITION,
    type: AmountType.FullTuition,
  });

  export const unknown = (): ScholarshipAmount => ({
    min: UNKNOWN_MIN,
    max: UNKNOWN_MAX,
    type: AmountType.Varies,
  });

  export function validate(amount: ScholarshipAmount): void {
    const { min, max, type } = amount;

    const realtype =
      type === AmountType.Varies && !min && !max ? AmountType.Unknown : type;

    switch (realtype) {
      case AmountType.Fixed:
        if (!min || min <= 0) {
          throw new Error(`Fixed amount min(${min}) is not a positive number.`);
        }
        if (min !== max) {
          throw new Error(`Fixed amount min(${min}) != max(${max}).`);
        }
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
        break;
    }
  }

  export function toString(amount?: ScholarshipAmount): string {
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

  export function amountsIntersect(
    a1: ScholarshipAmount,
    a2: ScholarshipAmount
  ): boolean {
    return (
      a1.type === AmountType.Unknown ||
      a2.type === AmountType.Unknown ||
      ((!a1.min || a2.max >= a1.min) && (!a1.max || a2.min <= a1.max))
    );
  }
}

export default ScholarshipAmount;
