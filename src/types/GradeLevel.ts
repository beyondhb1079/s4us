enum GradeLevel {
  MiddleSchool = 8,
  HsFreshman = 9,
  HsSophomore = 10,
  HsJunior = 11,
  HsSenior = 12,
  CollegeFreshman = 13,
  CollegeSophomore = 14,
  CollegeJunior = 15,
  CollegeSenior = 16,
}

const toStringMappings = {
  [GradeLevel.MiddleSchool]: 'Middle School',
  [GradeLevel.HsFreshman]: 'High School Freshman',
  [GradeLevel.HsSophomore]: 'High School Sophomore',
  [GradeLevel.HsJunior]: 'High School Junior',
  [GradeLevel.HsSenior]: 'High School Senior',
  [GradeLevel.CollegeFreshman]: 'College Freshman',
  [GradeLevel.CollegeSophomore]: 'College Sophomore',
  [GradeLevel.CollegeJunior]: 'College Junior',
  [GradeLevel.CollegeSenior]: 'College Senior',
};

namespace GradeLevel {
  export function values(): any {
    return Object.values(GradeLevel).filter((v) => typeof v === 'number');
  }

  export function toString(level: GradeLevel): string {
    return toStringMappings[level];
  }
}

export default GradeLevel;
