import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  MessageSquare, 
  Tag, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertTriangle, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Truck, 
  RefreshCw, 
  Search, 
  Eye, 
  ShieldCheck, 
  Edit3, 
  FileText, 
  Activity,
  Globe,
  HelpCircle,
  Copy
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, Coupon, Order, Review, Category } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    orders,
    updateOrderStatus,
    updateOrderTracking,
    refundOrder,
    reviews,
    approveReview,
    rejectReview,
    deleteReview,
    addMerchantReply,
    coupons,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    settings,
    updateSettings,
    formatPrice,
    analyticsEvents,
    clearAnalyticsEvents,
    setActiveView
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'reviews' | 'coupons' | 'seo_handover'>('overview');

  // Search & Filters in Admin
  const [productSearch, setProductSearch] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');
  const [reviewFilterStatus, setReviewFilterStatus] = useState<string>('all');

  // Modals state
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [trackingModalOrder, setTrackingModalOrder] = useState<Order | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('');
  const [carrierInput, setCarrierInput] = useState('FedEx');
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(95);
  const [newProdComparePrice, setNewProdComparePrice] = useState<number | undefined>(undefined);
  const [newProdCategory, setNewProdCategory] = useState<Category>('Everyday Carry');
  const [newProdSku, setNewProdSku] = useState('VAL-NEW-01');
  const [newProdStock, setNewProdStock] = useState(15);
  const [newProdImageUrl, setNewProdImageUrl] = useState('https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1200&auto=format&fit=crop');
  const [newProdBadge, setNewProdBadge] = useState<string>('New Arrival');

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponType, setNewCouponType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCouponValue, setNewCouponValue] = useState(15);
  const [newCouponMinSpend, setNewCouponMinSpend] = useState(75);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Overview KPIs
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.total, 0);

  const totalPaidOrders = orders.filter(o => o.paymentStatus === 'paid').length;
  const avgOrderValue = totalPaidOrders > 0 ? totalRevenue / totalPaidOrders : 0;
  const lowStockProducts = products.filter(p => p.stockCount <= 5);
  const pendingReviewsCount = reviews.filter(r => r.status === 'pending').length;

  // Handlers for Add Product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdSku) return;

    addProduct({
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: newProdName,
      tagline: newProdTagline,
      description: newProdDesc,
      price: newProdPrice,
      compareAtPrice: newProdComparePrice,
      category: newProdCategory,
      tags: ['Handcrafted', 'New Release'],
      inStock: newProdStock > 0,
      stockCount: newProdStock,
      sku: newProdSku,
      images: [newProdImageUrl],
      specifications: {
        material: 'Premium Aerospace Spec Materials',
        dimensions: 'Custom dimensions',
        weight: '45g',
        warranty: 'Lifetime Warranty',
        origin: 'Atelier Workshop'
      },
      features: ['Precision engineered', 'Hand-finished edges'],
      badge: (newProdBadge as any) || undefined
    });

    setIsAddProductOpen(false);
    // Reset form
    setNewProdName('');
    setNewProdTagline('');
    setNewProdDesc('');
  };

  // Handler for Add Coupon
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;

    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountType: newCouponType,
      value: newCouponValue,
      minSpend: newCouponMinSpend,
      description: newCouponDesc || `${newCouponValue}${newCouponType === 'percentage' ? '%' : '$'} off orders over $${newCouponMinSpend}`,
      expiryDate: '2027-12-31',
      isActive: true
    });

    setIsAddCouponOpen(false);
    setNewCouponCode('');
  };

  const handleSendMerchantReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    addMerchantReply(reviewId, replyText.trim());
    setReplyingReviewId(null);
    setReplyText('');
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingModalOrder && trackingNumberInput) {
      updateOrderTracking(trackingModalOrder.id, trackingNumberInput, carrierInput);
      setTrackingModalOrder(null);
      setTrackingNumberInput('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Merchant Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-bold font-mono tracking-tight text-stone-100">
                VALENCE Merchant Operations Suite
              </h1>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              Single-seller centralized administration: Inventory, Fulfillment, Reviews Moderation & SEO
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('store')}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>View Customer Storefront</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-800 text-xs font-mono font-medium">
          {[
            { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard },
            { id: 'products', label: `Inventory & Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { 
              id: 'reviews', 
              label: `Reviews Moderation ${pendingReviewsCount > 0 ? `(${pendingReviewsCount} Pending)` : ''}`, 
              icon: MessageSquare,
              badge: pendingReviewsCount > 0
            },
            { id: 'coupons', label: `Coupons & Discounts (${coupons.length})`, icon: Tag },
            { id: 'seo_handover', label: 'SEO, GA4 & Handover', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
                  <span>Gross Sales</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-black font-mono text-stone-100">
                  {formatPrice(totalRevenue)}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+14.2% from prior 30 days</span>
                </div>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
                  <span>Orders Dispatched</span>
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-black font-mono text-stone-100">
                  {orders.length}
                </div>
                <div className="text-[11px] text-stone-400 font-mono">
                  {orders.filter(o => o.fulfillmentStatus === 'shipped').length} shipped • {orders.filter(o => o.fulfillmentStatus === 'processing').length} in prep
                </div>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
                  <span>Average Order Value</span>
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl font-black font-mono text-stone-100">
                  {formatPrice(avgOrderValue)}
                </div>
                <div className="text-[11px] text-stone-400 font-mono">
                  Calculated across verified orders
                </div>
              </div>

              <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-stone-400 text-xs font-mono">
                  <span>Pending Moderation</span>
                  <MessageSquare className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl font-black font-mono text-stone-100">
                  {pendingReviewsCount} reviews
                </div>
                <div className="text-[11px] text-amber-400 font-mono">
                  {pendingReviewsCount > 0 ? 'Requires merchant review' : 'All reviews reviewed'}
                </div>
              </div>
            </div>

            {/* Low Inventory Alert Bar */}
            {lowStockProducts.length > 0 && (
              <div className="bg-amber-950/40 border border-amber-800/60 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold font-mono">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Low Inventory Notice: {lowStockProducts.length} artifacts have 5 or fewer units remaining.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {lowStockProducts.map(p => (
                    <div key={p.id} className="bg-stone-900/80 p-2.5 rounded-xl border border-stone-800 flex items-center justify-between">
                      <span className="font-medium truncate text-stone-200">{p.name}</span>
                      <span className="font-mono text-amber-400 font-bold shrink-0 ml-2">
                        {p.stockCount} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders Overview */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm font-mono text-stone-200 uppercase tracking-wider">
                  Recent Customer Orders
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-amber-400 hover:underline font-mono"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="text-stone-500 border-b border-stone-800 text-[10px] uppercase">
                    <tr>
                      <th className="py-2">Order #</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Fulfillment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} className="hover:bg-stone-900/40">
                        <td className="py-3 font-bold text-amber-400">#{o.orderNumber}</td>
                        <td className="text-stone-300">{o.customer.fullName}</td>
                        <td className="text-stone-400">{o.items.length} units</td>
                        <td className="text-stone-100 font-bold">{formatPrice(o.total)}</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                            o.paymentStatus === 'paid' ? 'bg-emerald-950 text-emerald-400' : 'bg-stone-800 text-stone-300'
                          }`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-stone-800 text-stone-300 uppercase">
                            {o.fulfillmentStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY & PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
                <input
                  type="text"
                  placeholder="Filter inventory by name, SKU..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add New Artifact</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-stone-950/60 text-stone-500 text-[10px] uppercase border-b border-stone-800">
                    <tr>
                      <th className="py-3 px-4">Artifact</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock Units</th>
                      <th>Status</th>
                      <th>Rating</th>
                      <th className="text-right px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800/60">
                    {products
                      .filter(p => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.sku.toLowerCase().includes(productSearch.toLowerCase()))
                      .map(p => (
                        <tr key={p.id} className="hover:bg-stone-900/60 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover bg-stone-950 border border-stone-800 shrink-0"
                            />
                            <div>
                              <div className="font-bold text-stone-200">{p.name}</div>
                              <span className="text-[10px] text-stone-500">SKU: {p.sku}</span>
                            </div>
                          </td>

                          <td className="text-stone-300">{p.category}</td>

                          <td className="text-stone-100 font-bold">
                            {formatPrice(p.price)}
                          </td>

                          <td>
                            {/* Fast stock adjuster */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateProductStock(p.id, p.stockCount - 1)}
                                className="w-5 h-5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 flex items-center justify-center text-xs"
                              >
                                -
                              </button>
                              <span className={`w-8 text-center font-bold ${
                                p.stockCount <= 5 ? 'text-amber-400' : 'text-stone-200'
                              }`}>
                                {p.stockCount}
                              </span>
                              <button
                                onClick={() => updateProductStock(p.id, p.stockCount + 1)}
                                className="w-5 h-5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.inStock
                                ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                                : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                            }`}>
                              {p.inStock ? 'ACTIVE' : 'OUT OF STOCK'}
                            </span>
                          </td>

                          <td className="text-amber-400">
                            ★ {p.rating} ({p.reviewCount})
                          </td>

                          <td className="text-right px-4">
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & FULFILLMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 text-xs font-mono">
                {['all', 'processing', 'shipped', 'delivered', 'refunded'].map(status => (
                  <button
                    key={status}
                    onClick={() => setOrderFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg uppercase text-[11px] transition-colors ${
                      orderFilterStatus === status
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <span className="text-xs font-mono text-stone-500">
                {orders.length} total orders recorded
              </span>
            </div>

            {/* Orders Cards / Table */}
            <div className="space-y-4">
              {orders
                .filter(o => orderFilterStatus === 'all' || o.fulfillmentStatus === orderFilterStatus || o.paymentStatus === orderFilterStatus)
                .map(order => (
                  <div
                    key={order.id}
                    className="bg-stone-900/40 border border-stone-800 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-800 text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-base text-amber-400">#{order.orderNumber}</span>
                        <span className="text-stone-400">{new Date(order.createdAt).toLocaleString()}</span>
                        {order.isTestMode && (
                          <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded">
                            Sandbox Test
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                          order.paymentStatus === 'paid'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : order.paymentStatus === 'refunded'
                            ? 'bg-purple-950 text-purple-400 border border-purple-800'
                            : 'bg-stone-800 text-stone-300'
                        }`}>
                          Payment: {order.paymentStatus}
                        </span>

                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                          order.fulfillmentStatus === 'shipped'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-stone-800 text-stone-300'
                        }`}>
                          Fulfillment: {order.fulfillmentStatus}
                        </span>
                      </div>
                    </div>

                    {/* Customer & Items breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-stone-500 text-[10px] uppercase block">Customer Details</span>
                        <p className="font-bold text-stone-200 mt-1">{order.customer.fullName}</p>
                        <p className="text-stone-400">{order.customer.email}</p>
                        <p className="text-stone-500 text-[11px] mt-1">
                          {order.customer.addressLine1}, {order.customer.city}, {order.customer.state} {order.customer.postalCode}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-stone-500 text-[10px] uppercase block">Purchased Items ({order.items.length})</span>
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-[11px]">
                            <span className="text-stone-300 truncate max-w-[180px]">{it.quantity}x {it.name}</span>
                            <span className="text-stone-400">{formatPrice(it.price * it.quantity)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-1 bg-stone-950/60 p-3 rounded-xl border border-stone-850">
                        <span className="text-stone-500 text-[10px] uppercase block">Settlement Ledger</span>
                        <div className="flex justify-between text-stone-400 text-[11px]">
                          <span>Subtotal:</span>
                          <span>{formatPrice(order.subtotal)}</span>
                        </div>
                        {order.discountTotal > 0 && (
                          <div className="flex justify-between text-emerald-400 text-[11px]">
                            <span>Discount:</span>
                            <span>-{formatPrice(order.discountTotal)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-stone-100 font-bold text-xs pt-1 border-t border-stone-800">
                          <span>Total:</span>
                          <span className="text-amber-400">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Carrier tracking details if shipped */}
                    {order.trackingNumber && (
                      <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-emerald-400" />
                          <span>Carrier: <strong>{order.carrier || 'FedEx'}</strong></span>
                          <span className="text-stone-500">|</span>
                          <span>Tracking: <strong className="text-amber-400">{order.trackingNumber}</strong></span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(order.trackingNumber!)}
                          className="text-[10px] text-stone-400 hover:text-stone-200 flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Copy Tracking</span>
                        </button>
                      </div>
                    )}

                    {/* Admin Order Action Controls */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800/80 text-xs">
                      <div className="flex items-center gap-2">
                        {order.fulfillmentStatus !== 'shipped' && order.paymentStatus !== 'refunded' && (
                          <button
                            onClick={() => {
                              setTrackingModalOrder(order);
                              setTrackingNumberInput(`FDX-${Math.floor(10000000 + Math.random() * 90000000)}-US`);
                            }}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Mark as Shipped & Assign Tracking</span>
                          </button>
                        )}

                        {order.fulfillmentStatus === 'shipped' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'paid', 'delivered')}
                            className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-medium rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark as Delivered</span>
                          </button>
                        )}
                      </div>

                      {order.paymentStatus === 'paid' && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Issue full refund of ${formatPrice(order.total)} to ${order.customer.fullName}? Stock will be replenished.`)) {
                              refundOrder(order.id);
                            }
                          }}
                          className="px-3 py-1.5 bg-stone-950 hover:bg-rose-950/60 border border-stone-800 hover:border-rose-800 text-stone-400 hover:text-rose-400 rounded-lg text-xs font-mono transition-colors"
                        >
                          Issue Full Refund
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS MODERATION MODULE */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider">
                    Client Reviews Moderation Module
                  </h3>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Approve, reject, or post official atelier replies to customer feedback.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-stone-300 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.autoApproveReviews}
                      onChange={(e) => updateSettings({ autoApproveReviews: e.target.checked })}
                      className="accent-amber-500 rounded"
                    />
                    <span>Auto-approve new submissions</span>
                  </label>
                </div>
              </div>

              {/* Moderation Status Tabs */}
              <div className="flex gap-2 text-xs font-mono pt-2 border-t border-stone-800">
                {['all', 'pending', 'approved', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setReviewFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg uppercase text-[11px] transition-colors ${
                      reviewFilterStatus === status
                        ? 'bg-amber-500 text-stone-950 font-bold'
                        : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
                    }`}
                  >
                    {status} {status === 'pending' && pendingReviewsCount > 0 && `(${pendingReviewsCount})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews
                .filter(r => reviewFilterStatus === 'all' || r.status === reviewFilterStatus)
                .map(review => {
                  const targetProduct = products.find(p => p.id === review.productId);

                  return (
                    <div
                      key={review.id}
                      className={`p-5 rounded-2xl border space-y-4 transition-colors ${
                        review.status === 'pending'
                          ? 'bg-amber-950/20 border-amber-800/80'
                          : review.status === 'approved'
                          ? 'bg-stone-900/40 border-stone-800'
                          : 'bg-stone-950/60 border-stone-850 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-200 text-sm">{review.authorName}</span>
                            {review.isVerifiedBuyer && (
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                                Verified Buyer
                              </span>
                            )}
                            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                              review.status === 'approved'
                                ? 'bg-emerald-950 text-emerald-400'
                                : review.status === 'pending'
                                ? 'bg-amber-950 text-amber-400 animate-pulse'
                                : 'bg-rose-950 text-rose-400'
                            }`}>
                              Status: {review.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <span className="text-amber-400 font-bold">★ {review.rating}.0</span>
                            <span className="text-stone-500 font-mono">For artifact:</span>
                            <strong className="text-stone-300">{targetProduct?.name || review.productId}</strong>
                            <span className="text-stone-500 font-mono">({review.createdAt})</span>
                          </div>
                        </div>

                        {/* Quick Moderation Action buttons */}
                        <div className="flex items-center gap-2">
                          {review.status !== 'approved' && (
                            <button
                              onClick={() => approveReview(review.id)}
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold rounded-lg text-xs flex items-center gap-1 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                          )}

                          {review.status !== 'rejected' && (
                            <button
                              onClick={() => rejectReview(review.id)}
                              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-rose-400 font-medium rounded-lg text-xs flex items-center gap-1 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Hide</span>
                            </button>
                          )}

                          <button
                            onClick={() => deleteReview(review.id)}
                            className="p-1.5 text-stone-500 hover:text-rose-400 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h4 className="font-bold text-stone-200 text-sm">"{review.title}"</h4>
                        <p className="text-xs text-stone-300 mt-1 leading-relaxed">{review.comment}</p>
                      </div>

                      {/* Existing Merchant Reply */}
                      {review.merchantReply && (
                        <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 text-xs">
                          <span className="text-[10px] font-mono text-amber-400 block font-bold">
                            Published Atelier Reply ({review.merchantReply.date}):
                          </span>
                          <p className="text-stone-300 mt-0.5 italic">"{review.merchantReply.text}"</p>
                        </div>
                      )}

                      {/* Merchant Reply Form */}
                      {replyingReviewId === review.id ? (
                        <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 space-y-2">
                          <label className="text-[11px] font-mono text-stone-400 block">
                            Compose Official Response:
                          </label>
                          <textarea
                            rows={2}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Thank the customer or explain technical details..."
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                          />
                          <div className="flex justify-end gap-2 text-xs">
                            <button
                              onClick={() => setReplyingReviewId(null)}
                              className="px-3 py-1 text-stone-400 hover:text-stone-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSendMerchantReply(review.id)}
                              className="px-3 py-1 bg-amber-500 text-stone-950 font-bold rounded-lg hover:bg-amber-400"
                            >
                              Publish Reply
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setReplyingReviewId(review.id);
                            setReplyText(review.merchantReply?.text || '');
                          }}
                          className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>{review.merchantReply ? 'Edit Atelier Response' : 'Reply as Merchant'}</span>
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS & PROMOTIONS */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider">
                  Promotional Coupon Campaigns
                </h3>
                <p className="text-xs text-stone-400 mt-0.5">
                  Configure percentage or flat discounts with minimum spend constraints.
                </p>
              </div>

              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map(coupon => (
                <div
                  key={coupon.id}
                  className={`bg-stone-900/50 border rounded-2xl p-5 space-y-3 ${
                    coupon.isActive ? 'border-stone-800' : 'border-stone-850 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-amber-400 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => toggleCouponStatus(coupon.id)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        coupon.isActive ? 'bg-emerald-950 text-emerald-400' : 'bg-stone-800 text-stone-400'
                      }`}
                    >
                      {coupon.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-200 text-xs">
                      {coupon.discountType === 'percentage' ? `${coupon.value}% Discount` : `${formatPrice(coupon.value)} Flat Discount`}
                    </h4>
                    <p className="text-stone-400 text-xs mt-0.5">{coupon.description}</p>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span>Used {coupon.usageCount} times</span>
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="text-stone-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SEO, GA4 & HANDOVER HUB */}
        {activeTab === 'seo_handover' && (
          <div className="space-y-8">
            {/* 1. SEO Configuration & Preview */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider">
                  Search Engine Optimization (SEO) & OpenGraph
                </h3>
              </div>

              {/* Google Search Result Preview */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono text-stone-500 uppercase block mb-1">
                  Google SERP Snippet Preview:
                </span>
                <div className="text-blue-400 hover:underline text-sm font-medium cursor-pointer">
                  VALENCE | Precision Goods & Everyday Carry
                </div>
                <div className="text-emerald-500 text-xs font-mono">
                  https://valence-store.com
                </div>
                <div className="text-stone-400 text-xs leading-relaxed">
                  High-performance direct-to-consumer store for precision EDC, artisan leathercraft, and audiophile gear with advanced filtering, PCI-compliant test checkout...
                </div>
              </div>
            </div>

            {/* 2. Google Analytics 4 (GA4) Debugger */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider">
                    Google Analytics 4 (GA4) Live Event Stream
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={clearAnalyticsEvents}
                    className="text-xs font-mono text-stone-400 hover:text-stone-200"
                  >
                    Clear Stream
                  </button>
                  <span className="text-xs font-mono bg-stone-950 text-emerald-400 border border-emerald-800 px-2.5 py-1 rounded-md">
                    Measurement ID: {settings.gaMeasurementId}
                  </span>
                </div>
              </div>

              {/* Event Stream Log */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 max-h-56 overflow-y-auto space-y-2 font-mono text-xs">
                {analyticsEvents.map(evt => (
                  <div key={evt.id} className="p-2 rounded bg-stone-900 border border-stone-850 flex items-start justify-between gap-2">
                    <div>
                      <span className="font-bold text-amber-400">event: {evt.eventName}</span>
                      <span className="text-stone-400 text-[11px] block mt-0.5">
                        {JSON.stringify(evt.params)}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 shrink-0">{evt.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Documented Handover & Key Configuration Steps */}
            <div className="bg-stone-900/40 border border-stone-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase tracking-wider">
                  Technical Handover Documentation
                </h3>
              </div>

              <div className="prose prose-invert text-xs space-y-3 leading-relaxed text-stone-300">
                <p>
                  This application has been engineered as a high-speed, direct-to-consumer single-seller e-commerce architecture. Below are the key environment configurations for live production rollout:
                </p>

                <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 font-mono text-[11px] space-y-2">
                  <div className="font-bold text-amber-400">Environment Variables Setup (.env):</div>
                  <pre className="text-stone-300">
{`# Stripe Live Gateway (Replace with production keys from Stripe Dashboard)
VITE_STRIPE_PUBLISHABLE_KEY="pk_live_your_actual_key"
STRIPE_SECRET_KEY="sk_live_your_actual_secret"

# Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Application URL
APP_URL="https://valence-store.com"`}
                  </pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-850 space-y-1.5">
                    <h4 className="font-bold text-stone-200">1. PCI Compliance & Tokenization</h4>
                    <p className="text-stone-400 text-[11px]">
                      Credit card data is captured via client-side tokenized components. Card details never hit the Express / Node server, satisfying PCI-DSS SAQ A requirements.
                    </p>
                  </div>

                  <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-850 space-y-1.5">
                    <h4 className="font-bold text-stone-200">2. Review Moderation Protocol</h4>
                    <p className="text-stone-400 text-[11px]">
                      Store admins can toggle 'Auto-approve' in the Reviews Moderation tab or review each client feedback submission manually before it reflects in the star aggregate score.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsAddProductOpen(false)} className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm" />
            <div className="relative bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-lg p-6 z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase">Add New Artifact to Catalog</h3>
                <button onClick={() => setIsAddProductOpen(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="e.g. Apex Field Compass"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-400 mb-1">Price ($) *</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Stock Count *</label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-400 mb-1">Category *</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value as any)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Everyday Carry">Everyday Carry</option>
                      <option value="Leather & Travel">Leather & Travel</option>
                      <option value="Audio & Acoustics">Audio & Acoustics</option>
                      <option value="Desk & Workspace">Desk & Workspace</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">SKU *</label>
                    <input
                      type="text"
                      required
                      value={newProdSku}
                      onChange={(e) => setNewProdSku(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Short Tagline *</label>
                  <input
                    type="text"
                    required
                    value={newProdTagline}
                    onChange={(e) => setNewProdTagline(e.target.value)}
                    placeholder="Brief 1-sentence value proposition"
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Full Description *</label>
                  <textarea
                    rows={3}
                    required
                    value={newProdDesc}
                    onChange={(e) => setNewProdDesc(e.target.value)}
                    placeholder="Detailed craft specifications, materials, engineering tolerances..."
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-4 py-2 text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl hover:bg-amber-400"
                  >
                    Save Artifact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Create Coupon */}
        {isAddCouponOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setIsAddCouponOpen(false)} className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm" />
            <div className="relative bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-md p-6 z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase">Create Promotion Code</h3>
                <button onClick={() => setIsAddCouponOpen(false)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FLASH25"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-mono uppercase focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-stone-400 mb-1">Discount Type</label>
                    <select
                      value={newCouponType}
                      onChange={(e) => setNewCouponType(e.target.value as any)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Dollar ($)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-400 mb-1">Discount Value *</label>
                    <input
                      type="number"
                      required
                      value={newCouponValue}
                      onChange={(e) => setNewCouponValue(Number(e.target.value))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Minimum Cart Spend ($)</label>
                  <input
                    type="number"
                    value={newCouponMinSpend}
                    onChange={(e) => setNewCouponMinSpend(Number(e.target.value))}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-100 font-mono"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddCouponOpen(false)}
                    className="px-4 py-2 text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl hover:bg-amber-400"
                  >
                    Activate Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Assign Carrier & Tracking */}
        {trackingModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div onClick={() => setTrackingModalOrder(null)} className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm" />
            <div className="relative bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-md p-6 z-10 space-y-4 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-bold text-stone-100 text-sm font-mono uppercase">
                  Assign Tracking Number
                </h3>
                <button onClick={() => setTrackingModalOrder(null)} className="text-stone-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveTracking} className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-400 mb-1">Carrier *</label>
                  <select
                    value={carrierInput}
                    onChange={(e) => setCarrierInput(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 text-stone-200"
                  >
                    <option value="FedEx">FedEx Express</option>
                    <option value="USPS Priority">USPS Priority Mail</option>
                    <option value="DHL Express">DHL Express Worldwide</option>
                    <option value="UPS Ground">UPS Carbon Neutral</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 mb-1">Tracking Code *</label>
                  <input
                    type="text"
                    required
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg p-2 font-mono text-amber-400 tracking-wider"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setTrackingModalOrder(null)}
                    className="px-4 py-2 text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 text-stone-950 font-bold rounded-xl hover:bg-amber-400"
                  >
                    Confirm Dispatch
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
