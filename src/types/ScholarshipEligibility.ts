import Ethnicity from './Ethnicity';
import Gender from './Gender';
import GradeLevel from './GradeLevel';

export default interface ScholarshipEligibility {
  gpa?: number;
  ethnicities?: Ethnicity[];
  majors?: string[];
  schools?: string[];
  grades?: GradeLevel[];
  states?: string[];
  genders?: Gender[];
}
