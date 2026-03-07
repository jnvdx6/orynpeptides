import { promises as fs } from 'fs';
import path from 'path';
import type {
  User,
  Order,
  Commission,
  AdminSettings,
  AdminProduct,
  ActivityLog,
  Promotion,
  Campaign,
} from '@/types';
// auth imports done dynamically in ensureInitialized to avoid circular deps

const DB_DIR = '/tmp/oryn-db';

let _initialized = false;

// Ensure the database directory exists
async function ensureDBDir(): Promise<void> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

// Ensure DB is initialized with default data on first access
async function ensureInitialized(): Promise<void> {
  if (_initialized) return;
  _initialized = true;
  await ensureDBDir();

  // Check if admin user exists
  const filePath = path.join(DB_DIR, 'users.json');
  try {
    await fs.access(filePath);
  } catch {
    // No users file - initialize
    const { hashPassword, generateReferralCode } = await import('./auth');
    const adminUser: User = {
      id: 'admin-001',
      email: 'admin@oryn.com',
      password: hashPassword('admin123'),
      firstName: 'Admin',
      lastName: 'Oryn',
      organization: 'Oryn Peptides',
      role: 'admin',
      referralCode: generateReferralCode(),
      referralTree: [],
      totalEarnings: 0,
      availableBalance: 0,
      createdAt: new Date().toISOString(),
      isActive: true,
    };
    await fs.writeFile(filePath, JSON.stringify([adminUser], null, 2), 'utf-8');
  }
}

