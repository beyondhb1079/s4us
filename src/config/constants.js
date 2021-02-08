/* eslint-disable import/prefer-default-export */
export const BRAND_NAME = 'DreamScholars';
const params = new URLSearchParams(window.location.search);
export const EXPERIMENT_SHOW_FULL_PROFILE_MENU =
  params.get('experimentShowFullProfileMenu') === '1';
export const DEFAULT_SORT_URL_VALUE = 'sortField=deadline&sortDir=asc';
