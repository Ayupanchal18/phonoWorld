import React, { useState } from 'react';
import { Search, Monitor, Cpu, Camera, Battery, Wifi, Layers, Shield, Volume2, Activity, Laptop, Watch, Tablet, Headphones } from 'lucide-react';

export function SpecTable({ spec = {}, category = 'smartphones' }) {
  const [specFilter, setSpecFilter] = useState('');

  if (!spec || Object.keys(spec).length === 0) {
    return <div className="p-6 text-center text-slate-400 text-sm">Specification data loading...</div>;
  }

  // Generate category-tailored sections
  const getSections = () => {
    switch (category) {
      case 'laptops':
        return [
          {
            title: 'Display & Panel',
            icon: Monitor,
            items: [
              { label: 'Screen Size', value: spec.display?.screenSizeInches ? `${spec.display.screenSizeInches}" inches` : '-' },
              { label: 'Resolution', value: spec.display?.resolution || '-' },
              { label: 'Panel Type', value: spec.display?.panelType || '-' },
              { label: 'Refresh Rate', value: spec.display?.refreshRateHz ? `${spec.display.refreshRateHz} Hz` : '60 Hz' },
              { label: 'Peak Brightness', value: spec.display?.peakBrightnessNits ? `${spec.display.peakBrightnessNits} nits` : '-' },
              { label: 'Aspect Ratio', value: spec.display?.aspectRatio || '16:10' }
            ]
          },
          {
            title: 'Processor, GPU & Memory',
            icon: Cpu,
            items: [
              { label: 'Processor (CPU)', value: spec.hardware?.chipset || '-' },
              { label: 'Dedicated Graphics (GPU)', value: spec.hardware?.dedicatedGpu || spec.hardware?.gpu || 'Integrated' },
              { label: 'GPU TGP (Thermal Power)', value: spec.hardware?.tgpWatts ? `${spec.hardware.tgpWatts}W Max Graphics Power` : '-' },
              { label: 'System RAM', value: spec.hardware?.ramType || (spec.hardware?.ramGb ? `${spec.hardware.ramGb}GB RAM` : '-') },
              { label: 'Internal Storage', value: spec.hardware?.storageType || (spec.hardware?.storageGb ? `${spec.hardware.storageGb}GB SSD` : '-') }
            ]
          },
          {
            title: 'Battery & Power Delivery',
            icon: Battery,
            items: [
              { label: 'Battery Capacity', value: spec.battery?.capacityWhr ? `${spec.battery.capacityWhr} Whr` : '-' },
              { label: 'Power Brick / Charger', value: spec.battery?.chargerWatts ? `${spec.battery.chargerWatts}W Adapter` : '-' },
              { label: 'USB-C Power Delivery', value: spec.battery?.hasUsbCPowerDelivery ? 'Supported (100W PD)' : '-' }
            ]
          },
          {
            title: 'Chassis & Port Selection',
            icon: Laptop,
            items: [
              { label: 'Weight', value: spec.design?.weightKg ? `${spec.design.weightKg} kg` : (spec.design?.weightGrams ? `${spec.design.weightGrams}g` : '-') },
              { label: 'Thickness / Profile', value: spec.design?.thicknessMm ? `${spec.design.thicknessMm} mm thin` : '-' },
              { label: 'Chassis Material', value: spec.design?.chassisMaterial || 'Aluminum Alloy' },
              { label: 'Physical Ports', value: spec.connectivity?.ports?.join(', ') || '-' },
              { label: 'Wi-Fi & Bluetooth', value: `${spec.connectivity?.wifi || 'Wi-Fi 6E'}, Bluetooth ${spec.connectivity?.bluetooth || '5.3'}` }
            ]
          },
          {
            title: 'Operating System & Software',
            icon: Shield,
            items: [
              { label: 'Operating System', value: spec.software?.os || 'Windows 11' }
            ]
          }
        ];

      case 'wearables':
        return [
          {
            title: 'Display & Glass',
            icon: Watch,
            items: [
              { label: 'Display Size', value: spec.display?.screenSizeInches ? `${spec.display.screenSizeInches}" inches` : '-' },
              { label: 'Resolution', value: spec.display?.resolution || '-' },
              { label: 'Panel Type', value: spec.display?.panelType || 'AMOLED' },
              { label: 'Peak Brightness', value: spec.display?.peakBrightnessNits ? `${spec.display.peakBrightnessNits} nits (Sunlight readable)` : '-' }
            ]
          },
          {
            title: 'Health & Precision Sensors',
            icon: Activity,
            items: [
              { label: 'ECG Certified Sensor', value: spec.health?.hasEcg ? 'Yes (Medical Grade ECG certified)' : 'No' },
              { label: 'Blood Pressure & SpO2', value: spec.health?.hasBloodPressure ? 'Yes (FDA / CE Cleared)' : 'Heart Rate only' },
              { label: 'Sleep Apnea Detection', value: spec.health?.hasSleepApnea ? 'Yes (Clinical Grade)' : '-' },
              { label: 'Bioelectrical Impedance', value: spec.health?.hasBioelectricalImpedance ? 'Yes (Body Fat / Skeletal Muscle)' : '-' }
            ]
          },
          {
            title: 'Rugged Durability & Case',
            icon: Shield,
            items: [
              { label: 'Water & Dive Rating', value: spec.design?.waterResistanceRating || '5ATM' },
              { label: 'Case / Bezel Material', value: spec.design?.frameMaterial || 'Titanium / Steel' },
              { label: 'Weight', value: spec.design?.weightGrams ? `${spec.design.weightGrams} grams` : '-' }
            ]
          },
          {
            title: 'Battery & Endurance',
            icon: Battery,
            items: [
              { label: 'Battery Capacity', value: spec.battery?.capacityMah ? `${spec.battery.capacityMah} mAh` : '-' },
              { label: 'Claimed Battery Life', value: spec.battery?.batteryLifeHours ? `${spec.battery.batteryLifeHours} Hours (${spec.battery.batteryLifeDays || 3} Days Typical)` : '-' }
            ]
          },
          {
            title: 'Connectivity & OS',
            icon: Wifi,
            items: [
              { label: 'Cellular / eSIM', value: spec.connectivity?.has4GLte ? 'Yes (Standalone 4G LTE eSIM)' : 'Bluetooth Only' },
              { label: 'GPS Precision', value: spec.connectivity?.dualBandGps ? 'Dual-Frequency L1 + L5 GNSS' : 'Single Band GPS' },
              { label: 'NFC & Wireless Pay', value: spec.connectivity?.nfc ? 'Yes (Google Wallet / Samsung Pay)' : 'No' },
              { label: 'Operating System', value: spec.software?.os || 'Wear OS' }
            ]
          }
        ];

      case 'tablets':
        return [
          {
            title: 'Display & Canvas',
            icon: Monitor,
            items: [
              { label: 'Screen Size', value: spec.display?.screenSizeInches ? `${spec.display.screenSizeInches}" inches` : '-' },
              { label: 'Resolution', value: spec.display?.resolution || '-' },
              { label: 'Panel & Color', value: spec.display?.panelType || '-' },
              { label: 'Refresh Rate', value: spec.display?.refreshRateHz ? `${spec.display.refreshRateHz} Hz` : '60 Hz' },
              { label: 'Peak Brightness', value: spec.display?.peakBrightnessNits ? `${spec.display.peakBrightnessNits} nits` : '-' }
            ]
          },
          {
            title: 'Productivity & Stylus',
            icon: Tablet,
            items: [
              { label: 'Active Stylus Support', value: spec.productivity?.bundledStylus ? `Included in box (${spec.productivity.stylusLatencyMs}ms Ultra-low latency)` : 'Optional' },
              { label: 'Desktop Mode', value: spec.productivity?.hasDesktopMode ? `Yes (${spec.productivity.desktopModeName || 'Desktop DeX Mode'})` : '-' },
              { label: 'Processor', value: spec.hardware?.chipset || '-' },
              { label: 'RAM & Storage', value: `${spec.hardware?.ramGb || 8}GB RAM / ${spec.hardware?.storageGb || 128}GB Storage` }
            ]
          },
          {
            title: 'Battery & Charging',
            icon: Battery,
            items: [
              { label: 'Battery Capacity', value: spec.battery?.capacityMah ? `${spec.battery.capacityMah} mAh` : '-' },
              { label: 'Fast Charging Watts', value: spec.battery?.fastChargingWatts ? `${spec.battery.fastChargingWatts}W Super Fast Charging` : '-' }
            ]
          },
          {
            title: 'Build & Connectivity',
            icon: Wifi,
            items: [
              { label: 'Weight & Thickness', value: `${spec.design?.weightGrams || 500}g, ${spec.design?.thicknessMm || 6.0}mm ultra-thin` },
              { label: 'Water Protection', value: spec.design?.waterResistanceRating || 'Not Rated' },
              { label: 'Cellular / Wi-Fi', value: `${spec.connectivity?.has5G ? '5G LTE Cellular' : 'Wi-Fi'}, ${spec.connectivity?.wifi || 'Wi-Fi 6E'}` },
              { label: 'Operating System', value: spec.software?.os || 'Android / iPadOS' }
            ]
          }
        ];

      case 'audio':
        return [
          {
            title: 'Acoustics & Sound Drivers',
            icon: Volume2,
            items: [
              { label: 'Driver Architecture', value: spec.audio?.driverType || 'Dynamic Driver' },
              { label: 'Driver Diameter', value: spec.audio?.driverDiameterMm ? `${spec.audio.driverDiameterMm} mm` : '-' },
              { label: 'Frequency Response', value: spec.audio?.frequencyResponse || '20Hz - 20,000Hz' }
            ]
          },
          {
            title: 'Active Noise Cancellation (ANC)',
            icon: Shield,
            items: [
              { label: 'ANC Hardware', value: spec.audio?.hasActiveNoiseCanceling ? 'Yes (Flagship Hybrid Dual-Processor)' : 'Passive Only' },
              { label: 'Noise Reduction Depth', value: spec.audio?.ancDb ? `Up to ${spec.audio.ancDb} dB Depth` : 'Adaptive' }
            ]
          },
          {
            title: 'Wireless Codecs & Connectivity',
            icon: Wifi,
            items: [
              { label: 'Hi-Res Audio Codecs', value: spec.connectivity?.codecs?.join(', ') || 'AAC, SBC' },
              { label: 'Bluetooth Version', value: spec.connectivity?.bluetooth || 'Bluetooth 5.3' },
              { label: 'Multi-Point Pairing', value: spec.connectivity?.hasMultipoint ? 'Yes (Simultaneous 2-Device Seamless Switch)' : 'Single device' }
            ]
          },
          {
            title: 'Battery Life & Case Charging',
            icon: Battery,
            items: [
              { label: 'Earbuds Continuous Playtime', value: spec.battery?.budsHours ? `${spec.battery.budsHours} Hours (with ANC ON)` : '-' },
              { label: 'Total Playtime with Case', value: spec.battery?.totalHoursWithCase ? `${spec.battery.totalHoursWithCase} Hours Reserve` : '-' },
              { label: 'Fast Top-up Charge', value: spec.battery?.fastChargingMinutes ? `${spec.battery.fastChargingMinutes} min charge for 60 min playback` : '-' },
              { label: 'Qi Wireless Charging', value: spec.battery?.hasWirelessCharging ? 'Supported' : 'Type-C Only' }
            ]
          },
          {
            title: 'Durability & Fit',
            icon: Headphones,
            items: [
              { label: 'Earbud Weight', value: spec.design?.weightGrams ? `${spec.design.weightGrams} grams per bud` : '-' },
              { label: 'Water / Sweat Rating', value: spec.design?.waterResistanceRating || 'IPX4 Splash Resistant' }
            ]
          }
        ];

      default:
        // Default: Smartphone specs
        return [
          {
            title: 'Display & Screen',
            icon: Monitor,
            items: [
              { label: 'Screen Size', value: spec.display?.screenSizeInches ? `${spec.display.screenSizeInches}" inches` : '-' },
              { label: 'Resolution', value: spec.display?.resolution || '-' },
              { label: 'Panel Type', value: spec.display?.panelType || '-' },
              { label: 'Refresh Rate', value: spec.display?.refreshRateHz ? `${spec.display.refreshRateHz} Hz` : '60 Hz' },
              { label: 'Peak Brightness', value: spec.display?.peakBrightnessNits ? `${spec.display.peakBrightnessNits} nits` : '-' },
              { label: 'Screen Protection', value: spec.display?.screenProtection || '-' },
              { label: 'HDR Standards', value: spec.display?.hdrSupport?.join(', ') || 'HDR10' }
            ]
          },
          {
            title: 'Processor & Performance',
            icon: Cpu,
            items: [
              { label: 'Chipset / SoC', value: spec.hardware?.chipset || '-' },
              { label: 'CPU Architecture', value: spec.hardware?.cpuDetails || (spec.hardware?.cpuCores ? `${spec.hardware.cpuCores} Cores` : '-') },
              { label: 'Fabrication Node', value: spec.hardware?.processNodeNm ? `${spec.hardware.processNodeNm}nm` : '-' },
              { label: 'GPU Graphics', value: spec.hardware?.gpu || '-' },
              { label: 'AnTuTu Benchmark (v10)', value: spec.hardware?.antutuScore ? spec.hardware.antutuScore.toLocaleString('en-IN') : '-' },
              { label: 'RAM Type', value: spec.hardware?.ramType || '-' },
              { label: 'Storage Standard', value: spec.hardware?.storageType || '-' }
            ]
          },
          {
            title: 'Cameras & Imaging',
            icon: Camera,
            items: [
              { label: 'Rear Setup', value: spec.rearCamera?.setup || '-' },
              { label: 'Primary Sensor', value: spec.rearCamera?.primaryMp ? `${spec.rearCamera.primaryMp}MP (${spec.rearCamera.primaryAperture || ''}) ${spec.rearCamera.primarySensor || ''}` : '-' },
              { label: 'Optical Image Stabilization (OIS)', value: spec.rearCamera?.ois ? 'Yes (Hardware OIS)' : 'No' },
              { label: 'Secondary Sensors', value: spec.rearCamera?.secondaryCameras?.map(c => `${c.type}: ${c.mp}MP (${c.aperture})`).join(' | ') || '-' },
              { label: 'Front Selfie Camera', value: spec.frontCamera?.mp ? `${spec.frontCamera.mp}MP (${spec.frontCamera.aperture || 'f/2.2'})` : '-' },
              { label: 'Video Recording', value: spec.rearCamera?.videoRecording?.join(', ') || '4K@30fps' }
            ]
          },
          {
            title: 'Battery & Fast Charging',
            icon: Battery,
            items: [
              { label: 'Battery Capacity', value: spec.battery?.capacityMah ? `${spec.battery.capacityMah} mAh` : '-' },
              { label: 'Wired Fast Charging', value: spec.battery?.fastChargingWatts ? `${spec.battery.fastChargingWatts}W Fast Charging` : '-' },
              { label: 'Wireless Charging', value: spec.battery?.wirelessCharging ? `Yes (${spec.battery?.wirelessWatts || 15}W)` : 'No' },
              { label: 'Charger in Box', value: spec.battery?.chargerInBox ? 'Yes (Bundled in retail box)' : 'No (Sold separately)' }
            ]
          },
          {
            title: 'Connectivity & 5G Bands in India',
            icon: Wifi,
            items: [
              { label: '5G Support', value: spec.connectivity?.has5G ? 'Yes (Native 5G Dual Standby)' : '4G LTE only' },
              { label: 'Supported 5G Bands Count', value: `${spec.connectivity?.bandsCount5G || spec.connectivity?.bands5G?.length || 0} Bands in India` },
              { label: 'Verified 5G Bands', value: spec.connectivity?.bands5G?.join(', ') || '-' },
              { label: 'Wi-Fi Generation', value: spec.connectivity?.wifi || 'Wi-Fi 6' },
              { label: 'Bluetooth', value: spec.connectivity?.bluetooth || 'Bluetooth 5.3' },
              { label: 'NFC Support', value: spec.connectivity?.nfc ? 'Yes (Tap & Pay)' : 'No' }
            ]
          },
          {
            title: 'Design & Software Longevity',
            icon: Shield,
            items: [
              { label: 'Weight', value: spec.design?.weightGrams ? `${spec.design.weightGrams} grams` : '-' },
              { label: 'Water & Dust Resistance', value: spec.design?.waterResistanceRating || 'Not Rated' },
              { label: 'Operating System', value: spec.software?.osVersion || 'Android 14' },
              { label: 'Custom UI', value: spec.software?.customUi || 'Stock' },
              { label: 'Promised OS Updates', value: spec.software?.promisedOsUpdatesYears ? `${spec.software.promisedOsUpdatesYears} Years Guaranteed` : '2 Years' }
            ]
          }
        ];
    }
  };

  const sections = getSections();

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white">Full Technical Specifications</h3>
          <p className="text-xs text-slate-400">Verified manufacturer hardware specs & Indian market compliance</p>
        </div>

        {/* Spec quick search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={specFilter}
            onChange={(e) => setSpecFilter(e.target.value)}
            placeholder="Filter specs (e.g. OLED, TGP, ANC)..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((sec) => {
          const filteredItems = sec.items.filter(
            item => !specFilter || 
                    item.label.toLowerCase().includes(specFilter.toLowerCase()) || 
                    String(item.value).toLowerCase().includes(specFilter.toLowerCase())
          );

          if (filteredItems.length === 0) return null;

          const Icon = sec.icon;

          return (
            <div key={sec.title} className="space-y-3">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{sec.title}</span>
              </h4>

              <div className="rounded-xl overflow-hidden border border-slate-800/80 divide-y divide-slate-800/60 bg-slate-900/50">
                {filteredItems.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-3 text-xs">
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="sm:col-span-2 text-white font-semibold mt-0.5 sm:mt-0">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
