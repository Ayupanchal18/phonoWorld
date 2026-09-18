import { ProductScore } from '@phonoworld/shared';

/**
 * PhonoWorld Transparent Spec Scorer Engine
 * Computes deterministic 0-100 sub-scores and weighted overall PhonoScore.
 */
export class ScoreCalculator {
  static calculate(specs: any, minPriceInr: number): ProductScore {
    // 1. PERFORMANCE SCORE (0 - 100)
    let performance = 50;
    const antutu = specs.hardware?.antutuScore || 0;
    if (antutu >= 2000000) performance = 98;
    else if (antutu >= 1500000) performance = 92;
    else if (antutu >= 1000000) performance = 85;
    else if (antutu >= 700000) performance = 78;
    else if (antutu >= 450000) performance = 68;
    else performance = 55;

    if (specs.hardware?.ramType?.includes('LPDDR5X')) performance = Math.min(100, performance + 2);
    if (specs.hardware?.storageType?.includes('UFS 4.0')) performance = Math.min(100, performance + 2);

    // 2. DISPLAY SCORE (0 - 100)
    let display = 60;
    const refresh = specs.display?.refreshRateHz || 60;
    const isAmoled = specs.display?.panelType?.toLowerCase().includes('amoled') || specs.display?.panelType?.toLowerCase().includes('oled');
    const isLtpo = specs.display?.panelType?.toLowerCase().includes('ltpo');
    const nits = specs.display?.peakBrightnessNits || 1000;

    if (isLtpo) display += 25;
    else if (isAmoled) display += 18;
    
    if (refresh >= 144) display += 12;
    else if (refresh >= 120) display += 10;

    if (nits >= 2500) display += 8;
    else if (nits >= 1500) display += 5;
    display = Math.min(100, Math.max(30, display));

    // 3. CAMERA SCORE (0 - 100)
    let camera = 50;
    const primaryMp = specs.rearCamera?.primaryMp || 50;
    const hasOis = !!specs.rearCamera?.ois;
    const hasTelephoto = specs.rearCamera?.secondaryCameras?.some((c: any) => c.type?.toLowerCase().includes('telephoto') || c.type?.toLowerCase().includes('periscope'));
    const isQuadOrTriple = specs.rearCamera?.setup?.toLowerCase().includes('triple') || specs.rearCamera?.setup?.toLowerCase().includes('quad');

    if (hasOis) camera += 15;
    if (hasTelephoto) camera += 18;
    if (primaryMp >= 200 || primaryMp >= 50) camera += 10;
    if (specs.rearCamera?.videoRecording?.some((v: string) => v.includes('4K@60') || v.includes('8K'))) camera += 7;
    camera = Math.min(100, Math.max(35, camera));

    // 4. BATTERY & CHARGING SCORE (0 - 100)
    let battery = 50;
    const mah = specs.battery?.capacityMah || 5000;
    const watts = specs.battery?.fastChargingWatts || 25;
    const hasWireless = !!specs.battery?.wirelessCharging;

    if (mah >= 6000) battery += 20;
    else if (mah >= 5000) battery += 12;

    if (watts >= 100) battery += 20;
    else if (watts >= 67) battery += 15;
    else if (watts >= 45) battery += 10;

    if (hasWireless) battery += 8;
    battery = Math.min(100, Math.max(40, battery));

    // 5. SOFTWARE SCORE (0 - 100)
    let software = 65;
    const osUpdates = specs.software?.promisedOsUpdatesYears || 2;
    if (osUpdates >= 7) software = 98;
    else if (osUpdates >= 4) software = 88;
    else if (osUpdates >= 3) software = 78;

    // 6. BUILD SCORE (0 - 100)
    let build = 60;
    const ipRating = specs.design?.waterResistanceRating || '';
    if (ipRating.includes('IP68') || ipRating.includes('IP69')) build = 95;
    else if (ipRating.includes('IP65') || ipRating.includes('IP64')) build = 80;
    else if (ipRating.includes('IP54')) build = 70;

    // 7. CONNECTIVITY SCORE (0 - 100)
    let connectivity = 60;
    const bands5G = specs.connectivity?.bandsCount5G || 0;
    if (bands5G >= 10) connectivity += 20;
    else if (bands5G >= 6) connectivity += 12;

    if (specs.connectivity?.nfc) connectivity += 10;
    if (specs.connectivity?.wifi?.includes('Wi-Fi 7') || specs.connectivity?.wifi?.includes('Wi-Fi 6')) connectivity += 8;
    connectivity = Math.min(100, connectivity);

    // OVERALL WEIGHTED PHONOSCORE
    const overall = Math.round(
      0.22 * performance +
      0.20 * camera +
      0.16 * display +
      0.16 * battery +
      0.10 * software +
      0.08 * build +
      0.08 * connectivity
    );

    // 8. VALUE FOR MONEY SCORE (Relative to price bracket)
    let value = 75;
    if (minPriceInr > 0) {
      const benchmarkPrice = overall >= 90 ? 80000 : overall >= 80 ? 40000 : 20000;
      const ratio = benchmarkPrice / minPriceInr;
      value = Math.min(99, Math.max(50, Math.round(75 * ratio)));
    }

    return {
      overall,
      performance,
      display,
      camera,
      battery,
      software,
      build,
      value
    };
  }
}
