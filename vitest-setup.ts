import { afterEach, vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});
