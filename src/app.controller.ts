import { Controller, Get, Render, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response as ResponseType } from 'express';

@Controller()
export class AppController {
  @Get('/health')
  getHello(@Response() res: ResponseType) {
    res.status(200).json({ status: 'HEALTHY' });
  }

  @Get('/compodoc')
  getCompodoc(@Response() res: ResponseType) {
    res.status(200).sendFile('index.html', { root: './documentation' });
  }
}
