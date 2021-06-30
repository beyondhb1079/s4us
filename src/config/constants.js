/* eslint-disable import/prefer-default-export */
export const BRAND_NAME = 'DreamScholars';
export const SUBSCRIPTION_FORM_URL = 'https://forms.gle/qCpPA34L7ZNVpGH27';
const params = new URLSearchParams(window.location.search);
export const EXPERIMENT_SHOW_FULL_PROFILE_MENU =
  params.get('experimentShowFullProfileMenu') === '1';
