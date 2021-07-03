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

/* eslint-disable import/prefer-default-export */
const mobileInfo = `Device Type: ${deviceType} Vendor: ${mobileVendor} Model: ${mobileModel}`;
export const deviceInfo = `---------- DO NOT EDIT THIS SECTION ----------%0A%0A OS: ${osName}%0AOSVersion: ${osVersion}%0ABrowser: ${browserName}%0ABrowser Version: ${fullBrowserVersion}%0A${
  isMobile ? mobileInfo : ''
}%0A---------------------------------------------------------------%0A%0ADescribe%20the%20bug%3A%20%0ASteps%20to%20reproduce%20the%20behavior%3A%20%0ADescription%20of%20what%20you%20expected%20to%20happen%3A%20`;

export const featureRequest =
  "Is%20your%20feature%20request%20related%20to%20a%20problem%3F%20Please%20Describe%3A%0A%0ADescribe%20the%20solution%20you'd%20like%3A%0A%0ADescribe%20alternatives%20you've%20considered%3A%0A%0AAdditional%20content%3A";

export const BRAND_NAME = 'DreamScholars';
export const SUBSCRIPTION_FORM_URL = 'https://forms.gle/qCpPA34L7ZNVpGH27';
