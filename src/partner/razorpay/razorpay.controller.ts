import { Controller, Post, Body, Req } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { CreateOrderDto } from '../dto/createOrder.dto';

@Controller('partner/razorpay')
export class RazorpayController {
  constructor(private readonly razorpayService: RazorpayService) {}

  // ✅ Create order route
  @Post('create-order')
  async createOrder(@Body() dto: CreateOrderDto, @Req() req: any) {
    const userId = req.user.id;
    return this.razorpayService.createOrder(dto.amount, dto.coins, userId);
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
  @Post('update-order')
  async updateOrder(@Body() body: any) {
    const { razorpayOrderId, razorpayPaymentId } = body;
    return this.razorpayService.updateOrder(razorpayOrderId, razorpayPaymentId);
  }
}
