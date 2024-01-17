import { Module } from '@nestjs/common';

import { AOPModule } from '@/utils/aop/aop.module';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

export const Modules = [AuthModule, UserModule, AOPModule];

@Module({
  imports: Modules,
})
export class V2Module {}
