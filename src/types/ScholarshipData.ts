import ScholarshipAmount from './ScholarshipAmount';
import ScholarshipEligibility from './ScholarshipEligibility';

export default interface ScholarshipData {
  name: string;
  amount: ScholarshipAmount;
  description: string;
  deadline: Date;
  website: string;

  organization?: string;
  tags?: string[];
  dateAdded?: Date;
  lastModified?: Date;
  requirements?: ScholarshipEligibility;
  author?: {
    id?: string;
    email?: string;
  };
}
