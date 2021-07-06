export const AMOUNT_ASC = 'amount.min.asc';
export const AMOUNT_DESC = 'amount.max.desc';
export const DEADLINE_ASC = 'dealine.asc';
export const DEADLINE_DESC = 'deadline.desc';

export const getDir = (s: string): string => s.slice(s.lastIndexOf('.') + 1);
export const getField = (s: string): string => s.slice(0, s.lastIndexOf('.'));

export default {
  AMOUNT_ASC: 'Amount (Low to High)',
  AMOUNT_DESC: 'Amount (High to Low)',
  DEADLINE_ASC: 'Deadline (Earliest to Latest)',
  DEADLINE_DESC: 'Deadline (Latest to Earliest)',
};
