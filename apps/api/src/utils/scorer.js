/**
 * PhonoWorld Spec Scorer Engine (JavaScript)
 * Transparent Multi-Category 8-Axis Scoring Formula (0 - 100).
 * Supports Smartphones, Laptops, Smartwatches, Tablets, and TWS Audio.
 */
export class ScoreCalculator {
  static calculate(specs, minPriceInr = 0, category = 'smartphones') {
    if (!specs) {
      return { overall: 75, performance: 75, display: 75, camera: 75, battery: 75, software: 75, build: 75, value: 75 };
    }

    const cat = (category || 'smartphones').toLowerCase();

    if (cat === 'laptops') {
      return this.calculateLaptopScore(specs, minPriceInr);
    } else if (cat === 'wearables' || cat === 'smartwatches') {
      return this.calculateWearableScore(specs, minPriceInr);
    } else if (cat === 'tablets') {
      return this.calculateTabletScore(specs, minPriceInr);
    } else if (cat === 'audio' || cat === 'tws') {
      return this.calculateAudioScore(specs, minPriceInr);
    }

    return this.calculateSmartphoneScore(specs, minPriceInr);
  }

  // 1. SMARTPHONE SCORING FORMULA
  static calculateSmartphoneScore(specs, minPriceInr) {
    let performance = 55;
    const antutu = specs.hardware?.antutuScore || 0;
    if (antutu >= 2000000) performance = 98;
    else if (antutu >= 1500000) performance = 92;
    else if (antutu >= 1000000) performance = 85;
    else if (antutu >= 700000) performance = 78;
    else if (antutu >= 450000) performance = 68;
    else performance = 58;

    if (specs.hardware?.ramType?.includes('LPDDR5X')) performance = Math.min(100, performance + 2);
    if (specs.hardware?.storageType?.includes('UFS 4.0')) performance = Math.min(100, performance + 2);

    let display = 60;
    const refresh = specs.display?.refreshRateHz || 60;
    const panel = (specs.display?.panelType || '').toLowerCase();
    const isLtpo = panel.includes('ltpo');
    const isAmoled = panel.includes('amoled') || panel.includes('oled');
    const nits = specs.display?.peakBrightnessNits || 1000;

    if (isLtpo) display += 25;
    else if (isAmoled) display += 18;

    if (refresh >= 144) display += 12;
    else if (refresh >= 120) display += 10;

    if (nits >= 2500) display += 8;
    else if (nits >= 1500) display += 5;
    display = Math.min(100, Math.max(30, display));

    let camera = 50;
    const primaryMp = specs.rearCamera?.primaryMp || 50;
    const hasOis = !!specs.rearCamera?.hasOis || !!specs.rearCamera?.ois;
    const hasTelephoto = specs.rearCamera?.secondaryCameras?.some(c => 
      (c.type || '').toLowerCase().includes('telephoto') || (c.type || '').toLowerCase().includes('periscope')
    ) || !!specs.rearCamera?.opticalZoom;

    if (hasOis) camera += 15;
    if (hasTelephoto) camera += 18;
    if (primaryMp >= 200 || primaryMp >= 50) camera += 10;
    camera = Math.min(100, Math.max(35, camera));

    let battery = 50;
    const mah = specs.battery?.capacityMah || 5000;
    const watts = specs.battery?.fastChargingWatts || 25;
    const hasWireless = !!specs.battery?.wirelessCharging || !!specs.battery?.hasWirelessCharging;

    if (mah >= 6000) battery += 20;
    else if (mah >= 5000) battery += 12;

    if (watts >= 100) battery += 20;
    else if (watts >= 67) battery += 15;
    else if (watts >= 45) battery += 10;

    if (hasWireless) battery += 8;
    battery = Math.min(100, Math.max(40, battery));

    let software = 65;
    const osUpdates = specs.software?.promisedOsUpdatesYears || 3;
    if (osUpdates >= 7) software = 98;
    else if (osUpdates >= 4) software = 88;
    else if (osUpdates >= 3) software = 78;

    let build = 65;
    const ipRating = specs.design?.waterResistanceRating || '';
    if (ipRating.includes('IP68') || ipRating.includes('IP69')) build = 95;
    else if (ipRating.includes('IP65') || ipRating.includes('IP64')) build = 80;
    else if (ipRating.includes('IP54')) build = 70;

    const overall = Math.round(
      0.25 * performance +
      0.22 * camera +
      0.18 * display +
      0.15 * battery +
      0.10 * software +
      0.10 * build
    );

    let value = 75;
    if (minPriceInr > 0) {
      const benchmarkPrice = overall >= 90 ? 70000 : overall >= 80 ? 35000 : 20000;
      const ratio = benchmarkPrice / minPriceInr;
      value = Math.min(99, Math.max(50, Math.round(75 * ratio)));
    }

    return { overall, performance, display, camera, battery, software, build, value };
  }

