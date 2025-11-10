import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PartnerModule } from './partner/partner.module';
import { AdminModule } from './admin/admin.module';
import { MemberModule } from './member/member.module';
import { AuthMiddleware } from './users/auth.middleware';
import { CoinrulesController } from './partner/coinrules/coinrules.controller';
@Module({
  imports: [UsersModule, PartnerModule, AdminModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        'admin/coinrules',
        'partner/razorpay/update-order',
        'partner/razorpay/create-order',
        '/partner/dashboard',
      ); // ✅ ye sab /users routes protect karega
  }
}
