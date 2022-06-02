enum Ethnicity {
  AmericanIndianOrAlaskaNative = 'AMERICAN_INDIAN_OR_ALASKA_NATIVE',
  Asian = 'ASIAN',
  BlackOrAfricanAmerican = 'BLACK_OR_AFRICAN_AMERICAN',
  HispanicOrLatino = 'HISPANIC_OR_LATINO',
  NativeHawaiianOrOtherPacificIslander = 'NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER',
  White = 'WHITE',
}

const toStringMappings: Readonly<Record<Ethnicity, string>> = {
  [Ethnicity.AmericanIndianOrAlaskaNative]: 'American Indian or Alaskan Native',
  [Ethnicity.Asian]: 'Asian',
  [Ethnicity.BlackOrAfricanAmerican]: 'Black or African American',
  [Ethnicity.HispanicOrLatino]: 'Hispanic or Latino',
  [Ethnicity.NativeHawaiianOrOtherPacificIslander]:
    'Native Hawaiian or Other Pacific Islander',
  [Ethnicity.White]: 'White',
};

namespace Ethnicity {
  export function keys(): Ethnicity[] {
    return Object.keys(toStringMappings) as Ethnicity[];
  }
  export function values(): Record<Ethnicity, string> {
    return toStringMappings;
  }
  export function toString(ethnicity: Ethnicity): string {
    return toStringMappings[ethnicity];
  }
}

export default Ethnicity;
