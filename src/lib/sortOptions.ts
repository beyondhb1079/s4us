import { TFunction } from 'react-i18next';

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

export const getSortOption = (
  key: string,
  t: TFunction<'sort', undefined>
): string => {
  switch (key) {
    case AMOUNT_ASC:
      return t('amountLowToHigh');
    case AMOUNT_DESC:
      return t('amountHighToLow');
    case DEADLINE_ASC:
      return t('deadlineEarliestToLatest');
    case DEADLINE_DESC:
      return t('deadlineLatestToEarliest');
    default:
      return '';
  }
};

export default [AMOUNT_ASC, AMOUNT_DESC, DEADLINE_ASC, DEADLINE_DESC];
