import scholarships from '../testdata/scholarships';

interface ScholarshipProps {
  // TODO(https://github.com/beyondhb1079/s4us/issues/56):
  // Update this to reflect the schema
  name: string;
  description: string;
  deadline: string;
  website: string;
  school: string;
  year: string;
}

export default class Scholarship {
  id?: string;
  data: ScholarshipProps;

  constructor(data: ScholarshipProps) {
    this.data = { ...data };
  }

  static get(id: string): Scholarship | undefined {
    const scholarshipList = scholarships as { [id: string]: ScholarshipProps };
    if (id in scholarshipList) {
      return new Scholarship(scholarshipList[id]);
    }
    return undefined;
  }
}
