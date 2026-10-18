import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  Review, 
  CartItem, 
  Coupon, 
  Order, 
  ShippingMethod, 
  StoreSettings, 
  FilterState, 
  Category 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_REVIEWS, 
  INITIAL_COUPONS, 
  SHIPPING_OPTIONS, 
  INITIAL_ORDERS, 
  DEFAULT_STORE_SETTINGS 
} from '../data/mockData';

export interface AnalyticsEvent {
  id: string;
  eventName: string;
  timestamp: string;
  params: Record<string, any>;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'helpfulCount' | 'status'>) => void;
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;
  addMerchantReply: (id: string, replyText: string) => void;
  voteHelpful: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Coupons
  coupons: Coupon[];
  activeCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCouponStatus: (id: string) => void;
  deleteCoupon: (id: string) => void;

  // Shipping
  shippingOptions: ShippingMethod[];
  selectedShipping: ShippingMethod;
  setSelectedShipping: (method: ShippingMethod) => void;

  // Calculations
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  grandTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'isTestMode'>) => Order;
  updateOrderStatus: (orderId: string, paymentStatus: Order['paymentStatus'], fulfillmentStatus: Order['fulfillmentStatus']) => void;
  updateOrderTracking: (orderId: string, trackingNumber: string, carrier: string) => void;
  refundOrder: (orderId: string) => void;

  // Filters & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Settings & Currency
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  formatPrice: (amount: number) => string;
  currencySymbol: string;

  // Analytics
  analyticsEvents: AnalyticsEvent[];
  logEvent: (eventName: string, params?: Record<string, any>) => void;
  clearAnalyticsEvents: () => void;

  // Active views / modals
  activeView: 'store' | 'admin' | 'checkout' | 'order-success';
  setActiveView: (view: 'store' | 'admin' | 'checkout' | 'order-success') => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'valence_products_v1',
  REVIEWS: 'valence_reviews_v1',
  COUPONS: 'valence_coupons_v1',
  ORDERS: 'valence_orders_v1',
  CART: 'valence_cart_v1',
  WISHLIST: 'valence_wishlist_v1',
  SETTINGS: 'valence_settings_v1',
};

