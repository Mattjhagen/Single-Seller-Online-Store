import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Search, PackageX } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';

export const ProductGrid: React.FC = () => {
  const { filteredProducts, filters, setFilters, resetFilters } = useStore();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortOptions = [
    { label: 'Featured Gear', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating' },
    { label: 'Newest Releases', value: 'newest' }
  ];

  return (
    <section id="store-grid-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-100 tracking-tight flex items-center gap-2">
            <span>The Workshop Collection</span>
            <span className="text-xs font-mono font-normal text-stone-500 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800">
              {filteredProducts.length} items
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
            Aerospace titanium, hand-stitched leather, and calibrated acoustics.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 rounded-xl text-xs font-medium text-stone-200"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span>Filters</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="text-stone-500 hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent text-stone-200 text-xs focus:outline-none cursor-pointer font-medium"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-stone-900 text-stone-200">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(filters.category !== 'All' || filters.selectedTags.length > 0 || filters.searchQuery || filters.inStockOnly || filters.minRating > 0) && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-stone-500 font-mono">Active:</span>

          {filters.category !== 'All' && (
            <span className="bg-stone-900 text-amber-400 border border-stone-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
              Category: {filters.category}
              <button 
                onClick={() => setFilters(prev => ({ ...prev, category: 'All' }))}
                className="hover:text-stone-100 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.searchQuery && (
            <span className="bg-stone-900 text-amber-400 border border-stone-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
              Query: "{filters.searchQuery}"
              <button 
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))}
                className="hover:text-stone-100 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.inStockOnly && (
            <span className="bg-stone-900 text-emerald-400 border border-stone-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
              In Stock Only
              <button 
                onClick={() => setFilters(prev => ({ ...prev, inStockOnly: false }))}
                className="hover:text-stone-100 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="bg-stone-900 text-amber-400 border border-stone-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
              {filters.minRating}★+
              <button 
                onClick={() => setFilters(prev => ({ ...prev, minRating: 0 }))}
                className="hover:text-stone-100 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.selectedTags.map(tag => (
            <span key={tag} className="bg-stone-900 text-stone-300 border border-stone-800 text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
              #{tag}
              <button 
                onClick={() => setFilters(prev => ({ ...prev, selectedTags: prev.selectedTags.filter(t => t !== tag) }))}
                className="hover:text-stone-100 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={resetFilters}
            className="text-xs text-amber-400 hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
        {/* Desktop Sticky Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24 bg-stone-900/40 border border-stone-800/80 rounded-2xl p-5 backdrop-blur-sm">
            <FilterSidebar />
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-stone-900/30 border border-stone-800 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
              <div className="w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center text-stone-500 mx-auto">
                <PackageX className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-stone-200 text-base">No matching artifacts</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                We couldn't find any products matching your specific combination of filters or search terms.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div 
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm animate-in fade-in"
          />
          <div className="relative w-full max-w-xs sm:max-w-sm bg-stone-900 h-full overflow-y-auto z-10 border-l border-stone-800 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-stone-800 flex items-center justify-between">
              <h3 className="font-bold text-stone-100 text-sm font-mono uppercase">Filter Equipment</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <FilterSidebar 
              isMobileModal 
              onCloseMobile={() => setMobileFilterOpen(false)} 
            />
          </div>
        </div>
      )}
    </section>
  );
};
