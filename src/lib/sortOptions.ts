export const AMOUNT_ASC = 'amount.asc';
export const AMOUNT_DESC = 'amount.desc';
export const DEADLINE_ASC = 'deadline.asc';
export const DEADLINE_DESC = 'deadline.desc';

export const getDir = (s: string): string => s.split('.')[1];
export const getField = (s: string): string => {
  switch (s) {
    case AMOUNT_ASC:
      return 'amount.min';
    case AMOUNT_DESC:
      return 'amount.max';
    default:
      return s.split('.')[0];
  }
};

export default {
  [AMOUNT_ASC]: 'amountLowToHigh',
  [AMOUNT_DESC]: 'amountHighToLow',
  [DEADLINE_ASC]: 'deadlineEarliestToLatest',
  [DEADLINE_DESC]: 'deadlineLatestToEarliest',
};
