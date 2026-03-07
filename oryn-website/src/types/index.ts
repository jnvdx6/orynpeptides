// User types
export interface User {
  id: string;
  email: string;
  password: string; // hashed
  firstName: string;
  lastName: string;
  organization?: string;
  phone?: string;
  role: 'customer' | 'admin';
  referralCode: string; // unique code for this user
  referredBy?: string; // referral code of who referred them
  referralTree: string[]; // chain of referrer IDs up to 5 levels
  totalEarnings: number;
  availableBalance: number;
  createdAt: string;
  isActive: boolean;
}

// Order types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'crypto';
export type PaymentStatus = 'pending' | 'confirmed' | 'failed' | 'expired';
export type CryptoCurrency = 'BTC' | 'ETH' | 'USDT' | 'SOL';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CryptoPayment {
  currency: CryptoCurrency;
  walletAddress: string;
  amount: number; // in crypto
  amountEur: number; // original EUR amount
  txHash?: string;
  expiresAt: string;
}

export interface Order {
  id: string;
  ref: string; // ORY-XXXXX
  userId: string;
  items: OrderItem[];
  shipping: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  cryptoPayment?: CryptoPayment;
  referralCode?: string; // if a referral code was used at checkout
  commissionsGenerated: boolean;
  createdAt: string;
  updatedAt: string;
}

// Commission types
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled';

export interface Commission {
  id: string;
  orderId: string;
  orderRef: string;
  beneficiaryId: string; // user who earns this
  sourceUserId: string; // user who made the purchase
  level: number; // 1-5 (1 = direct referral)
  percentage: number;
  amount: number;
  status: CommissionStatus;
  createdAt: string;
  paidAt?: string;
}

// Referral tree node
export interface ReferralNode {
  userId: string;
  userName: string;
  email: string;
  referralCode: string;
  level: number;
  totalReferrals: number;
  totalEarnings: number;
  joinedAt: string;
  children: ReferralNode[];
}

// Admin dashboard stats
export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalReferrals: number;
  pendingOrders: number;
  cryptoPayments: number;
  pendingCommissions: number;
  revenueByDay: { date: string; amount: number }[];
  topProducts: { name: string; sales: number; revenue: number }[];
  recentOrders: Order[];
  referralStats: {
    totalActive: number;
    totalCommissionsPaid: number;
    averageChainLength: number;
  };
}

// Admin settings
export interface AdminSettings {
  commissionRates: {
    level1: number; // e.g., 10%
    level2: number; // e.g., 5%
    level3: number; // e.g., 3%
    level4: number; // e.g., 2%
    level5: number; // e.g., 1%
  };
  cryptoEnabled: boolean;
  cryptoWallets: {
    BTC: string;
    ETH: string;
    USDT: string;
    SOL: string;
  };
  cryptoDiscount: number; // percentage discount for crypto payments
  minPayoutAmount: number; // minimum EUR to request payout
  autoApproveCommissions: boolean;
  shippingRates: {
    standard: number;
    priority: number;
  };
}

// Crypto exchange rates (mock)
export interface CryptoRates {
  BTC: number;
  ETH: number;
  USDT: number;
  SOL: number;
  updatedAt: string;
}

// Admin-managed product
export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 'peptide-pen' | 'medit-pen' | 'novadose';
  categoryLabel: string;
  dosage: string;
  volume: string;
  price: number;
  description: string;
  benefits: string[];
  specs: Record<string, string>;
  badge?: string;
  image: string;
  status: 'draft' | 'published' | 'archived';
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

// Promotion system (Medusa-inspired)
export type PromotionType = 'standard' | 'buyget';
export type PromotionStatus = 'active' | 'draft' | 'expired';
export type DiscountType = 'percentage' | 'fixed';
export type TargetType = 'order' | 'items' | 'shipping';

export interface Promotion {
  id: string;
  code: string;
  type: PromotionType;
  status: PromotionStatus;
  label: string;
  description?: string;
  // Application method
  discountType: DiscountType;
  discountValue: number;
  targetType: TargetType;
  currencyCode: string;
  // Rules / conditions
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  validFrom?: string;
  validTo?: string;
  applicableProductIds?: string[];
  applicableCategories?: string[];
  excludedProductIds?: string[];
  // Usage limits
  totalLimit?: number;
  perCustomerLimit?: number;
  usedCount: number;
  usedByCustomers: Record<string, number>;
  // Buy X Get Y (for buyget type)
  buyRulesMinQuantity?: number;
  buyRulesProductIds?: string[];
  getRulesProductIds?: string[];
  getRulesQuantity?: number;
  getRulesDiscountType?: DiscountType;
  getRulesDiscountValue?: number;
  // Campaign link
  campaignId?: string;
  // Combinability
  isCombinable: boolean;
  // Metadata
  createdAt: string;
  updatedAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  identifier: string;
  startsAt?: string;
  endsAt?: string;
  budget?: {
    type: 'spend' | 'usage';
    limit: number;
    used: number;
  };
  promotionIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PromotionValidationResult {
  valid: boolean;
  promotion?: Promotion;
  discountAmount?: number;
  error?: string;
}

// Activity log entry
export interface ActivityLog {
  id: string;
  type: 'order' | 'user' | 'product' | 'commission' | 'payment' | 'settings';
  action: string;
  description: string;
  metadata?: Record<string, string | number>;
  adminId: string;
  createdAt: string;
}
