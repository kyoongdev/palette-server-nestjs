import { Injectable, OnModuleInit } from '@nestjs/common';

import { BaseAOPProvider } from './provider';

@Injectable()
export class MainAOPProvider implements OnModuleInit {
  constructor(private readonly aopProvider: BaseAOPProvider) {}

  onModuleInit() {
    this.aopProvider.getInstance((_provider) => true);
  }
}
