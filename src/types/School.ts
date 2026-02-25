export interface School {
  /** Name of the college, e.g. `'American University'`. */
  name: string;
  /** State where the college is located, e.g. `'AL'`. */
  state: string;
  /** Website URL of the college e.g. `'https://yccd.edu'`. */
  url: string;
}

/** Shortened keys for the synced schools.json to save bandwidth. */
export interface SchoolJSON {
  /** Name */
  n: string;
  /** State */
  s: string;
  /** URL */
  u: string;
}
