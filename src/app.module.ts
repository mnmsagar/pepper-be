import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PartnerModule } from './partner/partner.module';
import { AdminModule } from './admin/admin.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [UsersModule, PartnerModule, AdminModule, MemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
