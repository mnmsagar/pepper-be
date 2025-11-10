import { Controller, Post, Body } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { CreateOrderDto } from '../dto/createOrder.dto';

@Controller('partner/razorpay')
export class RazorpayController {
  constructor(private readonly razorpayService: RazorpayService) {}

  // ✅ Create order route
  @Post('create-order')
  async createOrder(@Body() dto: CreateOrderDto) {
    return this.razorpayService.createOrder(dto.amount);
  }

  // ✅ Verify signature route
  @Post('verify')
  async verify(@Body() body: any) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const isValid = this.razorpayService.verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );

    return { success: isValid };
  }
}
