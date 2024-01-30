import { Module } from '@nestjs/common';

import { SaleTypeController } from './sale-type.controller';
import { SaleTypeRepository } from './sale-type.repository';
import { SaleTypeService } from './sale-type.service';

@Module({
  providers: [SaleTypeRepository, SaleTypeService],
  controllers: [SaleTypeController],
})
export class SaleTypeModule {}