  // 2. LAPTOP SCORING FORMULA
  static calculateLaptopScore(specs, minPriceInr) {
    let performance = 60;
    const gpu = (specs.hardware?.gpu || specs.hardware?.dedicatedGpu || '').toLowerCase();
    const tgp = specs.hardware?.tgpWatts || 0;
    const ram = specs.hardware?.ramGb || 16;

    if (gpu.includes('4090') || gpu.includes('4080')) performance = 98;
    else if (gpu.includes('4070') || gpu.includes('m3 max') || gpu.includes('m4 max')) performance = 92;
    else if (gpu.includes('4060') || gpu.includes('m3 pro') || gpu.includes('m4 pro')) performance = 85;
    else if (gpu.includes('4050') || gpu.includes('3050') || gpu.includes('m3') || gpu.includes('m2')) performance = 78;
    else performance = 65;

    if (tgp >= 140) performance = Math.min(100, performance + 4);
    if (ram >= 32) performance = Math.min(100, performance + 3);

    let display = 65;
    const panel = (specs.display?.panelType || '').toLowerCase();
    const hz = specs.display?.refreshRateHz || 60;
    const isOled = panel.includes('oled');
    const nits = specs.display?.peakBrightnessNits || 350;

    if (isOled) display += 20;
    if (hz >= 240) display += 15;
    else if (hz >= 120) display += 10;
    if (nits >= 500) display += 8;
    display = Math.min(100, display);

    let battery = 60;
    const whr = specs.battery?.capacityWhr || specs.battery?.capacityMah || 70;
    if (whr >= 90) battery = 96;
    else if (whr >= 75) battery = 88;
    else if (whr >= 60) battery = 78;
    else battery = 65;

    let build = 70;
    const weightKg = specs.design?.weightKg || 1.8;
    if (weightKg <= 1.3) build = 98; // Ultra-lightweight
    else if (weightKg <= 1.6) build = 90;
    else if (weightKg <= 2.2) build = 78;
    else build = 70;

    const software = specs.software?.os?.toLowerCase().includes('mac') ? 95 : 88;
    const camera = specs.frontCamera?.mp >= 1080 || specs.frontCamera?.mp >= 2 ? 85 : 70;

    const overall = Math.round(
      0.30 * performance +
      0.22 * display +
      0.18 * battery +
      0.15 * build +
      0.10 * software +
      0.05 * camera
    );

    let value = 75;
    if (minPriceInr > 0) {
      const benchmarkPrice = overall >= 90 ? 150000 : overall >= 80 ? 90000 : 55000;
      value = Math.min(99, Math.max(50, Math.round(75 * (benchmarkPrice / minPriceInr))));
    }

    return { overall, performance, display, camera, battery, software, build, value };
  }

