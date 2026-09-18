import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Scale, Plus, X, Eye, Check, ExternalLink, Sparkles, Zap, Smartphone, ArrowRight } from 'lucide-react';
import { api } from '../services/api.js';
import { useCompareStore } from '../store/compareStore.js';

export function ComparisonView({ onSelectProduct, onViewChange }) {
  const { selectedSlugs, removeSlug, addSlug, clearAll } = useCompareStore();
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Fetch comparison details
  const { data: compResponse, isLoading } = useQuery({
    queryKey: ['comparison', selectedSlugs],
    queryFn: () => api.getComparison(selectedSlugs),
    enabled: selectedSlugs.length > 0
  });

  const { data: allProductsResponse } = useQuery({
    queryKey: ['all-products-for-compare'],
    queryFn: () => api.getProducts({ limit: 50 })
  });

  const items = compResponse?.data || [];
  const catalogProducts = allProductsResponse?.data || [];

  if (selectedSlugs.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center max-w-xl mx-auto space-y-4 border border-slate-800">
        <Scale className="w-12 h-12 text-sky-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Your Comparison Matrix is Empty</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select 2 to 4 smartphones from the catalog to see side-by-side spec differences, battery charging benchmarks, and transparent PhonoScore ratings.
        </p>
        <button
          onClick={() => onViewChange('catalog')}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
        >
          Explore Smartphones Catalog
        </button>
      </div>
    );
  }

  // Spec Rows definition
  const specRows = [
    {
      category: 'Key Highlights',
      rows: [
        { label: 'PhonoScore', getVal: (p) => `${p.product.scores?.overall}/100` },
        { 
          label: 'Lowest Price & Store', 
          getVal: (p) => `₹${p.product.priceSummary?.minPrice?.toLocaleString('en-IN')} (on ${p.product.priceSummary?.lowestSellerName || 'Amazon India'})` 
        },
        { label: 'Segment Verdict', getVal: (p) => p.product.summary }
      ]
    },
    {
      category: 'Display & Screen',
      rows: [
        { label: 'Screen Size', getVal: (p) => `${p.specification.display?.screenSizeInches}" inches` },
        { label: 'Panel Type', getVal: (p) => p.specification.display?.panelType },
        { label: 'Refresh Rate', getVal: (p) => `${p.specification.display?.refreshRateHz} Hz` },
        { label: 'Peak Brightness', getVal: (p) => `${p.specification.display?.peakBrightnessNits || 1000} nits` },
        { label: 'Resolution', getVal: (p) => p.specification.display?.resolution }
      ]
    },
    {
      category: 'Performance & Hardware',
      rows: [
        { label: 'Processor (Chipset)', getVal: (p) => p.specification.hardware?.chipset },
        { label: 'AnTuTu Benchmark (v10)', getVal: (p) => p.specification.hardware?.antutuScore ? `${p.specification.hardware.antutuScore.toLocaleString('en-IN')} pts` : '-' },
        { label: 'Fabrication Node', getVal: (p) => `${p.specification.hardware?.processNodeNm}nm` },
        { label: 'RAM / Storage Standard', getVal: (p) => `${p.specification.hardware?.ramType || 'LPDDR5'} + ${p.specification.hardware?.storageType || 'UFS'}` }
      ]
    },
    {
      category: 'Camera System',
      rows: [
        { label: 'Primary Sensor', getVal: (p) => `${p.specification.rearCamera?.primaryMp}MP (${p.specification.rearCamera?.primaryAperture || 'f/1.8'})` },
        { label: 'Optical Image Stabilization', getVal: (p) => p.specification.rearCamera?.ois ? 'Yes (OIS)' : 'No' },
        { label: 'Camera Setup', getVal: (p) => p.specification.rearCamera?.setup },
        { label: 'Front Camera', getVal: (p) => `${p.specification.frontCamera?.mp}MP` },
        { label: 'Video Capabilities', getVal: (p) => p.specification.rearCamera?.videoRecording?.slice(0, 2).join(', ') }
      ]
    },
    {
      category: 'Battery & Charging',
      rows: [
        { label: 'Battery Capacity', getVal: (p) => `${p.specification.battery?.capacityMah} mAh` },
        { label: 'Fast Charging Wattage', getVal: (p) => `${p.specification.battery?.fastChargingWatts}W Fast Charging` },
        { label: 'Wireless Charging', getVal: (p) => p.specification.battery?.wirelessCharging ? 'Yes' : 'No' },
        { label: 'Charger in Box', getVal: (p) => p.specification.battery?.chargerInBox ? 'Yes (Bundled)' : 'No (Sold Separately)' }
      ]
    },
    {
      category: 'Connectivity & Build',
      rows: [
        { label: '5G Bands Count (India)', getVal: (p) => `${p.specification.connectivity?.bandsCount5G || 0} Bands` },
        { label: 'Water & Dust Rating', getVal: (p) => p.specification.design?.waterResistanceRating || 'Not Rated' },
        { label: 'Weight', getVal: (p) => `${p.specification.design?.weightGrams} grams` },
        { label: 'Software Updates', getVal: (p) => `${p.specification.software?.promisedOsUpdatesYears || 2} Years Promised` }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-sky-400" />
            <span>Side-by-Side Smartphone Comparison</span>
          </h1>
          <p className="text-xs text-slate-400">Comparing {items.length} of 4 maximum devices</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Highlight Differences Only toggle */}
          <button
            onClick={() => setOnlyDifferences(!onlyDifferences)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
              onlyDifferences 
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Show Differences Only</span>
          </button>

          {selectedSlugs.length < 4 && (
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add Phone</span>
            </button>
          )}

          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            Clear Matrix
          </button>
        </div>
      </div>

      {/* COMPARISON MATRIX TABLE */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-400 text-sm">Aggregating comparison matrix...</div>
      ) : items.length > 0 ? (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              
              {/* STICKY HEADER WITH PRODUCT CARDS */}
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800">
                  <th className="p-4 w-48 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-950/60 sticky left-0 z-20 backdrop-blur-md">
                    Device Profile
                  </th>
                  {items.map((item) => (
                    <th key={item.product._id} className="p-4 align-top min-w-[200px] border-l border-slate-800/80">
                      <div className="space-y-3">
                        <div className="relative aspect-[4/3] bg-slate-800/50 rounded-xl p-2 flex items-center justify-center">
                          <img
                            src={item.product.featuredImage}
                            alt={item.product.title}
                            className="h-28 object-contain"
                          />
                          <button
                            onClick={() => removeSlug(item.product.slug)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-slate-400 hover:text-rose-400 border border-slate-700"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <div className="text-[10px] font-bold text-sky-400 uppercase">
                            {typeof item.product.brand === 'object' ? item.product.brand.name : item.product.brand}
                          </div>
                          <h3 
                            onClick={() => onSelectProduct(item.product.slug)}
                            className="text-sm font-bold text-white hover:text-sky-300 cursor-pointer line-clamp-1 transition-colors"
                          >
                            {item.product.title}
                          </h3>
                          <div className="text-base font-black text-white mt-1">
                            ₹{item.product.priceSummary?.minPrice?.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Lowest on {item.product.priceSummary?.lowestSellerName || 'Amazon India'}
                          </div>
                        </div>

                        <button
                          onClick={() => onSelectProduct(item.product.slug)}
                          className="w-full py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                        >
                          View Full Specs
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* SPECIFICATION ROWS */}
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {specRows.map((sec) => (
                  <React.Fragment key={sec.category}>
                    <tr className="bg-slate-950/80">
                      <td colSpan={items.length + 1} className="px-4 py-2 text-[11px] font-black text-sky-400 uppercase tracking-wider">
                        {sec.category}
                      </td>
                    </tr>
                    {sec.rows.map((row) => {
                      const values = items.map((p) => row.getVal(p));
                      const isDistinct = new Set(values).size > 1;

                      if (onlyDifferences && !isDistinct) return null;

                      return (
                        <tr key={row.label} className={isDistinct ? 'bg-sky-500/[0.02]' : ''}>
                          <td className="p-4 font-medium text-slate-400 bg-slate-950/40 sticky left-0 z-10">
                            {row.label}
                          </td>
                          {items.map((p, idx) => (
                            <td key={p.product._id} className="p-4 text-slate-200 font-semibold border-l border-slate-800/60">
                              {row.getVal(p)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      ) : null}

      {/* ADD PHONE MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-2xl space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-400" />
                <span>Select Smartphone to Compare</span>
              </h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-2 flex-1 pr-1">
              {catalogProducts
                .filter(p => !selectedSlugs.includes(p.slug))
                .map((product) => (
                  <div
                    key={product._id}
                    onClick={() => { addSlug(product.slug); setAddModalOpen(false); }}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 cursor-pointer flex items-center justify-between group border border-slate-700/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={product.featuredImage} alt={product.title} className="w-10 h-10 object-contain rounded bg-slate-900" />
                      <div>
                        <h4 className="text-xs font-bold text-white group-hover:text-sky-400">{product.title}</h4>
                        <span className="text-[11px] text-slate-400">₹{product.priceSummary?.minPrice?.toLocaleString('en-IN')} • PhonoScore {product.scores?.overall}/100</span>
                      </div>
                    </div>
                    <Plus className="w-4 h-4 text-sky-400" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
