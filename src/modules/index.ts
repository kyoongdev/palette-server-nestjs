import { Module } from '@nestjs/common';

import { AOPModule } from '@/utils/aop/aop.module';

import { UserModule } from './user/user.module';

export const Modules = [UserModule, AOPModule];

@Module({
  imports: Modules,
})
export class V2Module {}
