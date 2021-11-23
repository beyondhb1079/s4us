import Gender from './Gender';

export default interface ScholarshipEligibility {
  gpa?: number;
  ethnicities?: string[];
  majors?: string[];
  schools?: string[];
  grades?: number[];
  states?: string[];
  genders?: Gender[];
}
