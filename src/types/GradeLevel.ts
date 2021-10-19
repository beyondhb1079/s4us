enum GradeLevel {
  HsFreshman = 9,
  HsSophomore = 10,
}

const toStringMappings = {
  [GradeLevel.HsFreshman]: 'High School Freshman',
  [GradeLevel.HsSophomore]: 'High School Sophomore',
}

namespace GradeLevel {
    export function toString(level: GradeLevel): string {
        return toStringMappings[level];
    }
}

export default GradeLevel;
