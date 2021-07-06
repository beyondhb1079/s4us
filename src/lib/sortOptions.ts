export const AMOUNT_ASC = 'amount.asc';
export const AMOUNT_DESC = 'amount.desc';
export const DEADLINE_ASC = 'dealine.asc';
export const DEADLINE_DESC = 'deadline.desc';

export const getDir = (s: string): string => s.split('.')[1];
export const getField = (s: string): string => {
  switch (s) {
    case AMOUNT_ASC:
      return 'amount.min.asc';
    case AMOUNT_DESC:
      return 'amount.max.desc';
    default:
      return s.split('.')[1];
  }
};

export default {
  AMOUNT_ASC: 'Amount (Low to High)',
  AMOUNT_DESC: 'Amount (High to Low)',
  DEADLINE_ASC: 'Deadline (Earliest to Latest)',
  DEADLINE_DESC: 'Deadline (Latest to Earliest)',
};
