// Safe storage utility with in-memory fallback for restrictive environments:
// - iOS WebKit (Brave iOS, Safari Private Browsing)
// - Sandboxed or cross-origin iframes
// - Strict cookie / storage privacy settings

const memoryStore = new Map<string, string>();

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) return val;
      }
    } catch {
      // In Brave iOS or private browsing, localStorage access can throw SecurityError
    }
    return memoryStore.get(key) ?? null;
  },

  setItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch {
      // SecurityError or QuotaExceededError in strict privacy modes
    }
    memoryStore.set(key, value);
  },

  removeItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // ignore
    }
    memoryStore.delete(key);
  },

  clear(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      }
    } catch {
      // ignore
    }
    memoryStore.clear();
  },

  getJSON<T>(key: string, fallback: T): T {
    try {
      const raw = safeStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  },

  setJSON<T>(key: string, value: T): void {
    try {
      safeStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  }
};
