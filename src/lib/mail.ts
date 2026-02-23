import queryString from 'query-string';

interface MailToParams {
  bcc?: string;
  cc?: string;
  subject?: string;
  body?: string;
}

const teamEmail = 'info@dreamscholars.org';

export function genMailToLink(params: MailToParams): string {
  return `mailto:${teamEmail}?${queryString.stringify(params)}`;
}

export const getDeviceInfo = async () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined')
    return '';

  // 1. Try the modern Client Hints API first
  if ('userAgentData' in navigator) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uaData = (navigator as any).userAgentData;
      // High-entropy data (like OS version) must be explicitly requested and is async
      const highEntropyData = await uaData.getHighEntropyValues([
        'platformVersion',
        'model',
      ]);

      return `Platform: ${uaData.platform}
OS Version: ${highEntropyData.platformVersion}
Device Model: ${highEntropyData.model || 'Unknown'}
Mobile: ${uaData.mobile ? 'Yes' : 'No'}`;
    } catch (error) {
      console.error('Failed to get device info:', error);
    }
  }

  // 2. Fallback for older browsers (Safari/Firefox) using a cleaner UA check
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iP(ad|hone)/.test(ua);

  return `User Agent: ${ua}
Mobile Device: ${isMobile ? 'Yes' : 'No'}
Language: ${navigator.language || 'Unknown'}`;
};

export const reportIssue =
  'Describe the issue in detail, including steps to reproduce and expected behavior.';
export const featureRequest = 'Please describe your feature request.';

export function withDeviceInfo(body: string): string {
  return `${body}


---------------------------------------------------------------
${getDeviceInfo()}
---------------------------------------------------------------`;
}
