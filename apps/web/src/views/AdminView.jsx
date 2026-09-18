import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ShieldAlert,
  PlusCircle,
  Zap,
  TrendingDown,
  Layers,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Smartphone,
  Eye,
  Tag,
  DollarSign,
  Trash2,
  RefreshCw,
  Sliders,
  Check,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { api } from '../services/api.js';
import { SpecRadar } from '../components/product/SpecRadar.jsx';
import { useUserStore } from '../store/userStore.js';

export function AdminView({ onSelectProduct, onViewChange }) {
  const { user, isLoggedIn, openAuthModal } = useUserStore();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'wizard' | 'override' | 'catalog' | 'sync'
  const [wizardStep, setWizardStep] = useState(1);

  // Strict RBAC Guard: Block non-administrators with visual challenge card
  if (!isLoggedIn || user?.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-amber-500/30 text-center space-y-6 bg-slate-900/90 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Administrator Access Required</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              The PhonoWorld Hardware Ingestion & Sync Engine is restricted to platform administrators. Please authenticate with administrator privileges to proceed.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-left text-xs space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Current Session Status</div>
            <div className="text-slate-200 font-semibold flex items-center justify-between">
              <span>{isLoggedIn ? (user?.name || user?.email) : 'Guest (Unauthenticated)'}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${
                user?.role === 'admin'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}>
                ROLE: {user?.role ? user.role.toUpperCase() : 'NONE'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={openAuthModal}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Sign In as Administrator</span>
            </button>
            <button
              onClick={() => onViewChange('catalog')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 transition-colors"
            >
              Return to Hardware Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Sync state & mutations
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);

  const { data: syncStatusResponse, refetch: refetchSyncStatus } = useQuery({
    queryKey: ['sync-status'],
    queryFn: () => api.getSyncStatus(),
    refetchInterval: 12000
  });

  const syncStatus = syncStatusResponse?.data || {
    isRunning: false,
    intervalMinutes: 60,
    lastRun: null,
    totalTrackedProducts: 11,
    activeAlertsCount: 1,
    recentLogs: []
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    setSyncResult(null);
    try {
      const res = await api.triggerPriceSync();
      setSyncResult({ type: 'success', text: res.message || 'Price sync completed successfully!', data: res.data });
      queryClient.invalidateQueries(['all-products-admin']);
      queryClient.invalidateQueries(['admin-stats']);
      refetchStats();
      refetchProducts();
      refetchSyncStatus();
    } catch (err) {
      setSyncResult({ type: 'error', text: err.message || 'Failed to trigger price sync' });
    } finally {
      setIsSyncing(false);
    }
  };

  const [isResetting, setIsResetting] = useState(false);

  const handleResetPrices = async () => {
    setIsResetting(true);
    setSyncResult(null);
    try {
      const res = await api.resetSyncPrices();
      setSyncResult({ type: 'success', text: res.message || 'All catalog device prices restored to official benchmark baseline.' });
      queryClient.invalidateQueries(['all-products-admin']);
      queryClient.invalidateQueries(['admin-stats']);
      refetchStats();
      refetchProducts();
      refetchSyncStatus();
    } catch (err) {
      setSyncResult({ type: 'error', text: err.message || 'Failed to reset prices' });
    } finally {
      setIsResetting(false);
    }
  };

  // Cache Telemetry & Purge State
  const [isClearingCache, setIsClearingCache] = useState(false);
  const [cacheClearMsg, setCacheClearMsg] = useState(null);

  const { data: cacheStatsResponse, refetch: refetchCacheStats } = useQuery({
    queryKey: ['cache-stats'],
    queryFn: () => api.getCacheStats(),
    refetchInterval: 8000
  });

  const cacheStats = cacheStatsResponse?.data || {
    mode: 'IN_MEMORY_LRU',
    hitRatioPercent: 0,
    totalHits: 0,
    totalMisses: 0,
    totalSets: 0,
    totalFlushes: 0,
    activeKeysCount: 0,
    defaultTtlSeconds: 600
  };

  const handleClearCache = async () => {
    setIsClearingCache(true);
    setCacheClearMsg(null);
    try {
      const res = await api.clearCache();
      setCacheClearMsg({ type: 'success', text: res.message || 'Catalog edge cache purged!' });
      refetchCacheStats();
      setTimeout(() => setCacheClearMsg(null), 3500);
    } catch (err) {
      setCacheClearMsg({ type: 'error', text: err.message });
    } finally {
      setIsClearingCache(false);
    }
  };

  // Retailer Adapter & Scraper test state
  const [testingPaapi, setTestingPaapi] = useState(false);
  const [paapiResult, setPaapiResult] = useState(null);
  const [testingScraper, setTestingScraper] = useState(false);
  const [scraperResult, setScraperResult] = useState(null);

  const handleTestPaapi = async () => {
    setTestingPaapi(true);
    setPaapiResult(null);
    try {
      const res = await api.testPaapi('B0CX1PD14Q');
      setPaapiResult({ type: 'success', data: res.data });
    } catch (err) {
      setPaapiResult({ type: 'error', error: err.message });
    } finally {
      setTestingPaapi(false);
    }
  };

  const handleTestScraper = async () => {
    setTestingScraper(true);
    setScraperResult(null);
    try {
      const res = await api.testScraper('https://www.croma.com/searchB?q=s24+ultra', 'croma');
      setScraperResult({ type: 'success', data: res.data });
    } catch (err) {
      setScraperResult({ type: 'error', error: err.message });
    } finally {
      setTestingScraper(false);
    }
  };

  // Festive Price Override state
  const [overrideProductId, setOverrideProductId] = useState('');
  const [overridePrice, setOverridePrice] = useState('');
  const [overrideSeller, setOverrideSeller] = useState('Amazon India');
  const [overrideEvent, setOverrideEvent] = useState('Great Indian Festival Sale');
  const [overrideSuccess, setOverrideSuccess] = useState(null);

  // Ingestion Wizard Form State
  const [formData, setFormData] = useState({
    // Product
    title: '',
    brand: 'brand_samsung',
    releaseDate: new Date().toISOString().split('T')[0],
    featuredImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    summary: '',
    pros: '',
    cons: '',
    minPrice: 49999,
    maxPrice: 54999,
    // Display
    screenSizeInches: 6.7,
    resolution: '2772 x 1240 pixels (1.5K)',
    panelType: 'AMOLED',
    refreshRateHz: 120,
    peakBrightnessNits: 2600,
    pwmDimmingHz: 2160,
    // Hardware
    chipset: 'Snapdragon 8 Gen 3 (4nm)',
    antutuScore: 1850000,
    ramGb: 12,
    storageGb: 256,
    // Camera
    primaryMp: 50,
    primarySensor: 'Sony LYT-808 (1/1.4")',
    hasOis: true,
    telephotoZoom: '3x Optical Periscope',
    selfieMp: 32,
    // Battery & 5G
    capacityMah: 5000,
    fastChargingWatts: 100,
    hasWirelessCharging: true,
    chargerInBox: true,
    selectedBands: ['n1', 'n3', 'n5', 'n8', 'n28', 'n40', 'n77', 'n78'],
    // Offers
    sellerName: 'Amazon India',
    bankOfferName: 'HDFC Bank Credit Cards',
    bankDiscountAmount: 3000
  });

  const [liveScores, setLiveScores] = useState({
    overall: 88,
    performance: 92,
    display: 90,
    camera: 89,
    battery: 87,
    software: 88,
    build: 86,
    value: 84
  });

  // Fetch admin stats
  const { data: statsResponse, isLoading: isStatsLoading, refetch: refetchStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => api.getAdminStats()
  });

  // Fetch all brands
  const { data: brandsResponse } = useQuery({
    queryKey: ['brands'],
    queryFn: () => api.getBrands()
  });

  // Fetch all products for quick selection
  const { data: productsResponse, refetch: refetchProducts } = useQuery({
    queryKey: ['all-products-admin'],
    queryFn: () => api.getProducts({ limit: 100 })
  });

  const stats = statsResponse?.data || {
    totalProducts: 11,
    activeProducts: 11,
    brandsCount: 16,
    avgScore: 86,
    totalOffers: 22,
    totalReviews: 8,
    totalAlerts: 4
  };

  const brands = brandsResponse?.data || [];
  const products = productsResponse?.data || [];

  // Live score calculator on form changes
  useEffect(() => {
    const spec = {
      display: {
        screenSizeInches: Number(formData.screenSizeInches),
        refreshRateHz: Number(formData.refreshRateHz),
        panelType: formData.panelType
      },
      hardware: {
        antutuScore: Number(formData.antutuScore),
        chipset: formData.chipset
      },
      rearCamera: {
        primaryMp: Number(formData.primaryMp),
        hasOis: formData.hasOis
      },
      battery: {
        capacityMah: Number(formData.capacityMah),
        fastChargingWatts: Number(formData.fastChargingWatts),
        hasWirelessCharging: formData.hasWirelessCharging,
        chargerInBox: formData.chargerInBox
      },
      connectivity: {
        has5G: formData.selectedBands.length > 0,
        bands5GCount: formData.selectedBands.length
      }
    };

    api.previewNormalization({ specification: spec, price: Number(formData.minPrice) })
      .then(res => {
        if (res.data?.calculatedScores) {
          setLiveScores(res.data.calculatedScores);
        }
      })
      .catch(() => {});
  }, [
    formData.screenSizeInches,
    formData.refreshRateHz,
    formData.panelType,
    formData.antutuScore,
    formData.primaryMp,
    formData.hasOis,
    formData.capacityMah,
    formData.fastChargingWatts,
    formData.hasWirelessCharging,
    formData.chargerInBox,
    formData.selectedBands,
    formData.minPrice
  ]);

  // Handle Form Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const toggleBand = (band) => {
    setFormData(prev => {
      const exists = prev.selectedBands.includes(band);
      return {
        ...prev,
        selectedBands: exists
          ? prev.selectedBands.filter(b => b !== band)
          : [...prev.selectedBands, band]
      };
    });
  };

  // Submit Ingest Mutation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const handleIngestSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const payload = {
      product: {
        _id: `prod_${slug.replace(/-/g, '_')}`,
        title: formData.title,
        slug,
        brand: formData.brand,
        category: 'smartphones',
        releaseDate: formData.releaseDate,
        featuredImage: formData.featuredImage,
        galleryImages: [formData.featuredImage],
        summary: formData.summary || `Flagship smartphone powered by ${formData.chipset} with ${formData.primaryMp}MP camera and ${formData.capacityMah}mAh battery.`,
        pros: formData.pros.split('\n').filter(p => p.trim().length > 0),
        cons: formData.cons.split('\n').filter(c => c.trim().length > 0),
        priceSummary: {
          minPrice: Number(formData.minPrice),
          maxPrice: Number(formData.maxPrice || formData.minPrice * 1.1),
          hasDeals: true,
          lowestSellerName: formData.sellerName,
          discountPercentMax: Math.round(((formData.maxPrice - formData.minPrice) / formData.maxPrice) * 100) || 5
        },
        viewCount: 150,
        isActive: true
      },
      specification: {
        _id: `spec_${slug.replace(/-/g, '_')}`,
        display: {
          screenSizeInches: Number(formData.screenSizeInches),
          resolution: formData.resolution,
          panelType: formData.panelType,
          refreshRateHz: Number(formData.refreshRateHz),
          peakBrightnessNits: Number(formData.peakBrightnessNits),
          pwmDimmingHz: Number(formData.pwmDimmingHz)
        },
        hardware: {
          chipset: formData.chipset,
          antutuScore: Number(formData.antutuScore),
          ramType: 'LPDDR5X',
          storageType: 'UFS 4.0'
        },
        rearCamera: {
          primaryMp: Number(formData.primaryMp),
          primarySensor: formData.primarySensor,
          hasOis: formData.hasOis,
          setup: `${formData.primaryMp}MP + 50MP + 50MP`,
          opticalZoom: formData.telephotoZoom
        },
        frontCamera: {
          mp: Number(formData.selfieMp),
          videoRecording: '4K @ 60fps'
        },
        battery: {
          capacityMah: Number(formData.capacityMah),
          fastChargingWatts: Number(formData.fastChargingWatts),
          hasWirelessCharging: formData.hasWirelessCharging,
          chargerInBox: formData.chargerInBox
        },
        connectivity: {
          has5G: formData.selectedBands.length > 0,
          bands5G: formData.selectedBands,
          wifi: 'Wi-Fi 7 (802.11be)',
          bluetooth: '5.4',
          nfc: true
        }
      },
      variants: [
        {
          _id: `var_${slug.replace(/-/g, '_')}_default`,
          name: `${formData.ramGb}GB RAM + ${formData.storageGb}GB Storage`,
          slug: `${slug}-${formData.ramGb}gb-${formData.storageGb}gb`,
          ramGb: Number(formData.ramGb),
          storageGb: Number(formData.storageGb),
          colorName: 'Titanium Black',
          colorHex: '#1e293b',
          isDefault: true,
          isActive: true
        }
      ],
      offers: [
        {
          _id: `off_${slug.replace(/-/g, '_')}_amazon`,
          seller: 'seller_amazon_in',
          sellerName: formData.sellerName,
          price: Number(formData.minPrice),
          mrp: Number(formData.maxPrice),
          discountPercent: Math.round(((formData.maxPrice - formData.minPrice) / formData.maxPrice) * 100) || 5,
          affiliateUrl: 'https://amazon.in/dp/example',
          bankOffers: [
            {
              bankName: 'HDFC Bank',
              cardType: 'Credit Card EMI',
              discountAmount: Number(formData.bankDiscountAmount),
              description: `Instant ₹${formData.bankDiscountAmount} discount with ${formData.bankOfferName}`
            }
          ],
          inStock: true
        }
      ]
    };

    try {
      const result = await api.createProduct(payload);
      setSubmitMessage({ type: 'success', text: result.message || 'Smartphone ingested successfully!' });
      queryClient.invalidateQueries(['all-products-admin']);
      queryClient.invalidateQueries(['admin-stats']);
      queryClient.invalidateQueries(['products']);
      refetchStats();
      refetchProducts();
      setWizardStep(1);
    } catch (err) {
      setSubmitMessage({ type: 'error', text: err.message || 'Failed to ingest smartphone' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1-Click Price Override Handler
  const handlePriceOverride = async (e) => {
    e.preventDefault();
    if (!overrideProductId || !overridePrice) return;

    try {
      const res = await api.overrideFestivePrice({
        productId: overrideProductId,
        newPrice: Number(overridePrice),
        sellerName: overrideSeller,
        eventName: overrideEvent
      });

      setOverrideSuccess(`Successfully overridden! New price: ₹${Number(overridePrice).toLocaleString('en-IN')} with new point recorded in PriceHistory.`);
      queryClient.invalidateQueries(['all-products-admin']);
      queryClient.invalidateQueries(['admin-stats']);
      refetchStats();
      refetchProducts();
    } catch (err) {
      setOverrideSuccess(`Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-16">
      
      {/* ADMIN HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-cyan-500/20 text-sky-400 border border-sky-500/30">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                PhonoWorld Admin CMS
              </h1>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Staff Control
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live hardware ingestion, atomic spec normalizer, and festive flash sale price overrides.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-bold self-start sm:self-auto">
          {[
            { id: 'dashboard', label: 'Overview', icon: Layers },
            { id: 'wizard', label: 'Ingest Smartphone', icon: PlusCircle },
            { id: 'override', label: 'Festive Flash Override', icon: Zap },
            { id: 'sync', label: 'Price Sync Engine', icon: RefreshCw },
            { id: 'catalog', label: 'Catalog Table', icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-black shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DASHBOARD OVERVIEW */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* STATS TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1 bg-slate-900/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Smartphones
              </span>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {stats.totalProducts}
              </div>
              <span className="text-[10px] text-emerald-400 font-bold block">
                {stats.activeProducts} Active in Catalog
              </span>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1 bg-slate-900/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Registered Brands
              </span>
              <div className="text-2xl sm:text-3xl font-black text-sky-400">
                {stats.brandsCount}
              </div>
              <span className="text-[10px] text-slate-400 block">
                Indian Market Leaders
              </span>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1 bg-slate-900/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Average PhonoScore
              </span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">
                {stats.avgScore}<span className="text-xs text-slate-500">/100</span>
              </div>
              <span className="text-[10px] text-slate-400 block">
                Dynamic 8-Axis Average
              </span>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-1 bg-slate-900/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Price Alerts
              </span>
              <div className="text-2xl sm:text-3xl font-black text-purple-400">
                {stats.totalAlerts}
              </div>
              <span className="text-[10px] text-purple-400 font-bold block">
                Monitoring Amazon & Flipkart
              </span>
            </div>

          </div>

          {/* QUICK ACTIONS & RECENT PRODUCTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Quick Actions Panel */}
            <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">
                Admin Quick Actions
              </h3>
              
              <div className="space-y-2.5">
                <button
                  onClick={() => {
                    setActiveTab('wizard');
                    setWizardStep(1);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 font-bold text-xs flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <PlusCircle className="w-4 h-4 text-sky-400" />
                    <span>Launch Ingestion Wizard</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('override')}
                  className="w-full p-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Trigger Festive Price Dip</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('catalog')}
                  className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-xs flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Database className="w-4 h-4 text-slate-400" />
                    <span>Manage All Smartphone Records</span>
                  </div>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Catalog Overview Preview */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Live Catalog Snapshot
                </h3>
                <span className="text-xs text-slate-400">11 of 11 verified</span>
              </div>

              <div className="divide-y divide-slate-800">
                {products.slice(0, 5).map(prod => (
                  <div key={prod._id} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.featuredImage}
                        alt={prod.title}
                        className="w-10 h-10 object-contain rounded-lg bg-slate-950 p-1 border border-slate-800"
                      />
                      <div>
                        <div className="font-bold text-white text-xs hover:text-sky-400 cursor-pointer" onClick={() => onSelectProduct(prod.slug)}>
                          {prod.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          ₹{prod.priceSummary?.minPrice?.toLocaleString('en-IN')} • PhonoScore: <span className="text-sky-400 font-bold">{prod.scores?.overall}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setOverrideProductId(prod._id);
                          setOverridePrice(String(Math.round(prod.priceSummary.minPrice * 0.92)));
                          setActiveTab('override');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30 hover:bg-amber-500/30"
                      >
                        Override Price
                      </button>
                      <button
                        onClick={() => onSelectProduct(prod.slug)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                        title="View PDP"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: MULTI-STEP INGESTION WIZARD */}
      {activeTab === 'wizard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Ingestion Form */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 bg-slate-900/80">
            
            {/* Step Progress Pills */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              {[
                { step: 1, label: 'General' },
                { step: 2, label: 'Display' },
                { step: 3, label: 'Hardware' },
                { step: 4, label: 'Camera' },
                { step: 5, label: 'Battery & 5G' },
                { step: 6, label: 'Pricing' }
              ].map(s => (
                <button
                  key={s.step}
                  onClick={() => setWizardStep(s.step)}
                  className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
                    wizardStep === s.step
                      ? 'text-sky-400'
                      : wizardStep > s.step
                      ? 'text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${
                    wizardStep === s.step
                      ? 'bg-sky-500 text-slate-950 shadow-md'
                      : wizardStep > s.step
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {wizardStep > s.step ? '✓' : s.step}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            {submitMessage && (
              <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                submitMessage.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {submitMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{submitMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleIngestSubmit} className="space-y-6 text-xs">
              
              {/* STEP 1: GENERAL */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Step 1: General & Brand Metadata</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Smartphone Title *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Nothing Phone (2a) Plus"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Brand Manufacturer *</label>
                      <select
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold focus:outline-none focus:border-sky-500"
                      >
                        {brands.map(b => (
                          <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Featured Image URL</label>
                    <input
                      type="url"
                      name="featuredImage"
                      value={formData.featuredImage}
                      onChange={handleChange}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1">Editorial Summary</label>
                    <textarea
                      name="summary"
                      rows="2"
                      value={formData.summary}
                      onChange={handleChange}
                      placeholder="Brief overview of the device, market positioning, and key selling propositions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-emerald-400 mb-1">Key Strengths (1 per line)</label>
                      <textarea
                        name="pros"
                        rows="3"
                        value={formData.pros}
                        onChange={handleChange}
                        placeholder="Class-leading AMOLED display&#10;Flagship Dimensity 7350 Pro chipset&#10;Unique transparent Glyph interface"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-rose-400 mb-1">Things to Consider (1 per line)</label>
                      <textarea
                        name="cons"
                        rows="3"
                        value={formData.cons}
                        onChange={handleChange}
                        placeholder="Plastic frame chassis&#10;No charger in the retail box"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: DISPLAY */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Step 2: Display & Screen Technology</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Screen Size (Inches)</label>
                      <input
                        type="number"
                        step="0.01"
                        name="screenSizeInches"
                        value={formData.screenSizeInches}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Panel Type</label>
                      <select
                        name="panelType"
                        value={formData.panelType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      >
                        <option value="Dynamic LTPO AMOLED 2X">Dynamic LTPO AMOLED 2X</option>
                        <option value="Super AMOLED">Super AMOLED</option>
                        <option value="AMOLED">AMOLED</option>
                        <option value="Curved pOLED">Curved pOLED</option>
                        <option value="IPS LCD">IPS LCD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Refresh Rate (Hz)</label>
                      <input
                        type="number"
                        name="refreshRateHz"
                        value={formData.refreshRateHz}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Peak Brightness (Nits)</label>
                      <input
                        type="number"
                        name="peakBrightnessNits"
                        value={formData.peakBrightnessNits}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">PWM Dimming (Hz)</label>
                      <input
                        type="number"
                        name="pwmDimmingHz"
                        value={formData.pwmDimmingHz}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Resolution String</label>
                      <input
                        type="text"
                        name="resolution"
                        value={formData.resolution}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: HARDWARE */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Step 3: Hardware & Performance</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">SoC / Processor Chipset</label>
                      <input
                        type="text"
                        name="chipset"
                        value={formData.chipset}
                        onChange={handleChange}
                        placeholder="e.g. MediaTek Dimensity 7350 Pro (4nm)"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">AnTuTu v10 Benchmark Score</label>
                      <input
                        type="number"
                        name="antutuScore"
                        value={formData.antutuScore}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Base RAM (GB)</label>
                      <input
                        type="number"
                        name="ramGb"
                        value={formData.ramGb}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Base Storage (GB)</label>
                      <input
                        type="number"
                        name="storageGb"
                        value={formData.storageGb}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CAMERA */}
              {wizardStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Step 4: Camera System</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Primary Camera (MP)</label>
                      <input
                        type="number"
                        name="primaryMp"
                        value={formData.primaryMp}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Sensor Model</label>
                      <input
                        type="text"
                        name="primarySensor"
                        value={formData.primarySensor}
                        onChange={handleChange}
                        placeholder="e.g. Sony LYT-808 (1/1.4)"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Front Selfie (MP)</label>
                      <input
                        type="number"
                        name="selfieMp"
                        value={formData.selfieMp}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Telephoto Optical Zoom</label>
                      <input
                        type="text"
                        name="telephotoZoom"
                        value={formData.telephotoZoom}
                        onChange={handleChange}
                        placeholder="e.g. 3x Optical Periscope"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="hasOis"
                        name="hasOis"
                        checked={formData.hasOis}
                        onChange={handleChange}
                        className="w-4 h-4 rounded text-sky-500 bg-slate-950 border-slate-800"
                      />
                      <label htmlFor="hasOis" className="font-bold text-slate-200">
                        Hardware Optical Image Stabilization (OIS) Present
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: BATTERY & 5G */}
              {wizardStep === 5 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Step 5: Battery, Charging & Indian 5G Bands</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Battery Capacity (mAh)</label>
                      <input
                        type="number"
                        name="capacityMah"
                        value={formData.capacityMah}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Wired Charging (Watts)</label>
                      <input
                        type="number"
                        name="fastChargingWatts"
                        value={formData.fastChargingWatts}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div className="flex flex-col gap-2 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="chargerInBox"
                          checked={formData.chargerInBox}
                          onChange={handleChange}
                          className="w-4 h-4 rounded text-sky-500"
                        />
                        <span className="font-bold text-slate-300">Charging Adapter in Box</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="hasWirelessCharging"
                          checked={formData.hasWirelessCharging}
                          onChange={handleChange}
                          className="w-4 h-4 rounded text-sky-500"
                        />
                        <span className="font-bold text-slate-300">Wireless Qi Charging</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-2">
                      Certified Indian 5G Bands ({formData.selectedBands.length} Selected)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['n1', 'n3', 'n5', 'n8', 'n20', 'n28', 'n38', 'n40', 'n41', 'n77', 'n78'].map(band => (
                        <button
                          type="button"
                          key={band}
                          onClick={() => toggleBand(band)}
                          className={`px-3 py-1 rounded-xl font-mono text-xs font-bold border transition-all ${
                            formData.selectedBands.includes(band)
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm'
                              : 'bg-slate-950 text-slate-500 border-slate-800 hover:text-slate-300'
                          }`}
                        >
                          {band}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: PRICING */}
              {wizardStep === 6 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">Step 6: Launch Pricing & Retailer Offers</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Launch Retail Price (₹) *</label>
                      <input
                        type="number"
                        name="minPrice"
                        value={formData.minPrice}
                        onChange={handleChange}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-black text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Launch MRP / Sticker Price (₹)</label>
                      <input
                        type="number"
                        name="maxPrice"
                        value={formData.maxPrice}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Primary Seller</label>
                      <input
                        type="text"
                        name="sellerName"
                        value={formData.sellerName}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1">Instant Bank Discount (₹)</label>
                      <input
                        type="number"
                        name="bankDiscountAmount"
                        value={formData.bankDiscountAmount}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* WIZARD NAVIGATION BUTTONS */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  disabled={wizardStep === 1}
                  onClick={() => setWizardStep(prev => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {wizardStep < 6 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(prev => Math.min(6, prev + 1))}
                    className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.title}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black flex items-center gap-2 shadow-lg hover:opacity-95 disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isSubmitting ? 'Ingesting...' : 'Commit Smartphone to Catalog'}</span>
                  </button>
                )}
              </div>

            </form>

          </div>

          {/* Real-time Normalizer Preview Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    Live PhonoScore Preview
                  </h4>
                </div>
                <span className="text-xs font-black text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded-md border border-sky-500/30">
                  {liveScores.overall}/100
                </span>
              </div>

              {/* Spider Benchmark Radar */}
              <div className="p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
                <SpecRadar scores={liveScores} />
              </div>

              {/* Real-time calculated sub-score grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Performance</span>
                  <span className="font-bold text-sky-400">{liveScores.performance}/100</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Camera System</span>
                  <span className="font-bold text-emerald-400">{liveScores.camera}/100</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Display Quality</span>
                  <span className="font-bold text-amber-400">{liveScores.display}/100</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Value for Money</span>
                  <span className="font-bold text-purple-400">{liveScores.value}/100</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 text-center">
                Scores recalculate automatically as you modify hardware parameters.
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: 1-CLICK FESTIVE PRICE OVERRIDE */}
      {activeTab === 'override' && (
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 bg-slate-900/80">
          
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Festive Flash Sale Price Override</h3>
              <p className="text-xs text-slate-400">
                Trigger real-time price drops for Big Billion Days / Great Indian Festival and auto-log price history points.
              </p>
            </div>
          </div>

          {overrideSuccess && (
            <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              overrideSuccess.startsWith('Error')
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{overrideSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePriceOverride} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Select Smartphone</label>
              <select
                value={overrideProductId}
                onChange={(e) => {
                  setOverrideProductId(e.target.value);
                  const selected = products.find(p => p._id === e.target.value);
                  if (selected) {
                    setOverridePrice(String(Math.round(selected.priceSummary.minPrice * 0.92)));
                  }
                }}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
              >
                <option value="">-- Choose Smartphone --</option>
                {products.map(p => (
                  <option key={p._id} value={p._id}>
                    {p.title} (Current: ₹{p.priceSummary?.minPrice?.toLocaleString('en-IN')})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">New Flash Sale Price (₹) *</label>
                <input
                  type="number"
                  value={overridePrice}
                  onChange={(e) => setOverridePrice(e.target.value)}
                  placeholder="e.g. 119999"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-black text-sm focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">Seller / Retailer Platform</label>
                <select
                  value={overrideSeller}
                  onChange={(e) => setOverrideSeller(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                >
                  <option value="Amazon India">Amazon India</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Croma">Croma Retail</option>
                  <option value="Brand Official Store">Brand Official Store</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">Festive Event Name / Reason for Drop</label>
              <input
                type="text"
                value={overrideEvent}
                onChange={(e) => setOverrideEvent(e.target.value)}
                placeholder="e.g. Great Indian Festival Lightning Deal"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-center gap-2.5">
              <Zap className="w-4 h-4 shrink-0" />
              <span>
                Applying this override will immediately append a verified milestone entry to the interactive Price History Graph and notify all registered price drop alerts.
              </span>
            </div>

            <button
              type="submit"
              disabled={!overrideProductId || !overridePrice}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-sm shadow-lg hover:opacity-90 disabled:opacity-40"
            >
              Apply Flash Price Override & Sync History
            </button>
          </form>

        </div>
      )}

      {/* TAB 4: CATALOG TABLE */}
      {activeTab === 'catalog' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-black text-white">All Smartphone Records</h3>
              <p className="text-xs text-slate-400">{products.length} models actively maintained</p>
            </div>
            <button
              onClick={() => {
                setActiveTab('wizard');
                setWizardStep(1);
              }}
              className="px-3.5 py-2 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Ingest New</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3 font-bold">Smartphone</th>
                  <th className="pb-3 font-bold">Current Price</th>
                  <th className="pb-3 font-bold">PhonoScore</th>
                  <th className="pb-3 font-bold">Status</th>
                  <th className="pb-3 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {products.map(p => (
                  <tr key={p._id} className="hover:bg-slate-800/30">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.featuredImage}
                          alt={p.title}
                          className="w-9 h-9 object-contain rounded-lg bg-slate-950 p-1 border border-slate-800"
                        />
                        <div>
                          <div className="font-bold text-white hover:text-sky-400 cursor-pointer" onClick={() => onSelectProduct(p.slug)}>
                            {p.title}
                          </div>
                          <div className="text-[10px] text-slate-500">{p.modelNumber || p.slug}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 font-bold text-white">
                      ₹{p.priceSummary?.minPrice?.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {p.scores?.overall}/100
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        p.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td className="py-3.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          setOverrideProductId(p._id);
                          setOverridePrice(String(Math.round(p.priceSummary.minPrice * 0.92)));
                          setActiveTab('override');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-[10px] border border-amber-500/30"
                      >
                        Override Price
                      </button>
                      <button
                        onClick={() => onSelectProduct(p.slug)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[10px] font-bold border border-slate-700"
                      >
                        View PDP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: AUTOMATED PRICE INGESTION & SYNC MONITOR */}
      {activeTab === 'sync' && (
        <div className="space-y-6">
          
          {/* Sync Header & Health Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  <RefreshCw className={`w-6 h-6 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-white">Automated Price Ingestion Engine</h3>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Active / Polling
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Continuous sync pipeline for Amazon India PA-API, Flipkart & Croma retailer product feeds.
                  </p>
                </div>
              </div>

              {/* Sync Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={handleResetPrices}
                  disabled={isResetting || isSyncing}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:text-white disabled:opacity-50 transition-all"
                  title="Reset all products back to official factory launch benchmark pricing"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin text-amber-400' : 'text-slate-400'}`} />
                  <span>{isResetting ? 'Resetting Baseline...' : 'Reset to Benchmark Prices'}</span>
                </button>

                <button
                  onClick={handleTriggerSync}
                  disabled={isSyncing || isResetting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Synchronizing Catalog...' : 'Trigger Instant Price Sync'}</span>
                </button>
              </div>
            </div>

            {/* Industry Outlier Protection Notice */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-950/40 border border-sky-800/40 text-[11px] text-sky-300">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                <strong>Multi-Layer Outlier Rejection Active:</strong> Dynamic ±15% volatility circuit breaker, category price floors & accessory keyword filters prevent rogue discounts and accessory mismatches.
              </span>
            </div>

            {/* Sync Results Alert */}
            {syncResult && (
              <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                syncResult.type === 'success'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{syncResult.text}</span>
              </div>
            )}

            {/* Sync Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                <span className="text-sm font-black text-emerald-400 mt-0.5 block">
                  {syncStatus.isRunning || isSyncing ? 'Running Sync...' : 'Idle / Scheduled'}
                </span>
                <span className="text-[10px] text-slate-500 block">Every {syncStatus.intervalMinutes} mins</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Tracked Models</span>
                <span className="text-sm font-black text-white mt-0.5 block">
                  {syncStatus.totalTrackedProducts} Smartphones
                </span>
                <span className="text-[10px] text-slate-500 block">Multi-Retailer SKUs</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Last Execution</span>
                <span className="text-sm font-black text-sky-400 mt-0.5 block truncate">
                  {syncStatus.lastRun ? `${syncStatus.lastRun.durationMs}ms` : 'Just now'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {syncStatus.lastRun?.timestamp ? new Date(syncStatus.lastRun.timestamp).toLocaleTimeString() : 'Recent'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Alerts</span>
                <span className="text-sm font-black text-purple-400 mt-0.5 block">
                  {syncStatus.activeAlertsCount} Price Drops
                </span>
                <span className="text-[10px] text-slate-500 block">Auto-Dispatch Enabled</span>
              </div>
            </div>
          </div>

          {/* RETAILER INGESTION ADAPTERS & AFFILIATE PIPELINE */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-5 bg-slate-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Production Retailer Adapters & Affiliate Tracking Engine</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  AWS v4 signed PA-API queries, dynamic Cuelinks sub-ID redirects, and Indian store fallback scrapers.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Total Clicks: {syncStatus.clickStats?.totalClicks || 0}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              
              {/* Card 1: Amazon PA-API 5.0 */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Amazon PA-API 5.0</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {syncStatus.adapters?.amazonPaapi?.mode || 'ACTIVE'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    HMAC-SHA256 AWS Signature Version 4. Fetches real-time ASIN buy-box prices & deal tags.
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5">
                    <div>Tag: <span className="text-slate-300 font-mono">{syncStatus.adapters?.amazonPaapi?.associateTag || 'phonoworld-21'}</span></div>
                    <div>Host: <span className="text-slate-300 font-mono">{syncStatus.adapters?.amazonPaapi?.host || 'webservices.amazon.in'}</span></div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <button
                    onClick={handleTestPaapi}
                    disabled={testingPaapi}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs border border-slate-700 transition-colors disabled:opacity-50"
                  >
                    {testingPaapi ? 'Signing & Querying...' : 'Test PA-API Connection'}
                  </button>

                  {paapiResult && (
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px]">
                      {paapiResult.type === 'success' ? (
                        <div className="text-emerald-400">
                          ✓ Verified: ₹{paapiResult.data?.data?.price?.toLocaleString('en-IN')} ({paapiResult.data?.mode})
                        </div>
                      ) : (
                        <div className="text-rose-400">✗ Error: {paapiResult.error}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Card 2: Cuelinks / EarnKaro Feed */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Affiliate Deep-Linker</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Cuelinks & EarnKaro
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Automated 302 outbound routing via <code className="text-sky-400 text-[10px]">/api/v1/out/:offerId</code>. Injects publisher sub-IDs for click attribution.
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5">
                    <div>Network: <span className="text-slate-300 font-mono">{syncStatus.adapters?.affiliateFeed?.network || 'cuelinks'}</span></div>
                    <div>Publisher ID: <span className="text-slate-300 font-mono">{syncStatus.adapters?.affiliateFeed?.publisherId || '114820'}</span></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-400">
                  <div className="flex justify-between py-0.5">
                    <span>Logged Outbound Clicks:</span>
                    <span className="font-bold text-white">{syncStatus.clickStats?.totalClicks || 0}</span>
                  </div>
                  <div className="text-[9px] text-slate-500">Auto-tracks User-Agent, IP & Target Seller</div>
                </div>
              </div>

              {/* Card 3: Fallback Retailer Scraper */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Fallback Retailer Scraper</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      Rotating Headers
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    HTTP DOM & regex extractor with rotating desktop user agents and backoff for stores without public APIs.
                  </p>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5">
                    <div>Stores: <span className="text-slate-300 font-mono">Croma, Reliance, Vijay Sales</span></div>
                    <div>Timeout: <span className="text-slate-300 font-mono">6000ms max with backoff</span></div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-900">
                  <button
                    onClick={handleTestScraper}
                    disabled={testingScraper}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-400 font-bold text-xs border border-slate-700 transition-colors disabled:opacity-50"
                  >
                    {testingScraper ? 'Parsing Retailer DOM...' : 'Test Scraper on Croma'}
                  </button>

                  {scraperResult && (
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-[10px]">
                      {scraperResult.type === 'success' ? (
                        <div className="text-emerald-400">
                          ✓ Scraped: ₹{scraperResult.data?.data?.price?.toLocaleString('en-IN')} ({scraperResult.data?.data?.source})
                        </div>
                      ) : (
                        <div className="text-rose-400">✗ Error: {scraperResult.error}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* EDGE CACHING & PERFORMANCE TELEMETRY */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-white">Edge Caching & Performance Layer</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {cacheStats.mode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Sub-5ms response acceleration for catalog queries with automatic invalidation.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cacheClearMsg && (
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                    cacheClearMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {cacheClearMsg.text}
                  </span>
                )}
                <button
                  onClick={handleClearCache}
                  disabled={isClearingCache}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isClearingCache ? 'Purging Cache...' : 'Purge Catalog Cache'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-1">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Hit Ratio</span>
                <span className="text-base font-black text-emerald-400 mt-0.5 block">{cacheStats.hitRatioPercent}%</span>
                <span className="text-[10px] text-slate-500 block">Efficiency</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Hits</span>
                <span className="text-base font-black text-white mt-0.5 block">{cacheStats.totalHits}</span>
                <span className="text-[10px] text-slate-500 block">Sub-5ms Hits</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cache Misses</span>
                <span className="text-base font-black text-amber-400 mt-0.5 block">{cacheStats.totalMisses}</span>
                <span className="text-[10px] text-slate-500 block">DB Reads</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cached Keys</span>
                <span className="text-base font-black text-sky-400 mt-0.5 block">{cacheStats.activeKeysCount}</span>
                <span className="text-[10px] text-slate-500 block">Active TTL Entries</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Default TTL</span>
                <span className="text-base font-black text-purple-400 mt-0.5 block">{cacheStats.defaultTtlSeconds}s</span>
                <span className="text-[10px] text-slate-500 block">10 Min Window</span>
              </div>
            </div>
          </div>

          {/* Sync Audit Stream & Price Movement Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Recent Price Drops & Fluctuations Table */}
            <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60">
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>Live Detected Price Changes</span>
              </h4>

              {syncResult?.data?.changes && syncResult.data.changes.length > 0 ? (
                <div className="divide-y divide-slate-800 text-xs">
                  {syncResult.data.changes.map((chg, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-white">{chg.title}</div>
                        <div className="text-[10px] text-slate-400">{chg.seller} • Recorded on-chain</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹{chg.newPrice.toLocaleString('en-IN')}</div>
                        <div className={`text-[10px] font-bold ${chg.delta < 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                          {chg.delta < 0 ? `-${Math.abs(chg.delta).toLocaleString('en-IN')} (Price Drop)` : `+₹${chg.delta.toLocaleString('en-IN')}`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400/60 mx-auto" />
                  <p>All catalog smartphone prices are synchronized with live market feeds.</p>
                </div>
              )}
            </div>

            {/* Sync Engine Log Stream */}
            <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 bg-slate-900/60 font-mono text-[11px]">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-white uppercase tracking-wider">Sync Log Stream</h4>
                <span className="text-[10px] text-slate-500">Auto-refreshing</span>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 pr-1 divide-y divide-slate-800/40">
                {syncStatus.recentLogs && syncStatus.recentLogs.map((lg) => (
                  <div key={lg.id} className="pt-2 text-slate-400 space-y-0.5">
                    <div className="flex items-center justify-between text-[9px] text-slate-500">
                      <span>{new Date(lg.timestamp).toLocaleTimeString()}</span>
                      <span className={`uppercase font-bold ${
                        lg.level === 'error' ? 'text-rose-400' : lg.level === 'warn' ? 'text-amber-400' : 'text-sky-400'
                      }`}>{lg.level}</span>
                    </div>
                    <div className="text-slate-300">{lg.message}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
