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

const mobileInfo = `Device Type: ${deviceType}
Vendor: ${mobileVendor}
Model: ${mobileModel}`;

export const deviceInfo = `OS: ${osName}
OS Version: ${osVersion} 
Browser: ${browserName}
Browser Version: ${fullBrowserVersion}
${isMobile ? mobileInfo : ''}`;

export const reportIssue =
  'Describe the issue in detail, including steps to reproduce and expected behavior.';
export const featureRequest = 'Please describe your feature request.';

export function withDeviceInfo(body: string): string {
  return `${body}



---------------------------------------------------------------
${deviceInfo}---------------------------------------------------------------`;
}
