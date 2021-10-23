import AmountType from './AmountType';

/** Represents a scholarship amount. */
interface ScholarshipAmount {
  readonly type: AmountType;
  readonly min: number;
  readonly max: number;
}

namespace ScholarshipAmount {
  /** 
   * PER-TYPE CONSTANTS 
   * 
   * These constants exist to make sorting by amount.min and amount.max
   * possible for open ended scholarships (no range max, full tuition, unknown).
   * Our constraints are:
   * - When sorting by amount from small to big:
   *   - Unknown scholarships appear last
   *   - Full Tuition scholarships appear last but before Unknown ones
   *   - Everything else is sorted by amount.min
   * - When sorting by amount from big to small:
   *   - Full Tuition scholarships appear first
   *   - Unknown scholarships appear last
   *   - Everything else is sorted by amount.max
   * 
   * With these constraints in mind these values have been derived.
   */ 

  // First, we need to limit the range of possible fixed values.
  const _MIN_FIXED_VALUE = 0;
  const _MAX_FIXED_VALUE = 1000000000;
  
  // Next, we need to set range max to be greater than max possible fixed value.
  /** The `max` value stored for a {@link ScholarshipAmount} of type {@link AmountType.Varies} with no max set. */
  export const _RANGE_MAX = _MAX_FIXED_VALUE + 1;
  
  // Next, we need to set the full tuition value to be greater than range maxes.
  /** The `min` and `max` values stored for a {@link ScholarshipAmount} of type {@link AmountType.FullTuition}.*/
  export const _FULL_TUITION = _RANGE_MAX + 1;
  
  // Finally, we need to set unknown values such that they appear last when
  // sorting.
  /** The `min` value stored for a {@link ScholarshipAmount} of type {@link AmountType.Unknown}.*/
  export const _UNKNOWN_MIN = _FULL_TUITION + 1;
  /** The `max` value stored for a {@link ScholarshipAmount} of type {@link AmountType.Unknown}.*/
  export const _UNKNOWN_MAX = -1;

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
          max: max || _RANGE_MAX,
          type: AmountType.Varies,
        }
      : {
          min: _UNKNOWN_MIN,
          max: _UNKNOWN_MAX,
          type: AmountType.Unknown,
        };

  export const fullTuition = (): ScholarshipAmount => ({
    min: _FULL_TUITION,
    max: _FULL_TUITION,
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
        max = max || _RANGE_MAX;
        break;
      case AmountType.FullTuition:
        min = _FULL_TUITION;
        max = _FULL_TUITION;
        break;
      default:
        min = _UNKNOWN_MIN;
        max = _UNKNOWN_MAX;
    }
    return { min, max, type };
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
        if (amount.min && amount.max !== _RANGE_MAX) {
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
