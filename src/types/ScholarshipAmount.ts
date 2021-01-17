import AmountType from './AmountType';

export default class ScholarshipAmount {
  readonly type: AmountType;
  readonly min: number;
  readonly max: number;

  constructor(data?: { type?: AmountType; min?: number; max?: number }) {
    this.type = data?.type ?? AmountType.Unknown;
    this.min = data?.min ?? 0;
    this.max = data?.max ?? 0;

    if (this.type === AmountType.Fixed) {
      if (this.min !== this.max) {
        throw new Error(
          `Fixed amount has min(${this.min}) != max(${this.max}).`
        );
      }
      if (this.min <= 0) {
        throw new Error(`Invalid fixed amount: ${this.min}.`);
      }
    }
    if (this.type === AmountType.Range) {
      if (this.min < 0) {
        throw new Error(`Invalid min amount: ${this.min}.`);
      }
      if (this.max < 0) {
        throw new Error(`Invalid max amount: ${this.max}.`);
      }
      if (this.max && this.min >= this.max) {
        throw new Error(`Invalid range[${this.min},${this.max}]`);
      }
    }
  }

  toString(): string {
    return ScholarshipAmount.toString(this);
  }

  static toString(data: {
    type?: AmountType;
    min?: number;
    max?: number;
  }): string {
    const { type, min, max } = data;
    switch (type) {
      case AmountType.FullTuition:
        return 'Full Tuition';
      case AmountType.Fixed:
        return `$${min}`;
      case AmountType.Range:
        if (min && max) {
          return `$${min}-$${max}`;
        }
        return min ? `$${min}+` : `Up to $${max}`;
      default:
        return '(Unknown amount)';
    }
  }
}
