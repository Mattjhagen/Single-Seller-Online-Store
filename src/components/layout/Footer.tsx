import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Award, CheckCircle2, Send, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs sm:text-sm">
      {/* Guarantees Bar */}
      <div className="border-b border-stone-800/80 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-stone-800/80 rounded-lg text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-xs sm:text-sm">Lifetime Craft Warranty</h4>
              <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">Built to outlive trends. Free repair or replacement.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-stone-800/80 rounded-lg text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-xs sm:text-sm">Carbon-Neutral Delivery</h4>
              <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">Free standard shipping over $75. 100% offset emissions.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-stone-800/80 rounded-lg text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-xs sm:text-sm">30-Day Field Trial</h4>
              <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">Carry it daily. If not completely smitten, return free.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-stone-800/80 rounded-lg text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-200 text-xs sm:text-sm">PCI-DSS Level 1 Security</h4>
              <p className="text-stone-400 text-xs mt-0.5 leading-relaxed">Stripe tokenized vaulting. Encrypted end-to-end.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-amber-500 rounded-md flex items-center justify-center text-stone-950 font-bold text-sm">
              V
            </div>
            <span className="font-mono text-base font-bold tracking-widest text-stone-100">
              VALENCE
            </span>
          </div>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            We engineer uncompromising tools for creators, architects, and travelers who value tactile honesty, raw aerospace metals, and full-grain heritage hides.
          </p>

          {/* Newsletter */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-stone-200 mb-2">Join The Workshop Dispatch</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/40 border border-emerald-800/50 p-2.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Check your inbox for code <strong>VALENCE15</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-amber-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </form>
            )}
            <p className="text-[11px] text-stone-500 mt-1.5">No spam. Only limited batch drops and technical field notes.</p>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-3">Collections</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="hover:text-stone-100 cursor-pointer">Titanium Bolt Pens</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Horween Chromexcel Wallets</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Planar Magnetic Audio</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Waxed Canvas Carry</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Modular Desk Workstation</span></li>
          </ul>
        </div>

        {/* Support & Transparency */}
        <div>
          <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-3">Client Care</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="hover:text-stone-100 cursor-pointer">Track Your Package</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Warranty & Repair Submissions</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Leather Care Guide</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Titanium Servicing</span></li>
            <li><span className="hover:text-stone-100 cursor-pointer">Contact Atelier</span></li>
          </ul>
        </div>

        {/* Security & Verification */}
        <div>
          <h4 className="font-semibold text-stone-200 text-xs uppercase tracking-wider mb-3">Compliance</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 text-stone-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>PCI-DSS Level 1 Verified</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              Payments processed securely via Stripe. Credit card credentials bypass our servers entirely via tokenized client components.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-stone-400 text-[10px] font-mono">
              <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">VISA</span>
              <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">MASTERCARD</span>
              <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">AMEX</span>
              <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">STRIPE</span>
              <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">PAYPAL</span>
              <span className="bg-stone-900 px-2 py-1 rounded border border-stone-800">APPLE PAY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div>
          © {new Date().getFullYear()} VALENCE Precision Goods Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-6 text-stone-400 text-xs">
          <span className="hover:text-stone-200 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-stone-200 cursor-pointer">Terms of Service</span>
          <span className="hover:text-stone-200 cursor-pointer">PCI Compliance</span>
          <span className="hover:text-stone-200 cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  );
};
