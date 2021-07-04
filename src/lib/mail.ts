import queryString from 'query-string';
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

interface MailToParams {
  bcc?: string;
  cc?: string;
  subject?: string;
  body?: string;
}

const teamEmail = 'dreamscholars-contact@googlegroups.com';
export function genMailToLink(params: MailToParams): string {
  return `mailto:${teamEmail}?${queryString.stringify(params)}`;
}

const mobileInfo = `
Device Type: ${deviceType}
Vendor: ${mobileVendor}
Model: ${mobileModel}`;

export const bugReport = `
---------- DO NOT EDIT THIS SECTION ----------
OS: ${osName}
OSVersion: ${osVersion} 
Browser: ${browserName}
Browser Version: ${fullBrowserVersion}
${isMobile ? mobileInfo : ''}
---------------------------------------------------------------
Describe the bug:
Steps to reproduce the behavior:
Description of what you expected to happen:`;

export const featureRequest = `
Is your feature request related to a problem? Please Describe:Describe the solution you'd like:
Describe alternatives you've considered:
Additional content:`;
