import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { CompodocProvider } from './compodoc.provider';

@Module({
  imports: [DiscoveryModule],
  providers: [CompodocProvider],
})
export class CompodocModule {}
