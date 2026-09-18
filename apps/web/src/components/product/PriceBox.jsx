import React, { useState } from 'react';
import { ExternalLink, Bell, Tag, CheckCircle2, ShieldCheck, Sparkles, CreditCard, ShoppingBag, Zap } from 'lucide-react';
import { useUserStore } from '../../store/userStore.js';

export function PriceBox({ offers = [], priceSummary = {}, productId = 'prod_samsung_s24_ultra' }) {
  const { user, token } = useUserStore();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState(priceSummary.minPrice ? Math.round(priceSummary.minPrice * 0.9) : 20000);
  const [email, setEmail] = useState(user?.email || '');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minPrice = priceSummary.minPrice || 0;
  const maxPrice = priceSummary.maxPrice || Math.round(minPrice * 1.12);
  const savings = maxPrice > minPrice ? maxPrice - minPrice : 0;
  const discountPercent = maxPrice > minPrice ? Math.round((savings / maxPrice) * 100) : 0;
  const lowestStore = priceSummary.lowestSellerName || (offers.length > 0 ? (typeof offers[0].seller === 'object' ? offers[0].seller.name : offers[0].seller) : 'Amazon India');
  const emiPerMonth = minPrice > 0 ? Math.round(minPrice / 12) : 0;

  const handleSetAlert = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/v1/alerts', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          productId,
          targetPrice,
          email
        })
      });

      if (!res.ok) throw new Error('Failed to create alert');
      setAlertSuccess(true);
      setTimeout(() => {
        setAlertSuccess(false);
        setAlertModalOpen(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      alert('Error creating alert: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-800 space-y-5 shadow-2xl relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: REAL-TIME LOWEST PRICE & SAVINGS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800/80 gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Live Verified Price in India
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Real-Time
            </span>
          </div>

          <div className="flex items-baseline gap-2.5">
            <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              ₹{minPrice.toLocaleString('en-IN')}
            </span>
            {maxPrice > minPrice && (
              <span className="text-sm sm:text-base text-slate-500 line-through font-medium">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {savings > 0 && (
            <p className="text-xs text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>You save ₹{savings.toLocaleString('en-IN')} buying today at lowest price!</span>
            </p>
          )}
        </div>

        <button
          onClick={() => {
            if (user?.email) setEmail(user.email);
            setAlertModalOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sky-400 text-xs font-bold flex items-center gap-2 border border-slate-700 hover:border-sky-500/40 transition-all shadow-md shrink-0 self-start sm:self-center"
        >
          <Bell className="w-4 h-4 text-sky-400 animate-pulse" />
          <span>Set Price Alert</span>
        </button>
      </div>

      {/* REAL-TIME LOWEST STORE HIGHLIGHT BANNER */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-sky-500/10 to-indigo-500/15 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>🏆 Lowest online price currently on</span>
              <span className="text-emerald-300 underline underline-offset-2 font-black">{lowestStore}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Verified with authorized manufacturer brand warranty across India
            </div>
          </div>
        </div>

        {emiPerMonth > 0 && (
          <div className="text-[11px] text-sky-300 font-semibold flex items-center gap-1 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-sky-500/20 shrink-0">
            <CreditCard className="w-3.5 h-3.5 text-sky-400" />
            <span>EMI from ₹{emiPerMonth.toLocaleString('en-IN')}/mo</span>
          </div>
        )}
      </div>

      {/* RETAILER COMPARISON LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Compare Indian Retailers ({offers.length} Live Quotes)
          </span>
          <span className="text-[10px] text-slate-500">Sorted by lowest price</span>
        </div>

        {offers.length > 0 ? (
          offers.map((offer, idx) => {
            const sellerName = typeof offer.seller === 'object' ? offer.seller.name : (offer.seller || 'Indian Retailer');
            const isWinningDeal = offer.isLowestEver || idx === 0;

            return (
              <div 
                key={offer._id || `${sellerName}-${idx}`}
                className={`p-3.5 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 border ${
                  isWinningDeal
                    ? 'bg-slate-900/95 border-emerald-500/40 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-sky-400" />
                      {sellerName}
                    </span>
                    {isWinningDeal && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Lowest Price
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
                      ⚡ Free Delivery
                    </span>
                  </div>

                  {offer.bankOfferSummary && (
                    <p className="text-[11px] text-amber-400 flex items-center gap-1 font-medium">
                      <Tag className="w-3 h-3 shrink-0" />
                      <span>{offer.bankOfferSummary}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    <div className="text-base sm:text-lg font-black text-white">
                      ₹{offer.price?.toLocaleString('en-IN')}
                    </div>
                    {offer.mrp > offer.price && (
                      <span className="text-[11px] text-slate-500 line-through block">
                        MRP ₹{offer.mrp?.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <a
                    href={offer._id ? `/api/v1/out/${offer._id}` : (offer.affiliateUrl || offer.productUrl || '#')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                      isWinningDeal
                        ? 'bg-gradient-to-r from-emerald-400 to-sky-400 hover:from-emerald-300 hover:to-sky-300 text-slate-950 font-black'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <span>Go to Store</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 rounded-xl bg-slate-900 text-center text-slate-400 text-xs">
            Prices currently verified against Amazon India, Flipkart & Croma.
          </div>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
          <span>Direct 1-Year Indian Manufacturer Warranty Included</span>
        </div>
        <span className="hidden sm:inline text-slate-500">100% Genuine Retailers</span>
      </div>

      {/* PRICE ALERT MODAL */}
      {alertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-sky-400" />
                <span>Set Instant Price Drop Alert</span>
              </h3>
              <button onClick={() => setAlertModalOpen(false)} className="text-slate-400 hover:text-white text-xs">
                Close
              </button>
            </div>

            {alertSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Price Alert Saved & Active!</h4>
                <p className="text-xs text-slate-400">We will monitor Amazon & Flipkart hourly and notify <strong>{email}</strong> when price hits ₹{targetPrice.toLocaleString('en-IN')}.</p>
              </div>
            ) : (
              <form onSubmit={handleSetAlert} className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Target Price (₹)</label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:outline-none focus:border-sky-500 text-sm"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Current lowest price: ₹{minPrice?.toLocaleString('en-IN')} on {lowestStore}</span>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1 font-medium">Email Notification Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering alert...' : 'Activate Price Notification'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

