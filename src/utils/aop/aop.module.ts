import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { BaseAOPProvider } from './provider';
import { UserAOPProvider } from './user-aop.provider';

@Module({
  providers: [BaseAOPProvider, UserAOPProvider],
  imports: [DiscoveryModule],
})
export class AOPModule {}
