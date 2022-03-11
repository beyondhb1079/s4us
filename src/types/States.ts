// Source: https://www.ssa.gov/international/coc-docs/states.html
const RAW_STATES = `Alabama	AL
Alaska	AK
American Samoa	AS
Arizona	AZ
Arkansas	AR
California	CA
Colorado	CO
Connecticut	CT
Delaware	DE
District Of Columbia	DC
Florida	FL
Georgia	GA
Guam	GU
Hawaii	HI
Idaho	ID
Illinois	IL
Indiana	IN
Iowa	IA
Kansas	KS
Kentucky	KY
Louisiana	LA
Maine	ME
Maryland	MD
Massachusetts	MA
Michigan	MI
Minnesota	MN
Mississippi	MS
Missouri	MO
Montana	MT
Nebraska	NE
Nevada	NV
New Hampshire	NH
New Jersey	NJ
New Mexico	NM
New York	NY
North Carolina	NC
North Dakota	ND
Northern Mariana Islands	MP
Ohio	OH
Oklahoma	OK
Oregon	OR
Pennsylvania	PA
Puerto Rico	PR
Rhode Island	RI
South Carolina	SC
South Dakota	SD
Tennessee	TN
Texas	TX
Utah	UT
Vermont	VT
Virginia	VA
Virgin Islands	VI
Washington	WA
West Virginia	WV
Wisconsin	WI
Wyoming	WY`;

interface State {
  /** Full name of the state or territory, e.g. `'Alabama'`. */
  name: string;
  /** State abbreviation, e.g. `'AL'`. */
  abbr: string;
}
export const States: State[] = RAW_STATES.split('\n')
  .map((s) => s.split('\t'))
  .map(([name, abbr]) => ({ name, abbr }));

const toStringMappings: Record<string, string> = States.reduce(
  (arr, s) => ({
    ...arr,
    [s.abbr]: `${s.name} (${s.abbr})`,
  }),
  {}
);

namespace State {
  export function toString(state: string): string {
    return toStringMappings[state];
  }
}

export default State;
