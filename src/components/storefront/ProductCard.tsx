import React, { useState } from 'react';
import { Star, Heart, Plus, Check, Eye, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    formatPrice, 
    addToCart, 
    toggleWishlist, 
    isWishlisted, 
    setSelectedProductModal,
    logEvent
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const hasSecondaryImage = product.images.length > 1;
  const currentImage = (isHovered && hasSecondaryImage) ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleOpenDetail = () => {
    logEvent('view_item', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      category: product.category
    });
    setSelectedProductModal(product);
  };

  return (
    <div 
      onClick={handleOpenDetail}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-stone-900/60 border border-stone-800/80 hover:border-amber-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-black/60 cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-stone-950 overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase shadow-md ${
              product.badge === 'Bestseller' 
                ? 'bg-amber-500 text-stone-950' 
                : product.badge === 'Limited Edition'
                ? 'bg-purple-500 text-white'
                : product.badge === 'Staff Pick'
                ? 'bg-emerald-500 text-stone-950'
                : 'bg-stone-800 text-stone-200 border border-stone-700'
            }`}>
              {product.badge}
            </span>
          )}
          {!product.inStock && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-rose-950/90 text-rose-300 border border-rose-800/80">
              Sold Out
            </span>
          )}
          {product.inStock && product.stockCount <= 5 && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60 flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5 text-amber-400" />
              Only {product.stockCount} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-stone-950/70 text-stone-300 hover:text-white hover:bg-stone-950'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Cue */}
        <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="bg-stone-900/90 text-stone-200 border border-stone-700 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-md font-medium shadow-lg">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            Quick Inspect
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 font-mono text-[11px] uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-mono font-semibold text-stone-200">{product.rating}</span>
              <span className="text-[10px] text-stone-500">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-stone-100 text-sm group-hover:text-amber-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold text-stone-100">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-xs text-stone-500 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 block">
              SKU: {product.sku}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !product.inStock
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : justAdded
                ? 'bg-emerald-500 text-stone-950 font-bold'
                : 'bg-stone-800 hover:bg-amber-500 text-stone-200 hover:text-stone-950 border border-stone-700/80 hover:border-amber-400 shadow-sm'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added</span>
              </>
            ) : !product.inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
