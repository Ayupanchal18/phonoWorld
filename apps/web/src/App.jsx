import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';
import { CatalogView } from './views/CatalogView.jsx';
import { ProductDetailView } from './views/ProductDetailView.jsx';
import { ComparisonView } from './views/ComparisonView.jsx';
import { PhoneFinderView } from './views/PhoneFinderView.jsx';
import { WishlistView } from './views/WishlistView.jsx';
import { AdminView } from './views/AdminView.jsx';
import { AuthModal } from './components/auth/AuthModal.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes cache
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const [currentView, setCurrentView] = useState('catalog'); // 'catalog' | 'detail' | 'compare' | 'finder' | 'wishlist' | 'admin'
  const [selectedProductSlug, setSelectedProductSlug] = useState('samsung-galaxy-s24-ultra');

  const handleSelectProduct = (slug) => {
    setSelectedProductSlug(slug);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100">
        
        {/* Global Responsive Navigation */}
        <Navbar
          currentView={currentView}
          onViewChange={handleViewChange}
          onSelectProduct={handleSelectProduct}
        />

        {/* Global Auth Modal */}
        <AuthModal />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {currentView === 'catalog' && (
            <CatalogView
              onSelectProduct={handleSelectProduct}
              onViewChange={handleViewChange}
            />
          )}

          {currentView === 'detail' && (
            <ProductDetailView
              slug={selectedProductSlug}
              onBack={() => handleViewChange('catalog')}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentView === 'compare' && (
            <ComparisonView
              onSelectProduct={handleSelectProduct}
              onViewChange={handleViewChange}
            />
          )}

          {currentView === 'finder' && (
            <PhoneFinderView
              onSelectProduct={handleSelectProduct}
            />
          )}

          {currentView === 'wishlist' && (
            <WishlistView
              onSelectProduct={handleSelectProduct}
              onViewChange={handleViewChange}
            />
          )}

          {currentView === 'admin' && (
            <AdminView
              onSelectProduct={handleSelectProduct}
              onViewChange={handleViewChange}
            />
          )}
        </main>

        {/* Footer */}
        <Footer onViewChange={handleViewChange} />

      </div>
    </QueryClientProvider>
  );
}

export default App;
