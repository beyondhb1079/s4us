/**
 * Utility to log analytics events with dynamic import and environment support check.
 */
export async function logEventAsync(
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>,
) {
  try {
    // 1. Dynamically import the analytics module
    const { getAnalytics, isSupported, logEvent } =
      await import('firebase/analytics');

    // 2. Check if analytics is supported in the current environment
    const supported = await isSupported();

    if (supported) {
      // 3. Log the event
      logEvent(getAnalytics(), eventName, params);
    }
  } catch (error) {
    // Log errors locally without crashing the app
    console.error('Failed to log analytics event:', error);
  }
}
