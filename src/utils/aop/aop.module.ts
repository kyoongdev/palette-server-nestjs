import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { BaseAOPProvider } from './provider';

@Module({
  providers: [BaseAOPProvider],
  imports: [DiscoveryModule],
})
export class AOPModule {}
