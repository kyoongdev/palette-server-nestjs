import { Injectable, OnModuleInit, Type } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

import { appendFile, unlink, writeFile } from 'fs';

import {
  CompodocBodyProps,
  CompodocFieldValue,
  CompodocItem,
  CompodocMarkDown,
  CompodocOperationProps,
  CompodocProperty,
  CompodocResponseProps,
} from '@/interface/compodoc.interface';

import { COMPO_DOC, COMPO_DOC_BODY, COMPO_DOC_OPERATION, COMPO_DOC_PROPERTIES, COMPO_DOC_RESPONSE } from './decorators';

@Injectable()
export class CompodocProvider implements OnModuleInit {
  markDown: CompodocMarkDown[] = [];

  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflect: Reflector
  ) {}

  async onModuleInit() {
    this.getGateways().forEach(({ instance, metatype }) => {
      const compo = this.reflect.get<string>(COMPO_DOC, metatype);
      const methodNames = this.scanner.getAllMethodNames(instance);
      this.markDown.push({
        title: compo,
        items: this.getCompodocItemsByMethods(instance, methodNames),
      });
    });
    const markDown = this.makeMarkDown();
    unlink('socket.md', (err) => {});

    writeFile('socket.md', markDown, (err) => {
      console.log(err);
    });
  }

  makeMarkDown() {
    return this.markDown.reduce<string>((acc, item) => {
      acc += `# ${item.title}\n\n`;
      acc +=
        item.items.reduce<string>((acc, item) => {
          acc += `## ${item.title}\n\n`;
          acc += `### 설명\n${item.description ?? '-'}\n`;
          acc += `### 요청\n\n`;
          acc += item.body.reduce<string>((acc, item) => {
            acc += `#### ${item.name}\n`;
            acc += `##### Type: ${item.type}\n`;
            acc += `##### 설명: ${item.description ?? '-'}\n`;
            acc += `##### Nullable: ${item.nullable}\n\n`;
            return acc;
          }, ``);

          acc += `\n\n### 응답\n\n`;

          acc += item.response.reduce<string>((acc, item) => {
            acc += `#### ${item.name}\n`;
            acc += `##### Type: ${item.type}\n`;
            acc += `##### 설명: ${item.description ?? '-'}\n`;
            acc += `##### Nullable: ${item.nullable}\n\n`;
            return acc;
          }, ``);

          return acc;
        }, ``) + '---';

      return acc;
    }, ``);
  }

  getGateways() {
    return this.discovery
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

        return instance;
      });
  }

  getCompodocItemsByMethods(instance: any, methodNames: string[]): CompodocItem[] {
    return methodNames.reduce<CompodocItem[]>((acc, methodName) => {
      const body = this.reflect.get<CompodocBodyProps | undefined>(COMPO_DOC_BODY, instance[methodName]);
      const response = this.reflect.get<CompodocResponseProps | undefined>(COMPO_DOC_RESPONSE, instance[methodName]);
      const operation = this.reflect.get<CompodocOperationProps | undefined>(COMPO_DOC_OPERATION, instance[methodName]);

      if (!body && !response && !operation) return acc;
      const item: CompodocItem = {
        title: methodName,
        description: operation?.description,
        body: body ? this.getCompodocFieldValue(this.getProperties(body.type as Type<unknown>)) : [],
        response: response ? this.getCompodocFieldValue(this.getProperties(response.type as Type<unknown>)) : [],
      };

      acc.push(item);
      return acc;
    }, []);
  }

  getProperties(type: Type<unknown>): CompodocProperty[] {
    return this.reflect.get<CompodocProperty[]>(COMPO_DOC_PROPERTIES, type.prototype);
  }

  getCompodocFieldValue(items: CompodocProperty[]): CompodocFieldValue[] {
    return items.map<CompodocFieldValue>((item) => {
      if (typeof item.type === 'string') {
        return {
          name: item.name,
          type: item.type,
          description: item.description,
          nullable: item.nullable,
        };
      } else {
        return {
          name: item.name,
          type: item.type.toString(),
          description: item.description,
          nullable: item.nullable,
        };
      }
    });
  }
}
