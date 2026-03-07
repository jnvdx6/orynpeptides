import { NextResponse } from 'next/server';
import { getCryptoRates, CRYPTO_INFO } from '@/lib/crypto';

export async function GET() {
  try {
    const rates = await getCryptoRates();

    return NextResponse.json({
      rates,
      currencies: Object.entries(CRYPTO_INFO).map(([key, info]) => ({
        key,
        ...info,
      })),
    });
  } catch (error) {
    console.error('Crypto rates error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crypto rates' },
      { status: 500 }
    );
  }
}
