import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  ShieldCheck, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Package, 
  LayoutDashboard,
  Check,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    setIsCartOpen, 
    wishlist, 
    filters, 
    setFilters, 
    activeView, 
    setActiveView, 
    settings, 
    updateSettings,
    currencySymbol
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: ('USD' | 'EUR' | 'GBP' | 'CAD')[] = ['USD', 'EUR', 'GBP', 'CAD'];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800 transition-all">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/50 to-stone-900 border-b border-amber-900/30 text-xs py-1.5 px-4 text-center text-stone-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>
          Complimentary Carbon-Neutral Shipping on orders over $75. Use code <span className="font-mono font-semibold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">WELCOME10</span> for 10% off.
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveView('store')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center text-stone-950 font-bold tracking-tighter text-lg shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <span className="font-mono text-lg font-bold tracking-widest text-stone-100 group-hover:text-amber-400 transition-colors">
                VALENCE
              </span>
              <span className="hidden sm:block text-[10px] tracking-wider text-stone-400 uppercase">
                Precision EDC & Audio
              </span>
            </div>
          </button>

          {/* Quick Categories navigation for desktop */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-stone-400 font-medium">
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'All' }));
                setActiveView('store');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeView === 'store' && filters.category === 'All' 
                  ? 'text-stone-100 bg-stone-900 font-semibold' 
                  : 'hover:text-stone-200'
              }`}
            >
              All Goods
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'Everyday Carry' }));
                setActiveView('store');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeView === 'store' && filters.category === 'Everyday Carry' 
                  ? 'text-stone-100 bg-stone-900 font-semibold' 
                  : 'hover:text-stone-200'
              }`}
            >
              Everyday Carry
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'Leather & Travel' }));
                setActiveView('store');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeView === 'store' && filters.category === 'Leather & Travel' 
                  ? 'text-stone-100 bg-stone-900 font-semibold' 
                  : 'hover:text-stone-200'
              }`}
            >
              Leather
            </button>
            <button 
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'Audio & Acoustics' }));
                setActiveView('store');
              }}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeView === 'store' && filters.category === 'Audio & Acoustics' 
                  ? 'text-stone-100 bg-stone-900 font-semibold' 
                  : 'hover:text-stone-200'
              }`}
            >
              Audio
            </button>
          </nav>
        </div>

        {/* Search bar & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search trigger or input */}
          <div className="relative">
            {isSearchOpen ? (
              <div className="flex items-center bg-stone-900 border border-stone-700 rounded-full px-3 py-1.5 w-48 sm:w-64 animate-in fade-in zoom-in-95 duration-150">
                <Search className="w-4 h-4 text-stone-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search gear, materials..."
                  value={filters.searchQuery}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
                    if (activeView !== 'store') setActiveView('store');
                  }}
                  autoFocus
                  className="bg-transparent text-xs sm:text-sm text-stone-100 focus:outline-none w-full placeholder:text-stone-500"
                />
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    setFilters(prev => ({ ...prev, searchQuery: '' }));
                  }}
                  className="text-stone-400 hover:text-stone-200 ml-1 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setIsSearchOpen(true);
                  if (activeView !== 'store') setActiveView('store');
                }}
                className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-900 rounded-full transition-colors flex items-center gap-1.5 text-xs"
                title="Search Products"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-stone-400">Search</span>
              </button>
            )}
          </div>

          {/* Currency dropdown */}
          <div className="relative">
            <button 
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="px-2.5 py-1.5 text-xs font-mono font-medium text-stone-300 hover:text-stone-100 hover:bg-stone-900 rounded-md transition-colors flex items-center gap-1 border border-stone-800"
            >
              <span>{settings.currency}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>
            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-stone-900 border border-stone-700 rounded-lg shadow-xl py-1 z-50">
                {currencies.map(curr => (
                  <button
                    key={curr}
                    onClick={() => {
                      updateSettings({ currency: curr });
                      setCurrencyDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-mono text-stone-300 hover:bg-stone-800 hover:text-amber-400 flex items-center justify-between"
                  >
                    <span>{curr}</span>
                    {settings.currency === curr && <Check className="w-3 h-3 text-amber-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Indicator */}
          <button
            onClick={() => {
              if (activeView !== 'store') setActiveView('store');
              // Optionally trigger a wishlist filter or notification
            }}
            className="p-2 text-stone-400 hover:text-rose-400 hover:bg-stone-900 rounded-full transition-colors relative"
            title={`Wishlist (${wishlist.length} saved)`}
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 border border-stone-700/80 px-3 py-1.5 rounded-full text-stone-100 transition-all hover:border-amber-500/50 group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-stone-300 group-hover:text-amber-400 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-stone-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-medium">Cart</span>
          </button>

          {/* Admin Switch Button */}
          <div className="border-l border-stone-800 pl-2 sm:pl-3 ml-1">
            <button
              onClick={() => setActiveView(activeView === 'admin' ? 'store' : 'admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'admin'
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-md shadow-amber-500/20'
                  : 'bg-stone-900 text-stone-300 hover:text-stone-100 border border-stone-800 hover:border-stone-700'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {activeView === 'admin' ? 'Storefront' : 'Merchant Admin'}
              </span>
              <span className="sm:hidden">Admin</span>
              {settings.stripeTestMode && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Sandbox Mode" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
