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
  // DEPRECATED: CollegeFifthYear = 17,
  GraduateFirstYear = 18,
  GraduateSecondYear = 19,
  GraduateThirdYear = 20,
  GraduateFourthYear = 21,
  GraduateFifthYear = 22,
}

const toStringMappings: Readonly<Record<GradeLevel, string>> = {
  [GradeLevel.MiddleSchool]: '8th Grade or earlier',
  [GradeLevel.HsFreshman]: '9th Grade',
  [GradeLevel.HsSophomore]: '10th Grade',
  [GradeLevel.HsJunior]: '11th Grade',
  [GradeLevel.HsSenior]: '12th Grade (Senior)',
  [GradeLevel.CollegeFreshman]: 'College Freshman',
  [GradeLevel.CollegeSophomore]: 'College Sophomore',
  [GradeLevel.CollegeJunior]: 'College Junior',
  [GradeLevel.CollegeSenior]: 'College Senior',
  // DEPRECATED: [GradeLevel.CollegeFifthYear]: 'College 5th Year',
  [GradeLevel.GraduateFirstYear]: 'Graduate 1st Year',
  [GradeLevel.GraduateSecondYear]: 'Graduate 2nd Year',
  [GradeLevel.GraduateThirdYear]: 'Graduate 3rd Year',
  [GradeLevel.GraduateFourthYear]: 'Graduate 4th Year',
  [GradeLevel.GraduateFifthYear]: 'Graduate 5th Year',
};

namespace GradeLevel {
  export function keys(): GradeLevel[] {
    return Object.keys(toStringMappings).map((k) => parseInt(k) as GradeLevel);
  }
  export function values(): Record<GradeLevel, string> {
    return toStringMappings;
  }
  export function toString(level: GradeLevel): string {
    return toStringMappings[level];
  }

  export const highSchoolers = [
    GradeLevel.HsFreshman,
    GradeLevel.HsSophomore,
    GradeLevel.HsJunior,
    GradeLevel.HsSenior,
  ];

  export const undergrads = [
    GradeLevel.CollegeFreshman,
    GradeLevel.CollegeSophomore,
    GradeLevel.CollegeJunior,
    GradeLevel.CollegeSenior,
  ];

  export const grads = [
    GradeLevel.GraduateFirstYear,
    GradeLevel.GraduateSecondYear,
    GradeLevel.GraduateThirdYear,
    GradeLevel.GraduateFourthYear,
    GradeLevel.GraduateFifthYear,
  ];
}

export default GradeLevel;