const DEFAULT_FILTERS: FilterState = {
  category: 'All',
  minPrice: 0,
  maxPrice: 500,
  inStockOnly: false,
  minRating: 0,
  selectedTags: [],
  searchQuery: '',
  sortBy: 'featured'
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_STORE_SETTINGS;
    } catch {
      return DEFAULT_STORE_SETTINGS;
    }
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [shippingOptions] = useState<ShippingMethod[]>(SHIPPING_OPTIONS);
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_OPTIONS[0]);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeView, setActiveView] = useState<'store' | 'admin' | 'checkout' | 'order-success'>('store');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  // Simulated Google Analytics events log
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([
    {
      id: 'init-evt-1',
      eventName: 'session_start',
      timestamp: new Date().toLocaleTimeString(),
      params: { source: 'direct', platform: 'web' }
    }
  ]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Analytics logger
  const logEvent = (eventName: string, params: Record<string, any> = {}) => {
    const newEvent: AnalyticsEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      eventName,
      timestamp: new Date().toLocaleTimeString(),
      params: {
        ...params,
        measurement_id: settings.gaMeasurementId,
        currency: settings.currency
      }
    };
    setAnalyticsEvents(prev => [newEvent, ...prev.slice(0, 49)]); // keep last 50 events
  };

  const clearAnalyticsEvents = () => {
    setAnalyticsEvents([]);
  };

  // Pricing & currency helper
  const currencySymbol = useMemo(() => {
    switch (settings.currency) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'CAD': return 'CA$';
      default: return '$';
    }
  }, [settings.currency]);

  const currencyRate = useMemo(() => {
    switch (settings.currency) {
      case 'EUR': return 0.92;
      case 'GBP': return 0.78;
      case 'CAD': return 1.36;
      default: return 1.0;
    }
  }, [settings.currency]);

  const formatPrice = (amount: number): string => {
    const converted = amount * currencyRate;
    return `${currencySymbol}${converted.toFixed(2)}`;
  };

  // Cart operations
  const addToCart = (product: Product, quantity: number = 1, selectedColor?: string) => {
    if (!product.inStock || product.stockCount <= 0) return;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, product.stockCount);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          selectedColor: selectedColor || updated[existingIndex].selectedColor
        };
        return updated;
      } else {
        return [...prev, { product, quantity: Math.min(quantity, product.stockCount), selectedColor }];
      }
    });

    logEvent('add_to_cart', {
      item_id: product.id,
      item_name: product.name,
      price: product.price,
      quantity,
      category: product.category
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const item = prev.find(i => i.product.id === productId);
      if (item) {
        logEvent('remove_from_cart', {
          item_id: item.product.id,
          item_name: item.product.name,
          quantity: item.quantity
        });
      }
      return prev.filter(i => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const clampedQty = Math.min(quantity, item.product.stockCount);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
    setCouponError(null);
  };

  // Calculations
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }, [cart]);

  // Discount calculation
  const discountAmount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (subtotal < activeCoupon.minSpend) return 0;
    
    if (activeCoupon.discountType === 'percentage') {
      return (subtotal * activeCoupon.value) / 100;
    } else {
      return Math.min(activeCoupon.value, subtotal);
    }
  }, [activeCoupon, subtotal]);

  // Shipping cost calculation
  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    if (selectedShipping.freeThreshold && subtotal >= selectedShipping.freeThreshold) {
      return 0;
    }
    return selectedShipping.price;
  }, [cart.length, subtotal, selectedShipping]);

  // Tax calculation
  const taxAmount = useMemo(() => {
    const taxableBase = Math.max(0, subtotal - discountAmount);
    return (taxableBase * (settings.taxRatePercent / 100));
  }, [subtotal, discountAmount, settings.taxRatePercent]);

  const grandTotal = useMemo(() => {
    const discounted = Math.max(0, subtotal - discountAmount);
    return +(discounted + shippingCost + taxAmount).toFixed(2);
  }, [subtotal, discountAmount, shippingCost, taxAmount]);

  // Coupon handling
  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const trimmed = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === trimmed && c.isActive);

    if (!found) {
      setCouponError('Invalid or expired promotional code.');
      return false;
    }

    if (new Date(found.expiryDate) < new Date()) {
      setCouponError('This promotional code has expired.');
      return false;
    }

    if (found.usageLimit && found.usageCount >= found.usageLimit) {
      setCouponError('This promotion has reached its maximum redemptions.');
      return false;
    }

    if (subtotal < found.minSpend) {
      setCouponError(`Requires a minimum cart spend of ${formatPrice(found.minSpend)}.`);
      return false;
    }

    setActiveCoupon(found);
    logEvent('apply_coupon', { coupon_code: found.code, discount_type: found.discountType, value: found.value });
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponError(null);
  };

  const addCoupon = (newCoupon: Omit<Coupon, 'id' | 'usageCount'>) => {
    const coupon: Coupon = {
      ...newCoupon,
      id: `coup-${Date.now()}`,
      usageCount: 0
    };
    setCoupons(prev => [coupon, ...prev]);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(prev =>
      prev.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    if (activeCoupon?.id === id) {
      removeCoupon();
    }
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        return prev.filter(id => id !== productId);
      } else {
        logEvent('add_to_wishlist', { item_id: productId });
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // Products CRUD
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0
    };
    setProducts(prev => [newProd, ...prev]);
    logEvent('create_product', { item_id: newProd.id, name: newProd.name, price: newProd.price });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          const inStock = newStock > 0;
          return { ...p, stockCount: Math.max(0, newStock), inStock };
        }
        return p;
      })
    );
  };

  // Reviews
  const recalculateProductRating = (productId: string, currentReviews: Review[]) => {
    const approvedProductReviews = currentReviews.filter(
      r => r.productId === productId && r.status === 'approved'
    );
    if (approvedProductReviews.length === 0) return;
    const avg = approvedProductReviews.reduce((sum, r) => sum + r.rating, 0) / approvedProductReviews.length;
    updateProduct(productId, {
      rating: Number(avg.toFixed(2)),
      reviewCount: approvedProductReviews.length
    });
  };

  const addReview = (newRevData: Omit<Review, 'id' | 'createdAt' | 'helpfulCount' | 'status'>) => {
    const isAutoApproved = settings.autoApproveReviews;
    const newReview: Review = {
      ...newRevData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
      status: isAutoApproved ? 'approved' : 'pending'
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    if (isAutoApproved) {
      recalculateProductRating(newRevData.productId, updatedReviews);
    }

    logEvent('write_review', {
      product_id: newRevData.productId,
      rating: newRevData.rating,
      auto_approved: isAutoApproved
    });
  };

  const approveReview = (id: string) => {
    setReviews(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r);
      const target = updated.find(r => r.id === id);
      if (target) {
        recalculateProductRating(target.productId, updated);
      }
      return updated;
    });
  };

  const rejectReview = (id: string) => {
    setReviews(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r);
      const target = updated.find(r => r.id === id);
      if (target) {
        recalculateProductRating(target.productId, updated);
      }
      return updated;
    });
  };

  const deleteReview = (id: string) => {
    setReviews(prev => {
      const target = prev.find(r => r.id === id);
      const updated = prev.filter(r => r.id !== id);
      if (target) {
        recalculateProductRating(target.productId, updated);
      }
      return updated;
    });
  };

  const addMerchantReply = (id: string, replyText: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === id) {
          return {
            ...r,
            merchantReply: {
              text: replyText,
              date: new Date().toISOString().split('T')[0]
            }
          };
        }
        return r;
      })
    );
  };

  const voteHelpful = (id: string) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)
    );
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'isTestMode'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `VAL-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      isTestMode: settings.stripeTestMode
    };

    // Decrement stock for ordered products
    newOrder.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        updateProductStock(prod.id, prod.stockCount - item.quantity);
      }
    });

    // Increment coupon usage if used
    if (newOrder.couponCode) {
      setCoupons(prev =>
        prev.map(c => c.code === newOrder.couponCode ? { ...c, usageCount: c.usageCount + 1 } : c)
      );
    }

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    logEvent('purchase', {
      transaction_id: newOrder.orderNumber,
      value: newOrder.total,
      currency: newOrder.currency,
      items_count: newOrder.items.length,
      shipping: newOrder.shippingTotal,
      tax: newOrder.taxTotal,
      coupon: newOrder.couponCode || 'none'
    });

    setActiveView('order-success');
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string, 
    paymentStatus: Order['paymentStatus'], 
    fulfillmentStatus: Order['fulfillmentStatus']
  ) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { ...o, paymentStatus, fulfillmentStatus } : o)
    );
  };

  const updateOrderTracking = (orderId: string, trackingNumber: string, carrier: string) => {
    setOrders(prev =>
      prev.map(o => o.id === orderId ? { 
        ...o, 
        trackingNumber, 
        carrier, 
        fulfillmentStatus: 'shipped' 
      } : o)
    );
  };

  const refundOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          // Restock items
          o.items.forEach(item => {
            const prod = products.find(p => p.id === item.productId);
            if (prod) {
              updateProductStock(prod.id, prod.stockCount + item.quantity);
            }
          });
          return { ...o, paymentStatus: 'refunded', fulfillmentStatus: 'processing' };
        }
        return o;
      })
    );
    logEvent('refund', { order_id: orderId });
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Price filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // In-stock only
      if (filters.inStockOnly && (!product.inStock || product.stockCount <= 0)) {
        return false;
      }

      // Minimum rating
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }

      // Selected tags
      if (filters.selectedTags.length > 0) {
        const matchesTags = filters.selectedTags.every(tag => product.tags.includes(tag));
        if (!matchesTags) return false;
      }

      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesTagline = product.tagline.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));

        if (!matchesName && !matchesTagline && !matchesDesc && !matchesSku && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [products, filters]);

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    reviews,
    addReview,
    approveReview,
    rejectReview,
    deleteReview,
    addMerchantReply,
    voteHelpful,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    coupons,
    activeCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    addCoupon,
    toggleCouponStatus,
    deleteCoupon,
    shippingOptions,
    selectedShipping,
    setSelectedShipping,
    cartCount,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    grandTotal,
    wishlist,
    toggleWishlist,
    isWishlisted,
    orders,
    placeOrder,
    updateOrderStatus,
    updateOrderTracking,
    refundOrder,
    filters,
    setFilters,
    resetFilters,
    filteredProducts,
    settings,
    updateSettings,
    formatPrice,
    currencySymbol,
    analyticsEvents,
    logEvent,
    clearAnalyticsEvents,
    activeView,
    setActiveView,
    lastPlacedOrder,
    setLastPlacedOrder,
    selectedProductModal,
    setSelectedProductModal,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
