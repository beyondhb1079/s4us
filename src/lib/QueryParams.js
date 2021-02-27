/* eslint-disable import/prefer-default-export */
export const qParams = {
  MIN_AMOUNT: 'minAmount',
  MAX_AMOUNT: 'maxAmount',
};

export const sortParams = {
  deadlineAsc: {
    field: 'deadline',
    dir: 'asc',
  },
  deadlineDesc: {
    field: 'deadline',
    dir: 'desc',
  },
  amountAsc: {
    field: 'amount.min',
    dir: 'asc',
  },
  amountDesc: {
    field: 'amount.max',
    dir: 'desc',
  },
};
