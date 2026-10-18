import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Compass } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner: React.FC = () => {
  const { setFilters, setActiveView } = useStore();

  const scrollToProducts = () => {
    setActiveView('store');
    const el = document.getElementById('store-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-900/60 via-stone-950 to-stone-950 border-b border-stone-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-mono font-medium tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>BATCH 04 CRAFT RELEASE NOW AVAILABLE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-100 leading-[1.1]">
              Tools built with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                unforgiving precision.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Machined Grade 5 titanium, hand-stitched Horween Chromexcel leather, and studio planar magnetic acoustics. Engineered to perform for decades.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, category: 'Audio & Acoustics' }));
                  scrollToProducts();
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>Audiophile Gear</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-medium text-stone-200">4.9/5</span>
                <span>(340+ verified buyers)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PCI-DSS Tokenized Stripe Checkout</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Same-day Portland dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Featured Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-stone-900/90 border border-stone-700/80 rounded-2xl p-4 shadow-2xl backdrop-blur-sm group hover:border-amber-500/50 transition-all">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-stone-950">
                <img
                  src="https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200&auto=format&fit=crop"
                  alt="Apex Ti Bolt-Action Pen"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-[11px] font-mono font-bold px-2.5 py-1 rounded-md">
                  FEATURED ARTIFACT
                </div>
                <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-md text-stone-300 text-xs px-2.5 py-1 rounded-md font-mono">
                  Grade 5 Titanium
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-stone-100 text-base">Apex Ti Bolt-Action Pen</h3>
                  <p className="text-xs text-stone-400">Zero-wiggle collet & fluid bolt mechanism</p>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-amber-400 text-base">$98.00</div>
                  <div className="text-[11px] text-stone-500 line-through">$125.00</div>
                </div>
              </div>

              <button
                onClick={scrollToProducts}
                className="w-full mt-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg border border-stone-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View Full Product Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
