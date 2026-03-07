import type { CryptoCurrency, CryptoRates } from '@/types';
import { getSettings } from './db';

// ─── Crypto info constants ──────────────────────────────────────────────────

export const CRYPTO_INFO: Record<
  CryptoCurrency,
  { name: string; symbol: string; icon: string; color: string }
> = {
  BTC: {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    color: '#F7931A',
  },
  ETH: {
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'Ξ',
    color: '#627EEA',
  },
  USDT: {
    name: 'Tether',
    symbol: 'USDT',
    icon: '₮',
    color: '#26A17B',
  },
  SOL: {
    name: 'Solana',
    symbol: 'SOL',
    icon: '◎',
    color: '#9945FF',
  },
};

// ─── Mock exchange rates ────────────────────────────────────────────────────

// Mock rates: 1 crypto = X EUR
const MOCK_RATES: Record<CryptoCurrency, number> = {
  BTC: 65000,
  ETH: 3400,
  USDT: 0.92,
  SOL: 140,
};

/**
 * Get current crypto exchange rates (mock data with slight randomness
 * to simulate real market fluctuation).
 */
export function getCryptoRates(): CryptoRates {
  // Add a small random fluctuation (+/- 1%) to simulate live prices
  const fluctuate = (base: number): number => {
    const change = base * (Math.random() * 0.02 - 0.01);
    return Math.round((base + change) * 100) / 100;
  };

  return {
    BTC: fluctuate(MOCK_RATES.BTC),
    ETH: fluctuate(MOCK_RATES.ETH),
    USDT: fluctuate(MOCK_RATES.USDT),
    SOL: fluctuate(MOCK_RATES.SOL),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Calculate the crypto amount for a given EUR amount.
 * Returns the amount in the specified cryptocurrency.
 */
export function calculateCryptoAmount(
  eurAmount: number,
  currency: CryptoCurrency
): number {
  const rates = getCryptoRates();
  const rate = rates[currency];
  if (!rate || rate === 0) return 0;

  const cryptoAmount = eurAmount / rate;

  // Round to appropriate decimal places based on currency
  switch (currency) {
    case 'BTC':
      return Math.round(cryptoAmount * 100000000) / 100000000; // 8 decimals
    case 'ETH':
      return Math.round(cryptoAmount * 1000000) / 1000000; // 6 decimals
    case 'USDT':
      return Math.round(cryptoAmount * 100) / 100; // 2 decimals
    case 'SOL':
      return Math.round(cryptoAmount * 10000) / 10000; // 4 decimals
    default:
      return Math.round(cryptoAmount * 100000000) / 100000000;
  }
}

/**
 * Get the configured wallet address for a given cryptocurrency.
 */
export async function generatePaymentAddress(
  currency: CryptoCurrency
): Promise<string> {
  const settings = await getSettings();
  return settings.cryptoWallets[currency] || '';
}

/**
 * Generate a QR code data string for a crypto payment.
 * Uses standard URI schemes for each cryptocurrency.
 */
export function generateQRData(
  address: string,
  amount: number,
  currency: CryptoCurrency
): string {
  switch (currency) {
    case 'BTC':
      return `bitcoin:${address}?amount=${amount}`;
    case 'ETH':
      return `ethereum:${address}?value=${amount}`;
    case 'USDT':
      // USDT on Ethereum uses the same scheme with a token parameter
      return `ethereum:${address}?value=${amount}&token=USDT`;
    case 'SOL':
      return `solana:${address}?amount=${amount}`;
    default:
      return `crypto:${address}?amount=${amount}`;
  }
}
