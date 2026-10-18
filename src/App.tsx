/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/storefront/HeroBanner';
import { ProductGrid } from './components/storefront/ProductGrid';
import { ProductDetailModal } from './components/storefront/ProductDetailModal';
import { CartDrawer } from './components/storefront/CartDrawer';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderSuccessPage } from './components/checkout/OrderSuccessPage';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { activeView } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100">
      <Navbar />

      <main className="flex-1">
        {activeView === 'store' && (
          <>
            <HeroBanner />
            <ProductGrid />
          </>
        )}

        {activeView === 'admin' && <AdminDashboard />}

        {activeView === 'checkout' && <CheckoutPage />}

        {activeView === 'order-success' && <OrderSuccessPage />}
      </main>

      {/* Global Overlays */}
      <ProductDetailModal />
      <CartDrawer />

      {activeView === 'store' && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
