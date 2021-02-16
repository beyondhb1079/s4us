/* eslint-disable no-underscore-dangle */
export default class ScholarshipEligibility {
  GPA: number;
  private _preEthnicities: string[];
  get ethnicities(): string {
    return this.arrToString(this._preEthnicities);
  }

  private _preMajors: string[];
  get majors(): string {
    return this.arrToString(this._preMajors);
  }

  constructor(GPA: number, ethnicities: string[] = [], majors: string[] = []) {
    this.GPA = GPA;
    this._preEthnicities = ethnicities;
    this._preMajors = majors;
  }

  // eslint-disable-next-line class-methods-use-this
  private arrToString(arr: string[]): string {
    return arr.length === 0 ? '' : arr.join(', ');
  }
}
