import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  ArrowLeft, 
  Check, 
  AlertCircle, 
  Sparkles, 
  CheckCircle2, 
  Loader2,
  HelpCircle,
  Smartphone,
  Info
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { OrderCustomer } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    grandTotal,
    formatPrice,
    activeCoupon,
    shippingOptions,
    selectedShipping,
    setSelectedShipping,
    placeOrder,
    setActiveView,
    settings,
    updateSettings,
    logEvent
  } = useStore();

  // Contact & Shipping Form
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: 'Jonathan Miller',
    email: 'j.miller@carrycraft.org',
    phone: '+1 (555) 728-1920',
    addressLine1: '840 Industrial Parkway, Suite 4B',
    addressLine2: '',
    city: 'Portland',
    state: 'OR',
    postalCode: '97201',
    country: 'United States'
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'stripe_card' | 'apple_pay' | 'google_pay' | 'paypal'>('stripe_card');
  
  // Card details state
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardZip, setCardZip] = useState('97201');

  // Processing & Simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [show3DSModal, setShow3DSModal] = useState(false);
  const [threeDsCode, setThreeDsCode] = useState('123456');

  // Test cards library
  const testCards = [
    { label: 'Standard Success', number: '4242 4242 4242 4242', desc: 'Valid Visa charge' },
    { label: '3D Secure Auth', number: '4000 0027 6000 3184', desc: 'Triggers 3DS challenge' },
    { label: 'Insufficient Funds', number: '4000 0000 0000 9995', desc: 'Simulates card decline' }
  ];

  const handleFillTestCard = (number: string) => {
    setCardNumber(number);
    setCardExpiry('08/29');
    setCardCvc('314');
    setPaymentError(null);
  };

  const handleFillDemoAddress = () => {
    setCustomer({
      fullName: 'Elena Vance',
      email: 'elena.vance@atelier-edc.com',
      phone: '+1 (555) 349-9210',
      addressLine1: '120 West 28th Street, Fl 9',
      addressLine2: 'Apt 902',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    });
  };

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    // If simulating card decline
    if (cardNumber.replace(/\s/g, '').endsWith('9995')) {
      setIsProcessing(true);
      setProcessingStep('Contacting card issuer via Stripe...');
      setTimeout(() => {
        setIsProcessing(false);
        setPaymentError('Your card was declined: Insufficient Funds. Please use another payment method or test card.');
      }, 1500);
      return;
    }

    // If 3D Secure simulation
    if (cardNumber.replace(/\s/g, '').includes('002760003184')) {
      setShow3DSModal(true);
      return;
    }

    executeOrderFinalization();
  };

  const executeOrderFinalization = () => {
    setIsProcessing(true);
    setProcessingStep('Tokenizing card credentials via Stripe.js...');

    setTimeout(() => {
      setProcessingStep('Creating PaymentIntent ($' + grandTotal + ' USD)...');

      setTimeout(() => {
        setProcessingStep('Verifying PCI-DSS zero-storage compliance...');

        setTimeout(() => {
          setIsProcessing(false);
          placeOrder({
            customer,
            items: cart.map(i => ({
              productId: i.product.id,
              name: i.product.name,
              price: i.product.price,
              quantity: i.quantity,
              image: i.product.images[0],
              sku: i.product.sku
            })),
            subtotal,
            discountTotal: discountAmount,
            couponCode: activeCoupon?.code,
            shippingTotal: shippingCost,
            shippingMethod: selectedShipping.name,
            taxTotal: taxAmount,
            total: grandTotal,
            currency: settings.currency,
            paymentMethod,
            paymentStatus: 'paid',
            fulfillmentStatus: 'processing',
            carrier: 'FedEx Carbon-Neutral'
          });
        }, 800);
      }, 700);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-6 border-b border-stone-800">
          <button
            onClick={() => setActiveView('store')}
            className="flex items-center gap-2 text-xs font-mono text-stone-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier Storefront</span>
          </button>

          {/* Test / Live Toggle Mode */}
          <div className="flex items-center gap-3 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-full text-xs font-mono">
            <span className="flex items-center gap-1.5 text-stone-300">
              <span className={`w-2 h-2 rounded-full ${settings.stripeTestMode ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
              <span>{settings.stripeTestMode ? 'Stripe Test Mode' : 'Stripe Live Mode'}</span>
            </span>
            <button
              onClick={() => updateSettings({ stripeTestMode: !settings.stripeTestMode })}
              className="text-[10px] text-amber-400 underline hover:text-amber-300"
            >
              Switch to {settings.stripeTestMode ? 'Live' : 'Test'}
            </button>
          </div>
        </div>

        {/* Security Banner */}
        <div className="mt-6 bg-stone-900/40 border border-emerald-900/50 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-stone-300">
            <div className="p-2 bg-emerald-950/80 rounded-lg text-emerald-400 border border-emerald-800/60">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-200">PCI-DSS Level 1 Encrypted Terminal</span>
              <p className="text-[11px] text-stone-400">Payment credentials bypass our servers entirely via Stripe Elements tokenization.</p>
            </div>
          </div>
          <span className="font-mono text-[10px] bg-stone-950 text-stone-400 border border-stone-800 px-2.5 py-1 rounded-md">
            Publishable Key: {settings.stripePublishableKey.slice(0, 14)}...
          </span>
        </div>

        {/* Checkout Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left Form: Contact, Shipping, Payment */}
          <form onSubmit={handleProcessPayment} className="lg:col-span-7 space-y-8">
            {/* 1. Customer Contact */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Contact & Dispatch Information</span>
                </h3>
                <button
                  type="button"
                  onClick={handleFillDemoAddress}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-fill Demo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Email for Shipment Tracking *</label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-stone-400 mb-1">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={customer.addressLine1}
                    onChange={(e) => setCustomer({ ...customer, addressLine1: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-400 mb-1">State / Prov *</label>
                    <input
                      type="text"
                      required
                      value={customer.state}
                      onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={customer.postalCode}
                      onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-stone-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Shipping Carrier Selection */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-bold">2</span>
                <span>Select Shipping Logistics</span>
              </h3>

              <div className="space-y-2.5">
                {shippingOptions.map((opt) => {
                  const isSelected = selectedShipping.id === opt.id;
                  const isFree = opt.freeThreshold && subtotal >= opt.freeThreshold;
                  const displayCost = isFree ? 0 : opt.price;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500/60 shadow-sm'
                          : 'bg-stone-950/60 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-400 bg-amber-500' : 'border-stone-700'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-200">{opt.name}</span>
                            <span className="text-[11px] font-mono text-stone-400">({opt.estimatedDays})</span>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">{opt.description}</p>
                        </div>
                      </div>

                      <div className="font-mono font-bold text-stone-200 text-right">
                        {displayCost === 0 ? (
                          <span className="text-emerald-400">FREE</span>
                        ) : (
                          formatPrice(displayCost)
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Gateway Integration */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Payment Gateway & Vault</span>
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>256-Bit TLS</span>
                </span>
              </div>

              {/* Payment Method Switcher Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('stripe_card')}
                  className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1 text-xs transition-colors ${
                    paymentMethod === 'stripe_card'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1 text-xs transition-colors ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1 text-xs transition-colors ${
                    paymentMethod === 'paypal'
                      ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <span className="font-black italic text-xs">PayPal</span>
                  <span>Sandbox</span>
                </button>
              </div>

              {/* Test Card Quick Fill Strip */}
              {paymentMethod === 'stripe_card' && (
                <div className="bg-stone-950 p-3 rounded-xl border border-stone-850 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span className="font-mono flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      Test Card Presets (Click to autofill):
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {testCards.map((tc) => (
                      <button
                        key={tc.label}
                        type="button"
                        onClick={() => handleFillTestCard(tc.number)}
                        className="text-[10px] font-mono bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 px-2.5 py-1 rounded-md transition-colors"
                        title={tc.desc}
                      >
                        {tc.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stripe Elements Mock Card Container */}
              {paymentMethod === 'stripe_card' ? (
                <div className="space-y-3 bg-stone-950 p-4 rounded-xl border border-stone-800">
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                    <span>Card Information</span>
                    <div className="flex gap-1 text-[10px] font-mono text-stone-500">
                      <span>VISA</span> • <span>MC</span> • <span>AMEX</span>
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs font-mono text-stone-100 focus:outline-none focus:border-amber-500 tracking-wider"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 font-mono text-stone-100 focus:outline-none focus:border-amber-500 text-center"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="CVC"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 font-mono text-stone-100 focus:outline-none focus:border-amber-500 text-center"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="ZIP"
                        value={cardZip}
                        onChange={(e) => setCardZip(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 font-mono text-stone-100 focus:outline-none focus:border-amber-500 text-center"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-stone-950 p-6 rounded-xl border border-stone-800 text-center space-y-2">
                  <div className="font-bold text-stone-200 text-sm">
                    {paymentMethod === 'apple_pay' ? 'Apple Pay Express Dispatch' : 'PayPal Sandbox Checkout'}
                  </div>
                  <p className="text-xs text-stone-400">
                    Your shipping and billing information will be authenticated directly through {paymentMethod === 'apple_pay' ? 'Apple Wallet' : 'PayPal'}.
                  </p>
                </div>
              )}

              {/* Error Alert */}
              {paymentError && (
                <div className="p-3 bg-rose-950/70 border border-rose-800 rounded-xl text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Payment Error</span>
                    <span>{paymentError}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing || cart.length === 0}
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{processingStep}</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Pay {formatPrice(grandTotal)}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Right Column: Order Summary & Ledger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-5 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider">
                  Order Summary
                </h3>
                <span className="text-xs font-mono text-stone-400">
                  {cart.length} unique items
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-stone-950 border border-stone-800 shrink-0"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-stone-800 border border-stone-700 text-stone-200 text-[10px] font-mono font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-stone-200 truncate">{item.product.name}</h4>
                        <span className="text-[10px] font-mono text-stone-500">SKU: {item.product.sku}</span>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-stone-200 shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculation Ledger */}
              <div className="space-y-2 text-xs font-mono border-t border-stone-800 pt-4">
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
                  <span>Shipping ({selectedShipping.name.slice(0, 18)}...)</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>

                <div className="flex justify-between text-stone-400">
                  <span>Estimated Tax ({settings.taxRatePercent}%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-stone-100 pt-3 border-t border-stone-800">
                  <span>Total Due</span>
                  <span className="text-amber-400 text-lg font-mono">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Guarantees Box */}
              <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-850 space-y-2 text-[11px] text-stone-400">
                <div className="flex items-center gap-2 text-stone-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>VALENCE Client Protections</span>
                </div>
                <ul className="space-y-1 pl-5 list-disc text-stone-500">
                  <li>30-day unconditioned return privilege</li>
                  <li>Lifetime craftsmanship & materials warranty</li>
                  <li>Real-time automated tracking via SMS/Email</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated 3D Secure Modal */}
      {show3DSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-stone-950/85 backdrop-blur-md" />
          <div className="relative bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-md p-6 z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-stone-100 text-sm font-mono">3D Secure 2.0 Challenge</h3>
              </div>
              <span className="text-xs font-mono text-stone-500">Stripe Simulator</span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Your bank requires two-factor cardholder verification for this purchase of <strong>{formatPrice(grandTotal)}</strong>. Enter the simulated one-time passcode below.
            </p>

            <div>
              <label className="block text-stone-400 text-xs mb-1">Passcode (Pre-filled for test):</label>
              <input
                type="text"
                value={threeDsCode}
                onChange={(e) => setThreeDsCode(e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 text-center font-mono text-lg text-amber-400 tracking-widest focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShow3DSModal(false)}
                className="flex-1 py-2.5 bg-stone-800 text-stone-300 font-medium rounded-xl text-xs hover:bg-stone-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShow3DSModal(false);
                  executeOrderFinalization();
                }}
                className="flex-1 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs hover:bg-amber-400 shadow-md"
              >
                Authorize Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
