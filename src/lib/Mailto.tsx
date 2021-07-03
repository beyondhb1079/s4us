import queryString from 'query-string';

interface MailToParams {
  bcc?: string;
  cc?: string;
  subject?: string;
  body?: string;
}

const teamEmail = 'dreamscholars-contact@googlegroups.com';
export default function getMailToLink(params: MailToParams): string {
  return `mailto:${teamEmail}?${queryString.stringify(params)}`;
}
