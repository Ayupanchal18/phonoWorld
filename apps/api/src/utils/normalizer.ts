/**
 * PhonoWorld Spec Normalizer Engine
 * Converts raw unstructured strings into canonical numbers and arrays.
 */
export class SpecNormalizer {
  static normalizeBattery(raw: string | number): number {
    if (typeof raw === 'number') return raw;
    const match = raw.replace(/,/g, '').match(/(\d{4,5})\s*mah/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  static normalizeRefreshRate(raw: string | number): number {
    if (typeof raw === 'number') return raw;
    const match = raw.match(/(\d{2,3})\s*hz/i);
    return match ? parseInt(match[1], 10) : 60;
  }

  static normalizeChargingWatts(raw: string | number): number {
    if (typeof raw === 'number') return raw;
    const match = raw.match(/(\d{2,3})\s*w/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  static normalize5GBands(raw: string | string[]): { bands: string[]; count: number } {
    const text = Array.isArray(raw) ? raw.join(' ') : raw;
    const matches = text.toLowerCase().match(/n\d{1,3}/g) || [];
    const uniqueBands = Array.from(new Set(matches.map(b => b.trim())));
    return { bands: uniqueBands, count: uniqueBands.length };
  }

  static normalizeScreenSize(raw: string | number): number {
    if (typeof raw === 'number') return raw;
    const match = raw.match(/(\d{1,2}\.\d{1,2})\s*(?:inches|inch|\")/i);
    return match ? parseFloat(match[1]) : 0;
  }
}
