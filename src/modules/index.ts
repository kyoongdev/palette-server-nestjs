import { Module } from '@nestjs/common';

import { AOPModule } from '@/utils/aop/aop.module';

import { AuthModule } from './auth/auth.module';
import { GenreModule } from './genre/genre.module';
import { MoodModule } from './mood/mood.module';
import { PaymentModule } from './payment/payment.module';
import { RegionModule } from './region/region.module';
import { UserModule } from './user/user.module';

export const Modules = [PaymentModule, MoodModule, GenreModule, RegionModule, AuthModule, UserModule, AOPModule];

@Module({
  imports: Modules,
})
export class V2Module {}
