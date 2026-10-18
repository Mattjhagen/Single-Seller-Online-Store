import React from 'react';
import { SlidersHorizontal, RotateCcw, Check, Star, Tag, DollarSign, Layers } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Category } from '../../types';

interface FilterSidebarProps {
  isMobileModal?: boolean;
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isMobileModal, onCloseMobile }) => {
  const { filters, setFilters, resetFilters, products, formatPrice } = useStore();

  const categories: Category[] = [
    'All',
    'Everyday Carry',
    'Leather & Travel',
    'Audio & Acoustics',
    'Desk & Workspace'
  ];

  // Available tags extracted dynamically from products
  const allTags = Array.from(new Set(products.flatMap(p => p.tags)));

  const handleCategorySelect = (cat: Category) => {
    setFilters(prev => ({ ...prev, category: cat }));
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => {
      const exists = prev.selectedTags.includes(tag);
      return {
        ...prev,
        selectedTags: exists 
          ? prev.selectedTags.filter(t => t !== tag)
          : [...prev.selectedTags, tag]
      };
    });
  };

  const activeFiltersCount = [
    filters.category !== 'All',
    filters.minPrice > 0,
    filters.maxPrice < 500,
    filters.inStockOnly,
    filters.minRating > 0,
    filters.selectedTags.length > 0,
    filters.searchQuery.length > 0
  ].filter(Boolean).length;

  return (
    <div className={`space-y-6 ${isMobileModal ? 'p-6' : 'p-0'}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-stone-100 text-sm tracking-wide uppercase font-mono">
            Refine Equipment
          </h3>
          {activeFiltersCount > 0 && (
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-xs text-stone-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-stone-500" />
          <span>Category</span>
        </label>
        <div className="space-y-1">
          {categories.map((cat) => {
            const count = cat === 'All' 
              ? products.length 
              : products.filter(p => p.category === cat).length;
            const isSelected = filters.category === cat;

            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 font-semibold'
                    : 'text-stone-300 hover:bg-stone-900 hover:text-stone-100'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-amber-500/20 text-amber-300' : 'text-stone-500 bg-stone-900'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3 pt-2 border-t border-stone-850">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-stone-500" />
            <span>Price Range</span>
          </label>
          <span className="text-xs font-mono text-stone-300">
            {formatPrice(filters.minPrice)} – {formatPrice(filters.maxPrice)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
        />

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-stone-500 block mb-1">Min ($)</span>
            <input
              type="number"
              min="0"
              max={filters.maxPrice}
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Math.max(0, Number(e.target.value)) }))}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-stone-200 font-mono focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block mb-1">Max ($)</span>
            <input
              type="number"
              min={filters.minPrice}
              max="500"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Math.min(500, Number(e.target.value)) }))}
              className="w-full bg-stone-900 border border-stone-800 rounded-lg px-2.5 py-1.5 text-stone-200 font-mono focus:outline-none focus:border-amber-500 text-xs"
            />
          </div>
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-2 border-t border-stone-850">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-stone-900 transition-colors">
          <div>
            <span className="text-xs font-medium text-stone-200 block">In-Stock Artifacts Only</span>
            <span className="text-[11px] text-stone-500 block">Hide backordered & sold-out equipment</span>
          </div>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="w-4 h-4 accent-amber-500 bg-stone-900 rounded border-stone-700 cursor-pointer"
          />
        </label>
      </div>

      {/* Star Rating Filter */}
      <div className="space-y-2 pt-2 border-t border-stone-850">
        <label className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-stone-500" />
          <span>Minimum Rating</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5 text-xs">
          {[
            { label: 'All', value: 0 },
            { label: '4.5★+', value: 4.5 },
            { label: '4.8★+', value: 4.8 }
          ].map(r => (
            <button
              key={r.value}
              onClick={() => setFilters(prev => ({ ...prev, minRating: r.value }))}
              className={`py-1.5 px-2 rounded-lg text-center font-mono text-xs transition-colors ${
                filters.minRating === r.value
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tags / Materials Layer */}
      <div className="space-y-2 pt-2 border-t border-stone-850">
        <label className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-stone-500" />
          <span>Materials & Tags</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => {
            const isSelected = filters.selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 font-mono ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50 font-semibold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5" />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile close button */}
      {isMobileModal && (
        <div className="pt-4">
          <button
            onClick={onCloseMobile}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm transition-colors"
          >
            Apply Filters ({products.length} Items)
          </button>
        </div>
      )}
    </div>
  );
};
