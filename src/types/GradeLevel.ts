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

namespace GradeLevel {
  export function toString(grade: GradeLevel): string {
    return GradeLevel[grade];
  }
}

export default GradeLevel;
