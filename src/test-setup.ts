import { vi } from 'vitest';

// Le composant DatePicker de PrimeVue utilise la fonction window.matchMedia qui n'existe pas dans jsdom, donc on la mock.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
