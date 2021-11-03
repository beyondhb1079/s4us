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
  ): ScholarshipAmount =>
    min || max
      ? {
          min: min || 0,
          max: max || RANGE_MAX,
          type: AmountType.Varies,
        }
      : {
          min: UNKNOWN_MIN,
          max: UNKNOWN_MAX,
          type: AmountType.Unknown,
        };

  export const fullTuition = (): ScholarshipAmount => ({
    min: FULL_TUITION,
    max: FULL_TUITION,
    type: AmountType.FullTuition,
  });

  export const unknown = (): ScholarshipAmount => range(undefined, undefined);

  /** Validates that `amount` meets per-type constraints. */
  export function validate(amount: ScholarshipAmount): void {
    const { min, max, type } = amount;

    const errors: string[] = [];
    switch (type) {
      case AmountType.Fixed:
        if (!min || min <= 0) {
          errors.push(`Fixed amount min(${min}) is not a positive number.`);
        }
        if (min !== max) {
          errors.push(`Fixed amount min(${min}) != max(${max}).`);
        }
        break;
      case AmountType.Varies:
        if (min && min < 0) {
          errors.push(`Invalid min amount: ${min}.`);
        }
        if (max && max < 0) {
          errors.push(`Invalid max amount: ${max}.`);
        }
        if (max && min && min >= max) {
          errors.push(`Invalid range ${min}-${max}`);
        }
        break;
    }

    if (errors.length !== 0) {
      throw new Error(errors.join('\n\n'));
    }
  }

  /** Translates `amount` to the format it should be stored as. */
  export function toStorage(amount: ScholarshipAmount): ScholarshipAmount {
    validate(amount);
    let { min, max, type } = amount;
    if (type === AmountType.Varies && !min && !max) {
      type = AmountType.Unknown;
    }
    switch (type) {
      case AmountType.Fixed:
        break;
      case AmountType.Varies:
        min = min || 0;
        max = max || RANGE_MAX;
        break;
      case AmountType.FullTuition:
        min = FULL_TUITION;
        max = FULL_TUITION;
        break;
      default:
        min = UNKNOWN_MIN;
        max = UNKNOWN_MAX;
    }
    return { min, max, type };
  }

  // Translates 'amount' to the format it should be displayed as
  export function fromStorage(amount: ScholarshipAmount): ScholarshipAmount {
    let { type, min, max } = amount;
    switch (type) {
      case AmountType.Unknown:
        min = 0;
        max = 0;
        type = AmountType.Varies;
        break;
      case AmountType.Varies:
        max = max === RANGE_MAX ? 0 : max;
        break;
      default:
        break;
    }
    return { type, min, max };
  }

  /** Returns a string representation of the given `amount`. */
  export function toString(amount?: ScholarshipAmount): string {
    switch (amount?.type) {
      case AmountType.FullTuition:
        return 'Full Tuition';
      case AmountType.Fixed:
        return `$${amount.min}`;
      case AmountType.Varies:
        if (!amount.min && !amount.max) return 'Varies';
        if (amount.min && amount.max !== RANGE_MAX) {
          return `$${amount.min}-$${amount.max}`;
        }
        return amount.min ? `$${amount.min}+` : `Up to $${amount.max}`;
      default:
        return 'Varies';
    }
  }

  /** Returns whether or not amount `a` is in range `r`. */
  export function amountsIntersect(
    a: ScholarshipAmount,
    r: ScholarshipAmount
  ): boolean {
    return (
      a.type === AmountType.Unknown ||
      r.type === AmountType.Unknown ||
      ((!r.min || a.max >= r.min) && (!r.max || a.min <= r.max))
    );
  }
}

export default ScholarshipAmount;
