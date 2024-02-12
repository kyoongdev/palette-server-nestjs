import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

import { COMPO_DOC } from './decorators';

@Injectable()
export class CompodocProvider implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflect: Reflector
  ) {}

  onModuleInit() {
    const gateways = this.discovery
      .getProviders()
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance, metatype }) => {
        if (!instance || !metatype) {
          return false;
        }
        const compo = this.reflect.get<string>(COMPO_DOC, metatype);
        if (!compo) {
          return false;
        }
        console.log({ compo });

        return instance;
      });

    console.log(gateways);
    gateways.forEach(({ instance }) => {
      const methodNames = this.scanner.getAllMethodNames(instance);
      console.log({ methodNames });
    });
  }
}
