import { Injectable, OnModuleInit } from '@nestjs/common';

import { BaseAOPProvider } from './provider';

@Injectable()
export class UserAOPProvider implements OnModuleInit {
  constructor(private readonly aopProvider: BaseAOPProvider) {}

  onModuleInit() {
    this.aopProvider.getInstance(
      (provider) => !String(provider.name).startsWith('Admin') && !String(provider.name).startsWith('Host')
    );
  }
}
