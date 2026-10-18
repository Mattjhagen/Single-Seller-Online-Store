import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  ShieldCheck, 
  Truck,
  Sparkles,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    grandTotal,
    formatPrice,
    activeCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    setActiveView,
    settings,
    logEvent
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingThreshold = settings.freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyCoupon(promoInput);
    if (success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    logEvent('begin_checkout', {
      value: grandTotal,
      currency: settings.currency,
      items_count: cart.length
    });
    setActiveView('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          {/* Header */}
          <div className="p-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-bold text-stone-100 text-base font-mono uppercase tracking-wide">
                Your Carry Bag
              </h2>
              <span className="text-xs font-mono bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="bg-stone-950/60 px-5 py-3 border-b border-stone-800 text-xs">
            <div className="flex items-center justify-between text-stone-300 mb-1.5">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {amountToFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-semibold">You've unlocked Free Insured Delivery!</span>
                ) : (
                  <span>Add <strong className="text-amber-400">{formatPrice(amountToFreeShipping)}</strong> more for Free Shipping</span>
                )}
              </span>
              <span className="font-mono text-[11px] text-stone-400">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                <div className="w-14 h-14 rounded-2xl bg-stone-800/60 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-stone-300 text-sm">Your carry bag is empty</h3>
                <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                  Discover machined titanium EDC pens, Horween cardholders, or planar monitors engineered for a lifetime.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 px-5 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-stone-950/50 p-3 rounded-2xl border border-stone-800/80 items-center justify-between"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-900 border border-stone-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-stone-100 text-xs truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-[10px] font-mono text-stone-400 block">
                      {formatPrice(item.product.price)} each
                    </span>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-stone-900 border border-stone-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-stone-400 hover:text-stone-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono text-xs text-stone-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockCount}
                          className="p-1 text-stone-400 hover:text-stone-100 disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-500 hover:text-rose-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-mono font-bold text-xs text-stone-100">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-800 bg-stone-950/80 space-y-4">
              {/* Promo Code Input */}
              <div>
                {activeCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-950/50 border border-emerald-800/80 px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono font-bold">{activeCoupon.code}</span>
                      <span className="text-emerald-400/80 font-mono">
                        (-{activeCoupon.discountType === 'percentage' ? `${activeCoupon.value}%` : formatPrice(activeCoupon.value)})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-rose-400 text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-2.5 text-stone-500" />
                      <input
                        type="text"
                        placeholder="Coupon code (e.g. WELCOME10)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-8 pr-3 py-2 text-xs font-mono text-stone-200 uppercase placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-xl border border-stone-700 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1 pl-1">{couponError}</p>
                )}
              </div>

              {/* Subtotal & Totals breakdown */}
              <div className="space-y-1.5 text-xs font-mono border-t border-stone-850 pt-3">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span className="text-stone-200">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({activeCoupon?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>Estimated Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>

                <div className="flex justify-between text-stone-400">
                  <span>Estimated Tax ({settings.taxRatePercent}%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-stone-100 pt-2 border-t border-stone-800">
                  <span>Estimated Total</span>
                  <span className="text-base text-amber-400">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Proceed to PCI-Compliant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Encrypted 256-bit checkout • Stripe Sandbox Ready</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
