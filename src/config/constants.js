import {
  isMobile,
  osVersion,
  osName,
  fullBrowserVersion,
  browserName,
  deviceType,
  mobileVendor,
  mobileModel,
} from 'react-device-detect';

const mobileInfo = `Device Type: ${deviceType}\nVendor: ${mobileVendor}\nModel: ${mobileModel}`;
export const deviceInfo = `---------- DO NOT EDIT THIS SECTION ----------\nOS: ${osName}\nOSVersion: ${osVersion}\nBrowser: ${browserName}\nBrowser Version: ${fullBrowserVersion}\n${
  isMobile ? mobileInfo : ''
}---------------------------------------------------------------\nDescribe the bug:\nSteps to reproduce the behavior:\nDescription of what you expected to happen:`;

export const featureRequest =
  "Is your feature request related to a problem? Please Describe:\nDescribe the solution you'd like:\nDescribe alternatives you've considered:\nAdditional content:";

export const BRAND_NAME = 'DreamScholars';
export const SUBSCRIPTION_FORM_URL = 'https://forms.gle/qCpPA34L7ZNVpGH27';
