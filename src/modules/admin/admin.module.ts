import { Module } from '@nestjs/common';

import { AdminAOPProvider } from '@/utils/aop/admin-aop.provider';
import { AdminAOPModule } from '@/utils/aop/aop.module';

export const AdminModules = [AdminAOPModule];

@Module({
  providers: [AdminAOPProvider],
  imports: AdminModules,
})
export class AdminModule {}
