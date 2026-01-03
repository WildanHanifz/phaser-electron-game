export default class VersionSystem {
  static LOCAL_VERSION = '0.1.0';
  static VERSION_URL = 'http://localhost:3000/version.json';

  static async check(timeoutMs = 3000) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);

      const res = await fetch(this.VERSION_URL, {
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!res.ok) throw new Error('Bad response');

      const data = await res.json();

      console.log('[VersionSystem] server version:', data.latest);

      if (data.latest !== this.LOCAL_VERSION) {
        return {
          updateAvailable: true,
          patch: data.patch
        };
      }

      return { updateAvailable: false };
    } catch (err) {
      console.warn('[VersionSystem] version check skipped:', err.message);
      return { updateAvailable: false };
    }
  }
}
