import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
import { db } from 'src/db/connection';
import { orders, coins } from 'src/db/schema';
import { desc, eq } from 'drizzle-orm';
dotenv.config();

@Injectable()
export class RazorpayService {
  private razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
  }

  // ✅ Create Razorpay Order
  async createOrder(amount: number, coins: number, userId: number) {
    // 1️⃣ Razorpay me order create karo
    const razorOrder = await this.razorpay.orders.create({
      amount: amount * 100, // converting INR to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });

    // 2️⃣ Database me order save karo
    // @ts-ignore
    await db.insert(orders).values({
      razorpayOrderId: razorOrder.id,
      amount,
      coins,
      userId,
      status: 'pending',
    });

    // 3️⃣ Razorpay order frontend ko return karo
    return razorOrder;
  }
  // ✅ Verify Payment Signature (Optional but recommended)
  verifySignature(orderId: string, paymentId: string, signature: string) {
    const body = orderId + '|' + paymentId;

    const expectedSignature = crypto
      .createHmac(
        'sha256',
        process.env.RAZORPAY_SECRET ? process.env.RAZORPAY_SECRET : '',
      )
      .update(body)
      .digest('hex');

    return expectedSignature === signature;
  }

  async updateOrder(razorpayOrderId: string, razorpayPaymentId: string) {
    // 🧩 1️⃣ Order fetch
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.razorpayOrderId, razorpayOrderId));

    if (!order) {
      throw new Error('Order not found');
    }

    // 🧩 2️⃣ Order update
    await db
      .update(orders)
      .set({
        razorpayPaymentId,
        status: 'paid',
        updatedAt: new Date(),
      })
      .where(eq(orders.razorpayOrderId, razorpayOrderId));

    // 🧩 3️⃣ Get user’s latest coin balance
    const [lastCoin] = await db
      .select()
      .from(coins)
      .where(eq(coins.userId, order.userId))
      .orderBy(desc(coins.createdAt))
      .limit(1);

    const currentBalance = lastCoin ? Number(lastCoin.totalBalance) : 0;

    // 🧩 4️⃣ Add new CREDIT transaction
    const newBalance = currentBalance + Number(order.coins);

    await db.insert(coins).values({
      //@ts-ignore
      type: 'CREDIT',
      amount: order.coins,
      totalBalance: newBalance,
      userId: order.userId,
      transactionId: razorpayPaymentId,
    });

    return {
      success: true,
      message: 'Payment verified, coins credited successfully',
      data: {
        userId: order.userId,
        creditedCoins: order.coins,
        totalBalance: newBalance,
      },
    };
  }
}
