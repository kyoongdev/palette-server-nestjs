import { Controller, Get, Render, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response as ResponseType } from 'express';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}
  @Get('/health')
  getHello(@Response() res: ResponseType) {
    res.status(200).json({ status: 'HEALTHY' });
  }
}
