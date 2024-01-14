import { ConfigService } from '@nestjs/config';
import type { Response as ResponseType } from 'express';
export declare class AppController {
  private readonly configService;
  constructor(configService: ConfigService);
  getHello(res: ResponseType): void;
}
