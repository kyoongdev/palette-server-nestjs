import { Controller, Get, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response as ResponseType } from 'express';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}
  @Get('/health')
  getHello(@Response() res: ResponseType) {
    console.log(this.configService.get('DATABASE_HOST'));
    res.status(200).json({ status: 'HEALTHY' });
  }
}
