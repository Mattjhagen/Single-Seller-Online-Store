import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Package, 
  Printer, 
  ArrowRight, 
  Truck, 
  Download, 
  ShieldCheck, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const OrderSuccessPage: React.FC = () => {
  const { lastPlacedOrder, setActiveView, formatPrice } = useStore();

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  if (!lastPlacedOrder) {
    return (
      <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-2">No recent order found</h2>
        <button
          onClick={() => setActiveView('store')}
          className="px-5 py-2.5 bg-amber-500 text-stone-950 font-bold rounded-xl text-xs"
        >
          Return to Storefront
        </button>
      </div>
    );
  }

  const order = lastPlacedOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(order, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `receipt-${order.orderNumber}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/40">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono text-xs">
            <span>PAYMENT SETTLED & VERIFIED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-100">
            Your craftsmanship order is confirmed.
          </h1>

          <p className="text-sm text-stone-400 max-w-md mx-auto leading-relaxed">
            Order <strong className="text-amber-400 font-mono">#{order.orderNumber}</strong> has been assigned to our workshop fulfillment team. An encrypted receipt has been emailed to <strong className="text-stone-200">{order.customer.email}</strong>.
          </p>
        </div>

        {/* Live Milestone Tracker */}
        <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-stone-200 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Fulfillment Pipeline Status</span>
            </span>
            <span className="font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 text-[11px]">
              Processing in Atelier
            </span>
          </div>

          {/* Progress bar steps */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono pt-2">
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-amber-500" />
              <span className="text-amber-400 font-bold block">1. Confirmed</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-stone-200 block">2. In Workshop</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-stone-800" />
              <span className="text-stone-500 block">3. Carrier Dispatch</span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-stone-800" />
              <span className="text-stone-500 block">4. Delivered</span>
            </div>
          </div>
        </div>

        {/* Invoice & Order Summary Card */}
        <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800 text-xs">
            <div>
              <span className="text-stone-500 uppercase tracking-wider block font-mono text-[10px]">Reference Number</span>
              <span className="font-mono font-bold text-base text-amber-400">#{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase tracking-wider block font-mono text-[10px]">Transaction Date</span>
              <span className="font-mono text-stone-200">{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-stone-500 uppercase tracking-wider block font-mono text-[10px]">Payment Settlement</span>
              <span className="font-mono text-stone-200 uppercase">{order.paymentMethod.replace('_', ' ')} (Paid)</span>
            </div>
          </div>

          {/* Delivery & Billing Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-mono text-stone-500 uppercase tracking-wider block text-[10px] mb-1">
                Dispatch Destination
              </span>
              <div className="text-stone-300 space-y-0.5">
                <p className="font-bold text-stone-100">{order.customer.fullName}</p>
                <p>{order.customer.addressLine1}</p>
                {order.customer.addressLine2 && <p>{order.customer.addressLine2}</p>}
                <p>{order.customer.city}, {order.customer.state} {order.customer.postalCode}</p>
                <p>{order.customer.country}</p>
              </div>
            </div>

            <div>
              <span className="font-mono text-stone-500 uppercase tracking-wider block text-[10px] mb-1">
                Selected Shipping Carrier
              </span>
              <div className="text-stone-300 space-y-1">
                <p className="font-bold text-stone-100">{order.shippingMethod}</p>
                <p className="text-stone-400 text-[11px]">Carbon-Neutral Offset Certificate #VAL-CO2-9912</p>
                <p className="text-amber-400 text-[11px] font-mono">Estimated arrival: 2-4 business days</p>
              </div>
            </div>
          </div>

          {/* Itemized Goods */}
          <div className="border-t border-stone-800 pt-6 space-y-3">
            <span className="font-mono text-stone-500 uppercase tracking-wider block text-[10px]">
              Purchased Equipment
            </span>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-950 border border-stone-800"
                    />
                    <div>
                      <h4 className="font-bold text-stone-200">{item.name}</h4>
                      <span className="text-[10px] font-mono text-stone-500">
                        Qty: {item.quantity} × {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-stone-200">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Ledger Calculation */}
          <div className="border-t border-stone-800 pt-4 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-stone-400">
              <span>Subtotal</span>
              <span className="text-stone-200">{formatPrice(order.subtotal)}</span>
            </div>

            {order.discountTotal > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Promotional Discount ({order.couponCode})</span>
                <span>-{formatPrice(order.discountTotal)}</span>
              </div>
            )}

            <div className="flex justify-between text-stone-400">
              <span>Shipping Logistics</span>
              <span>{order.shippingTotal === 0 ? <strong className="text-emerald-400">FREE</strong> : formatPrice(order.shippingTotal)}</span>
            </div>

            <div className="flex justify-between text-stone-400">
              <span>State & Local Tax</span>
              <span>{formatPrice(order.taxTotal)}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-stone-100 pt-3 border-t border-stone-800">
              <span>Total Paid</span>
              <span className="text-amber-400 font-mono text-lg">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Action Buttons: Print, Download, Return */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-800">
            <div className="flex gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-2 bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded-xl text-xs font-mono text-stone-300 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={handleDownloadReceipt}
                className="px-3 py-2 bg-stone-950 hover:bg-stone-800 border border-stone-800 rounded-xl text-xs font-mono text-stone-300 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download JSON</span>
              </button>
            </div>

            <button
              onClick={() => setActiveView('store')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-amber-500/20"
            >
              <span>Back to Storefront</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
