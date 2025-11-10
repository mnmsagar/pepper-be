import { Injectable } from '@nestjs/common';
import Razorpay from 'razorpay';
import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
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
  async createOrder(amount: number) {
    return await this.razorpay.orders.create({
      amount: amount * 100, // converting INR to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    });
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
}
