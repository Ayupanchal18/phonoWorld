import React, { useState } from 'react';
import { Search, SlidersHorizontal, Scale, Zap, Smartphone, Sparkles, X, ChevronRight, Heart, User, LogOut, ShieldAlert } from 'lucide-react';
import { useCompareStore } from '../../store/compareStore.js';
import { useUserStore } from '../../store/userStore.js';
import { api } from '../../services/api.js';

export function Navbar({ currentView, onViewChange, onSelectProduct }) {
  const { selectedSlugs } = useCompareStore();
  const { user, isLoggedIn, openAuthModal, logout } = useUserStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = async (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const res = await api.search(q);
      setSearchResults(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const selectSearchResult = (slug) => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    if (onSelectProduct) onSelectProduct(slug);
  };

  const wishlistCount = user?.wishlist?.length || 0;

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 bg-[#0b0f19]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <button 
            onClick={() => onViewChange('catalog')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Phono<span className="text-sky-400">World</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 ml-1">IN</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Consumer-Tech Intelligence</p>
            </div>
          </button>

          {/* SEARCH TRIGGER */}
          <div className="flex-1 max-w-md hidden md:block">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-400 text-sm hover:border-sky-500/50 hover:bg-slate-900 transition-all shadow-inner"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-400" />
                <span>Search phones, brands, processors...</span>
              </div>
              <kbd className="px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-slate-800 rounded border border-slate-700">⌘K</kbd>
            </button>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onViewChange('catalog')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'catalog' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Browse</span>
            </button>

            <button
              onClick={() => onViewChange('compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 relative ${
                currentView === 'compare' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-sky-400" />
              <span>Compare</span>
              {selectedSlugs.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-sky-500 text-slate-950 font-bold text-[10px] flex items-center justify-center ml-0.5">
                  {selectedSlugs.length}
                </span>
              )}
            </button>

            <button
              onClick={() => onViewChange('finder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'finder' 
                  ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-indigo-300 border border-indigo-500/40' 
                  : 'text-indigo-300 hover:bg-indigo-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="hidden sm:inline">Phone Finder</span>
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => {
                if (!isLoggedIn) openAuthModal();
                else onViewChange('wishlist');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                currentView === 'wishlist' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-300 hover:text-rose-400 hover:bg-slate-800/60'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'text-rose-400 fill-rose-400' : ''}`} />
              <span className="hidden md:inline">Saved</span>
              {wishlistCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-bold text-[10px]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin CMS Link (Only visible for admin accounts or when viewing admin dashboard) */}
            {(user?.role === 'admin' || currentView === 'admin') && (
              <button
                onClick={() => onViewChange('admin')}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 border ${
                  currentView === 'admin'
                    ? 'bg-gradient-to-r from-amber-500/30 to-orange-500/30 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-amber-300 hover:border-slate-700'
                }`}
                title="Admin CMS & Hardware Ingestion"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden lg:inline">Admin CMS</span>
              </button>
            )}

            {/* User Profile / Auth Button */}
            {isLoggedIn && user ? (
              <div className="flex items-center gap-1 pl-1 border-l border-slate-800">
                <button
                  onClick={() => onViewChange('wishlist')}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-semibold flex items-center gap-1.5 border border-slate-700"
                >
                  <User className="w-3.5 h-3.5 text-sky-400" />
                  <span className="max-w-[80px] truncate hidden lg:inline">{user.name?.split(' ')[0] || 'User'}</span>
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition-colors"
              >
                Sign In
              </button>
            )}

          </nav>
        </div>
      </header>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16">
          <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 border-b border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-sky-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Samsung Galaxy S24, Snapdragon 8 Gen 3, under 25000..."
                className="flex-1 bg-transparent text-white text-base focus:outline-none placeholder:text-slate-500"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 overflow-y-auto flex-1 divide-y divide-slate-800/60">
              {isSearching ? (
                <div className="py-8 text-center text-slate-400 text-sm">Searching catalog...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => selectSearchResult(item.slug)}
                    className="p-3 hover:bg-slate-800/80 rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.featuredImage} alt={item.title} className="w-10 h-10 object-cover rounded-lg bg-slate-800" />
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">{item.title}</h4>
                        <p className="text-xs text-slate-400">₹{item.priceSummary?.minPrice?.toLocaleString('en-IN')} • PhonoScore {item.scores?.overall}/100</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
                  </div>
                ))
              ) : searchQuery ? (
                <div className="py-8 text-center text-slate-400 text-sm">No matching smartphones found.</div>
              ) : (
                <div className="p-4 text-xs text-slate-400 flex flex-col gap-2">
                  <span className="font-semibold text-slate-300">Popular Searches:</span>
                  <div className="flex flex-wrap gap-2">
                    {['Galaxy S24 Ultra', 'OnePlus 12', 'Vivo X100 Pro', 'Lava Agni 3', 'Pixel 8a', 'CMF Phone 1'].map(term => (
                      <button
                        key={term}
                        onClick={() => { setSearchQuery(term); handleSearchChange({ target: { value: term } }); }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
