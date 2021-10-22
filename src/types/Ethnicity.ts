enum Ethnicity {
  AmericanIndianOrAlaskaNative = 'AMERICAN_INDIAN_OR_ALASKA_NATIVE',
  Asian = 'ASIAN',
  BlackOrAfricanAmerican = 'BLACK_OR_AFRICAN_AMERICAN',
  HispanicOrLatino = 'HISPANIC_OR_LATINO',
  NativeHawaiianOrOtherPacificIslander = 'NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER',
  White = 'WHITE',
}

const toStringMappings = {
  [Ethnicity.AmericanIndianOrAlaskaNative]: 'American Indian or Alaska Native',
  [Ethnicity.Asian]: 'Asian',
  [Ethnicity.BlackOrAfricanAmerican]: 'Black or African American',
  [Ethnicity.HispanicOrLatino]: 'Hispanic or Latino',
  [Ethnicity.NativeHawaiianOrOtherPacificIslander]:
    'Native Hawaiian or Other Pacific Islander',
  [Ethnicity.White]: 'White',
};

namespace Ethnicity {
  export function values(): any {
    return toStringMappings;
  }

  export function toString(ethnicity: Ethnicity): string {
    return toStringMappings[ethnicity];
  }
}

export default Ethnicity;
