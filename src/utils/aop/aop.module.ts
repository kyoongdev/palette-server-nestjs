import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { BaseAOPProvider } from './provider';
import { MainAOPProvider } from './user-aop.provider';

@Module({
  providers: [BaseAOPProvider, MainAOPProvider],
  exports: [BaseAOPProvider, MainAOPProvider],
  imports: [DiscoveryModule],
})
export class AOPModule {}
