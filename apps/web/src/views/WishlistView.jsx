import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Heart, Bell, Trash2, Scale, ExternalLink, ArrowRight, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useUserStore } from '../store/userStore.js';
import { useCompareStore } from '../store/compareStore.js';
import { ProductCard } from '../components/product/ProductCard.jsx';

export function WishlistView({ onSelectProduct, onViewChange }) {
  const { user, isLoggedIn, openAuthModal, toggleWishlistId, token } = useUserStore();
  const { addSlug } = useCompareStore();
  const [activeTab, setActiveTab] = useState('wishlist'); // 'wishlist' | 'alerts'
  const [simulatedAlert, setSimulatedAlert] = useState(null);

  // Fetch Wishlisted Products
  const { data: wishlistData, isLoading: wishLoading, refetch: refetchWish } = useQuery({
    queryKey: ['user-wishlist', user?.wishlist],
    queryFn: async () => {
      const res = await fetch('/api/v1/user/wishlist', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!isLoggedIn && !!token
  });

  // Fetch Price Alerts
  const { data: alertsData, isLoading: alertLoading, refetch: refetchAlerts } = useQuery({
    queryKey: ['user-alerts', user?.email],
    queryFn: async () => {
      const res = await fetch('/api/v1/alerts', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.json();
    },
    enabled: !!isLoggedIn
  });

  const wishlistedProducts = wishlistData?.data || [];
  const activeAlerts = alertsData?.data || [];

  const handleSimulatePriceDrop = (alert) => {
    setSimulatedAlert(alert);
    setTimeout(() => {
      setSimulatedAlert(null);
    }, 4000);
  };

  if (!isLoggedIn) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center max-w-lg mx-auto space-y-4 border border-slate-800">
        <Heart className="w-12 h-12 text-rose-400 mx-auto" />
        <h2 className="text-xl font-bold text-white">Save & Track Your Favorite Smartphones</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Sign in to access your personal wishlist, compare saved devices, and receive instant email notifications when prices drop across Amazon and Flipkart.
        </p>
        <button
          onClick={openAuthModal}
          className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
        >
          Sign In to PhonoWorld
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-sky-400 uppercase">User Dashboard</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">{user?.email}</span>
          </div>
          <h1 className="text-2xl font-black text-white">
            Saved Phones & Price Drop Alerts
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'wishlist' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Wishlist ({wishlistedProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'alerts' ? 'bg-sky-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Active Alerts ({activeAlerts.length})</span>
          </button>
        </div>
      </div>

      {/* SIMULATED NOTIFICATION BANNER */}
      {simulatedAlert && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-white text-xs flex items-center justify-between gap-4 animate-slideDown shadow-lg">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
            <div>
              <span className="font-bold block text-sm">🎉 Price Drop Email Triggered!</span>
              <p className="text-emerald-200">
                Transactional alert dispatched to <strong>{simulatedAlert.email}</strong> for <strong>{simulatedAlert.productTitle}</strong> reaching target ₹{simulatedAlert.targetPrice?.toLocaleString('en-IN')}.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST TAB */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishLoading ? (
            <div className="py-16 text-center text-slate-400 text-sm">Loading your saved devices...</div>
          ) : wishlistedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistedProducts.map((product) => (
                <div key={product._id} className="relative group">
                  <ProductCard
                    product={product}
                    onSelect={onSelectProduct}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlistId(product._id);
                    }}
                    className="absolute top-3 left-3 z-10 p-2 rounded-xl bg-slate-900/80 text-rose-400 hover:bg-rose-500 hover:text-white border border-slate-700 transition-colors shadow-md backdrop-blur-md"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
              <Heart className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Your Wishlist is Empty</h3>
              <p className="text-xs text-slate-400">Click the heart icon on any phone card to track it here.</p>
              <button
                onClick={() => onViewChange('catalog')}
                className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs"
              >
                Browse All Smartphones
              </button>
            </div>
          )}
        </div>
      )}

      {/* ALERTS TAB */}
      {activeTab === 'alerts' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Configured email price alerts monitored by PhonoWorld workers</span>
            <span className="text-emerald-400 font-semibold">● 24/7 Price Sync Active</span>
          </div>

          {activeAlerts.length > 0 ? (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div
                  key={alert._id}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/70"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0">
                      <Bell className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{alert.productTitle || 'Samsung Galaxy S24 Ultra 5G'}</h4>
                      <p className="text-xs text-slate-400">
                        Target Price: <strong className="text-emerald-400">₹{alert.targetPrice?.toLocaleString('en-IN')}</strong> • Notification sent to {alert.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => handleSimulatePriceDrop(alert)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Test Trigger Alert</span>
                    </button>

                    <button
                      onClick={async () => {
                        await fetch(`/api/v1/alerts/${alert._id}`, { method: 'DELETE' });
                        refetchAlerts();
                      }}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
                      title="Cancel Alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-3">
              <Bell className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Active Price Alerts</h3>
              <p className="text-xs text-slate-400">Click "Price Alert" on any phone detail page to set up target thresholds.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
