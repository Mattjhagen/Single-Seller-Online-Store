export type Category = 
  | 'All' 
  | 'Everyday Carry' 
  | 'Leather & Travel' 
  | 'Audio & Acoustics' 
  | 'Desk & Workspace';

export interface ProductSpecification {
  material: string;
  dimensions: string;
  weight: string;
  warranty: string;
  origin: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  tags: string[];
  inStock: boolean;
  stockCount: number;
  sku: string;
  rating: number;
  reviewCount: number;
  images: string[];
  specifications: ProductSpecification;
  features: string[];
  badge?: 'Bestseller' | 'Limited Edition' | 'Staff Pick' | 'New Arrival' | 'Sale';
  isFeatured?: boolean;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  authorEmail?: string;
  isVerifiedBuyer: boolean;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string;
  helpfulCount: number;
  images?: string[];
  status: 'approved' | 'pending' | 'rejected';
  merchantReply?: {
    text: string;
    date: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15% or 20 for $20
  minSpend: number;
  description: string;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
  usageLimit?: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  freeThreshold?: number;
}

export interface OrderCustomer {
  fullName: string;
  email: string;
  phone?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  discountTotal: number;
  couponCode?: string;
  shippingTotal: number;
  shippingMethod: string;
  taxTotal: number;
  total: number;
  currency: string;
  paymentMethod: 'stripe_card' | 'apple_pay' | 'google_pay' | 'paypal';
  paymentStatus: 'paid' | 'pending' | 'refunded' | 'failed';
  fulfillmentStatus: 'unfulfilled' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  carrier?: string;
  isTestMode: boolean;
  notes?: string;
}

export interface FilterState {
  category: Category;
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  minRating: number;
  selectedTags: string[];
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD';
  stripeTestMode: boolean;
  stripePublishableKey: string;
  gaMeasurementId: string;
  autoApproveReviews: boolean;
  freeShippingThreshold: number;
  standardShippingFee: number;
  taxRatePercent: number; // e.g. 7.5
}
