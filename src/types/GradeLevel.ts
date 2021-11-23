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
  CollegeFifthYear = 17,
  GraduateFirstYear = 18,
  GraduateSecondYear = 19,
  GraduateThirdYear = 20,
  GraduateFourthYear = 21,
  GraduateFifthYear = 22,
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
  [GradeLevel.CollegeFifthYear]: 'College 5th Year',
  [GradeLevel.GraduateFirstYear]: 'Graduate 1st Year',
  [GradeLevel.GraduateSecondYear]: 'Graduate 2nd Year',
  [GradeLevel.GraduateThirdYear]: 'Graduate 3rd Year',
  [GradeLevel.GraduateFourthYear]: 'Graduate 4th Year',
  [GradeLevel.GraduateFifthYear]: 'Graduate 5th Year',
};

namespace GradeLevel {
  export function keys(): any {
    return Object.keys(toStringMappings).map((k) => parseInt(k));
  }

  export function values(): any {
    return toStringMappings;
  }

  export function toString(level: GradeLevel): string {
    return toStringMappings[level];
  }

  export function includesGrade(
    grades?: number[],
    paramGrades?: number[]
  ): boolean {
    console.log(grades);
    console.log(paramGrades);
    if (!paramGrades || !grades) return true;
    return grades.some((g) => paramGrades.includes(g));
  }
}

export default GradeLevel;
