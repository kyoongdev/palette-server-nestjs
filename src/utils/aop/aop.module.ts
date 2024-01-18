import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { AdminAOPProvider } from './admin-aop.provider';
import { BaseAOPProvider } from './provider';
import { UserAOPProvider } from './user-aop.provider';

@Module({
  providers: [BaseAOPProvider, UserAOPProvider],
  imports: [DiscoveryModule],
})
export class AOPModule {}

@Module({
  imports: [DiscoveryModule],
  providers: [BaseAOPProvider, AdminAOPProvider],
})
export class AdminAOPModule {}
