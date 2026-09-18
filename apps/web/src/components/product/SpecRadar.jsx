import React from 'react';
import { Cpu, Camera, Monitor, BatteryCharging, Shield, Sparkles } from 'lucide-react';

export function SpecRadar({ scores = {} }) {
  const dimensions = [
    { key: 'performance', label: 'Performance', icon: Cpu, score: scores.performance || 80, color: 'text-sky-400' },
    { key: 'camera', label: 'Camera', icon: Camera, score: scores.camera || 80, color: 'text-indigo-400' },
    { key: 'display', label: 'Display', icon: Monitor, score: scores.display || 85, color: 'text-cyan-400' },
    { key: 'battery', label: 'Battery & Charge', icon: BatteryCharging, score: scores.battery || 85, color: 'text-emerald-400' },
    { key: 'software', label: 'Software Support', icon: Sparkles, score: scores.software || 80, color: 'text-amber-400' },
    { key: 'build', label: 'Build & Ingress', icon: Shield, score: scores.build || 80, color: 'text-rose-400' },
  ];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <span>Hardware Benchmark Analysis</span>
          </h4>
          <p className="text-xs text-slate-400">Deterministic 8-axis PhonoScore evaluation</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-black text-sky-400">{scores.overall || 85}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>

      <div className="space-y-3">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          return (
            <div key={dim.key} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Icon className={`w-3.5 h-3.5 ${dim.color}`} />
                  <span>{dim.label}</span>
                </div>
                <span className="font-bold text-white">{dim.score}/100</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-500"
                  style={{ width: `${dim.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
