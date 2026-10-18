import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Heart, 
  ShoppingBag, 
  Check, 
  Minus, 
  Plus,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ReviewsSection } from './ReviewsSection';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProductModal, 
    setSelectedProductModal, 
    addToCart, 
    formatPrice, 
    toggleWishlist, 
    isWishlisted 
  } = useStore();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
    setAddedSuccess(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProductModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProductModal, setSelectedProductModal]);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedProductModal(null)}
        className="fixed inset-0 bg-stone-950/85 backdrop-blur-md transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto z-10 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Product Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-xs font-mono font-bold px-2.5 py-1 rounded-md uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail navigation */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-amber-500 ring-2 ring-amber-500/20 scale-95'
                        : 'border-stone-800 hover:border-stone-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Purchase Controls & Highlights */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-1">
                <span>{product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight">
                {product.name}
              </h2>

              <p className="text-amber-300/90 text-sm font-medium mt-1">
                {product.tagline}
              </p>

              {/* Star Rating snippet */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating) ? 'fill-amber-400' : 'text-stone-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-stone-200">
                  {product.rating}
                </span>
                <span className="text-xs text-stone-500">
                  ({product.reviewCount} verified reviews)
                </span>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-mono font-black text-stone-100">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm font-mono text-stone-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-stone-400">
                  Taxes calculated at checkout
                </span>
              </div>

              <div>
                {product.inStock ? (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
                    product.stockCount <= 5
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {product.stockCount <= 5 
                      ? `Only ${product.stockCount} Left in Atelier` 
                      : `In Stock (${product.stockCount} ready to ship)`}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-rose-950 text-rose-300 border border-rose-800">
                    Sold Out
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Engineering Features */}
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider block">
                Engineering Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-stone-300">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart button */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center bg-stone-950 border border-stone-800 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || !product.inStock}
                  className="p-2 text-stone-400 hover:text-stone-100 disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-xs text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount || !product.inStock}
                  className="p-2 text-stone-400 hover:text-stone-100 disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-6 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                  !product.inStock
                    ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-emerald-500 text-stone-950 font-black shadow-lg shadow-emerald-500/20'
                    : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/20 hover:scale-[1.01]'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Added to Cart ({quantity})</span>
                  </>
                ) : !product.inStock ? (
                  <span>Out of Stock</span>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • {formatPrice(product.price * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  wishlisted
                    ? 'bg-rose-950/60 border-rose-800 text-rose-400'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-100 hover:border-stone-700'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-400' : ''}`} />
              </button>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800/80 text-[11px] text-stone-400 font-mono">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-stone-500" />
                <span>Ships in 24 hrs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                <span>Lifetime warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>30-day trial</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Table */}
        <div className="mt-10 pt-8 border-t border-stone-800">
          <h3 className="text-sm font-bold text-stone-100 uppercase font-mono tracking-wider mb-4">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">Composition</span>
              <span className="text-stone-200 font-medium mt-0.5 block">{product.specifications.material}</span>
            </div>
            <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">Dimensions</span>
              <span className="text-stone-200 font-medium mt-0.5 block">{product.specifications.dimensions}</span>
            </div>
            <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">Net Mass</span>
              <span className="text-stone-200 font-medium mt-0.5 block">{product.specifications.weight}</span>
            </div>
            <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
              <span className="text-stone-500 block text-[10px] uppercase">Warranty Terms</span>
              <span className="text-stone-200 font-medium mt-0.5 block">{product.specifications.warranty}</span>
            </div>
            <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800 sm:col-span-2">
              <span className="text-stone-500 block text-[10px] uppercase">Provenance & Assembly</span>
              <span className="text-stone-200 font-medium mt-0.5 block">{product.specifications.origin}</span>
            </div>
          </div>
        </div>

        {/* Customer Reviews & Moderated Ratings Module */}
        <ReviewsSection product={product} />
      </div>
    </div>
  );
};