  // 3. SMARTWATCH & WEARABLES SCORING FORMULA
  static calculateWearableScore(specs, minPriceInr) {
    let performance = 70; // sensor accuracy & CPU
    const hasEcg = !!specs.health?.hasEcg;
    const hasGps = !!specs.connectivity?.dualBandGps || !!specs.connectivity?.gps;
    if (hasEcg) performance += 15;
    if (hasGps) performance += 12;
    performance = Math.min(100, performance);

    let display = 65;
    const nits = specs.display?.peakBrightnessNits || 1000;
    if (nits >= 3000) display = 98;
    else if (nits >= 2000) display = 92;
    else if (nits >= 1000) display = 80;

    let battery = 60;
    const batteryDays = specs.battery?.batteryLifeDays || (specs.battery?.batteryLifeHours ? specs.battery.batteryLifeHours / 24 : 3);
    if (batteryDays >= 10) battery = 98;
    else if (batteryDays >= 4) battery = 88;
    else if (batteryDays >= 2) battery = 78;
    else battery = 65;

    let build = 70;
    const waterRating = (specs.design?.waterResistanceRating || '').toLowerCase();
    if (waterRating.includes('10atm') || waterRating.includes('100m')) build = 98;
    else if (waterRating.includes('5atm') || waterRating.includes('50m')) build = 88;
    else if (waterRating.includes('ip68')) build = 80;

    const software = (specs.software?.os || '').toLowerCase().includes('wear os') || (specs.software?.os || '').toLowerCase().includes('watchos') ? 95 : 80;

    const overall = Math.round(
      0.25 * performance +
      0.22 * display +
      0.22 * battery +
      0.18 * build +
      0.13 * software
    );

    return { overall, performance, display, camera: 60, battery, software, build, value: 80 };
  }

  // 4. TABLETS SCORING FORMULA
  static calculateTabletScore(specs, minPriceInr) {
    let performance = 75;
    const chipset = (specs.hardware?.chipset || '').toLowerCase();
    if (chipset.includes('m4') || chipset.includes('m2') || chipset.includes('8 gen')) performance = 96;
    else if (chipset.includes('dimensity 9') || chipset.includes('m1')) performance = 90;
    else performance = 75;

    let display = 70;
    const isAmoled = (specs.display?.panelType || '').toLowerCase().includes('oled');
    const hz = specs.display?.refreshRateHz || 60;
    if (isAmoled) display += 18;
    if (hz >= 120) display += 12;
    display = Math.min(100, display);

    let battery = 75;
    const mah = specs.battery?.capacityMah || 8000;
    if (mah >= 11000) battery = 98;
    else if (mah >= 9000) battery = 90;

    let build = 75;
    if (specs.productivity?.bundledStylus) build += 12;
    if (specs.connectivity?.has5G) build += 10;
    build = Math.min(100, build);

    const overall = Math.round(
      0.30 * performance +
      0.25 * display +
      0.20 * battery +
      0.15 * build +
      0.10 * 85
    );

    return { overall, performance, display, camera: 72, battery, software: 88, build, value: 82 };
  }

  // 5. TWS AUDIO SCORING FORMULA
  static calculateAudioScore(specs, minPriceInr) {
    let performance = 70; // Sound Quality & Codecs
    const codecs = specs.connectivity?.codecs || [];
    const hasLdac = codecs.some(c => c.toLowerCase().includes('ldac') || c.toLowerCase().includes('lhdc') || c.toLowerCase().includes('aptx'));
    if (hasLdac) performance = 95;
    else performance = 80;

    let camera = 60; // Represents ANC depth (0 - 100)
    const ancDb = specs.audio?.ancDb || 35;
    if (ancDb >= 48) camera = 98;
    else if (ancDb >= 42) camera = 90;
    else if (ancDb >= 35) camera = 80;
    else camera = 65;

    let battery = 70;
    const totalHours = specs.battery?.totalHoursWithCase || 30;
    if (totalHours >= 40) battery = 96;
    else if (totalHours >= 30) battery = 88;
    else battery = 75;

    let build = 75;
    if (specs.design?.waterResistanceRating?.includes('IPX5') || specs.design?.waterResistanceRating?.includes('IP55')) build = 90;

    const overall = Math.round(
      0.35 * performance +
      0.30 * camera + // ANC
      0.20 * battery +
      0.15 * build
    );

    return { overall, performance, display: 70, camera, battery, software: 85, build, value: 84 };
  }
}
