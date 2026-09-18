import React from 'react';
import { Smartphone, ShieldCheck, Zap, Scale, Heart } from 'lucide-react';

export function Footer({ onViewChange }) {
  return (
    <footer className="border-t border-slate-800 bg-[#070a12] text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-slate-950" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">PhonoWorld India</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's transparent consumer-tech specification discovery, multi-seller price intelligence, and explainable recommendation platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Discovery</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onViewChange('catalog')} className="hover:text-sky-400">All Smartphones</button></li>
              <li><button onClick={() => onViewChange('compare')} className="hover:text-sky-400">Phone Comparison Matrix</button></li>
              <li><button onClick={() => onViewChange('finder')} className="hover:text-sky-400">Phone Finder Wizard</button></li>
              <li><span className="text-slate-500">Upcoming 5G Launches (2026)</span></li>
            </ul>
          </div>

          {/* Methodology */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Transparency</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Transparent PhonoScore</li>
              <li className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-400" /> Verified 5G Band Counts</li>
              <li className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-sky-400" /> Fair Price Historical Delta</li>
              <li><span className="text-slate-500">Zero Sponsored Review Bias</span></li>
            </ul>
          </div>

          {/* Compliance & Disclosure */}
          <div>
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Affiliate Disclosure</h4>
            <p className="text-[11px] leading-normal text-slate-500">
              PhonoWorld is reader-supported. When you purchase through retailer links on our platform (Amazon.in, Flipkart, Croma), we may earn an affiliate commission at no additional cost to you.
            </p>
            <p className="text-[11px] mt-2 text-slate-500">
              Compliant with Information Technology Act, 2000 & Digital Personal Data Protection Act (DPDP) 2023.
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800/80 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} PhonoWorld. Built with accuracy and speed for Indian consumers.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for India's tech ecosystem
          </p>
        </div>
      </div>
    </footer>
  );
}
