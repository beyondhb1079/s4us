import GenderType from './GenderType';

export default interface ScholarshipEligibility {
  gpa?: number;
  ethnicities?: string[];
  majors?: string[];
  schools?: string[];
  grades?: string[];
  states?: String[];
  gender?: GenderType;
}
