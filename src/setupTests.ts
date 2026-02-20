import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
  logEvent: vi.fn(),
  isSupported: vi.fn().mockResolvedValue(true),
}));
