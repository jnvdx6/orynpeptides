import { NextRequest, NextResponse } from 'next/server';
import { getOrders, updateOrder } from '@/lib/db';
import { verifyUser } from '@/lib/admin-auth';
import { getCryptoRates, calculateCryptoAmount, generatePaymentAddress, CRYPTO_INFO } from '@/lib/crypto';
import type { Order, CryptoCurrency, CryptoPayment } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const user = await verifyUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderId, currency } = await request.json();

    if (!orderId || !currency) {
      return NextResponse.json(
        { error: 'Order ID and currency are required' },
        { status: 400 }
      );
    }

    const validCurrencies: CryptoCurrency[] = ['BTC', 'ETH', 'USDT', 'SOL'];
    if (!validCurrencies.includes(currency)) {
      return NextResponse.json(
        { error: 'Invalid cryptocurrency. Supported: BTC, ETH, USDT, SOL' },
        { status: 400 }
      );
    }

    // Find the order
    const orders = await getOrders();
    const order = orders.find((o: Order) => o.id === orderId);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.userId !== user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    if (order.paymentStatus === 'confirmed') {
      return NextResponse.json(
        { error: 'Order is already paid' },
        { status: 400 }
      );
    }

    // Get current rates and calculate crypto amount
    const cryptoAmount = calculateCryptoAmount(order.total, currency);
    const walletAddress = await generatePaymentAddress(currency);

    // Set 30-minute expiry
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const cryptoPayment: CryptoPayment = {
      currency,
      walletAddress,
      amount: cryptoAmount,
      amountEur: order.total,
      expiresAt,
    };

    // Update the order with crypto payment details
    await updateOrder(orderId, {
      paymentMethod: 'crypto',
      cryptoPayment,
      updatedAt: new Date().toISOString(),
    });

    const cryptoInfo = CRYPTO_INFO[currency as CryptoCurrency];

    return NextResponse.json({
      payment: {
        currency,
        currencyName: cryptoInfo?.name || currency,
        walletAddress,
        amount: cryptoAmount,
        amountEur: order.total,
        expiresAt,
        icon: cryptoInfo?.icon || null,
      },
    });
  } catch (error) {
    console.error('Crypto payment error:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
