import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Sparkles, Cpu, Camera, Battery, Monitor, Shield, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react';
import { api } from '../services/api.js';

export function PhoneFinderView({ onSelectProduct }) {
  const [budgetMax, setBudgetMax] = useState(30000);
  const [weights, setWeights] = useState({
    performance: 7,
    camera: 8,
    battery: 7,
    display: 6,
    build: 5
  });

  const { data: recResponse, isLoading } = useQuery({
    queryKey: ['recommendations', budgetMax, weights],
    queryFn: () => api.getRecommendations({
      budgetMin: 0,
      budgetMax,
      weights
    })
  });

  const recommendations = recResponse?.data || [];

  const handleSlider = (key, val) => {
    setWeights(prev => ({ ...prev, [key]: Number(val) }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>Multi-Attribute Recommendation Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Find Your Perfect Smartphone
        </h1>

        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Set your budget and hardware priorities. Our deterministic algorithm evaluates 100+ spec parameters to find your ideal match with transparent reasoning.
        </p>
      </div>

      {/* INTERACTIVE CONTROLS PANEL */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8 bg-slate-900/60 shadow-xl">
        
        {/* Budget Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider">Maximum Budget</span>
            <span className="text-lg font-black text-sky-400">₹{budgetMax.toLocaleString('en-IN')}</span>
          </div>

          <input
            type="range"
            min="12000"
            max="150000"
            step="2000"
            value={budgetMax}
            onChange={(e) => setBudgetMax(Number(e.target.value))}
            className="w-full accent-sky-500 cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>Budget (₹12k - ₹25k)</span>
            <span>Mid-Range (₹25k - ₹50k)</span>
            <span>Flagship (₹50k - ₹1.5L+)</span>
          </div>
        </div>

        {/* PRIORITY KNOBS */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Define Your Usage Priorities (1 to 10)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Camera */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-indigo-400" /> Camera & Video
                </span>
                <span className="font-bold text-indigo-400">{weights.camera}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={weights.camera}
                onChange={(e) => handleSlider('camera', e.target.value)}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Performance */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-sky-400" /> Gaming & Speed
                </span>
                <span className="font-bold text-sky-400">{weights.performance}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={weights.performance}
                onChange={(e) => handleSlider('performance', e.target.value)}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Battery */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Battery className="w-3.5 h-3.5 text-emerald-400" /> Battery & Fast Charge
                </span>
                <span className="font-bold text-emerald-400">{weights.battery}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={weights.battery}
                onChange={(e) => handleSlider('battery', e.target.value)}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Display */}
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-cyan-400" /> Screen & Multimedia
                </span>
                <span className="font-bold text-cyan-400">{weights.display}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={weights.display}
                onChange={(e) => handleSlider('display', e.target.value)}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

          </div>
        </div>

      </div>

      {/* RECOMMENDATIONS OUTPUT */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-white">Top Recommended Matches</h2>
          <span className="text-xs text-slate-400">Ranked by weighted constraint match</span>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-slate-400 text-sm">Evaluating candidate pool...</div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-5">
            {recommendations.map((rec, rank) => (
              <div
                key={rec.product._id}
                onClick={() => onSelectProduct(rec.product.slug)}
                className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group bg-gradient-to-r from-slate-900/90 to-slate-950"
              >
                {/* Left Device Info */}
                <div className="flex items-center gap-5">
                  <div className="relative aspect-square w-20 sm:w-24 shrink-0 bg-slate-800/50 rounded-2xl p-2 flex items-center justify-center">
                    <img
                      src={rec.product.featuredImage}
                      alt={rec.product.title}
                      className="h-full object-contain group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-md">
                      #{rank + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-indigo-400 uppercase">
                        {typeof rec.product.brand === 'object' ? rec.product.brand.name : rec.product.brand}
                      </span>
                      <span className="text-xs text-slate-500">•</span>
                      <span className="text-xs font-bold text-emerald-400">
                        {rec.matchPercentage}% Priority Match
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {rec.product.title}
                    </h3>

                    <div className="text-base font-black text-white">
                      ₹{rec.product.priceSummary?.minPrice?.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Right Rationale Bullets */}
                <div className="flex-1 md:max-w-md space-y-2 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 text-xs">
                  <div className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Why it matches:</strong> {rec.primaryWinReason}</span>
                  </div>

                  <div className="flex items-start gap-2 text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5 ml-1" />
                    <span><strong className="text-slate-300">Trade-off:</strong> {rec.compromiseReason}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-end">
                  <button className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md">
                    <span>View Full Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-10 rounded-2xl text-center text-slate-400 text-xs">
            No smartphones match your exact budget criteria. Try increasing your max budget.
          </div>
        )}
      </div>

    </div>
  );
}
