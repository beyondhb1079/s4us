import React, { useEffect, useState } from 'react';

/** Hook to detect whether an element is on the screen or not. */
export default function useOnScreen(
  ref: React.RefObject<HTMLElement>
): boolean {
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current as Element);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isOnScreen;
}