// Read a collection from its JSON file
export async function getDB<T>(collection: string): Promise<T[]> {
  await ensureInitialized();
  const filePath = path.join(DB_DIR, `${collection}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch {
    // File doesn't exist yet, return empty array
    return [];
  }
}

// Write a collection to its JSON file
export async function saveDB<T>(collection: string, data: T[]): Promise<void> {
  await ensureDBDir();
  const filePath = path.join(DB_DIR, `${collection}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Read a singleton config (like settings)
async function getConfig<T>(name: string): Promise<T | null> {
  await ensureInitialized();
  const filePath = path.join(DB_DIR, `${name}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

// Write a singleton config
async function saveConfig<T>(name: string, data: T): Promise<void> {
  await ensureDBDir();
  const filePath = path.join(DB_DIR, `${name}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── User helpers ───────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  return getDB<User>('users');
}

export async function addUser(user: User | Omit<User, 'id'>): Promise<User> {
  const users = await getUsers();
  const fullUser: User = 'id' in user && user.id
    ? user as User
    : { ...user, id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` } as User;
  users.push(fullUser);
  await saveDB('users', users);
  return fullUser;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.id === id);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function getUserByReferralCode(code: string): Promise<User | undefined> {
  const users = await getUsers();
  return users.find((u) => u.referralCode === code);
}

export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | undefined> {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return undefined;
  users[index] = { ...users[index], ...updates };
  await saveDB('users', users);
  return users[index];
}

// ─── Order helpers ──────────────────────────────────────────────────────────

export async function getOrders(): Promise<Order[]> {
  return getDB<Order>('orders');
}

export async function addOrder(order: Order | Omit<Order, 'id'>): Promise<Order> {
  const orders = await getOrders();
  const fullOrder: Order = 'id' in order && order.id
    ? order as Order
    : { ...order, id: `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` } as Order;
  orders.push(fullOrder);
  await saveDB('orders', orders);
  return fullOrder;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id);
}

export async function getOrderByRef(ref: string): Promise<Order | undefined> {
  const orders = await getOrders();
  return orders.find((o) => o.ref === ref);
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const orders = await getOrders();
  return orders.filter((o) => o.userId === userId);
}

export async function updateOrder(
  id: string,
  updates: Partial<Order>
): Promise<Order | undefined> {
  const orders = await getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return undefined;
  orders[index] = { ...orders[index], ...updates, updatedAt: new Date().toISOString() };
  await saveDB('orders', orders);
  return orders[index];
}

// ─── Commission helpers ─────────────────────────────────────────────────────

export async function getCommissions(): Promise<Commission[]> {
  return getDB<Commission>('commissions');
}

export async function addCommission(commission: Commission): Promise<Commission> {
  const commissions = await getCommissions();
  commissions.push(commission);
  await saveDB('commissions', commissions);
  return commission;
}

export async function getCommissionsByBeneficiary(
  beneficiaryId: string
): Promise<Commission[]> {
  const commissions = await getCommissions();
  return commissions.filter((c) => c.beneficiaryId === beneficiaryId);
}

export async function getCommissionsByOrder(orderId: string): Promise<Commission[]> {
  const commissions = await getCommissions();
  return commissions.filter((c) => c.orderId === orderId);
}

export async function updateCommission(
  id: string,
  updates: Partial<Commission>
): Promise<Commission | undefined> {
  const commissions = await getCommissions();
  const index = commissions.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  commissions[index] = { ...commissions[index], ...updates };
  await saveDB('commissions', commissions);
  return commissions[index];
}

// ─── Settings helpers ───────────────────────────────────────────────────────

const DEFAULT_SETTINGS: AdminSettings = {
  commissionRates: {
    level1: 10,
    level2: 5,
    level3: 3,
    level4: 2,
    level5: 1,
  },
  cryptoEnabled: true,
  cryptoWallets: {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    USDT: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    SOL: '7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV',
  },
  cryptoDiscount: 5, // 5% discount for crypto payments
  minPayoutAmount: 50, // minimum 50 EUR to request payout
  autoApproveCommissions: false,
  shippingRates: {
    standard: 9.99,
    priority: 19.99,
  },
};

export async function getSettings(): Promise<AdminSettings> {
  const settings = await getConfig<AdminSettings>('settings');
  if (!settings) {
    await saveConfig('settings', DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  }
  return settings;
}

export async function updateSettings(
  updates: Partial<AdminSettings>
): Promise<AdminSettings> {
  const current = await getSettings();
  const updated = { ...current, ...updates };
  await saveConfig('settings', updated);
  return updated;
}

// ─── Product helpers ──────────────────────────────────────────────────────

export async function getProducts(): Promise<AdminProduct[]> {
  const products = await getDB<AdminProduct>('products');
  if (products.length === 0) {
    // Seed from static products on first access
    const { products: staticProducts } = await import('@/data/products');
    const now = new Date().toISOString();
    const seeded: AdminProduct[] = staticProducts.map((p, i) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      subtitle: p.subtitle,
      category: p.category,
      categoryLabel: p.categoryLabel,
      dosage: p.dosage,
      volume: p.volume,
      price: p.price,
      description: p.description,
      benefits: p.benefits,
      specs: p.specs,
      badge: p.badge,
      image: p.image,
      status: 'published' as const,
      stock: 100,
      sku: `ORYN-${p.slug.toUpperCase()}-001`,
      createdAt: now,
      updatedAt: now,
    }));
    await saveDB('products', seeded);
    return seeded;
  }
  return products;
}

export async function getProductById(id: string): Promise<AdminProduct | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}

export async function addProduct(product: AdminProduct): Promise<AdminProduct> {
  const products = await getProducts();
  products.push(product);
  await saveDB('products', products);
  return product;
}

export async function updateProduct(
  id: string,
  updates: Partial<AdminProduct>
): Promise<AdminProduct | undefined> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index], ...updates, updatedAt: new Date().toISOString() };
  await saveDB('products', products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  await saveDB('products', filtered);
  return true;
}

// ─── Activity log helpers ─────────────────────────────────────────────────

export async function getActivityLog(): Promise<ActivityLog[]> {
  return getDB<ActivityLog>('activity');
}

export async function addActivityLog(entry: Omit<ActivityLog, 'id' | 'createdAt'>): Promise<ActivityLog> {
  const logs = await getActivityLog();
  const full: ActivityLog = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  logs.unshift(full); // newest first
  // Keep only last 500 entries
  if (logs.length > 500) logs.length = 500;
  await saveDB('activity', logs);
  return full;
}

// ─── Delete helpers ───────────────────────────────────────────────────────

export async function deleteOrder(id: string): Promise<boolean> {
  const orders = await getOrders();
  const filtered = orders.filter((o) => o.id !== id);
  if (filtered.length === orders.length) return false;
  await saveDB('orders', filtered);
  return true;
}

export async function deleteUser(id: string): Promise<boolean> {
  const users = await getUsers();
  const filtered = users.filter((u) => u.id !== id);
  if (filtered.length === users.length) return false;
  await saveDB('users', filtered);
  return true;
}

export async function deleteCommission(id: string): Promise<boolean> {
  const commissions = await getCommissions();
  const filtered = commissions.filter((c) => c.id !== id);
  if (filtered.length === commissions.length) return false;
  await saveDB('commissions', filtered);
  return true;
}

// ─── Promotion helpers ─────────────────────────────────────────────────────

export async function getPromotions(): Promise<Promotion[]> {
  return getDB<Promotion>('promotions');
}

export async function getPromotionById(id: string): Promise<Promotion | undefined> {
  const promotions = await getPromotions();
  return promotions.find((p) => p.id === id);
}

export async function getPromotionByCode(code: string): Promise<Promotion | undefined> {
  const promotions = await getPromotions();
  return promotions.find((p) => p.code.toUpperCase() === code.toUpperCase());
}

export async function addPromotion(promotion: Promotion): Promise<Promotion> {
  const promotions = await getPromotions();
  promotions.push(promotion);
  await saveDB('promotions', promotions);
  return promotion;
}

export async function updatePromotion(
  id: string,
  updates: Partial<Promotion>
): Promise<Promotion | undefined> {
  const promotions = await getPromotions();
  const index = promotions.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  promotions[index] = { ...promotions[index], ...updates, updatedAt: new Date().toISOString() };
  await saveDB('promotions', promotions);
  return promotions[index];
}

export async function deletePromotion(id: string): Promise<boolean> {
  const promotions = await getPromotions();
  const filtered = promotions.filter((p) => p.id !== id);
  if (filtered.length === promotions.length) return false;
  await saveDB('promotions', filtered);
  return true;
}

// ─── Campaign helpers ──────────────────────────────────────────────────────

export async function getCampaigns(): Promise<Campaign[]> {
  return getDB<Campaign>('campaigns');
}

export async function getCampaignById(id: string): Promise<Campaign | undefined> {
  const campaigns = await getCampaigns();
  return campaigns.find((c) => c.id === id);
}

export async function addCampaign(campaign: Campaign): Promise<Campaign> {
  const campaigns = await getCampaigns();
  campaigns.push(campaign);
  await saveDB('campaigns', campaigns);
  return campaign;
}

export async function updateCampaign(
  id: string,
  updates: Partial<Campaign>
): Promise<Campaign | undefined> {
  const campaigns = await getCampaigns();
  const index = campaigns.findIndex((c) => c.id === id);
  if (index === -1) return undefined;
  campaigns[index] = { ...campaigns[index], ...updates, updatedAt: new Date().toISOString() };
  await saveDB('campaigns', campaigns);
  return campaigns[index];
}

export async function deleteCampaign(id: string): Promise<boolean> {
  const campaigns = await getCampaigns();
  const filtered = campaigns.filter((c) => c.id !== id);
  if (filtered.length === campaigns.length) return false;
  await saveDB('campaigns', filtered);
  return true;
}

// initializeDB is handled automatically via ensureInitialized()
