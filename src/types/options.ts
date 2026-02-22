import majorsData from '../data/majors.json';
import schoolsData from '../data/schools.json';

export const MAJORS = new Set(majorsData);

export interface School {
  /** Name of the college, e.g. `'American University'`. */
  name: string;
  /** State where the college is located, e.g. `'AL'`. */
  state: string;
  /** Website of the college e.g. `'yccd.edu'`. */
  website: string;
}

export const SCHOOLS: School[] = schoolsData;
