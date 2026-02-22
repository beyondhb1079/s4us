import { useEffect } from 'react';

const BRAND_NAME = 'DreamScholars';
const SUFFIX = ` | ${BRAND_NAME}`;
const DEFAULT_TITLE = `${BRAND_NAME} | Scholarships for Undocumented Students`;

/**
 * Sets document.title with the brand suffix.
 * Pass a title to set "Title | DreamScholars".
 * Pass nothing or empty string to use the default title.
 */
export default function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title}${SUFFIX}` : DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
