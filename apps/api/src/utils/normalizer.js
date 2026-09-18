/**
 * PhonoWorld Spec Normalizer Engine (JavaScript)
 * Cleans and standardizes raw unstructured specification data.
 */
export class SpecNormalizer {
  static normalizeBattery(raw) {
    if (typeof raw === 'number') return raw;
    if (!raw) return 5000;
    const match = String(raw).replace(/,/g, '').match(/(\d{4,5})\s*mah/i);
    return match ? parseInt(match[1], 10) : 5000;
  }

  static normalizeRefreshRate(raw) {
    if (typeof raw === 'number') return raw;
    if (!raw) return 60;
    const match = String(raw).match(/(\d{2,3})\s*hz/i);
    return match ? parseInt(match[1], 10) : 60;
  }

  static normalizeChargingWatts(raw) {
    if (typeof raw === 'number') return raw;
    if (!raw) return 25;
    const match = String(raw).match(/(\d{2,3})\s*w/i);
    return match ? parseInt(match[1], 10) : 25;
  }

  static normalize5GBands(raw) {
    if (!raw) return { bands: [], count: 0 };
    const text = Array.isArray(raw) ? raw.join(' ') : String(raw);
    const matches = text.toLowerCase().match(/n\d{1,3}/g) || [];
    const uniqueBands = Array.from(new Set(matches.map(b => b.trim())));
    return { bands: uniqueBands, count: uniqueBands.length };
  }

  static normalizeScreenSize(raw) {
    if (typeof raw === 'number') return raw;
    if (!raw) return 6.5;
    const match = String(raw).match(/(\d{1,2}\.\d{1,2})\s*(?:inches|inch|\")/i);
    return match ? parseFloat(match[1]) : 6.5;
  }
}
