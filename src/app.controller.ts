import { Controller, Get, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';

@Controller()
export class AppController {
  @Get('/health')
  getHello(@Response() res: ResponseType) {
    res.status(200).json({ status: 'HEALTHY' });
  }
}
