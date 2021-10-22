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

  export function validate(
    amount: ScholarshipAmount,
    throwError: boolean = true
  ): void {
    const { min, max, type } = amount;

    const errors: Error[] = [];
    switch (type) {
      case AmountType.Fixed:
        if (!min || min <= 0) {
          errors.push(
            new Error(`Fixed amount min(${min}) is not a positive number.`)
          );
        }
        if (min !== max) {
          errors.push(new Error(`Fixed amount min(${min}) != max(${max}).`));
        }
        break;
      case AmountType.Varies:
        if (min && min < 0) {
          errors.push(new Error(`Invalid min amount: ${min}.`));
        }
        if (max && max < 0) {
          errors.push(new Error(`Invalid max amount: ${max}.`));
        }
        if (max && min && min >= max) {
          errors.push(new Error(`Invalid range ${min}-${max}`));
        }
        break;
    }

    if (errors.length !== 0) {
      const message = errors.map((e) => e.message).join('\n\n');
      if (throwError) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new Error(message);
      } else {
        console.error(message);
      }
    }
  }

  export function fromStorage(amount: ScholarshipAmount): ScholarshipAmount {
    validate(amount, /* throwError= */ false);
    return amount;
  }

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

  export function toString(amount?: ScholarshipAmount): string {
    switch (amount?.type) {
      case AmountType.FullTuition:
        return 'Full Tuition';
      case AmountType.Fixed:
        return `$${amount.min}`;
      case AmountType.Varies:
        if (
          (!amount.min && !amount.max) ||
          (amount.min === UNKNOWN_MIN && amount.max === UNKNOWN_MAX)
        )
          return 'Varies';
        if (amount.min && amount.max !== RANGE_MAX) {
          return `$${amount.min}-$${amount.max}`;
        }
        return amount.min ? `$${amount.min}+` : `Up to $${amount.max}`;
      default:
        return 'Varies';
    }
  }

  /**
   * Returns whether or not amount a is in range r.
   */
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
